import { seededShuffle } from './game-rules.js';

// Source: original German question bank in Android I18n.getTriviaQuestions.
// Keep source order and the correct answer index aligned with the Android bank.
const QUESTIONS = [
  ["Welche Farbe entsteht aus Blau + Gelb?", ["Grün", "Lila", "Orange"], 0],
  ["Wie viele Ecken hat ein Sechseck?", ["5", "6", "8"], 1],
  ["Welcher Planet wird 'Roter Planet' genannt?", ["Mars", "Venus", "Jupiter"], 0],
  ["Was ergibt 14 + 19?", ["31", "33", "35"], 1],
  ["Welches Tier ist das größte der Erde?", ["Elefant", "Blauwal", "Giraffe"], 1],
  ["Welches Gas atmen Pflanzen bei der Fotosynthese ein?", ["Sauerstoff", "CO2", "Stickstoff"], 1],
  ["Auf welchem Kontinent liegt Ägypten?", ["Asien", "Afrika", "Europa"], 1],
  ["Wie viele Minuten haben 2,5 Stunden?", ["120", "150", "160"], 1],
  ["Bei wie viel Grad kocht Wasser auf Meereshöhe?", ["90°C", "100°C", "110°C"], 1],
  ["Welches Organ pumpt Blut durch den Körper?", ["Gehirn", "Herz", "Lunge"], 1],
  ["Wie heißt die Hauptstadt von Frankreich?", ["Paris", "Lyon", "Marseille"], 0],
  ["Wie viele Kontinente gibt es auf der Erde?", ["5", "6", "7"], 2],
  ["Welches chemische Element hat das Symbol 'O'?", ["Sauerstoff", "Gold", "Silber"], 0],
  ["Was ist das schnellste Landtier?", ["Löwe", "Gepard", "Pferd"], 1],
  ["Wie viele Knochen hat ein erwachsener Mensch?", ["180", "206", "230"], 1],
  ["Wie viele Zähne hat ein erwachsener Mensch normalerweise?", ["28", "30", "32"], 2],
  ["Welche Einheit misst elektrische Spannung?", ["Volt", "Ampere", "Watt"], 0],
  ["Wie viele Millimeter sind 1,5 Meter?", ["150", "1500", "15000"], 1],
  ["In welcher Stadt steht das Kolosseum?", ["Athen", "Rom", "Madrid"], 1],
  ["Welcher Ozean ist der größte der Erde?", ["Atlantik", "Pazifik", "Indischer"], 1],
  ["Was ergibt 7 x 8?", ["54", "56", "58"], 1],
  ["Wer malte die berühmte 'Mona Lisa'?", ["Da Vinci", "Picasso", "Van Gogh"], 0],
  ["Wie heißt das härteste natürliche Material?", ["Titan", "Diamant", "Quarz"], 1],
  ["Wie viele Sekunden hat eine Stunde?", ["1800", "3600", "7200"], 1],
  ["Welche Währung hat Japan?", ["Yen", "Won", "Dollar"], 0],
  ["Aus wie vielen Spielern besteht ein Fußballteam auf dem Feld?", ["10", "11", "12"], 1],
  ["Welcher Planet hat die auffälligsten Ringe?", ["Saturn", "Jupiter", "Neptun"], 0],
  ["Wie nennt man gefrorenes Wasser?", ["Eis", "Dampf", "Tau"], 0],
  ["Was ist das chemische Symbol für Gold?", ["Au", "Ag", "Fe"], 0],
  ["Wie viele Planeten hat unser Sonnensystem?", ["7", "8", "9"], 1],
  ["Welche Farbe hat eine reife Banane?", ["Gelb", "Rot", "Blau"], 0],
  ["Wie viele Beine hat eine Spinne?", ["6", "8", "10"], 1],
  ["Welches Land hat die Form eines Stiefels?", ["Spanien", "Italien", "Griechenland"], 1],
  ["Wie heißt die Hauptstadt von Spanien?", ["Barcelona", "Madrid", "Sevilla"], 1],
  ["Was ist der kleinste Vogel der Welt?", ["Spatz", "Kolibri", "Meise"], 1],
  ["Wie viele Tage hat ein Schaltjahr?", ["365", "366", "364"], 1],
  ["Aus welchem Land stammt Pizza ursprünglich?", ["Frankreich", "Italien", "USA"], 1],
  ["Was ist das Symbol für Wasserstoff im Periodensystem?", ["H", "He", "W"], 0],
  ["Welche Währung wird im Vereinigten Königreich verwendet?", ["Euro", "Pfund", "Dollar"], 1],
  ["Wie viele Streifen hat die Flagge der USA?", ["11", "13", "15"], 1],
  ["Welche Stadt wird 'Big Apple' genannt?", ["Los Angeles", "New York", "Chicago"], 1],
  ["Wer schrieb das Theaterstück 'Hamlet'?", ["Shakespeare", "Dickens", "Twain"], 0],
  ["Welches Metall ist bei Raumtemperatur flüssig?", ["Blei", "Quecksilber", "Zinn"], 1],
  ["Wie viele Seiten hat ein Dreieck?", ["3", "4", "5"], 0],
  ["Welcher Planet ist der Sonne am nächsten?", ["Venus", "Merkur", "Erde"], 1],
];

export const quizQuestions = seed => seededShuffle(QUESTIONS, seed).slice(0, 5)
  .map(([prompt, options, correctIndex]) => ({ prompt, options, correctIndex }));

export function quizDuelState(moves, matchId, localUid, seed) {
  const scoped = moves.filter(move => move.game === 'code_breaker' && move.matchId === matchId);
  const resetIndex = scoped.findLastIndex(move => move.type === 'reset');
  const answers = scoped.slice(resetIndex + 1).filter(move => move.type === 'answer');
  const own = answers.filter(move => move.playerUid === localUid);
  const other = answers.filter(move => move.playerUid !== localUid);
  const questions = quizQuestions(seed);
  const questionIndex = Math.min(own.length, other.length, questions.length);
  const score = list => list.reduce((total, move, index) => total + (Number(move.payload?.answerIndex) === questions[index]?.correctIndex ? 1 : 0), 0);
  return {
    answers, own, other, questions, questionIndex,
    answeredCurrent: own.length > questionIndex,
    score: score(own), otherScore: score(other),
    complete: own.length >= questions.length && other.length >= questions.length,
  };
}
