import test from 'node:test';
import assert from 'node:assert/strict';
import { initialWebLanguage, normalizeWebLanguage, translateWebText } from '../firebase-public/web-i18n.js';
import { quizQuestions } from '../firebase-public/quiz-data.js';

test('browser language preference is saved first, then follows the device across supported locales', () => {
  assert.equal(initialWebLanguage('fr', ['de-DE']), 'fr');
  assert.equal(initialWebLanguage(null, ['de-DE', 'en-US']), 'de');
  assert.equal(initialWebLanguage(null, ['es-MX']), 'es');
  assert.equal(initialWebLanguage(null, ['pt-BR']), 'en');
  assert.equal(normalizeWebLanguage('it-IT'), 'it');
  assert.equal(normalizeWebLanguage('unsupported'), 'en');
});

test('shared room and readiness copy is available in all five web languages', () => {
  const copies = {
    de: 'RAUM ERSTELLEN',
    en: 'CREATE ROOM',
    es: 'CREAR SALA',
    fr: 'CRÉER UNE SALLE',
    it: 'CREA STANZA'
  };
  for (const [language, expected] of Object.entries(copies)) {
    assert.equal(translateWebText('RAUM ERSTELLEN', language), expected);
    if (language !== 'de') {
      assert.notEqual(translateWebText('VERSTANDEN · ICH BIN BEREIT', language), 'VERSTANDEN · ICH BIN BEREIT');
      assert.notEqual(translateWebText('ERNEUT VERBINDEN', language), 'ERNEUT VERBINDEN');
    }
  }
});

test('game catalogue names and descriptions have five-language variants', () => {
  const gameNames = [
    'Tic Tac Toe', 'Reflex Duel', 'Vier Gewinnt', 'Stein Papier Glow', 'Speed Quiz Duell',
    'Zielzahl Duell', 'Farbrausch', 'Wort-Sprint', 'Emoji Memory', 'Cyber Tap Rush',
    'Reaktor-Bombe', 'Entscheidungs-Blitz', 'Entweder-Oder'
  ];
  for (const name of gameNames) {
    for (const language of ['de', 'en', 'es', 'fr', 'it']) {
      assert.ok(translateWebText(name, language).trim().length > 2, `${language} copy for ${name}`);
    }
  }
  assert.equal(translateWebText('TIC TAC TOE · NEON', 'fr'), 'MORPION · NÉON');
  assert.equal(translateWebText('So spielt ihr Vier Gewinnt', 'it'), 'Come si gioca a Forza 4');
});

test('text translations preserve surrounding whitespace and unknown dynamic copy safely', () => {
  assert.equal(translateWebText('  RAUM ERSTELLEN  ', 'fr'), '  CRÉER UNE SALLE  ');
  assert.equal(translateWebText('unmapped dynamic error', 'es'), 'unmapped dynamic error');
});

test('all thirteen short game tutorials are translated in every supported language', () => {
  const tutorials = [
    'Platziert X und O abwechselnd. Wer zuerst drei Zeichen in einer Reihe hat, gewinnt.',
    'Wartet auf das GO-Signal und tippt dann so schnell wie möglich. Bei Fake-Signalen nicht tippen.',
    'Lass deinen Chip in eine Spalte fallen. Verbinde vier Chips waagerecht, senkrecht oder diagonal.',
    'Wählt gleichzeitig geheim Stein, Papier oder Schere. Stein schlägt Schere, Schere schlägt Papier, Papier schlägt Stein.',
    'Beantwortet fünf Fragen. Richtige und schnelle Antworten bringen Punkte.',
    'Wählt die Rechnung mit dem Ergebnis, das der Zielzahl am nächsten liegt.',
    'Achtet auf das Signal und tippt die passende Farbe. Falsche Taps kosten Zeit.',
    'Lest den Hinweis und wählt das passende Wort, bevor die Zeit abläuft.',
    'Deckt abwechselnd zwei Karten auf. Ein Paar gibt einen Extrazug; sonst wechselt der Zug. Nach 15 Sekunden geht es weiter. Wer die meisten Paare sammelt, gewinnt.',
    'Tippt im kurzen Zeitfenster so oft wie möglich.',
    'Gebt die Bombe mit Pass weiter, bevor der Countdown abläuft.',
    'Beide halten gedrückt. Das Spiel bestimmt nach dem Signal zufällig, wer ausgewählt wird.',
    'Wählt eine Seite und vergleicht anschließend eure Antworten.'
  ];
  assert.equal(tutorials.length, 13);
  for (const text of tutorials) {
    for (const language of ['en', 'es', 'fr', 'it']) {
      assert.notEqual(translateWebText(text, language), text, `${language} translation missing for: ${text}`);
    }
  }
  assert.equal(translateWebText(tutorials[0], 'fr'), 'Placez X et O à tour de rôle. Le premier à en aligner trois gagne.');
});

test('quiz translations keep seeded question order and correct answer slots identical', () => {
  const baseline = quizQuestions(712, 'de');
  assert.equal(baseline.length, 5);
  for (const language of ['en', 'es', 'fr', 'it']) {
    const localized = quizQuestions(712, language);
    assert.deepEqual(localized.map(question => question.correctIndex), baseline.map(question => question.correctIndex));
    assert.deepEqual(localized.map(question => question.options.length), baseline.map(question => question.options.length));
    assert.ok(localized.every((question, index) => question.prompt !== baseline[index].prompt));
  }
  assert.deepEqual(quizQuestions(712, 'de'), baseline);
});
