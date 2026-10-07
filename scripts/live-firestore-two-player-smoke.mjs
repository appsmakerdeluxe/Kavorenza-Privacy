import { randomBytes, randomUUID } from 'node:crypto';

const projectId = 'kavorenza-1';
const landingUrl = 'https://kavorenza-1.web.app/';
const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const documentRoot = `projects/${projectId}/databases/(default)/documents`;
const games = [
  ['tic_tac_toe', 'move', { cell: 0 }],
  ['reflex', 'ready', {}],
  ['connect_four', 'move', { column: 0 }],
  ['rock_paper', 'pick', { value: 'ROCK' }],
  ['code_breaker', 'answer', { answerIndex: 0 }],
  ['number_target', 'pick', { value: '10 + 11 = 21;1;0' }],
  ['color_rush', 'pick', { value: 'CYAN;100' }],
  ['word_sprint', 'pick', { value: 'NACHT;100' }],
  ['emoji_memory', 'pick', { value: 'card:0' }],
  ['cyber_tap', 'pick', { value: '42' }],
  ['bomb_party', 'pass', {}],
  ['chooser', 'hold', {}],
  ['would_you_rather', 'pick', { choice: 'A', round: 0 }],
  ['prism_relay', 'pick', { value: '0', round: 0 }],
  ['switchstorm', 'pick', { value: '0', round: 0 }],
  ['shape_shift', 'pick', { value: '0', round: 0 }],
  ['maze_courier', 'pick', { value: '0', round: 0 }],
  ['tower_balance', 'pick', { value: '0', round: 0 }],
  ['cargo_sort', 'pick', { value: '0', round: 0 }],
  ['pixel_forge', 'pick', { value: '0', round: 0 }],
  ['echo_wave', 'pick', { value: '0', round: 0 }],
  ['orbit_rescue', 'pick', { value: '0', round: 0 }],
  ['comet_curling', 'pick', { value: '0', round: 0 }],
];

function value(input) {
  if (input instanceof Date) return { timestampValue: input.toISOString() };
  if (input === null) return { nullValue: null };
  if (typeof input === 'string') return { stringValue: input };
  if (typeof input === 'boolean') return { booleanValue: input };
  if (Number.isInteger(input)) return { integerValue: String(input) };
  if (typeof input === 'number') return { doubleValue: input };
  if (Array.isArray(input)) return { arrayValue: { values: input.map(value) } };
  return { mapValue: { fields: Object.fromEntries(Object.entries(input).map(([key, item]) => [key, value(item)])) } };
}

const fields = object => Object.fromEntries(Object.entries(object).map(([key, item]) => [key, value(item)]));
const randomCode = () => [...randomBytes(6)].map(byte => alphabet[byte % alphabet.length]).join('');
const root = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;
const accounts = [];
let apiKey;
let roomId;
let roomCode;
let roomCreated = false;

