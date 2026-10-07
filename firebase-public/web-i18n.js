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
  colorPrompt: ["Tippt die passende Farbe innerhalb des Zeitlimits.", "Tap the matching color before time runs out.", "Tocad el color correspondiente antes de que se acabe el tiempo.", "Touchez la couleur correspondante avant la fin du chrono.", "Toccate il colore corrispondente prima che scada il tempo."],
  wordPrompt: ["Findet das passende Wort, bevor die Zeit abläuft.", "Find the matching word before time runs out.", "Encontrad la palabra adecuada antes de que se acabe el tiempo.", "Trouvez le mot correspondant avant la fin du chrono.", "Trovate la parola corretta prima che scada il tempo."],
  CYAN: ["CYAN", "CYAN", "CIAN", "CYAN", "CIANO"],
  PINK: ["PINK", "PINK", "ROSA", "ROSE", "ROSA"],
  MINT: ["MINZE", "MINT", "MENTA", "MENTHE", "MENTA"],
  AMBER: ["BERNSTEIN", "AMBER", "ÁMBAR", "AMBRE", "AMBRA"],
  VIOLET: ["VIOLETT", "VIOLET", "VIOLETA", "VIOLET", "VIOLA"],
  "Tippe auf den Kern, um die Runde zu starten": ["Tippe auf den Kern, um die Runde zu starten", "Tap the core to start the round", "Toca el núcleo para empezar la ronda", "Touchez le noyau pour commencer la manche", "Tocca il nucleo per iniziare il round"],
  "Warte auf das Signal · nicht zu früh tippen!": ["Warte auf das Signal · nicht zu früh tippen!", "Wait for the signal · don't tap early!", "Espera la señal · ¡no toques antes!", "Attendez le signal · ne touchez pas trop tôt !", "Aspetta il segnale · non toccare troppo presto!"],
  "Warte auf das Signal. Ein Tap vor GO zählt als Frühstart.": ["Warte auf das Signal. Ein Tap vor GO zählt als Frühstart.", "Wait for the signal. Tapping before GO counts as a false start.", "Espera la señal. Tocar antes de GO cuenta como salida anticipada.", "Attendez le signal. Toucher avant GO compte comme un faux départ.", "Aspetta il segnale. Toccare prima di VIA vale come falsa partenza."],
  "Eine Person startet das Signal. Tippt danach schneller als die andere.": ["Eine Person startet das Signal. Tippt danach schneller als die andere.", "One player starts the signal. Then try to tap faster than the other.", "Una persona inicia la señal. Después, toca más rápido que la otra.", "Un joueur déclenche le signal. Ensuite, touchez plus vite que l’autre.", "Un giocatore avvia il segnale. Poi toccate più velocemente dell’altro."],
  "Tippe so schnell wie möglich!": ["Tippe so schnell wie möglich!", "Tap as fast as you can!", "¡Toca lo más rápido posible!", "Touchez aussi vite que possible !", "Tocca il più velocemente possibile!"],
  "Tippe im grünen Zeitfenster so oft wie möglich.": ["Tippe im grünen Zeitfenster so oft wie möglich.", "Tap as many times as possible while the window is green.", "Toca tantas veces como puedas mientras la ventana esté verde.", "Touchez autant que possible pendant la fenêtre verte.", "Tocca il più possibile mentre la finestra è verde."],
  "Tippt im kurzen Reactor-Countdown so schnell wie möglich.": ["Tippt im kurzen Reactor-Countdown so schnell wie möglich.", "Tap as fast as you can during the short reactor countdown.", "Tocad lo más rápido posible durante la breve cuenta atrás del reactor.", "Touchez aussi vite que possible pendant le court compte à rebours du réacteur.", "Toccate il più velocemente possibile durante il breve conto alla rovescia del reattore."],
  "Wählt gleichzeitig geheim Stein, Papier oder Schere.": ["Wählt gleichzeitig geheim Stein, Papier oder Schere.", "Secretly choose rock, paper, or scissors at the same time.", "Elegid en secreto piedra, papel o tijera al mismo tiempo.", "Choisissez secrètement pierre, papier ou ciseaux en même temps.", "Scegliete in segreto sasso, carta o forbici nello stesso momento."],
  "Wählt gleichzeitig. Die Wahl bleibt geheim, bis beide bestätigt haben.": ["Wählt gleichzeitig. Die Wahl bleibt geheim, bis beide bestätigt haben.", "Choose at the same time. Picks stay hidden until both players confirm.", "Elegid a la vez. Las opciones permanecen ocultas hasta que ambos confirmen.", "Choisissez en même temps. Les choix restent cachés jusqu’à confirmation des deux joueurs.", "Scegliete insieme. Le scelte restano nascoste finché entrambi non confermano."],
  "Wählt geheim A oder B": ["Wählt geheim A oder B", "Secretly choose A or B", "Elige en secreto A o B", "Choisissez secrètement A ou B", "Scegli in segreto A o B"],
  "Halte gedrückt, bis beide bereit sind.": ["Halte gedrückt, bis beide bereit sind.", "Keep holding until both players are ready.", "Mantén pulsado hasta que ambos estén listos.", "Maintenez la pression jusqu’à ce que les deux joueurs soient prêts.", "Tieni premuto finché entrambi non sono pronti."],
  "Der andere Spieler hält — halte jetzt ebenfalls!": ["Der andere Spieler hält — halte jetzt ebenfalls!", "The other player is holding — press and hold too!", "La otra persona está pulsando: ¡mantén pulsado también!", "L’autre joueur maintient — maintenez aussi !", "L’altro giocatore tiene premuto: fallo anche tu!"],
  "Bereite dich darauf vor, die Bombe zu übernehmen.": ["Bereite dich darauf vor, die Bombe zu übernehmen.", "Get ready to take the bomb.", "Prepárate para recibir la bomba.", "Préparez-vous à recevoir la bombe.", "Preparati a ricevere la bomba."],
  "Runde beendet · ihr könnt eine neue Runde starten.": ["Runde beendet · ihr könnt eine neue Runde starten.", "Round over · you can start another round.", "Ronda terminada · podéis empezar otra.", "Manche terminée · vous pouvez en lancer une autre.", "Round finito · potete iniziarne un altro."],
  "Beide halten gleichzeitig. Das Ergebnis wird zufällig gewählt.": ["Beide halten gleichzeitig. Das Ergebnis wird zufällig gewählt.", "Both players hold. The result is chosen at random.", "Ambos mantenéis pulsado. El resultado se elige al azar.", "Les deux joueurs maintiennent la pression. Le résultat est tiré au sort.", "Entrambi tenete premuto. Il risultato viene scelto a caso."],
  "Wähle geheim": ["Wähle geheim", "Choose secretly", "Elige en secreto", "Choisis en secret", "Scegli in segreto"],
  "NÄCHSTES DILEMMA": ["NÄCHSTES DILEMMA", "NEXT DILEMMA", "SIGUIENTE DILEMA", "DILEMME SUIVANT", "PROSSIMO DILEMMA"],
  "WARTE AUF NÄCHSTE RUNDE": ["WARTE AUF NÄCHSTE RUNDE", "WAIT FOR NEXT ROUND", "ESPERA LA SIGUIENTE RONDA", "ATTENDS LA PROCHAINE MANCHE", "ATTENDI IL PROSSIMO ROUND"],
  "⏳ MITSPIELER ENTSCHÄRFT": ["⏳ MITSPIELER ENTSCHÄRFT", "⏳ OPPONENT DEFUSED IT", "⏳ LA OTRA PERSON LA DESACTIVÓ", "⏳ L’AUTRE JOUEUR A DÉSAMORCÉ", "⏳ L’ALTRO GIOCATORE HA DISINNESCATO"],
  "⚡ DU WURDEST AUSGEWÄHLT!": ["⚡ DU WURDEST AUSGEWÄHLT!", "⚡ YOU WERE CHOSEN!", "⚡ ¡HAS SIDO ELEGIDO!", "⚡ TU AS ÉTÉ CHOISI !", "⚡ SEI STATO SCELTO!"],
  "⚡ MITSPIELER AUSGEWÄHLT!": ["⚡ MITSPIELER AUSGEWÄHLT!", "⚡ OPPONENT CHOSEN!", "⚡ OTRA PERSON ELEGIDA", "⚡ AUTRE JOUEUR CHOISI !", "⚡ ALTRO GIOCATORE SCELTO!"],
  "👇 DRÜCKEN & HALTEN": ["👇 DRÜCKEN & HALTEN", "👇 PRESS & HOLD", "👇 MANTÉN PULSADO", "👇 MAINTIENS APPUYÉ", "👇 TIENI PREMUTO"],
  "Doppelter Frühstart · unentschieden.": ["Doppelter Frühstart · unentschieden.", "Both players jumped the gun · it's a tie.", "Ambos se adelantaron · empate.", "Faux départ des deux joueurs · égalité.", "Falsa partenza di entrambi · pareggio."],
  "Frühstart — diesmal gewinnt dein Mitspieler.": ["Frühstart — diesmal gewinnt dein Mitspieler.", "False start — your opponent wins this round.", "Salida anticipada: esta ronda la gana la otra persona.", "Faux départ : l’autre joueur remporte cette manche.", "Falsa partenza: questo round lo vince l’altro giocatore."],
  "Der Raum wurde beendet oder ist abgelaufen.": ["Der Raum wurde beendet oder ist abgelaufen.", "The room has ended or expired.", "La sala terminó o ha caducado.", "La salle est terminée ou a expiré.", "La stanza è terminata o è scaduta."],
  "Deine Internetverbindung ist unterbrochen. Verbinde dich erneut oder verlasse die Sitzung.": ["Deine Internetverbindung ist unterbrochen. Verbinde dich erneut oder verlasse die Sitzung.", "Your internet connection is interrupted. Reconnect or leave the session.", "Se ha interrumpido tu conexión. Reconéctate o sal de la sesión.", "Ta connexion Internet est interrompue. Reconnecte-toi ou quitte la session.", "La connessione Internet è interrotta. Riconnettiti o lascia la sessione."],
  "Raum nicht gefunden. Prüfe den Code und versuche es erneut.": ["Raum nicht gefunden. Prüfe den Code und versuche es erneut.", "Room not found. Check the code and try again.", "No se encontró la sala. Comprueba el código e inténtalo de nuevo.", "Salle introuvable. Vérifie le code et réessaie.", "Stanza non trovata. Controlla il codice e riprova."],
  "Bitte einen sechsstelligen Raumcode eingeben.": ["Bitte einen sechsstelligen Raumcode eingeben.", "Enter a six-character room code.", "Introduce un código de sala de seis caracteres.", "Saisis un code de salle à six caractères.", "Inserisci un codice stanza di sei caratteri."],
  "Raum ist nicht mehr offen.": ["Raum ist nicht mehr offen.", "This room is no longer open.", "Esta sala ya no está abierta.", "Cette salle n’est plus ouverte.", "Questa stanza non è più aperta."],
  "Raum ist voll (maximal 2 Spieler).": ["Raum ist voll (maximal 2 Spieler).", "Room is full (maximum 2 players).", "La sala está llena (máximo 2 jugadores).", "La salle est complète (2 joueurs maximum).", "La stanza è piena (massimo 2 giocatori)."],
  "Kein freier Raumcode gefunden. Bitte erneut versuchen.": ["Kein freier Raumcode gefunden. Bitte erneut versuchen.", "Could not find an available room code. Please try again.", "No se encontró un código disponible. Inténtalo de nuevo.", "Aucun code de salle disponible. Réessaie.", "Nessun codice stanza disponibile. Riprova."],
  "Nickname konnte nicht reserviert werden.": ["Nickname konnte nicht reserviert werden.", "Could not reserve this nickname.", "No se pudo reservar este apodo.", "Impossible de réserver ce pseudo.", "Impossibile riservare questo nickname."],
  "Spielersuche vorübergehend nicht verfügbar": ["Spielersuche vorübergehend nicht verfügbar", "Matchmaking is temporarily unavailable", "La búsqueda de jugadores no está disponible temporalmente", "La recherche de joueurs est temporairement indisponible", "La ricerca giocatori non è disponibile al momento"],
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
const dynamicMessages = [
  [/^DU BIST DRAN · (\d+) s$/, ["DU BIST DRAN · {0} s", "YOUR TURN · {0}s", "TE TOCA · {0} s", "À TOI · {0} s", "TOCCA A TE · {0} s"]],
  [/^Mitspieler ist dran · (\d+) s$/, ["Mitspieler ist dran · {0} s", "OPPONENT'S TURN · {0}s", "TURNO DE LA OTRA PERSONA · {0} s", "TOUR DE L’AUTRE JOUEUR · {0} s", "TURNO DELL’ALTRO GIOCATORE · {0} s"]],
  [/^Deine Paare: (\d+) · Mitspieler: (\d+)$/, ["Deine Paare: {0} · Mitspieler: {1}", "Your pairs: {0} · Opponent: {1}", "Tus parejas: {0} · Otra persona: {1}", "Tes paires : {0} · Autre joueur : {1}", "Le tue coppie: {0} · Altro giocatore: {1}"]],
  [/^FRAGE (\d+)\/5 · (\d+) s$/, ["FRAGE {0}/5 · {1} s", "QUESTION {0}/5 · {1}s", "PREGUNTA {0}/5 · {1} s", "QUESTION {0}/5 · {1} s", "DOMANDA {0}/5 · {1} s"]],
  [/^Antwort gespeichert · warte auf Mitspieler · Frage (\d+)\/5$/, ["Antwort gespeichert · warte auf Mitspieler · Frage {0}/5", "Answer saved · waiting for opponent · question {0}/5", "Respuesta guardada · esperando a la otra persona · pregunta {0}/5", "Réponse enregistrée · attente de l’autre joueur · question {0}/5", "Risposta salvata · in attesa dell’altro giocatore · domanda {0}/5"]],
  [/^Antwort gespeichert · Runde (\d+)\/5$/, ["Antwort gespeichert · Runde {0}/5", "Answer saved · round {0}/5", "Respuesta guardada · ronda {0}/5", "Réponse enregistrée · manche {0}/5", "Risposta salvata · round {0}/5"]],
  [/^Runde (\d+) · Deine Wahl bleibt bis zur Gegenstimme geheim\.$/, ["Runde {0} · Deine Wahl bleibt bis zur Gegenstimme geheim.", "Round {0} · Your pick stays hidden until the other player answers.", "Ronda {0} · Tu elección seguirá oculta hasta que responda la otra persona.", "Manche {0} · Ton choix reste caché jusqu’à la réponse de l’autre joueur.", "Round {0} · La tua scelta resta nascosta finché non risponde l’altro giocatore."]],
  [/^Runde (\d+) · Entscheidet euch unabhängig voneinander\.$/, ["Runde {0} · Entscheidet euch unabhängig voneinander.", "Round {0} · Choose independently.", "Ronda {0} · Elegid por separado.", "Manche {0} · Choisissez chacun de votre côté.", "Round {0} · Scegliete senza influenzarvi."]],
  [/^Du: ([AB]) · Mitspieler: ([AB])$/, ["Du: {0} · Mitspieler: {1}", "You: {0} · Opponent: {1}", "Tú: {0} · Otra persona: {1}", "Toi : {0} · Autre joueur : {1}", "Tu: {0} · Altro giocatore: {1}"]],
  [/^Richtige Antworten · Du: (\d+)\/5 · Mitspieler: (\d+)\/5$/, ["Richtige Antworten · Du: {0}/5 · Mitspieler: {1}/5", "Correct answers · You: {0}/5 · Opponent: {1}/5", "Aciertos · Tú: {0}/5 · Otra persona: {1}/5", "Bonnes réponses · Toi : {0}/5 · Autre joueur : {1}/5", "Risposte corrette · Tu: {0}/5 · Altro giocatore: {1}/5"]],
  [/^Warte auf Mitspieler · (\d+)\/5$/, ["Warte auf Mitspieler · {0}/5", "Waiting for opponent · {0}/5", "Esperando a la otra persona · {0}/5", "En attente de l’autre joueur · {0}/5", "In attesa dell’altro giocatore · {0}/5"]],
  [/^Deine Punkte: (\d+) · Mitspieler: (\d+)$/, ["Deine Punkte: {0} · Mitspieler: {1}", "Your points: {0} · Opponent: {1}", "Tus puntos: {0} · Otra persona: {1}", "Tes points : {0} · Autre joueur : {1}", "I tuoi punti: {0} · Altro giocatore: {1}"]],
  [/^Der andere Spieler verbindet sich neu · (\d+) s$/, ["Der andere Spieler verbindet sich neu · {0} s", "The other player is reconnecting · {0}s", "La otra persona se está reconectando · {0} s", "L’autre joueur se reconnecte · {0} s", "L’altro giocatore si sta riconnettendo · {0} s"]],
  [/^Raum ([A-Z0-9]{6}) wird geöffnet …$/, ["Raum {0} wird geöffnet …", "Opening room {0} …", "Abriendo la sala {0} …", "Ouverture de la salle {0} …", "Apertura della stanza {0} …"]],
  [/^Dieser Nickname war schon vergeben\. Du spielst als „(.+)“\.$/, ["Dieser Nickname war schon vergeben. Du spielst als „{0}“.", "That nickname was taken. You are playing as “{0}”.", "Ese apodo ya estaba ocupado. Juegas como «{0}».", "Ce pseudo était déjà pris. Tu joues sous le nom « {0} ».", "Questo nickname era già usato. Giochi come “{0}”."]],
  [/^(.+) ist seit über zwei Minuten nicht erreichbar\. Warte auf die Rückkehr oder brich die Sitzung ab\.$/, ["{0} ist seit über zwei Minuten nicht erreichbar. Warte auf die Rückkehr oder brich die Sitzung ab.", "{0} has been unreachable for over two minutes. Wait for them or cancel the session.", "{0} no está disponible desde hace más de dos minutos. Espera o cancela la sesión.", "{0} est injoignable depuis plus de deux minutes. Attends son retour ou annule la session.", "{0} non è raggiungibile da oltre due minuti. Aspetta oppure annulla la sessione."]],
  [/^Warteplatz (\d+) von (\d+)$/, ["Warteplatz {0} von {1}", "Queue position {0} of {1}", "Posición {0} de {1} en la cola", "Position {0} sur {1} dans la file", "Posizione {0} di {1} in coda"]],
  [/^Geschätzte Wartezeit: etwa (\d+) min (\d+) s · ungefähr alle 15 Sekunden aktualisiert$/, ["Geschätzte Wartezeit: etwa {0} min {1} s · ungefähr alle 15 Sekunden aktualisiert", "Estimated wait: about {0} min {1}s · updates about every 15 seconds", "Espera estimada: unos {0} min {1} s · se actualiza cada 15 segundos", "Attente estimée : environ {0} min {1} s · mise à jour toutes les 15 secondes", "Attesa stimata: circa {0} min {1} s · aggiornamento ogni 15 secondi"]],
  [/^Du gewinnst · (\d+) ms gegen (\d+) ms!$/, ["Du gewinnst · {0} ms gegen {1} ms!", "You win · {0} ms vs {1} ms!", "¡Ganas! · {0} ms frente a {1} ms", "Tu gagnes · {0} ms contre {1} ms !", "Hai vinto · {0} ms contro {1} ms!"]],
  [/^Du gewinnst · (\d+) ms!$/, ["Du gewinnst · {0} ms!", "You win · {0} ms!", "¡Ganas! · {0} ms", "Tu gagnes · {0} ms !", "Hai vinto · {0} ms!"]],
  [/^Dein Mitspieler war schneller · (\d+) ms\.$/, ["Dein Mitspieler war schneller · {0} ms.", "Your opponent was faster · {0} ms.", "La otra persona fue más rápida · {0} ms.", "L’autre joueur a été plus rapide · {0} ms.", "L’altro giocatore è stato più veloce · {0} ms."]],
];

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
  if (!key) {
    const dynamic = dynamicMessages.find(([pattern]) => pattern.test(source.trim()));
    if (!dynamic) return text;
    const match = source.trim().match(dynamic[0]);
    const translatedDynamic = dynamic[1][index].replace(/\{(\d+)\}/g, (_, slot) => match[Number(slot) + 1]);
    const trimmedDynamic = source.trim();
    const startDynamic = source.indexOf(trimmedDynamic);
    return `${source.slice(0, startDynamic)}${translatedDynamic}${source.slice(startDynamic + trimmedDynamic.length)}`;
  }
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
