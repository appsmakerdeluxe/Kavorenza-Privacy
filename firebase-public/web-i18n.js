const messages = {
  pageTitle: ["Kavorenza · Mini-Game-Räume", "Kavorenza · Mini-game rooms", "Kavorenza · Salas de minijuegos", "Kavorenza · Salles de mini-jeux", "Kavorenza · Stanze mini-giochi"],
  brand: ["KAVORENZA · MINI-GAMES ZU ZWEIT", "KAVORENZA · TWO-PLAYER MINI-GAMES", "KAVORENZA · MINI JUEGOS PARA DOS", "KAVORENZA · MINI-JEUX À DEUX", "KAVORENZA · MINI-GIOCHI PER DUE"],
  language: ["Sprache", "Language", "Idioma", "Langue", "Lingua"],
  eyebrow: ["DEIN RAUM. DEINE RUNDE.", "YOUR ROOM. YOUR ROUND.", "TU SALA. TU PARTIDA.", "TA SALLE. TA MANCHE.", "LA TUA STANZA. LA TUA PARTITA."],
  homeTitle: ["Eine Person fehlt noch.", "One player is missing.", "Falta una persona.", "Il manque une personne.", "Manca una persona."],
  homeIntro: ["Kostenlos anonym spielen. Raum erstellen oder Code eingeben, gemeinsam wählen und erst starten, wenn beide bereit sind.", "Play anonymously for free. Create a room or enter a code, choose together, and start only when both players are ready.", "Juega gratis y de forma anónima. Crea una sala o introduce un código, elegid juntos y empezad cuando ambos estéis listos.", "Jouez gratuitement et anonymement. Créez une salle ou saisissez un code, choisissez ensemble et démarrez quand vous êtes prêts tous les deux.", "Gioca gratis e in modo anonimo. Crea una stanza o inserisci un codice, scegliete insieme e iniziate quando siete entrambi pronti."],
  twoPlayers: ["2 Spieler pro Raum", "2 players per room", "2 jugadores por sala", "2 joueurs par salle", "2 giocatori per stanza"],
  privacyNote: ["Keine E-Mail, Telefonnummer oder Standortdaten erforderlich. Bei einer Aktualisierung fragen wir vor dem Verlassen einer laufenden Runde.", "No email, phone number, or location data required. If you refresh during a match, we ask before leaving the session.", "No se requiere correo, teléfono ni ubicación. Si actualizas durante una partida, preguntaremos antes de salir.", "Aucune adresse e-mail, aucun numéro de téléphone ni aucune donnée de localisation requis. En cas d’actualisation pendant une partie, nous demandons confirmation avant de quitter.", "Non servono e-mail, numero di telefono o posizione. Se aggiorni durante una partita, chiediamo conferma prima di uscire."],
  authPreparing: ["Anmeldung wird vorbereitet …", "Getting sign-in ready …", "Preparando el acceso …", "Préparation de la connexion …", "Preparazione dell’accesso …"],
  nickname: ["Dein Nickname", "Your nickname", "Tu apodo", "Ton pseudo", "Il tuo nickname"],
  createRoom: ["RAUM ERSTELLEN", "CREATE ROOM", "CREAR SALA", "CRÉER UNE SALLE", "CREA STANZA"],
  enterCode: ["CODE EINGEBEN", "ENTER CODE", "INTRODUCIR CÓDIGO", "SAISIR UN CODE", "INSERISCI CODICE"],
  roomCode: ["Raumcode", "Room code", "Código de sala", "Code de salle", "Codice stanza"],
  joinRoom: ["RAUM BEITRETEN", "JOIN ROOM", "UNIRSE A LA SALA", "REJOINDRE LA SALLE", "ENTRA NELLA STANZA"],
  findPlayer: ["SPIELER FINDEN", "FIND A PLAYER", "BUSCAR JUGADOR", "TROUVER UN JOUEUR", "TROVA UN GIOCATORE"],
  searching: ["KAVORENZA · SPIELERSUCHE", "KAVORENZA · PLAYER SEARCH", "KAVORENZA · BUSCAR JUGADOR", "KAVORENZA · RECHERCHE DE JOUEUR", "KAVORENZA · RICERCA GIOCATORI"],
  queueTitle: ["Spielersuche", "Find a player", "Buscar jugador", "Trouver un joueur", "Trova un giocatore"],
  queueConnecting: ["Warteschlange wird verbunden …", "Connecting to the queue …", "Conectando con la cola …", "Connexion à la file …", "Connessione alla coda …"],
  cancelBack: ["ABBRECHEN · ZURÜCK", "CANCEL · BACK", "CANCELAR · VOLVER", "ANNULER · RETOUR", "ANNULLA · INDIETRO"],
  roomStatus: ["VERBINDE …", "CONNECTING …", "CONECTANDO …", "CONNEXION …", "CONNESSIONE …"],
  leaveSession: ["SITZUNG VERLASSEN", "LEAVE SESSION", "SALIR DE LA SESIÓN", "QUITTER LA SESSION", "ESCI DALLA SESSIONE"],
  roomTitle: ["Dein Spielraum", "Your game room", "Tu sala de juego", "Ta salle de jeu", "La tua stanza di gioco"],
  shareCode: ["Teile den Code mit genau einer Person.", "Share the code with one other player.", "Comparte el código con otra persona.", "Partage le code avec une seule personne.", "Condividi il codice con una sola persona."],
  shareInvite: ["EINLADUNG TEILEN", "SHARE INVITE", "COMPARTIR INVITACIÓN", "PARTAGER L’INVITATION", "CONDIVIDI INVITO"],
  players: ["Spieler", "Players", "Jugadores", "Joueurs", "Giocatori"],
  waitingPlayer: ["Sobald Spieler 2 da ist, könnt ihr ein Spiel wählen.", "Once player 2 joins, you can choose a game.", "Cuando se una el segundo jugador, podréis elegir un juego.", "Dès que le deuxième joueur arrive, vous pourrez choisir un jeu.", "Quando arriva il secondo giocatore, potrete scegliere un gioco."],
  decideTogether: ["IHR ENTSCHEIDET ZUSAMMEN", "YOU DECIDE TOGETHER", "DECIDÍS JUNTOS", "VOUS CHOISISSEZ ENSEMBLE", "SCEGLIETE INSIEME"],
  chooseGame: ["Welches Spiel soll es werden?", "Which game shall we play?", "¿A qué juego jugamos?", "À quel jeu voulez-vous jouer ?", "A quale gioco giochiamo?"],
  sameGame: ["Wählt dasselbe Spiel. Eure Stimmen starten die kurze Spielanleitung.", "Choose the same game. Your votes open its quick tutorial.", "Elegid el mismo juego. Vuestros votos abrirán una guía breve.", "Choisissez le même jeu. Vos votes ouvriront son guide rapide.", "Scegliete lo stesso gioco. I vostri voti apriranno un breve tutorial."],
  webGames: ["Im Browser spielbar: alle 13 Spiele – darunter auch Speed Quiz, Emoji Memory, Farbrausch, Zielzahl-Duell und Wort-Sprint.", "All 13 games are playable in the browser, including Speed Quiz, Emoji Memory, Color Rush, Number Target, and Word Sprint.", "Los 13 juegos se pueden jugar en el navegador, incluidos Speed Quiz, Emoji Memory, Fiebre de color, Número objetivo y Sprint de palabras.", "Les 13 jeux sont jouables dans le navigateur, dont Quiz express, Mémoire emoji, Course aux couleurs, Nombre cible et Sprint de mots.", "Tutti i 13 giochi sono disponibili nel browser, inclusi Speed Quiz, Emoji Memory, Corsa ai colori, Numero bersaglio e Sprint di parole."],
  tutorial: ["KURZANLEITUNG", "QUICK GUIDE", "GUÍA RÁPIDA", "GUIDE RAPIDE", "GUIDA RAPIDA"],
  timeout: ["Timeout:", "Turn limit:", "Límite por turno:", "Délai par tour :", "Limite turno:"],
  secondsPerTurn: ["45 Sekunden pro Zug", "45 seconds per turn", "45 segundos por turno", "45 secondes par tour", "45 secondi per turno"],
  ready: ["VERSTANDEN · ICH BIN BEREIT", "GOT IT · I'M READY", "ENTENDIDO · ESTOY LISTO", "COMPRIS · JE SUIS PRÊT", "CAPITO · SONO PRONTO"],
  backToPicker: ["ZURÜCK ZUR SPIELAUSWAHL", "BACK TO GAME PICKER", "VOLVER A ELEGIR JUEGO", "RETOUR AU CHOIX DU JEU", "TORNA ALLA SCELTA DEL GIOCO"],
  musicOff: ["♫ Musik aus", "♫ Music off", "♫ Música apagada", "♫ Musique coupée", "♫ Musica disattivata"],
  musicOn: ["♫ Musik an", "♫ Music on", "♫ Música activada", "♫ Musique activée", "♫ Musica attivata"],
  effectsOff: ["♪ Effekte aus", "♪ Effects off", "♪ Efectos apagados", "♪ Effets coupés", "♪ Effetti disattivati"],
  effectsOn: ["♪ Effekte an", "♪ Effects on", "♪ Efectos activados", "♪ Effets activés", "♪ Effetti attivati"],
  musicStart: ["♫ Musik starten", "♫ Start music", "♫ Iniciar música", "♫ Démarrer la musique", "♫ Avvia musica"],
  audioSettings: ["Audioeinstellungen", "Audio settings", "Ajustes de audio", "Réglages audio", "Impostazioni audio"],
  newRound: ["NEUE RUNDE", "NEW ROUND", "NUEVA RONDA", "NOUVELLE MANCHE", "NUOVO TURNO"],
  toPicker: ["ZUR SPIELAUSWAHL", "BACK TO GAME PICKER", "VOLVER A ELEGIR JUEGO", "RETOUR AU CHOIX DU JEU", "TORNA ALLA SCELTA DEL GIOCO"],
  connectionLost: ["Verbindung unterbrochen", "Connection lost", "Conexión interrumpida", "Connexion interrompue", "Connessione interrotta"],
  reconnect: ["ERNEUT VERBINDEN", "RECONNECT", "VOLVER A CONECTAR", "SE RECONNECTER", "RICONNETTI"],
  abortLeave: ["ABBRECHEN & SITZUNG VERLASSEN", "CANCEL & LEAVE SESSION", "CANCELAR Y SALIR", "ANNULER ET QUITTER", "ANNULLA ED ESCI"],
  footer: ["Testversion · Firebase Anonymous Auth und Firestore für den Raum-Sync ·", "Test version · Firebase Anonymous Auth and Firestore room sync ·", "Versión de prueba · Firebase Anonymous Auth y Firestore para sincronizar salas ·", "Version de test · Firebase Anonymous Auth et Firestore pour synchroniser les salles ·", "Versione di prova · Firebase Anonymous Auth e Firestore per la sincronizzazione ·"],
  privacy: ["Datenschutz", "Privacy", "Privacidad", "Confidentialité", "Privacy"],
  gameTic: ["Tic Tac Toe", "Tic Tac Toe", "Tres en raya", "Morpion", "Tris"],
  gameTicDesc: ["Setzt X und O abwechselnd. Drei in einer Reihe gewinnt.", "Take turns placing X and O. Three in a row wins.", "Colocad X y O por turnos. Gana quien alinee tres.", "Placez X et O à tour de rôle. Le premier à en aligner trois gagne.", "A turno mettete X e O. Vince chi ne allinea tre."],
  gameReflex: ["Reflex Duel", "Reflex Duel", "Duelo de reflejos", "Duel de réflexes", "Duello di riflessi"],
  gameReflexDesc: ["Wartet auf GO – tippt dann schneller als die andere Person.", "Wait for GO, then tap faster than your opponent.", "Esperad la señal y tocad antes que la otra persona.", "Attendez le signal puis touchez plus vite que l’autre.", "Aspettate il via e toccate prima dell’avversario."],
  gameConnect: ["Vier Gewinnt", "Connect Four", "Cuatro en raya", "Puissance 4", "Forza 4"],
  gameConnectDesc: ["Lasst Chips fallen. Vier in einer Reihe gewinnt.", "Drop discs. Connect four in a row to win.", "Dejad caer fichas. Gana quien conecte cuatro.", "Faites tomber les jetons. Alignez-en quatre pour gagner.", "Fate cadere le pedine. Vince chi ne collega quattro."],
  gameRps: ["Stein Papier Glow", "Rock Paper Glow", "Piedra, papel y luz", "Pierre, papier, lumière", "Sasso, carta e luce"],
  gameRpsDesc: ["Wählt gleichzeitig geheim Stein, Papier oder Schere.", "Secretly choose rock, paper, or scissors at the same time.", "Elegid en secreto piedra, papel o tijera a la vez.", "Choisissez en secret pierre, feuille ou ciseaux en même temps.", "Scegliete in segreto sasso, carta o forbici nello stesso momento."],
  gameQuiz: ["Speed Quiz Duell", "Speed Quiz Duel", "Duelo de quiz", "Duel quiz", "Sfida quiz"],
  gameQuizDesc: ["Beantwortet fünf schnelle Fragen.", "Answer five quick questions.", "Responded cinco preguntas rápidas.", "Répondez à cinq questions rapides.", "Rispondete a cinque domande veloci."],
  gameNumber: ["Zielzahl Duell", "Number Target", "Número objetivo", "Nombre cible", "Numero bersaglio"],
  gameNumberDesc: ["Wählt die Rechnung, die der Zielzahl am nächsten kommt.", "Choose the calculation closest to the target.", "Elegid la operación más cercana al objetivo.", "Choisissez le calcul le plus proche de la cible.", "Scegliete il calcolo più vicino al bersaglio."],
  gameColor: ["Farbrausch", "Color Rush", "Fiebre de color", "Course aux couleurs", "Corsa ai colori"],
  gameColorDesc: ["Reagiert auf fünf Farbsignale.", "React to five color signals.", "Reaccionad a cinco señales de color.", "Réagissez à cinq signaux colorés.", "Reagite a cinque segnali colorati."],
  gameWord: ["Wort-Sprint", "Word Sprint", "Sprint de palabras", "Sprint de mots", "Sprint di parole"],
  gameWordDesc: ["Findet passende Wörter gegen die Uhr.", "Find matching words against the clock.", "Encontrad las palabras correctas antes de que acabe el tiempo.", "Trouvez les mots correspondants avant la fin du chrono.", "Trovate le parole giuste prima che scada il tempo."],
  gameMemory: ["Emoji Memory", "Emoji Memory", "Memoria emoji", "Mémoire emoji", "Memoria emoji"],
  gameMemoryDesc: ["Deckt abwechselnd zwei Karten auf. Bei Paaren bist du nochmal dran, sonst wechselt der Zug. 15 Sekunden je Zug; die meisten Paare gewinnen.", "Take turns revealing two cards. A match earns another turn; otherwise play passes. 15 seconds per turn; most pairs wins.", "Revelad dos cartas por turno. Si encontráis una pareja, repetís; si no, pasa el turno. 15 segundos por turno; gana quien consiga más parejas.", "Révélez deux cartes à tour de rôle. Une paire vous fait rejouer ; sinon, le tour passe. 15 secondes par tour ; le plus de paires gagne.", "Scoprite due carte a turno. Una coppia dà un altro turno; altrimenti il turno passa. 15 secondi per turno; vince chi trova più coppie."],
  gameCyber: ["Cyber Tap Rush", "Cyber Tap Rush", "Fiebre de toques", "Ruée de taps", "Corsa di tocchi"],
  gameCyberDesc: ["Tippt im kurzen Reactor-Countdown so schnell wie möglich.", "Tap as fast as you can during the short reactor countdown.", "Tocad tan rápido como podáis durante la cuenta atrás del reactor.", "Tapez le plus vite possible pendant le compte à rebours du réacteur.", "Toccate il più velocemente possibile durante il conto alla rovescia del reattore."],
  gameBomb: ["Reaktor-Bombe", "Bomb Party", "Bomba explosiva", "Bombe party", "Bomba party"],
  gameBombDesc: ["Gebt die Bombe weiter, bevor der Timer endet.", "Pass the bomb before the timer runs out.", "Pasad la bomba antes de que termine el tiempo.", "Passez la bombe avant la fin du chrono.", "Passate la bomba prima che scada il tempo."],
  gameChooser: ["Entscheidungs-Blitz", "Decision Blitz", "Elección rápida", "Choix éclair", "Scelta lampo"],
  gameChooserDesc: ["Beide halten gedrückt – das Spiel wählt.", "Both players hold. The game picks one.", "Ambos mantenéis pulsado; el juego elige.", "Vous maintenez tous les deux ; le jeu choisit.", "Tenete premuto entrambi; il gioco sceglie."],
  gameDilemma: ["Entweder-Oder", "Would You Rather", "¿Qué prefieres?", "Tu préfères quoi ?", "Cosa preferisci?"],
  gameDilemmaDesc: ["Wählt eure Antwort und vergleicht sie.", "Choose your answer and compare.", "Elegid vuestra respuesta y comparadla.", "Choisissez votre réponse et comparez.", "Scegliete la risposta e confrontatela."],
  helpTic: ["Platziert X und O abwechselnd. Wer zuerst drei Zeichen in einer Reihe hat, gewinnt.", "Take turns placing X and O. The first to get three in a row wins.", "Colocad X y O por turnos. Gana quien consiga primero tres en línea.", "Placez X et O à tour de rôle. Le premier à en aligner trois gagne.", "Mettete X e O a turno. Vince chi per primo ne allinea tre."],
  helpReflex: ["Wartet auf das GO-Signal und tippt dann so schnell wie möglich. Bei Fake-Signalen nicht tippen.", "Wait for the GO signal, then tap as fast as you can. Do not tap on a fake signal.", "Esperad la señal GO y tocad lo más rápido posible. No toquéis con señales falsas.", "Attendez le signal GO puis touchez le plus vite possible. Ne touchez pas lors d’un faux signal.", "Aspettate il segnale VIA e toccate il più velocemente possibile. Non toccate ai falsi segnali."],
  helpConnect: ["Lass deinen Chip in eine Spalte fallen. Verbinde vier Chips waagerecht, senkrecht oder diagonal.", "Drop a disc into a column. Connect four horizontally, vertically, or diagonally.", "Deja caer una ficha en una columna. Conecta cuatro en horizontal, vertical o diagonal.", "Faites tomber un jeton dans une colonne. Alignez-en quatre à l’horizontale, à la verticale ou en diagonale.", "Fai cadere una pedina in una colonna. Allineane quattro in orizzontale, verticale o diagonale."],
  helpRps: ["Wählt gleichzeitig geheim Stein, Papier oder Schere. Stein schlägt Schere, Schere schlägt Papier, Papier schlägt Stein.", "Secretly choose rock, paper, or scissors at the same time. Rock beats scissors, scissors beat paper, and paper beats rock.", "Elegid en secreto piedra, papel o tijera a la vez. Piedra gana a tijera, tijera a papel y papel a piedra.", "Choisissez en secret pierre, feuille ou ciseaux en même temps. La pierre bat les ciseaux, les ciseaux battent la feuille et la feuille bat la pierre.", "Scegliete in segreto sasso, carta o forbici nello stesso momento. Sasso batte forbici, forbici battono carta e carta batte sasso."],
  helpQuiz: ["Beantwortet fünf Fragen. Richtige und schnelle Antworten bringen Punkte.", "Answer five questions. Correct and fast answers earn points.", "Responded cinco preguntas. Las respuestas correctas y rápidas dan puntos.", "Répondez à cinq questions. Les réponses justes et rapides rapportent des points.", "Rispondete a cinque domande. Le risposte corrette e veloci danno punti."],
  helpNumber: ["Wählt die Rechnung mit dem Ergebnis, das der Zielzahl am nächsten liegt.", "Choose the calculation whose result is closest to the target number.", "Elegid la operación cuyo resultado se acerque más al número objetivo.", "Choisissez le calcul dont le résultat est le plus proche du nombre cible.", "Scegliete il calcolo con il risultato più vicino al numero bersaglio."],
  helpColor: ["Achtet auf das Signal und tippt die passende Farbe. Falsche Taps kosten Zeit.", "Watch the signal and tap the matching color. Wrong taps cost time.", "Fijaos en la señal y tocad el color correspondiente. Los errores cuestan tiempo.", "Observez le signal et touchez la couleur correspondante. Les erreurs coûtent du temps.", "Osservate il segnale e toccate il colore corrispondente. Gli errori fanno perdere tempo."],
  helpWord: ["Lest den Hinweis und wählt das passende Wort, bevor die Zeit abläuft.", "Read the clue and choose the matching word before time runs out.", "Leed la pista y elegid la palabra adecuada antes de que se acabe el tiempo.", "Lisez l’indice et choisissez le mot correspondant avant la fin du chrono.", "Leggete l’indizio e scegliete la parola corretta prima che scada il tempo."],
  helpMemory: ["Deckt abwechselnd zwei Karten auf. Ein Paar gibt einen Extrazug; sonst wechselt der Zug. Nach 15 Sekunden geht es weiter. Wer die meisten Paare sammelt, gewinnt.", "Take turns revealing two cards. A match earns another turn; otherwise the turn passes. Play advances after 15 seconds. Most pairs wins.", "Revelad dos cartas por turno. Una pareja da otro turno; si no, pasa el turno. Tras 15 segundos, la partida continúa. Gana quien reúna más parejas.", "Révélez deux cartes à tour de rôle. Une paire donne un tour supplémentaire ; sinon, le tour passe. Après 15 secondes, la partie continue. Le plus de paires gagne.", "Scoprite due carte a turno. Una coppia dà un altro turno; altrimenti il turno passa. Dopo 15 secondi si continua. Vince chi raccoglie più coppie."],
  helpCyber: ["Tippt im kurzen Zeitfenster so oft wie möglich.", "Tap as many times as you can during the short time window.", "Tocad tantas veces como podáis durante el breve intervalo.", "Tapez autant de fois que possible pendant le court compte à rebours.", "Toccate il più possibile durante il breve intervallo."],
  helpBomb: ["Gebt die Bombe mit Pass weiter, bevor der Countdown abläuft.", "Pass the bomb before the countdown runs out.", "Pasad la bomba antes de que termine la cuenta atrás.", "Passez la bombe avant la fin du compte à rebours.", "Passate la bomba prima che finisca il conto alla rovescia."],
  helpChooser: ["Beide halten gedrückt. Das Spiel bestimmt nach dem Signal zufällig, wer ausgewählt wird.", "Both players hold the screen. After the signal, the game randomly picks one player.", "Ambos mantenéis la pantalla pulsada. Tras la señal, el juego elige a una persona al azar.", "Vous maintenez tous les deux l’écran. Après le signal, le jeu choisit un joueur au hasard.", "Entrambi tenete premuto lo schermo. Dopo il segnale, il gioco sceglie un giocatore a caso."],
  helpDilemma: ["Wählt eine Seite und vergleicht anschließend eure Antworten.", "Choose a side, then compare your answers.", "Elegid una opción y después comparad vuestras respuestas.", "Choisissez une option, puis comparez vos réponses.", "Scegliete un’opzione e poi confrontate le risposte."],
  titleTic: ["TIC TAC TOE · NEON", "TIC TAC TOE · NEON", "TRES EN RAYA · NEÓN", "MORPION · NÉON", "TRIS · NEON"],
  titleReflex: ["REFLEX DUEL", "REFLEX DUEL", "DUELO DE REFLEJOS", "DUEL DE RÉFLEXES", "DUELLO DI RIFLESSI"],
  titleConnect: ["VIER GEWINNT · NEON", "CONNECT FOUR · NEON", "CUATRO EN RAYA · NEÓN", "PUISSANCE 4 · NÉON", "FORZA 4 · NEON"],
  titleRps: ["STEIN PAPIER GLOW", "ROCK PAPER GLOW", "PIEDRA, PAPEL Y LUZ", "PIERRE, PAPIER, LUMIÈRE", "SASSO, CARTA E LUCE"],
  titleQuiz: ["SPEED QUIZ DUELL", "SPEED QUIZ DUEL", "DUELO DE QUIZ", "DUEL QUIZ", "SFIDA QUIZ"],
  titleNumber: ["ZIELZAHL DUELL", "NUMBER TARGET", "NÚMERO OBJETIVO", "NOMBRE CIBLE", "NUMERO BERSAGLIO"],
  titleColor: ["FARBRAUSCH", "COLOR RUSH", "FIEBRE DE COLOR", "COURSE AUX COULEURS", "CORSA AI COLORI"],
  titleWord: ["WORT-SPRINT", "WORD SPRINT", "SPRINT DE PALABRAS", "SPRINT DE MOTS", "SPRINT DI PAROLE"],
  titleMemory: ["EMOJI MEMORY", "EMOJI MEMORY", "MEMORIA EMOJI", "MÉMOIRE EMOJI", "MEMORIA EMOJI"],
  titleCyber: ["CYBER TAP RUSH", "CYBER TAP RUSH", "FIEBRE DE TOQUES", "RUÉE DE TAPS", "CORSA DI TOCCHI"],
  titleBomb: ["REAKTOR-BOMBE", "BOMB PARTY", "BOMBA EXPLOSIVA", "BOMBE PARTY", "BOMBA PARTY"],
  titleChooser: ["ENTSCHEIDUNGS-BLITZ", "DECISION BLITZ", "ELECCIÓN RÁPIDA", "CHOIX ÉCLAIR", "SCELTA LAMPO"],
  titleDilemma: ["WÜRDEST DU EHER?", "WOULD YOU RATHER?", "¿QUÉ PREFIERES?", "TU PRÉFÈRES QUOI ?", "COSA PREFERISCI?"],
  winYou: ["Du gewinnst!", "You win!", "¡Has ganado!", "Tu as gagné !", "Hai vinto!"],
  winOther: ["Dein Mitspieler gewinnt.", "Your opponent wins.", "Gana la otra persona.", "L’autre joueur gagne.", "Vince l’altro giocatore."],
  tie: ["Unentschieden", "Tie", "Empate", "Égalité", "Pareggio"],
  readyTitle: ["VERSTANDEN · ICH BIN BEREIT", "GOT IT · I'M READY", "ENTENDIDO · ESTOY LISTO", "COMPRIS · JE SUIS PRÊT", "CAPITO · SONO PRONTO"],
  readyConfirmed: ["BEREITSCHAFT BESTÄTIGT", "READY CONFIRMED", "PREPARACIÓN CONFIRMADA", "PRÊT CONFIRMÉ", "PRONTO CONFERMATO"],
  newDilemma: ["Nächstes Dilemma ➜", "Next dilemma ➜", "Siguiente dilema ➜", "Dilemme suivant ➜", "Prossimo dilemma ➜"],
  tutorialHeadlinePrefix: ["So spielt ihr ", "How to play ", "Cómo jugar a ", "Comment jouer à ", "Come si gioca a "],
  connectionPreparing: ["Verbindung wird wiederhergestellt …", "Reconnecting …", "Reconectando …", "Reconnexion …", "Riconnessione …"],
  authReady: ["Anonym verbunden · kostenlos spielbar", "Connected anonymously · free to play", "Conectado anónimamente · gratis", "Connecté anonymement · gratuit", "Connesso in modo anonimo · gratuito"],
  authFailed: ["Anmeldung fehlgeschlagen", "Sign-in failed", "Error al iniciar sesión", "Échec de la connexion", "Accesso non riuscito"],
  gameNotReady: ["Dieses Spiel ist noch nicht für den Browser umgesetzt.", "This game is not available in the browser yet.", "Este juego aún no está disponible en el navegador.", "Ce jeu n’est pas encore disponible dans le navigateur.", "Questo gioco non è ancora disponibile nel browser."],
  shareCopied: ["LINK KOPIERT", "LINK COPIED", "ENLACE COPIADO", "LIEN COPIÉ", "LINK COPIATO"],
};

