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
  assert.equal(translateWebText('Tippt die passende Farbe innerhalb des Zeitlimits.', 'fr'), 'Touchez la couleur correspondante avant la fin du chrono.');
  assert.equal(translateWebText('MINZE', 'it'), 'MENTA');
});

test('text translations preserve surrounding whitespace and unknown dynamic copy safely', () => {
  assert.equal(translateWebText('  RAUM ERSTELLEN  ', 'fr'), '  CRÉER UNE SALLE  ');
  assert.equal(translateWebText('unmapped dynamic error', 'es'), 'unmapped dynamic error');
});

test('core play prompts and turn instructions are available in every locale', () => {
  const prompts = [
    'Tippe auf den Kern, um die Runde zu starten',
    'Warte auf das Signal · nicht zu früh tippen!',
    'Warte auf das Signal. Ein Tap vor GO zählt als Frühstart.',
    'Eine Person startet das Signal. Tippt danach schneller als die andere.',
    'Tippe im grünen Zeitfenster so oft wie möglich.',
    'Tippt im kurzen Reactor-Countdown so schnell wie möglich.',
    'Wählt gleichzeitig geheim Stein, Papier oder Schere.',
    'Wählt gleichzeitig. Die Wahl bleibt geheim, bis beide bestätigt haben.',
    'Wählt geheim A oder B',
    'Halte gedrückt, bis beide bereit sind.',
    'Der andere Spieler hält — halte jetzt ebenfalls!',
    'Bereite dich darauf vor, die Bombe zu übernehmen.',
    'Beide halten gleichzeitig. Das Ergebnis wird zufällig gewählt.',
    'Wähle geheim',
    'NÄCHSTES DILEMMA',
    'WARTE AUF NÄCHSTE RUNDE',
    '⏳ MITSPIELER ENTSCHÄRFT',
    '⚡ DU WURDEST AUSGEWÄHLT!',
    '⚡ MITSPIELER AUSGEWÄHLT!',
    '👇 DRÜCKEN & HALTEN',
    'Doppelter Frühstart · unentschieden.',
    'Frühstart — diesmal gewinnt dein Mitspieler.',
  ];
  for (const source of prompts) {
    for (const language of ['en', 'es', 'fr', 'it']) {
      assert.notEqual(translateWebText(source, language), source, `${language} translation missing: ${source}`);
    }
  }
});

test('dynamic scores, round counters, timers, and reconnect countdowns retain their values across locales', () => {
  const cases = [
    ['DU BIST DRAN · 12 s', 'TOCCA A TE · 12 s'],
    ['Mitspieler ist dran · 7 s', 'TURNO DELL’ALTRO GIOCATORE · 7 s'],
    ['Deine Paare: 3 · Mitspieler: 2', 'Le tue coppie: 3 · Altro giocatore: 2'],
    ['FRAGE 4/5 · 9 s', 'DOMANDA 4/5 · 9 s'],
    ['Antwort gespeichert · warte auf Mitspieler · Frage 2/5', 'Risposta salvata · in attesa dell’altro giocatore · domanda 2/5'],
    ['Runde 3 · Entscheidet euch unabhängig voneinander.', 'Manche 3 · Choisissez chacun de votre côté.'],
    ['Richtige Antworten · Du: 4/5 · Mitspieler: 3/5', 'Bonnes réponses · Toi : 4/5 · Autre joueur : 3/5'],
    ['Der andere Spieler verbindet sich neu · 18 s', 'L’altro giocatore si sta riconnettendo · 18 s'],
    ['Raum AB12CD wird geöffnet …', 'Ouverture de la salle AB12CD …'],
    ['Du gewinnst · 238 ms gegen 304 ms!', 'Tu gagnes · 238 ms contre 304 ms !'],
    ['Dein Mitspieler war schneller · 304 ms.', 'L’autre joueur a été plus rapide · 304 ms.'],
  ];
  for (const [source, expected] of cases) {
    for (const language of ['en', 'es', 'fr', 'it']) assert.notEqual(translateWebText(source, language), source, `${language}: ${source}`);
    const language = ['Ouverture', 'Bonnes', 'Manche', 'Tu gagnes', 'L’autre'].some(prefix => expected.startsWith(prefix)) ? 'fr' : 'it';
    assert.equal(translateWebText(source, language), expected);
  }
});

test('connection, nickname, room, and queue messages are translated without losing user values', () => {
  const dynamic = [
    ['Dieser Nickname war schon vergeben. Du spielst als „Luna 2“.', 'Ce pseudo était déjà pris. Tu joues sous le nom « Luna 2 ».'],
    ['Alex ist seit über zwei Minuten nicht erreichbar. Warte auf die Rückkehr oder brich die Sitzung ab.', 'Alex est injoignable depuis plus de deux minutes. Attends son retour ou annule la session.'],
    ['Warteplatz 3 von 12', 'Position 3 sur 12 dans la file'],
    ['Geschätzte Wartezeit: etwa 2 min 30 s · ungefähr alle 15 Sekunden aktualisiert', 'Attente estimée : environ 2 min 30 s · mise à jour toutes les 15 secondes'],
  ];
  for (const source of [
    'Der Raum wurde beendet oder ist abgelaufen.',
    'Deine Internetverbindung ist unterbrochen. Verbinde dich erneut oder verlasse die Sitzung.',
    'Raum nicht gefunden. Prüfe den Code und versuche es erneut.',
    'Bitte einen sechsstelligen Raumcode eingeben.',
    'Raum ist nicht mehr offen.',
    'Raum ist voll (maximal 2 Spieler).',
    'Kein freier Raumcode gefunden. Bitte erneut versuchen.',
    'Nickname konnte nicht reserviert werden.',
    'Spielersuche vorübergehend nicht verfügbar',
  ]) {
    for (const language of ['en', 'es', 'fr', 'it']) assert.notEqual(translateWebText(source, language), source);
  }
  for (const [source, expected] of dynamic) {
    for (const language of ['en', 'es', 'fr', 'it']) assert.notEqual(translateWebText(source, language), source);
    assert.equal(translateWebText(source, 'fr'), expected);
  }
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
