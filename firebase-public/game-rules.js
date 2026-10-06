const TTT_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

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