const languageCodes = ["de", "en", "es", "fr", "it"];
const sourceToKey = new Map(Object.entries(messages).map(([key, values]) => [values[0], key]));

export function normalizeWebLanguage(value) {
  const language = String(value || "").toLowerCase().split(/[-_]/, 1)[0];
  return languageCodes.includes(language) ? language : "en";
}

export function initialWebLanguage(saved, browserLanguages = []) {
  if (saved && languageCodes.includes(saved)) return saved;
  for (const item of browserLanguages) {
    const normalized = normalizeWebLanguage(item);
    if (languageCodes.includes(String(item).toLowerCase().split(/[-_]/, 1)[0])) return normalized;
  }
  return "en";
}

export function translateWebText(text, language) {
  const source = String(text);
  const lang = normalizeWebLanguage(language);
  const index = languageCodes.indexOf(lang);
  let key = sourceToKey.get(source.trim());
  if (source.trim().startsWith("So spielt ihr ")) {
    const game = source.trim().slice("So spielt ihr ".length);
    const translatedGame = translateWebText(game, lang);
    const translatedPrefix = messages.tutorialHeadlinePrefix[index];
    return `${source.slice(0, source.indexOf(source.trim()))}${translatedPrefix}${translatedGame}`;
  }
  if (!key) return text;
  const translated = messages[key][index];
  const trimmed = source.trim();
  const start = source.indexOf(trimmed);
  return `${source.slice(0, start)}${translated}${source.slice(start + trimmed.length)}`;
}

