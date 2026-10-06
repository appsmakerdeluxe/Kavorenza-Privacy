export const MEMORY_TURN_TIMEOUT_SECONDS = 15;

const TTT_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];
const DILEMMAS = [
  ['Nie wieder Pizza essen','Nie wieder Burger essen'], ['Fliegen können','Unsichtbar sein können'],
  ['Immer 10 Minuten zu früh sein','Immer 20 Minuten zu spät sein'], ['Gedanken lesen können','In die Zukunft sehen'],
  ['1 Jahr ohne Smartphone leben','1 Jahr ohne Freunde treffen'], ['Auf einer einsamen Insel stranden','In einer Zombie-Apokalypse leben'],
  ['Jedes Geheimnis von allen kennen','Dass niemand je dein Geheimnis erfährt'], ['Für immer Hochsommer mit 35 °C','Für immer Winter mit Schnee bei −5 °C'],
  ['Superstark sein','Superschnell sein'], ['Immer die Wahrheit sagen müssen','Niemals mehr sprechen können'],
  ['Weltberühmter Rockstar sein','Geheimer Multimillionär sein'], ['Nur noch rückwärts laufen','Nur noch auf einem Bein hüpfen'],
  ['Einen extremen Bungee-Sprung wagen','Mit Haien tauchen'], ['Alles schmeckt nach Schokolade','Alles schmeckt nach Pommes'],
  ['Die Zeit komplett anhalten können','Die Zeit 10 Minuten zurückdrehen können'], ['500.000 € sofort bekommen','Jeden Tag lebenslang 150 € bekommen'],
  ['Nie wieder schlafen müssen','Nie wieder arbeiten müssen'], ['Mit allen Tieren sprechen können','Alle Sprachen fließend sprechen'],
  ['Für immer kostenlos überallhin fliegen','Für immer kostenlos in jedem Restaurant essen'], ['Nie wieder Sonnenbrand bekommen','Nie wieder Mückenstiche bekommen'],
  ['Nie wieder Musik hören','Nie wieder Filme oder Serien schauen'], ['Immer wissen, wenn dich jemand anlügt','Perfekt lügen können'],
  ['Ein Jahr ins All fliegen','Ein Jahr auf dem Meeresgrund leben'], ['Überallhin teleportieren können','Gegenstände mit Gedanken bewegen können'],
  ['Immer 100 % Akku auf allen Geräten haben','Überall ultraschnelles Gratis-WLAN haben'], ['Immer barfuß laufen müssen','Immer einen Wintermantel tragen müssen'],
  ['Jeden Tag deinen Lieblingssong hören','Nie wieder Musik mit Gesang hören'], ['10 Jahre in die Vergangenheit reisen','20 Jahre in die Zukunft reisen'],
  ['Ab 25 nie wieder körperlich altern','Jedes Buch sofort auswendig können'], ['Die Gedanken deines Partners hören','Dein Partner hört immer deine Gedanken'],
  ['Für immer auf Kaffee verzichten','Für immer auf Schokolade verzichten'], ['Ein berühmter Erfinder sein','Ein gefeierter Sport-Champion sein'],
  ['Für immer in einem Luxushotel wohnen','Ein riesiges Haus im abgelegenen Wald haben'], ['Niemals mehr frieren','Niemals mehr schwitzen'],
  ['Unter Wasser atmen können','Mit 200 km/h rennen können'], ['Dein Haustier kann sprechen','Die Gefühle aller Menschen spüren'],
];

// Must match GameRules.SeededRandom and GameRules.seededShuffle on Android.

export function seededIndices(seed, count, bound) {
  if (!Number.isInteger(count) || count < 0 || !Number.isInteger(bound) || bound <= 0) throw new RangeError('count and bound must be positive integers');
  let state = seed | 0;
  return Array.from({ length: count }, () => {
    state = Math.imul(state, 1664525) + 1013904223 | 0;
    return Math.floor(((state >>> 0) * bound) / 0x1_0000_0000);
  });
}

