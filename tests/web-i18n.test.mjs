import test from 'node:test';
import assert from 'node:assert/strict';
import { initialWebLanguage, installWebLocalization, normalizeWebLanguage, translateWebText } from '../firebase-public/web-i18n.js';
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

test('Firebase sign-in delay and retry messages are available in all supported languages', () => {
  const timeoutCopy = 'Die Verbindung dauert zu lange. Prüfe dein Internet und verbinde dich erneut.';
  const retryCopy = 'NEU VERBINDEN';
  assert.equal(translateWebText(timeoutCopy, 'de'), timeoutCopy);
  assert.equal(translateWebText(retryCopy, 'de'), retryCopy);
  for (const language of ['de', 'en', 'es', 'fr', 'it']) {
    const timeoutText = translateWebText(timeoutCopy, language);
    const retryText = translateWebText(retryCopy, language);
    assert.ok(timeoutText.length > 15, `${language} timeout copy`);
    assert.ok(retryText.length > 5, `${language} retry copy`);
    if (language !== 'de') {
      assert.notEqual(timeoutText, timeoutCopy, `${language} timeout copy`);
      assert.notEqual(retryText, retryCopy, `${language} retry copy`);
    }
  }
});

test('attribute localization is idempotent and does not feed its own mutation observer', () => {
  const previousObserver = globalThis.MutationObserver;
  const observers = [];
  globalThis.MutationObserver = class {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() {}
    disconnect() {}
  };
  const attributes = new Map([['placeholder', 'Dein Nickname']]);
  let attributeWrites = 0;
  const input = {
    nodeType: 1,
    childNodes: [],
    hasAttribute: name => attributes.has(name),
    getAttribute: name => attributes.get(name) ?? null,
    setAttribute: (name, value) => { attributeWrites++; attributes.set(name, value); },
  };
  const body = { nodeType: 1, childNodes: [input], hasAttribute: () => false, getAttribute: () => null, setAttribute() {} };
  const documentRef = { body, documentElement: {}, title: 'Kavorenza' };
  const select = { addEventListener() {}, value: '' };
  const values = new Map([['kavorenza_language', 'en']]);
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  try {
    installWebLocalization(documentRef, select, storage, ['en-US']);
    assert.equal(input.getAttribute('placeholder'), 'Your nickname');
    const writesAfterInitialTranslation = attributeWrites;
    observers.at(-1).callback([{ type: 'attributes', target: input }]);
    assert.equal(attributeWrites, writesAfterInitialTranslation, 'observer pass must not rewrite an already translated attribute');
  } finally {
    if (previousObserver === undefined) delete globalThis.MutationObserver;
    else globalThis.MutationObserver = previousObserver;
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

test('browser lobby advertises the complete 23-game catalogue in every locale', () => {
  const source = 'Alle 23 Mini-Spiele sind im Browser spielbar.';
  const expected = {
    de: source,
    en: 'All 23 mini-games are playable in the browser.',
    es: 'Los 23 minijuegos están disponibles en el navegador.',
    fr: 'Les 23 mini-jeux sont jouables dans le navigateur.',
    it: 'Tutti i 23 minigiochi sono disponibili nel browser.'
  };
  for (const [language, copy] of Object.entries(expected)) {
    assert.equal(translateWebText(source, language), copy);
  }
});

test('text translations preserve surrounding whitespace and unknown dynamic copy safely', () => {
  assert.equal(translateWebText('  RAUM ERSTELLEN  ', 'fr'), '  CRÉER UNE SALLE  ');
  assert.equal(translateWebText('unmapped dynamic error', 'es'), 'unmapped dynamic error');
});

test('general settings and audio labels are localized in all five supported languages', () => {
  const labels = {
    de: ['⚙ Einstellungen', 'Einstellungen', 'Sprache', '♫ Musik aus', '♪ Effekte aus', 'Schließen'],
    en: ['⚙ Settings', 'Settings', 'Language', '♫ Music off', '♪ Effects off', 'Close'],
    es: ['⚙ Ajustes', 'Ajustes', 'Idioma', '♫ Música apagada', '♪ Efectos apagados', 'Cerrar'],
    fr: ['⚙ Réglages', 'Réglages', 'Langue', '♫ Musique coupée', '♪ Effets coupés', 'Fermer'],
    it: ['⚙ Impostazioni', 'Impostazioni', 'Lingua', '♫ Musica disattivata', '♪ Effetti disattivati', 'Chiudi']
  };
  for (const [language, expected] of Object.entries(labels)) {
    const source = ['⚙ Einstellungen', 'Einstellungen', 'Sprache', '♫ Musik aus', '♪ Effekte aus', 'Schließen'];
    assert.deepEqual(source.map(text => translateWebText(text, language)), expected);
  }
});

test('Switchstorm catalogue copy explains the grid-flip mechanic in all five languages', () => {
  const source='Schalte das 3×3-Lichtraster aus; jeder Schalter kippt sich und seine Nachbarn.';
  const expected={
    de:source,
    en:'Clear the 3×3 light grid; each switch flips itself and its neighbors.',
    es:'Apaga la cuadrícula 3×3; cada interruptor cambia su luz y la de sus vecinos.',
    fr:'Éteins la grille 3×3 ; chaque interrupteur inverse sa case et ses voisines.',
    it:'Spegni la griglia 3×3; ogni interruttore cambia la sua luce e quella dei vicini.'
  };
  for(const [language,copy] of Object.entries(expected)) assert.equal(translateWebText(source,language),copy);
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
    'Beide Wahlen werden jetzt aufgedeckt.',
    'Dein Mitspieler hält — halte jetzt ebenfalls!',
    'Dein Mitspieler ist am Zug',
    'Dein Zug',
    'Deine Antwort bleibt verborgen, bis beide geantwortet haben.',
    'Deine Wahl ist geheim · warte auf den Mitspieler',
    'Die andere Person ist am Zug.',
    'Du bist am Zug.',
    'Du bist dran.',
    'Du gewinnst diese Runde!',
    'Runde beendet',
    'Wahl gespeichert · warte auf Mitspieler',
    'Warte auf den Zug.',
    'Wählt die Rechnung, deren Ergebnis dem Ziel am nächsten liegt.',
    'Wählt eure Antwort. Sobald beide geantwortet haben, geht es gemeinsam weiter.',
    'Zug-Timeout: 45 Sekunden. Bei Verbindungsverlust verbindet sich der Browser automatisch erneut.',
    'kurze Runde · bei Abbruch könnt ihr jederzeit zurück',
    'Beide halten gleichzeitig. Das Ergebnis wird zufällig gewählt.',
    'NEUE RUNDE',
    'NOCHMAL',
    'NOCHMAL SPIELEN',
    'RUNDE BEENDET',
    'MITSPIELER GEWINNT!',
    'UNENTSCHIEDEN',
    'ZEIT ABGELAUFEN',
    '⏳ WARTEN',
    '⚡ BEREIT?',
    '⚡ JETZT TIPPEN',
    '⚡ JETZT!',
    '🏆 GEWONNEN',
    '💥 BOOM · BOMBE EXPLODIERT',
    '💥 MITSPIELER EXPLODIERT · DU GEWINNST',
    'STEIN',
    'PAPIER',
    'SCHERE',
    '⚡ REAKTOR',
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
    ['Kappe das RED-Kabel · Fehler 2/3', 'Coupe le câble ROUGE · erreurs 2/3'],
    ['Weitergegeben: 5 mal.', 'Passée : 5 fois.'],
    ['NOCH 4.5 SEKUNDEN', 'ENCORE 4.5 SECONDES'],
    ['START IN 3', 'DÉPART DANS 3'],
    ['⚡ 27 TAPS', '⚡ 27 TOCCHI'],
    ['Deine 19 Taps sind gespeichert · warte auf die andere Person.', 'Tes 19 taps sont enregistrés · en attente de l’autre joueur.'],
    ['Feld 5: X', 'Case 5: X'],
    ['Feld 2', 'Case 2'],
    ['Reihe 4, Spalte 7', 'Ligne 4, colonne 7'],
    ['Bereit: 1 / 2', 'Prêts : 1 / 2'],
    ['4 Weitergaben', '4 passes'],
  ];
  for (const [source, expected] of cases) {
    for (const language of ['en', 'es', 'fr', 'it']) assert.ok(!translateWebText(source, language).includes('undefined'), `${language}: ${source}`);
    const language = ['Ouverture', 'Bonnes', 'Manche', 'Tu gagnes', 'L’autre', 'Coupe', 'Passée', 'ENCORE', 'DÉPART', 'Case', 'Ligne', 'Tes ', 'Prêts'].some(prefix => expected.startsWith(prefix)) ? 'fr' : expected.startsWith('4 passes') ? 'en' : 'it';
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

test('live queue and mini-game result statuses stay localized while values remain intact', () => {
  const cases = [
    ['Du bist in der Warteschlange', 'You’re in the queue'],
    ['Warteposition wird ermittelt …', 'Finding your place in the queue …'],
    ['Geschätzte Zeit wird nach einigen abgeschlossenen Partien angezeigt. Aktualisierung etwa alle 15 Sekunden.', 'An estimate will appear after a few matches finish. Updates about every 15 seconds.'],
    ['Spieler gefunden!', 'Player found!'],
    ['Gemeinsamer Raum wird vorbereitet …', 'Preparing your shared room …'],
    ['Du kannst die Suche jederzeit abbrechen.', 'You can cancel the search at any time.'],
    ['Spielersuche beendet', 'Player search ended'],
    ['Deine Warteschlangen-Sitzung ist nicht mehr aktiv.', 'Your queue session is no longer active.'],
    ['Spielersuche gerade nicht erreichbar. Deine Position wird nicht behauptet.', 'Player search is temporarily unavailable. No queue position is being claimed.'],
    ['Unentschieden!', 'It’s a tie!'],
    ['Wählt gleichzeitig.', 'Choose at the same time.'],
    ['15 Sekunden pro Rätsel · 5 Rätsel', '15 seconds per puzzle · 5 puzzles'],
    ['Bereit: 1 / 2', 'Ready: 1 / 2'],
    ['RÄTSEL 3/5 · 9s', 'PUZZLE 3/5 · 9s'],
    ['Du 4/5 · Mitspieler 2/5', 'You 4/5 · Opponent 2/5'],
  ];
  for (const [source, english] of cases) {
    assert.equal(translateWebText(source, 'en'), english, source);
    for (const language of ['es', 'fr', 'it']) {
      assert.notEqual(translateWebText(source, language), source, `${language}: ${source}`);
    }
  }
});

test('room stages, player badges, and voting summary translate their embedded game titles', () => {
  const stages = {
    WARTERAUM: 'WAITING ROOM',
    SPIELAUSWAHL: 'GAME SELECTION',
    ANLEITUNG: 'TUTORIAL',
    'RUNDE LÄUFT': 'MATCH IN PROGRESS',
    BEENDET: 'FINISHED',
    'SPIELER 2': 'PLAYER 2',
  };
  for (const [source, expected] of Object.entries(stages)) assert.equal(translateWebText(source, 'en'), expected);
  assert.equal(translateWebText('Deine Wahl: Speed Quiz Duell · Gegenstimme offen', 'fr'), 'Ton vote : Duel quiz · en attente du vote adverse');
  assert.equal(translateWebText('Deine Wahl: noch offen · Gegenstimme offen', 'es'), 'Tu voto: sin elegir · falta el voto rival');
});

test('all twenty-three short game tutorials are translated in every supported language', () => {
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
    'Wählt eine Seite und vergleicht anschließend eure Antworten.',
    'Drehe vier Spiegel, um den Laser um den mittleren Blocker zum Empfänger zu leiten.',
    'Löse das 3×3-Lichtraster: Jeder Schalter kippt sich und seine Nachbarn. Schalte alle Lichter aus und bestätige.',
    'Drehe die Form in 90°-Schritten, bis sie zur Ziel-Silhouette passt.',
    'Wähle Zug für Zug den sicheren Weg durch das Labyrinth.',
    'Halte die Wippe mit dem passenden Gewicht im Gleichgewicht.',
    'Sortiere jede Kiste in den passenden Frachtraum.',
    'Löse ein 4×4-Nonogramm anhand von Zeilen- und Spaltenhinweisen.',
    'Merke dir die Lichtfolge und wiederhole sie.',
    'Lenke die Sonde mit einem Impuls in die sichere Umlaufbahn.',
    'Wähle den Schub, der den Kometen am Ziel landen lässt.'
  ];
  assert.equal(tutorials.length, 23);
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