export function installWebLocalization(documentRef, select, storage, browserLanguages = []) {
  let language = initialWebLanguage(storage.getItem("kavorenza_language"), browserLanguages);
  const sourceTitle = documentRef.title;
  const originals = new WeakMap();
  const localizeNode = node => {
    if (node.nodeType === 3) {
      if (!originals.has(node)) originals.set(node, node.data);
      const translated = translateWebText(originals.get(node), language);
      if (node.data !== translated) node.data = translated;
      return;
    }
    if (node.nodeType !== 1) return;
    for (const attribute of ["placeholder", "aria-label", "title"]) {
      if (node.hasAttribute(attribute)) {
        const sourceAttribute = `data-i18n-source-${attribute}`;
        if (!node.hasAttribute(sourceAttribute)) node.setAttribute(sourceAttribute, node.getAttribute(attribute));
        node.setAttribute(attribute, translateWebText(node.getAttribute(sourceAttribute), language));
      }
    }
    for (const child of node.childNodes) localizeNode(child);
  };
  const apply = next => {
    language = normalizeWebLanguage(next);
    activeWebLanguage = language;
    storage.setItem("kavorenza_language", language);
    documentRef.documentElement.lang = language;
    documentRef.title = translateWebText(sourceTitle, language);
    if (select) select.value = language;
    localizeNode(documentRef.body);
  };
  if (select) select.addEventListener("change", () => apply(select.value));
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === "childList") record.addedNodes.forEach(localizeNode);
      else if (record.type === "characterData") localizeNode(record.target);
      else if (record.type === "attributes") localizeNode(record.target);
    }
  });
  observer.observe(documentRef.body, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ["placeholder", "aria-label", "title"] });
  apply(language);
  return { get language() { return language; }, setLanguage: apply, disconnect: () => observer.disconnect() };
}

let activeWebLanguage = "de";
export const getWebLanguage = () => activeWebLanguage;