export function seededShuffle(values, seed) {
  const shuffled = [...values];
  let state = seed | 0;
  for (let index = shuffled.length - 1; index > 0; index--) {
    state = Math.imul(state, 1664525) + 1013904223 | 0;
    const other = Math.floor(((state >>> 0) * (index + 1)) / 0x1_0000_0000);
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  return shuffled;
}

export function numberTargetPuzzle(seed, round) {
  let state = (seed ^ Math.imul(round, 0x45D9F3B)) | 0;
  const nextInt = bound => {
    state = Math.imul(state, 1664525) + 1013904223 | 0;
    return Math.floor(((state >>> 0) * bound) / 0x1_0000_0000);
  };
  const target = nextInt(16) + 9;
  const expressions = new Map();
  for (let a = 2; a <= 12; a++) for (let b = 2; b <= 12; b++) {
    expressions.set(`${a} + ${b} = ${a + b}`, a + b);
    if (a > b) expressions.set(`${a} − ${b} = ${a - b}`, a - b);
    expressions.set(`${a} × ${b} = ${a * b}`, a * b);
  }
  const ranked = [...expressions].map(([expression, result]) => ({ expression, result }))
    .sort((left, right) => Math.abs(left.result - target) - Math.abs(right.result - target) || (left.expression < right.expression ? -1 : left.expression > right.expression ? 1 : 0));
  const best = ranked[0];
  const distractors = ranked.slice(1).map((_, index, items) => index);
  for (let index = distractors.length - 1; index > 0; index--) {
    const other = nextInt(index + 1);
    [distractors[index], distractors[other]] = [distractors[other], distractors[index]];
  }
  const options = [best, ...distractors.slice(0, 3).map(index => ranked[index + 1])];
  for (let index = options.length - 1; index > 0; index--) {
    const other = nextInt(index + 1);
    [options[index], options[other]] = [options[other], options[index]];
  }
  return { target, options, bestExpression: best.expression };
}

export function colorRushRounds(isGerman, seed) {
  const labels = isGerman
    ? ['CYAN TIPPEN', 'PINK TIPPEN', 'MINZE TIPPEN', 'BERNSTEIN TIPPEN', 'VIOLETT TIPPEN']
    : ['TAP CYAN', 'TAP PINK', 'TAP MINT', 'TAP AMBER', 'TAP VIOLET'];
  const colors = ['CYAN', 'PINK', 'MINT', 'AMBER', 'VIOLET'];
  return seededIndices(seed, 5, labels.length).map(index => [labels[index], colors[index]]);
}

export function wordSprintRounds(isGerman, seed) {
  const rounds = isGerman
    ? [['NACHT', ['NACHT', 'LICHT', 'RAUM', 'DUELL']], ['BLITZ', ['DONNER', 'BLITZ', 'REGEN', 'SONNE']], ['STERN', ['MOND', 'STERN', 'SONNE', 'PLANET']], ['FEUER', ['WASSER', 'FEUER', 'ERDE', 'LUFT']], ['SIEG', ['SPIEL', 'RUNDE', 'SIEG', 'PUNKT']]]
    : [['NIGHT', ['NIGHT', 'LIGHT', 'SPACE', 'DUEL']], ['FLASH', ['THUNDER', 'FLASH', 'RAIN', 'SOLAR']], ['STAR', ['MOON', 'STAR', 'SUN', 'PLANET']], ['FIRE', ['WATER', 'FIRE', 'EARTH', 'WIND']], ['VICTORY', ['MATCH', 'ROUND', 'VICTORY', 'POINT']]];
  return seededShuffle(rounds, seed);
}

export function emojiMemoryBoard(seed) {
  return seededShuffle(['⚡', '⚡', '🌟', '🌟', '🔥', '🔥', '💎', '💎', '👾', '👾', '🚀', '🚀'], seed);
}

export function arcadeRunState(moves, game, matchId, localUid) {
  const picks = currentRound(moves, game, matchId).filter(move => move.type === 'pick');
  const own = picks.filter(move => move.playerUid === localUid);
  const other = picks.filter(move => move.playerUid !== localUid);
  const scoreOf = list => list.reduce((total, move) => total + (Number(move.payload?.value?.split?.(';')?.[1]) || 0), 0);
  return { own, other, round: own.length, ownScore: scoreOf(own), otherScore: scoreOf(other), complete: own.length >= 5 && other.length >= 5 };
}

export function emojiMemoryState(moves, matchId, roomCode, hostUid, guestUid, localUid) {
  const board = emojiMemoryBoard(kotlinStringHash(roomCode || 'KAVO'));
  const picks = currentRound(moves, 'emoji_memory', matchId).filter(move => move.type === 'pick');
  const matched = new Set();
  let nextPlayerUid = hostUid;
  let visible = [];
  let turns = 0;
  let hostPairs = 0, guestPairs = 0;
  for (const pick of picks) {
    const value = pick.payload?.value || '';
    if (value === 'TIMEOUT' && pick.playerUid === nextPlayerUid) {
      nextPlayerUid = nextPlayerUid === hostUid ? guestUid : hostUid;
      visible = [];
      continue;
    }
    if (value.startsWith('TIMEOUT:')) {
      if (value.slice('TIMEOUT:'.length) !== nextPlayerUid || ![hostUid, guestUid].includes(pick.playerUid)) continue;
      nextPlayerUid = nextPlayerUid === hostUid ? guestUid : hostUid;
      visible = [];
      continue;
    }
    if (pick.playerUid !== nextPlayerUid) continue;
    const cells = value.replace(/^pair:/, '').split(',').map(Number);
    if (cells.length !== 2 || cells.some(index => !Number.isInteger(index) || index < 0 || index >= board.length || matched.has(index)) || cells[0] === cells[1]) continue;
    turns++;
    visible = cells;
    if (board[cells[0]] === board[cells[1]]) {
      cells.forEach(index => matched.add(index));
      if (pick.playerUid === hostUid) hostPairs++; else guestPairs++;
    } else nextPlayerUid = nextPlayerUid === hostUid ? guestUid : hostUid;
  }
  const ownPairs = localUid === hostUid ? hostPairs : guestPairs;
  const otherPairs = localUid === hostUid ? guestPairs : hostPairs;
  return { board, picks, matched: [...matched], visible, nextPlayerUid, ownPairs, otherPairs, turns, complete: matched.size === 12 || turns >= 24 };
}

function kotlinStringHash(value) {
  let hash = 0;
  for (const char of value) hash = Math.imul(hash, 31) + char.codePointAt(0) | 0;
  return hash;
}

function currentRound(moves, game, matchId) {
  const scoped = moves.filter(move => move.game === game && move.matchId === matchId);
  const reset = scoped.findLastIndex(move => move.type === 'reset');
  return scoped.slice(reset + 1);
}

export function ticTacToeState(moves, matchId, hostUid, guestUid) {
  const actions = currentRound(moves, 'tic_tac_toe', matchId)
    .filter(move => move.type === 'move' || move.type === 'timeout');
  const board = Array(9).fill('');
  actions.forEach((move, index) => {
    const cell = Number(move.payload?.cell);
    if (move.type === 'move' && Number.isInteger(cell) && cell >= 0 && cell < 9 && !board[cell]) {
      board[cell] = index % 2 ? 'O' : 'X';
    }
  });
  const winningLine = TTT_LINES.find(line => board[line[0]] && line.every(cell => board[cell] === board[line[0]])) || null;
  const winner = winningLine ? board[winningLine[0]] : null;
  return {
    actions: actions.length,
    board,
    winningLine,
    winner,
    draw: !winner && board.every(Boolean),
    currentPlayerUid: actions.length % 2 ? guestUid : hostUid,
  };
}

export function connectFourState(moves, matchId, hostUid, guestUid) {
  const actions = currentRound(moves, 'connect_four', matchId)
    .filter(move => move.type === 'move' || move.type === 'timeout');
  const board = Array(42).fill(0);
  actions.forEach((move, index) => {
    const column = Number(move.payload?.column);
    if (move.type !== 'move' || !Number.isInteger(column) || column < 0 || column > 6) return;
    for (let row = 5; row >= 0; row--) {
      const cell = row * 7 + column;
      if (board[cell] === 0) {
        board[cell] = index % 2 ? 2 : 1;
        break;
      }
    }
  });
  let winningCells = null;
  for (let row = 0; row < 6 && !winningCells; row++) {
    for (let column = 0; column < 7 && !winningCells; column++) {
      for (const [dr, dc] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
        const endRow = row + dr * 3, endColumn = column + dc * 3;
        if (endRow < 0 || endRow >= 6 || endColumn < 0 || endColumn >= 7) continue;
        const line = Array.from({ length: 4 }, (_, index) => (row + dr * index) * 7 + column + dc * index);
        if (board[line[0]] !== 0 && line.every(cell => board[cell] === board[line[0]])) {
          winningCells = line;
          break;
        }
      }
    }
  }
  const winner = winningCells ? board[winningCells[0]] : 0;
  return {
    actions: actions.length,
    board,
    winningCells,
    winner,
    draw: winner === 0 && board.every(cell => cell !== 0),
    currentPlayerUid: actions.length % 2 ? guestUid : hostUid,
  };
}

export function rockPaperState(moves, matchId, localUid) {
  const picks = currentRound(moves, 'rock_paper', matchId).filter(move => move.type === 'pick');
  const mine = picks.findLast(move => move.playerUid === localUid)?.payload?.value ?? null;
  const theirs = picks.findLast(move => move.playerUid !== localUid)?.payload?.value ?? null;
  let winner = null;
  if (mine !== null && theirs !== null) {
    if (mine === theirs) winner = 0;
    else if (mine === 'TIMEOUT') winner = 2;
    else if (theirs === 'TIMEOUT') winner = 1;
    else if (mine === 'ROCK') winner = theirs === 'GLOW' || theirs === 'SCISSORS' ? 1 : 2;
    else if (mine === 'PAPER') winner = theirs === 'ROCK' ? 1 : 2;
    else winner = theirs === 'PAPER' ? 1 : 2;
  }
  return { picks, mine, theirs, winner, complete: mine !== null && theirs !== null };
}

export function chooserState(moves, matchId) {
  const events = currentRound(moves, 'chooser', matchId)
    .filter(move => move.type === 'hold' || move.type === 'release' || move.type === 'decide');
  const latest = new Map();
  for (const move of events) {
    if (move.type === 'hold' || move.type === 'release') latest.set(move.playerUid, move);
  }
  const heldUids = [...latest.values()].filter(move => move.type === 'hold').map(move => move.playerUid);
  const decision = events.findLast(move => move.type === 'decide') || null;
  return { heldUids, bothHolding: heldUids.length === 2, winnerUid: decision?.payload?.winnerUid || null };
}

export function reflexState(moves, matchId, hostUid, guestUid) {
  const round = currentRound(moves, 'reflex', matchId);
  const readyUids = [...new Set(round.filter(move => move.type === 'ready').map(move => move.playerUid))];
  const goMove = round.find(move => move.type === 'go') || null;
  const goTime = Number(goMove?.payload?.time) || 0;
  const taps = round.filter(move => move.type === 'tap');
  const tapByPlayer = new Map();
  for (const tap of taps) if (!tapByPlayer.has(tap.playerUid)) tapByPlayer.set(tap.playerUid, tap);
  const tapFor = (playerUid) => tapByPlayer.get(playerUid) || null;
  const hostTap = tapFor(hostUid), guestTap = tapFor(guestUid);
  const hostFalseStart = hostTap?.payload?.falseStart === true;
  const guestFalseStart = guestTap?.payload?.falseStart === true;
  const reaction = (tap) => {
    const time = Number(tap?.payload?.time);
    return goTime > 0 && Number.isFinite(time) && time >= goTime ? time - goTime : null;
  };
  const hostMs = reaction(hostTap), guestMs = reaction(guestTap);
  let winnerUid = null, isTie = false;
  if (hostFalseStart && guestFalseStart) isTie = true;
  else if (hostFalseStart) winnerUid = guestUid;
  else if (guestFalseStart) winnerUid = hostUid;
  else if (hostMs !== null && guestMs !== null) winnerUid = hostMs === guestMs ? null : hostMs < guestMs ? hostUid : guestUid;
  else if (hostMs !== null) winnerUid = hostUid;
  else if (guestMs !== null) winnerUid = guestUid;
  return {
    readyUids,
    goTime,
    hostMs,
    guestMs,
    hostFalseStart,
    guestFalseStart,
    winnerUid,
    isTie,
    phase: taps.length ? 'finished' : goMove ? 'go' : readyUids.length ? 'waiting' : 'idle',
  };
}

export function dilemmaState(moves, matchId, roomCode, localUid) {
  const roundMoves = currentRound(moves, 'dilemma', matchId);
  const roundAdvances = roundMoves.filter(move => move.type === 'next').length;
  const lastAdvance = roundMoves.findLastIndex(move => move.type === 'next');
  const currentMoves = roundMoves.slice(lastAdvance + 1);
  const picks = currentMoves.filter(move => move.type === 'pick');
  const mine = picks.findLast(move => move.playerUid === localUid)?.payload?.choice ?? null;
  const theirs = picks.findLast(move => move.playerUid !== localUid)?.payload?.choice ?? null;
  const seed = Math.abs(kotlinStringHash(roomCode || ''));
  const dilemma = DILEMMAS[(seed + roundAdvances) % DILEMMAS.length];
  return { round: roundAdvances, optionA: dilemma[0], optionB: dilemma[1], mine, theirs, complete: mine !== null && theirs !== null, match: mine !== null && theirs !== null && mine === theirs };
}

export function bombPartyState(moves, matchId, roomCode, hostUid, guestUid, localUid, now = Date.now(), roomStartedAt = now) {
  const scoped = moves.filter(move => move.game === 'bomb_party' && move.matchId === matchId);
  const resetIndex = scoped.findLastIndex(move => move.type === 'reset');
  const roundMoves = scoped.slice(resetIndex + 1);
  const passMoves = roundMoves.filter(move => move.type === 'pass');
  const explosion = roundMoves.find(move => move.type === 'explode') || null;
  const passes = passMoves.length;
  const currentUid = passes % 2 === 0 ? hostUid : guestUid;
  const seed = Math.abs(kotlinStringHash(roomCode || ''));
  const wireIndex = (seed + passes * 3 + 1) % 4;
  const wire = ['RED', 'BLUE', 'YELLOW', 'GREEN'][wireIndex];
  const durationMs = Math.max(4500, 16000 - Math.min(passes * 800, 9500));
  const lastPassTime = passMoves.at(-1)?.createdAt?.toMillis?.() || passMoves.at(-1)?.createdAt || 0;
  const resetTime = scoped[resetIndex]?.createdAt?.toMillis?.() || scoped[resetIndex]?.createdAt || 0;
  const startedAt = Number(lastPassTime) || Number(resetTime) || roomStartedAt;
  const remainingMs = Math.max(0, durationMs - Math.max(0, now - startedAt));
  const explodedUid = explosion?.payload?.exploderUid || explosion?.playerUid || null;
  const winnerUid = explodedUid ? explodedUid === hostUid ? guestUid : hostUid : null;
  return { passMoves, passes, currentUid, isMyTurn: currentUid === localUid, wire, durationMs, remainingMs, explosion, explodedUid, winnerUid, roundToken: scoped[resetIndex]?.id || 'initial' };
}

export function cyberTapState(moves, matchId, hostUid, guestUid) {
  const picks = currentRound(moves, 'cyber_tap', matchId).filter(move => move.type === 'pick');
  const hostTaps = Number(picks.findLast(move => move.playerUid === hostUid)?.payload?.value);
  const guestTaps = Number(picks.findLast(move => move.playerUid === guestUid)?.payload?.value);
  const mine = Number.isFinite(hostTaps) ? hostTaps : null;
  const theirs = Number.isFinite(guestTaps) ? guestTaps : null;
  const winnerUid = mine !== null && theirs !== null ? mine === theirs ? null : mine > theirs ? hostUid : guestUid : null;
  return { picks, hostTaps: mine, guestTaps: theirs, winnerUid, complete: mine !== null && theirs !== null, draw: mine !== null && theirs !== null && mine === theirs };
}