async function request(url, { token, method = 'GET', body } = {}) {
  const response = await fetch(url, {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!response.ok) {
    const diagnostic = await response.text();
    throw new Error(`${method} ${new URL(url).pathname} failed (${response.status}): ${diagnostic.slice(0, 350)}`);
  }
  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function signIn() {
  const result = await request(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
    method: 'POST', body: { returnSecureToken: true },
  });
  accounts.push({ uid: result.localId, token: result.idToken });
  return accounts.at(-1);
}

async function commit(token, writes) {
  return request(`${root}:commit`, { token, method: 'POST', body: { writes } });
}

function createWrite(path, data) {
  return { update: { name: `${documentRoot}/${path}`, fields: fields(data) }, currentDocument: { exists: false } };
}

function updateWrite(path, data) {
  const fieldPaths = Object.keys(data);
  return { update: { name: `${documentRoot}/${path}`, fields: fields(data) }, updateMask: { fieldPaths } };
}

async function update(token, path, data) {
  await commit(token, [updateWrite(path, data)]);
}

async function list(token, collectionPath) {
  const response = await request(`${root}/${collectionPath}?pageSize=100`, { token });
  return response.documents || [];
}

function record(doc) {
  const values = doc.fields || {};
  return Object.fromEntries(Object.entries(values).map(([key, item]) => [
    key,
    item.stringValue ?? item.integerValue ?? item.doubleValue ?? item.booleanValue ?? null,
  ]));
}

async function startMatch(host, guest, game) {
  const path = `rooms/${roomId}`;
  const matchId = randomUUID();
  await update(host.token, path, {
    proposedGame: game,
    proposedByUid: host.uid,
    status: 'voting',
    lastActivityAt: new Date(),
  });
  await update(guest.token, path, {
    currentGame: game,
    matchId,
    readyUids: [],
    status: 'preparing',
    lastActivityAt: new Date(),
  });
  await update(host.token, path, { readyUids: [host.uid], lastActivityAt: new Date() });
  await update(guest.token, path, {
    readyUids: [host.uid, guest.uid],
    status: 'playing',
    lastActivityAt: new Date(),
  });
  return matchId;
}

async function cleanup() {
  const [host] = accounts;
  if (roomCreated && host) try {
    await update(host.token, `rooms/${roomId}`, {
      status: 'finished',
      playerCount: 0,
      currentGame: null,
      matchId: null,
      readyUids: [],
      lastActivityAt: new Date(),
      expiresAt: new Date(Date.now() + 3 * 60_000),
      closedByUid: host.uid,
    });
    for (const collection of ['moves', 'players', 'events', 'votes', 'nicknameClaims']) {
      for (const doc of await list(host.token, `rooms/${roomId}/${collection}`)) {
        await request(`${root}/${doc.name.slice(documentRoot.length + 1)}`, { token: host.token, method: 'DELETE' });
      }
    }
    await request(`${root}/roomCodes/${roomCode}`, { token: host.token, method: 'DELETE' });
    await request(`${root}/rooms/${roomId}`, { token: host.token, method: 'DELETE' });
  } catch (error) {
    console.error(`WARNING: Firestore cleanup did not fully complete (${error.message}); the test room has a short expiry and will be removed by the scheduled cleanup.`);
  }
  for (const account of accounts) {
    try {
      await request(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${apiKey}`, {
        method: 'POST', body: { idToken: account.token },
      });
    } catch (error) {
      console.error(`WARNING: Firebase could not delete one temporary anonymous test account (${error.message}).`);
    }
  }
}

try {
  const htmlResponse = await fetch(landingUrl);
  if (!htmlResponse.ok) throw new Error(`Firebase Hosting returned HTTP ${htmlResponse.status}`);
  const html = await htmlResponse.text();
  const projectMatch = html.match(/projectId\s*:\s*['"]([^'"]+)['"]/);
  const keyMatch = html.match(/apiKey\s*:\s*['"]([^'"]+)['"]/);
  if (!projectMatch || projectMatch[1] !== projectId || !keyMatch) throw new Error('Public Firebase web configuration was not found or did not match the expected project.');
  apiKey = keyMatch[1];

  const host = await signIn();
  const guest = await signIn();
  roomId = `live-smoke-${randomUUID()}`;
  roomCode = randomCode();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60_000);

  await commit(host.token, [
    createWrite(`rooms/${roomId}`, {
      roomCode, hostUid: host.uid, currentGame: null, status: 'waiting',
      maxPlayers: 2, playerCount: 1, createdAt: new Date(),
      lastActivityAt: new Date(), expiresAt,
    }),
    createWrite(`rooms/${roomId}/players/${host.uid}`, {
      uid: host.uid, nickname: 'QA Host', seat: 1, online: true, expiresAt,
    }),
    createWrite(`roomCodes/${roomCode}`, { roomId, hostUid: host.uid, expiresAt }),
  ]);
  roomCreated = true;

  await commit(guest.token, [
    createWrite(`rooms/${roomId}/players/${guest.uid}`, {
      uid: guest.uid, nickname: 'QA Guest', seat: 2, online: true, expiresAt,
    }),
    updateWrite(`rooms/${roomId}`, { playerCount: 2, lastActivityAt: new Date().toISOString() }),
  ]);

  for (const [index, [game, type, payload]] of games.entries()) {
    const matchId = await startMatch(host, guest, game);
    await commit(host.token, [createWrite(`rooms/${roomId}/moves/${randomUUID()}`, {
      game, playerUid: host.uid, type, payload, matchId,
      createdAt: new Date(), expiresAt,
    })]);
    const [hostMoves, guestMoves] = await Promise.all([
      list(host.token, `rooms/${roomId}/moves`),
      list(guest.token, `rooms/${roomId}/moves`),
    ]);
    const hostGames = hostMoves.map(record).map(move => move.game).sort();
    const guestGames = guestMoves.map(record).map(move => move.game).sort();
    const expected = games.slice(0, index + 1).map(item => item[0]).sort();
    if (JSON.stringify(hostGames) !== JSON.stringify(expected) || JSON.stringify(guestGames) !== JSON.stringify(expected)) {
      throw new Error(`${game}: the two authorized clients did not read the same move history.`);
    }
    await update(host.token, `rooms/${roomId}`, {
      currentGame: null,
      matchId: null,
      readyUids: [],
      proposedGame: null,
      proposedByUid: null,
      status: 'waiting',
      lastActivityAt: new Date(),
    });
    console.log(`PASS ${game}: two anonymous clients joined, both confirmed readiness, and both read the shared move.`);
  }
} finally {
  await cleanup();
}
