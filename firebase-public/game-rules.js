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
