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
  webGames: ["Alle 23 Mini-Spiele sind im Browser spielbar.", "All 23 mini-games are playable in the browser.", "Los 23 minijuegos están disponibles en el navegador.", "Les 23 mini-jeux sont jouables dans le navigateur.", "Tutti i 23 minigiochi sono disponibili nel browser."],
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
  audioSettings: ["Einstellungen", "Settings", "Ajustes", "Réglages", "Impostazioni"],
  audioSettingsButton: ["⚙ Einstellungen", "⚙ Settings", "⚙ Ajustes", "⚙ Réglages", "⚙ Impostazioni"],
  audioSettingsHint: ["Die Änderungen gelten sofort – auch während einer laufenden Partie.", "Changes apply instantly, including during a match.", "Los cambios se aplican al instante, también durante la partida.", "Les changements s’appliquent immédiatement, même pendant une partie.", "Le modifiche sono immediate, anche durante una partita."],
  closeDialog: ["Schließen", "Close", "Cerrar", "Fermer", "Chiudi"],
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
  gamePrism: ["Prismen-Relay", "Prism Relay", "Relevo de prismas", "Relais des prismes", "Staffetta di prismi"],
  gamePrismDesc: ["Leite den Laser um den mittleren Blocker bis zum Empfänger.", "Route the laser around the center blocker to the receiver.", "Guía el láser hasta el receptor rodeando el bloqueo central.", "Guide le laser vers le récepteur autour du bloc central.", "Guida il laser al ricevitore intorno all’ostacolo centrale."],
  gameSwitch: ["Schaltersturm", "Switchstorm", "Tormenta de interruptores", "Tempête de commutateurs", "Tempesta di interruttori"],
  gameSwitchDesc: ["Schalte das 3×3-Lichtraster aus; jeder Schalter kippt sich und seine Nachbarn.", "Clear the 3×3 light grid; each switch flips itself and its neighbors.", "Apaga la cuadrícula 3×3; cada interruptor cambia su luz y la de sus vecinos.", "Éteins la grille 3×3 ; chaque interrupteur inverse sa case et ses voisines.", "Spegni la griglia 3×3; ogni interruttore cambia la sua luce e quella dei vicini."],
  gameShape: ["Formen-Shift", "Shape Shift", "Cambio de formas", "Formes en mouvement", "Forme in movimento"],
  gameShapeDesc: ["Drehe die Form in 90°-Schritten zur Ziel-Silhouette.", "Rotate the shape in 90° steps to match the target silhouette.", "Gira la forma en pasos de 90° para igualar la silueta objetivo.", "Tourne la forme par pas de 90° pour l’aligner sur la silhouette cible.", "Ruota la forma a passi di 90° per allinearla alla sagoma obiettivo."],
  gameMaze: ["Labyrinth-Kurier", "Maze Courier", "Mensajero del laberinto", "Coursier du labyrinthe", "Corriere del labirinto"],
  gameMazeDesc: ["Wähle Zug für Zug den sicheren Weg durch das Labyrinth.", "Pick the safe route through the maze one turn at a time.", "Elige el camino seguro por el laberinto, giro a giro.", "Choisis le chemin sûr dans le labyrinthe, virage après virage.", "Scegli il percorso sicuro nel labirinto, svolta dopo svolta."],
  gameTower: ["Turm-Balance", "Tower Balance", "Torre en equilibrio", "Tour en équilibre", "Torre in equilibrio"],
  gameTowerDesc: ["Halte die Wippe mit dem passenden Gewicht im Gleichgewicht.", "Balance the seesaw with the right weight.", "Equilibra la balanza con el peso adecuado.", "Équilibre la bascule avec le bon poids.", "Bilancia la leva con il peso giusto."],
  gameCargo: ["Fracht-Sortierer", "Cargo Sort", "Clasifica la carga", "Tri du fret", "Smista il carico"],
  gameCargoDesc: ["Sortiere jede Kiste in den passenden Frachtraum.", "Sort each crate into the matching cargo bay.", "Clasifica cada caja en el almacén correspondiente.", "Trie chaque caisse dans le compartiment correspondant.", "Smista ogni cassa nel deposito corrispondente."],
  gamePixel: ["Pixel-Schmiede", "Pixel Forge", "Forja de píxeles", "Forge à pixels", "Fucina di pixel"],
  gamePixelDesc: ["Löse ein 4×4-Nonogramm anhand von Zeilen- und Spaltenhinweisen.", "Solve a 4×4 nonogram from row and column clues.", "Resuelve un nonograma 4×4 con pistas de filas y columnas.", "Résous un nonogramme 4×4 grâce aux indices des lignes et colonnes.", "Risolvi un nonogramma 4×4 con gli indizi di righe e colonne."],
  gameEcho: ["Echo-Welle", "Echo Wave", "Onda de eco", "Onde écho", "Onda eco"],
  gameEchoDesc: ["Merke dir die Lichtfolge und wiederhole sie.", "Remember the light sequence and repeat it.", "Memoriza la secuencia de luces y repítela.", "Mémorise la séquence lumineuse et répète-la.", "Memorizza la sequenza luminosa e ripetila."],
  gameOrbit: ["Orbit-Rettung", "Orbit Rescue", "Rescate orbital", "Sauvetage orbital", "Soccorso orbitale"],
  gameOrbitDesc: ["Lenke die Sonde mit einem Impuls in die sichere Umlaufbahn.", "Guide the probe into a safe orbit with one gravity nudge.", "Guía la sonda hacia una órbita segura con un impulso.", "Guide la sonde vers une orbite sûre avec une impulsion.", "Guida la sonda in un’orbita sicura con un impulso."],
  gameComet: ["Kometen-Curling", "Comet Curling", "Curling de cometas", "Curling cométaire", "Curling cometario"],
  gameCometDesc: ["Wähle den Schub, der den Kometen am Ziel landen lässt.", "Choose the thrust that sends the comet closest to its target.", "Elige el impulso que acerque el cometa al objetivo.", "Choisis la poussée qui rapproche la comète de sa cible.", "Scegli la spinta che avvicina la cometa al bersaglio."],
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
  helpPrism: ["Drehe vier Spiegel, um den Laser um den mittleren Blocker zum Empfänger zu leiten.", "Rotate four mirrors to route the laser around the center blocker to the receiver.", "Gira cuatro espejos para guiar el láser alrededor del bloqueo central hasta el receptor.", "Tourne quatre miroirs pour guider le laser autour du bloc central jusqu’au récepteur.", "Ruota quattro specchi per guidare il laser intorno all’ostacolo centrale fino al ricevitore."],
  helpSwitch: ["Schalte das 3×3-Lichtraster aus; jeder Schalter kippt sich und seine Nachbarn.", "Clear the 3×3 light grid; each switch flips itself and its neighbors.", "Apaga la cuadrícula 3×3; cada interruptor cambia su luz y la de sus vecinos.", "Éteins la grille 3×3 ; chaque interrupteur inverse sa case et ses voisines.", "Spegni la griglia 3×3; ogni interruttore cambia la sua luce e quella dei vicini."],
  helpSwitchTutorial: ["Löse das 3×3-Lichtraster: Jeder Schalter kippt sich und seine Nachbarn. Schalte alle Lichter aus und bestätige.", "Solve the 3×3 Lights Out grid: each switch flips itself and its neighbors. Turn every light off and lock in.", "Resuelve la cuadrícula Lights Out 3×3: cada interruptor cambia su luz y la de sus vecinos. Apaga todas las luces y confirma.", "Résous la grille Lights Out 3×3 : chaque bouton inverse sa case et ses voisines. Éteins tout et valide.", "Risolvi la griglia Lights Out 3×3: ogni pulsante inverte la sua casella e quelle vicine. Spegni tutte le luci e conferma."],
  helpShape: ["Drehe die Form in 90°-Schritten, bis sie zur Ziel-Silhouette passt.", "Rotate the shape in 90° steps until it matches the target silhouette.", "Gira la forma en pasos de 90° hasta igualar la silueta objetivo.", "Tourne la forme par pas de 90° pour l’aligner sur la silhouette cible.", "Ruota la forma a passi di 90° per allinearla alla sagoma obiettivo."],
  helpMaze: ["Wähle Zug für Zug den sicheren Weg durch das Labyrinth.", "Pick the safe route through the maze one turn at a time.", "Elige el camino seguro por el laberinto, giro a giro.", "Choisis le chemin sûr dans le labyrinthe, virage après virage.", "Scegli il percorso sicuro nel labirinto, svolta dopo svolta."],
  helpTower: ["Halte die Wippe mit dem passenden Gewicht im Gleichgewicht.", "Balance the seesaw with the right weight.", "Equilibra la balanza con el peso adecuado.", "Équilibre la bascule avec le bon poids.", "Bilancia la leva con il peso giusto."],
  helpCargo: ["Sortiere jede Kiste in den passenden Frachtraum.", "Sort each crate into the matching cargo bay.", "Clasifica cada caja en el almacén correspondiente.", "Trie chaque caisse dans le compartiment correspondant.", "Smista ogni cassa nel deposito corrispondente."],
  helpPixel: ["Löse ein 4×4-Nonogramm anhand von Zeilen- und Spaltenhinweisen.", "Solve a 4×4 nonogram from row and column clues.", "Resuelve un nonograma 4×4 con pistas de filas y columnas.", "Résous un nonogramme 4×4 grâce aux indices des lignes et colonnes.", "Risolvi un nonogramma 4×4 con gli indizi di righe e colonne."],
  helpEcho: ["Merke dir die Lichtfolge und wiederhole sie.", "Remember the light sequence and repeat it.", "Memoriza la secuencia de luces y repítela.", "Mémorise la séquence lumineuse et répète-la.", "Memorizza la sequenza luminosa e ripetila."],
  helpOrbit: ["Lenke die Sonde mit einem Impuls in die sichere Umlaufbahn.", "Guide the probe into a safe orbit with one gravity nudge.", "Guía la sonda hacia una órbita segura con un impulso.", "Guide la sonde vers une orbite sûre avec une impulsion.", "Guida la sonda in un’orbita sicura con un impulso."],
  helpComet: ["Wähle den Schub, der den Kometen am Ziel landen lässt.", "Choose the thrust that sends the comet closest to its target.", "Elige el impulso que acerque el cometa al objetivo.", "Choisis la poussée qui rapproche la comète de sa cible.", "Scegli la spinta che avvicina la cometa al bersaglio."],
  colorPrompt: ["Tippt die passende Farbe innerhalb des Zeitlimits.", "Tap the matching color before time runs out.", "Tocad el color correspondiente antes de que se acabe el tiempo.", "Touchez la couleur correspondante avant la fin du chrono.", "Toccate il colore corrispondente prima che scada il tempo."],
  wordPrompt: ["Findet das passende Wort, bevor die Zeit abläuft.", "Find the matching word before time runs out.", "Encontrad la palabra adecuada antes de que se acabe el tiempo.", "Trouvez le mot correspondant avant la fin du chrono.", "Trovate la parola corretta prima che scada il tempo."],
  CYAN: ["CYAN", "CYAN", "CIAN", "CYAN", "CIANO"],
  PINK: ["PINK", "PINK", "ROSA", "ROSE", "ROSA"],
  MINT: ["MINZE", "MINT", "MENTA", "MENTHE", "MENTA"],
  AMBER: ["BERNSTEIN", "AMBER", "ÁMBAR", "AMBRE", "AMBRA"],
  VIOLET: ["VIOLETT", "VIOLET", "VIOLETA", "VIOLET", "VIOLA"],
  RED: ["ROT", "RED", "ROJO", "ROUGE", "ROSSO"],
  BLUE: ["BLAU", "BLUE", "AZUL", "BLEU", "BLU"],
  YELLOW: ["GELB", "YELLOW", "AMARILLO", "JAUNE", "GIALLO"],
  GREEN: ["GRÜN", "GREEN", "VERDE", "VERT", "VERDE"],
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
  WARTERAUM: ["WARTERAUM", "WAITING ROOM", "SALA DE ESPERA", "SALLE D’ATTENTE", "SALA D’ATTESA"],
  SPIELAUSWAHL: ["SPIELAUSWAHL", "GAME SELECTION", "SELECCIÓN DE JUEGO", "CHOIX DU JEU", "SCELTA DEL GIOCO"],
  ANLEITUNG: ["ANLEITUNG", "TUTORIAL", "INSTRUCCIONES", "TUTORIEL", "ISTRUZIONI"],
  "RUNDE LÄUFT": ["RUNDE LÄUFT", "MATCH IN PROGRESS", "PARTIDA EN CURSO", "MANCHE EN COURS", "PARTITA IN CORSO"],
  BEENDET: ["BEENDET", "FINISHED", "FINALIZADA", "TERMINÉE", "TERMINATA"],
  "SPIELER 2": ["SPIELER 2", "PLAYER 2", "JUGADOR 2", "JOUEUR 2", "GIOCATORE 2"],
  "Spiel läuft": ["Spiel läuft", "Match in progress", "Partida en curso", "Partie en cours", "Partita in corso"],
  "noch offen": ["noch offen", "not selected", "sin elegir", "pas encore choisi", "non ancora scelto"],
  "Gegenstimme offen": ["Gegenstimme offen", "waiting for opponent", "falta el voto rival", "en attente du vote adverse", "in attesa del voto avversario"],
  "Beide Wahlen werden jetzt aufgedeckt.": ["Beide Wahlen werden jetzt aufgedeckt.", "Both choices are revealed now.", "Ahora se revelan ambas elecciones.", "Les deux choix sont révélés.", "Ora vengono rivelate entrambe le scelte."],
  "Dein Mitspieler hält — halte jetzt ebenfalls!": ["Dein Mitspieler hält — halte jetzt ebenfalls!", "Your opponent is holding — press and hold too!", "La otra persona está pulsando: ¡mantén pulsado también!", "L’autre joueur maintient — maintiens aussi !", "L’altro giocatore tiene premuto: fallo anche tu!"],
  "Dein Mitspieler ist am Zug": ["Dein Mitspieler ist am Zug", "Your opponent's turn", "Turno de la otra persona", "Au tour de l’autre joueur", "Turno dell’altro giocatore"],
  "Dein Zug": ["Dein Zug", "Your turn", "Tu turno", "À toi", "Il tuo turno"],
  "Deine Antwort bleibt verborgen, bis beide geantwortet haben.": ["Deine Antwort bleibt verborgen, bis beide geantwortet haben.", "Your answer stays hidden until both players have answered.", "Tu respuesta permanece oculta hasta que ambos respondan.", "Ta réponse reste cachée jusqu’à ce que les deux joueurs aient répondu.", "La tua risposta resta nascosta finché entrambi non hanno risposto."],
  "Deine Wahl ist geheim · warte auf den Mitspieler": ["Deine Wahl ist geheim · warte auf den Mitspieler", "Your pick is hidden · waiting for your opponent", "Tu elección está oculta · esperando a la otra persona", "Ton choix est caché · en attente de l’autre joueur", "La tua scelta è nascosta · in attesa dell’altro giocatore"],
  "Die andere Person ist am Zug.": ["Die andere Person ist am Zug.", "It is the other player's turn.", "Le toca a la otra persona.", "C’est au tour de l’autre joueur.", "È il turno dell’altro giocatore."],
  "Du bist am Zug.": ["Du bist am Zug.", "It is your turn.", "Te toca a ti.", "C’est ton tour.", "È il tuo turno."],
  "Du bist dran.": ["Du bist dran.", "Your turn.", "Te toca.", "À toi de jouer.", "Tocca a te."],
  "Du gewinnst diese Runde!": ["Du gewinnst diese Runde!", "You win this round!", "¡Ganas esta ronda!", "Tu remportes cette manche !", "Hai vinto questo round!"],
  "Runde beendet": ["Runde beendet", "Round over", "Ronda terminada", "Manche terminée", "Round finito"],
  "Wahl gespeichert · warte auf Mitspieler": ["Wahl gespeichert · warte auf Mitspieler", "Choice saved · waiting for opponent", "Elección guardada · esperando a la otra persona", "Choix enregistré · en attente de l’autre joueur", "Scelta salvata · in attesa dell’altro giocatore"],
  "Warte auf den Zug.": ["Warte auf den Zug.", "Waiting for the turn.", "Esperando el turno.", "En attente du tour.", "In attesa del turno."],
  "Wählt die Rechnung, deren Ergebnis dem Ziel am nächsten liegt.": ["Wählt die Rechnung, deren Ergebnis dem Ziel am nächsten liegt.", "Choose the calculation whose result is closest to the target.", "Elegid la operación cuyo resultado esté más cerca del objetivo.", "Choisissez le calcul dont le résultat est le plus proche de la cible.", "Scegliete il calcolo con il risultato più vicino al bersaglio."],
  "Wählt eure Antwort. Sobald beide geantwortet haben, geht es gemeinsam weiter.": ["Wählt eure Antwort. Sobald beide geantwortet haben, geht es gemeinsam weiter.", "Choose an answer. The next question starts once both have answered.", "Elegid una respuesta. La siguiente pregunta empieza cuando ambos respondan.", "Choisissez une réponse. La question suivante commence après les deux réponses.", "Scegliete una risposta. Si prosegue quando entrambi hanno risposto."],
  "Zug-Timeout: 45 Sekunden. Bei Verbindungsverlust verbindet sich der Browser automatisch erneut.": ["Zug-Timeout: 45 Sekunden. Bei Verbindungsverlust verbindet sich der Browser automatisch erneut.", "Turn timeout: 45 seconds. The browser reconnects automatically after a connection loss.", "Límite por turno: 45 segundos. El navegador se reconecta automáticamente si se pierde la conexión.", "Délai par tour : 45 secondes. Le navigateur se reconnecte automatiquement après une coupure.", "Timeout del turno: 45 secondi. Il browser si riconnette automaticamente dopo un’interruzione."],
  "kurze Runde · bei Abbruch könnt ihr jederzeit zurück": ["kurze Runde · bei Abbruch könnt ihr jederzeit zurück", "Short round · you can leave at any time", "Ronda corta · puedes salir cuando quieras", "Manche courte · vous pouvez quitter à tout moment", "Round breve · puoi uscire in qualsiasi momento"],
  "DEINE WAHL": ["DEINE WAHL", "YOUR PICK", "TU ELECCIÓN", "TON CHOIX", "LA TUA SCELTA"],
  "NEUE RUNDE": ["NEUE RUNDE", "NEW ROUND", "NUEVA RONDA", "NOUVELLE MANCHE", "NUOVO ROUND"],
  NOCHMAL: ["NOCHMAL", "PLAY AGAIN", "OTRA VEZ", "REJOUER", "ANCORA"],
  "NOCHMAL SPIELEN": ["NOCHMAL SPIELEN", "PLAY AGAIN", "JUGAR OTRA VEZ", "REJOUER", "GIOCA ANCORA"],
  "RUNDE BEENDET": ["RUNDE BEENDET", "ROUND OVER", "RONDA TERMINADA", "MANCHE TERMINÉE", "ROUND FINITO"],
  "MITSPIELER GEWINNT!": ["MITSPIELER GEWINNT!", "OPPONENT WINS!", "¡GANA LA OTRA PERSONA!", "L’AUTRE JOUEUR GAGNE !", "VINCE L’ALTRO GIOCATORE!"],
  UNENTSCHIEDEN: ["UNENTSCHIEDEN", "TIE", "EMPATE", "ÉGALITÉ", "PAREGGIO"],
  "ZEIT ABGELAUFEN": ["ZEIT ABGELAUFEN", "TIME'S UP", "TIEMPO AGOTADO", "TEMPS ÉCOULÉ", "TEMPO SCADUTO"],
  "⏳ WARTEN": ["⏳ WARTEN", "⏳ WAIT", "⏳ ESPERA", "⏳ ATTENDS", "⏳ ASPETTA"],
  "⚡ BEREIT?": ["⚡ BEREIT?", "⚡ READY?", "⚡ ¿LISTO?", "⚡ PRÊT ?", "⚡ PRONTO?"],
  "⚡ JETZT TIPPEN": ["⚡ JETZT TIPPEN", "⚡ TAP NOW", "⚡ TOCA YA", "⚡ TOUCHEZ MAINTENANT", "⚡ TOCCA ORA"],
  "⚡ JETZT!": ["⚡ JETZT!", "⚡ NOW!", "⚡ ¡YA!", "⚡ MAINTENANT !", "⚡ ORA!"],
  "🏆 GEWONNEN": ["🏆 GEWONNEN", "🏆 YOU WON", "🏆 HAS GANADO", "🏆 TU AS GAGNÉ", "🏆 HAI VINTO"],
  "💥 BOOM · BOMBE EXPLODIERT": ["💥 BOOM · BOMBE EXPLODIERT", "💥 BOOM · BOMB EXPLODED", "💥 ¡BOOM! · BOMBA EXPLOTADA", "💥 BOUM · LA BOMBE A EXPLOSÉ", "💥 BOOM · BOMBA ESPLOSA"],
  "💥 MITSPIELER EXPLODIERT · DU GEWINNST": ["💥 MITSPIELER EXPLODIERT · DU GEWINNST", "💥 OPPONENT EXPLODED · YOU WIN", "💥 LA OTRA PERSONA EXPLOTÓ · GANAS", "💥 L’AUTRE JOUEUR A EXPLOSÉ · TU GAGNES", "💥 L’ALTRO GIOCATORE È ESPLOSO · HAI VINTO"],
  STEIN: ["STEIN", "ROCK", "PIEDRA", "PIERRE", "SASSO"],
  PAPIER: ["PAPIER", "PAPER", "PAPEL", "FEUILLE", "CARTA"],
  SCHERE: ["SCHERE", "SCISSORS", "TIJERA", "CISEAUX", "FORBICI"],
  "⚡ REAKTOR": ["⚡ REAKTOR", "⚡ REACTOR", "⚡ REACTOR", "⚡ RÉACTEUR", "⚡ REATTORE"],
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
  authSlow: ["Die Verbindung dauert zu lange. Prüfe dein Internet und verbinde dich erneut.", "The connection is taking too long. Check your internet and retry.", "La conexión tarda demasiado. Comprueba internet e inténtalo de nuevo.", "La connexion prend trop de temps. Vérifie Internet et réessaie.", "La connessione richiede troppo tempo. Controlla Internet e riprova."],
  authRetry: ["NEU VERBINDEN", "RECONNECT", "VOLVER A CONECTAR", "SE RECONNECTER", "RICONNETTI"],
  gameNotReady: ["Dieses Spiel ist noch nicht für den Browser umgesetzt.", "This game is not available in the browser yet.", "Este juego aún no está disponible en el navegador.", "Ce jeu n’est pas encore disponible dans le navigateur.", "Questo gioco non è ancora disponibile nel browser."],
  shareCopied: ["LINK KOPIERT", "LINK COPIED", "ENLACE COPIADO", "LIEN COPIÉ", "LINK COPIATO"],
  queueWaitingTitle: ["Du bist in der Warteschlange", "You’re in the queue", "Estás en la cola", "Tu es dans la file d’attente", "Sei in coda"],
  queuePositionPending: ["Warteposition wird ermittelt …", "Finding your place in the queue …", "Buscando tu lugar en la cola …", "Recherche de ta place dans la file …", "Ricerca della posizione in coda …"],
  queueEtaPending: ["Geschätzte Zeit wird nach einigen abgeschlossenen Partien angezeigt. Aktualisierung etwa alle 15 Sekunden.", "An estimate will appear after a few matches finish. Updates about every 15 seconds.", "La estimación aparecerá cuando terminen algunas partidas. Se actualiza cada 15 segundos.", "Une estimation apparaîtra après quelques parties terminées. Mise à jour toutes les 15 secondes.", "La stima apparirà dopo alcune partite concluse. Aggiornamento ogni 15 secondi."],
  queueMatched: ["Spieler gefunden!", "Player found!", "¡Jugador encontrado!", "Joueur trouvé !", "Giocatore trovato!"],
  roomPreparing: ["Gemeinsamer Raum wird vorbereitet …", "Preparing your shared room …", "Preparando la sala compartida …", "Préparation de la salle commune …", "Preparazione della stanza condivisa …"],
  cancelSearchHint: ["Du kannst die Suche jederzeit abbrechen.", "You can cancel the search at any time.", "Puedes cancelar la búsqueda cuando quieras.", "Tu peux annuler la recherche à tout moment.", "Puoi annullare la ricerca in qualsiasi momento."],
  queueEnded: ["Spielersuche beendet", "Player search ended", "Búsqueda de jugador finalizada", "Recherche de joueur terminée", "Ricerca giocatore terminata"],
  queueSessionExpired: ["Deine Warteschlangen-Sitzung ist nicht mehr aktiv.", "Your queue session is no longer active.", "Tu sesión de cola ya no está activa.", "Ta session dans la file n’est plus active.", "La tua sessione in coda non è più attiva."],
  queueUnavailableNoPosition: ["Spielersuche gerade nicht erreichbar. Deine Position wird nicht behauptet.", "Player search is temporarily unavailable. No queue position is being claimed.", "La búsqueda no está disponible temporalmente. No se afirma ninguna posición en la cola.", "La recherche est temporairement indisponible. Aucune position n’est annoncée.", "La ricerca è temporaneamente non disponibile. Non viene indicata alcuna posizione."],
  tieExclamation: ["Unentschieden!", "It’s a tie!", "¡Empate!", "Égalité !", "Pareggio!"],
  simultaneous: ["Wählt gleichzeitig.", "Choose at the same time.", "Elegid al mismo tiempo.", "Choisissez en même temps.", "Scegliete nello stesso momento."],
};

const languageCodes = ["de", "en", "es", "fr", "it"];
const sourceToKey = new Map(Object.entries(messages).map(([key, values]) => [values[0], key]));
const dynamicMessages = [
  [/^DU BIST DRAN · (\d+) s$/, ["DU BIST DRAN · {0} s", "YOUR TURN · {0}s", "TE TOCA · {0} s", "À TOI · {0} s", "TOCCA A TE · {0} s"]],
  [/^Bereit: (\d+) \/ 2$/, ["Bereit: {0} / 2", "Ready: {0} / 2", "Listos: {0} / 2", "Prêts : {0} / 2", "Pronti: {0} / 2"]],
  [/^15 Sekunden pro Rätsel · 5 Rätsel$/, ["15 Sekunden pro Rätsel · 5 Rätsel", "15 seconds per puzzle · 5 puzzles", "15 segundos por reto · 5 retos", "15 secondes par défi · 5 défis", "15 secondi per enigma · 5 enigmi"]],
  [/^RÄTSEL (\d+)\/5 · (\d+)s$/, ["RÄTSEL {0}/5 · {1}s", "PUZZLE {0}/5 · {1}s", "RETO {0}/5 · {1}s", "DÉFI {0}/5 · {1}s", "ENIGMA {0}/5 · {1}s"]],
  [/^Du (\d+)\/5 · Mitspieler (\d+)\/5$/, ["Du {0}/5 · Mitspieler {1}/5", "You {0}/5 · Opponent {1}/5", "Tú {0}/5 · Rival {1}/5", "Toi {0}/5 · Autre joueur {1}/5", "Tu {0}/5 · Avversario {1}/5"]],
  [/^Mitspieler ist dran · (\d+) s$/, ["Mitspieler ist dran · {0} s", "OPPONENT'S TURN · {0}s", "TURNO DE LA OTRA PERSONA · {0} s", "TOUR DE L’AUTRE JOUEUR · {0} s", "TURNO DELL’ALTRO GIOCATORE · {0} s"]],
  [/^Deine Paare: (\d+) · Mitspieler: (\d+)$/, ["Deine Paare: {0} · Mitspieler: {1}", "Your pairs: {0} · Opponent: {1}", "Tus parejas: {0} · Otra persona: {1}", "Tes paires : {0} · Autre joueur : {1}", "Le tue coppie: {0} · Altro giocatore: {1}"]],
  [/^FRAGE (\d+)\/5 · (\d+) s$/, ["FRAGE {0}/5 · {1} s", "QUESTION {0}/5 · {1}s", "PREGUNTA {0}/5 · {1} s", "QUESTION {0}/5 · {1} s", "DOMANDA {0}/5 · {1} s"]],
  [/^Antwort gespeichert · warte auf Mitspieler · Frage (\d+)\/5$/, ["Antwort gespeichert · warte auf Mitspieler · Frage {0}/5", "Answer saved · waiting for opponent · question {0}/5", "Respuesta guardada · esperando a la otra persona · pregunta {0}/5", "Réponse enregistrée · attente de l’autre joueur · question {0}/5", "Risposta salvata · in attesa dell’altro giocatore · domanda {0}/5"]],
  [/^Antwort gespeichert · Runde (\d+)\/5$/, ["Antwort gespeichert · Runde {0}/5", "Answer saved · round {0}/5", "Respuesta guardada · ronda {0}/5", "Réponse enregistrée · manche {0}/5", "Risposta salvata · round {0}/5"]],
  [/^Runde (\d+) · Deine Wahl bleibt bis zur Gegenstimme geheim\.$/, ["Runde {0} · Deine Wahl bleibt bis zur Gegenstimme geheim.", "Round {0} · Your pick stays hidden until the other player answers.", "Ronda {0} · Tu elección seguirá oculta hasta que responda la otra persona.", "Manche {0} · Ton choix reste caché jusqu’à la réponse de l’autre joueur.", "Round {0} · La tua scelta resta nascosta finché non risponde l’altro giocatore."]],
  [/^Runde (\d+) · Entscheidet euch unabhängig voneinander\.$/, ["Runde {0} · Entscheidet euch unabhängig voneinander.", "Round {0} · Choose independently.", "Ronda {0} · Elegid por separado.", "Manche {0} · Choisissez chacun de votre côté.", "Round {0} · Scegliete senza influenzarvi."]],
  [/^Du: (.+) · Mitspieler: (.+)$/, ["Du: {0} · Mitspieler: {1}", "You: {0} · Opponent: {1}", "Tú: {0} · Otra persona: {1}", "Toi : {0} · Autre joueur : {1}", "Tu: {0} · Altro giocatore: {1}"]],
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
  [/^Dein Mitspieler war schneller\.$/, ["Dein Mitspieler war schneller.", "Your opponent was faster.", "La otra persona fue más rápida.", "L’autre joueur a été plus rapide.", "L’altro giocatore è stato più veloce."]],
  [/^Kappe das (RED|BLUE|YELLOW|GREEN)-Kabel · Fehler (\d+)\/3$/, ["Kappe das {0}-Kabel · Fehler {1}/3", "Cut the {0} wire · mistakes {1}/3", "Corta el cable {0} · errores {1}/3", "Coupe le câble {0} · erreurs {1}/3", "Taglia il cavo {0} · errori {1}/3"]],
  [/^Weitergegeben: (\d+) mal\.$/, ["Weitergegeben: {0} mal.", "Passed: {0} times.", "Pasada: {0} veces.", "Passée : {0} fois.", "Passata: {0} volte."]],
  [/^NOCH (\d+(?:\.\d+)?) SEKUNDEN$/, ["NOCH {0} SEKUNDEN", "{0} SECONDS LEFT", "QUEDAN {0} SEGUNDOS", "ENCORE {0} SECONDES", "ANCORA {0} SECONDI"]],
  [/^START IN (\d+)$/, ["START IN {0}", "STARTS IN {0}", "EMPIEZA EN {0}", "DÉPART DANS {0}", "INIZIA TRA {0}"]],
  [/^Start (\d+) s$/, ["Start {0} s", "Starting in {0}s", "Empieza en {0} s", "Départ dans {0} s", "Si parte tra {0} s"]],
  [/^⚡ (\d+) TAPS$/, ["⚡ {0} TAPS", "⚡ {0} TAPS", "⚡ {0} TOQUES", "⚡ {0} TAPS", "⚡ {0} TOCCHI"]],
  [/^Deine (\d+) Taps sind gespeichert · warte auf die andere Person\.$/, ["Deine {0} Taps sind gespeichert · warte auf die andere Person.", "Your {0} taps are saved · waiting for the other player.", "Tus {0} toques están guardados · esperando a la otra persona.", "Tes {0} taps sont enregistrés · en attente de l’autre joueur.", "I tuoi {0} tocchi sono salvati · in attesa dell’altro giocatore."]],
  [/^Feld (\d+)(?:: ([XO]))?$/, ["Feld {0}{1}", "Cell {0}{1}", "Casilla {0}{1}", "Case {0}{1}", "Casella {0}{1}"]],
  [/^Reihe (\d+), Spalte (\d+)$/, ["Reihe {0}, Spalte {1}", "Row {0}, column {1}", "Fila {0}, columna {1}", "Ligne {0}, colonne {1}", "Riga {0}, colonna {1}"]],
  [/^Bereit: (\d+) \/ 2$/, ["Bereit: {0} / 2", "Ready: {0} / 2", "Listos: {0} / 2", "Prêts : {0} / 2", "Pronti: {0} / 2"]],
  [/^(\d+) Weitergaben$/, ["{0} Weitergaben", "{0} passes", "{0} pases", "{0} passes", "{0} passaggi"]],
];
const voteSummaryMessages = [
  "Deine Wahl: {0} · {1}", "Your vote: {0} · {1}", "Tu voto: {0} · {1}", "Ton vote : {0} · {1}", "Il tuo voto: {0} · {1}",
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
    const vote = source.trim().match(/^Deine Wahl: (.+) · (.+)$/);
    if (vote) {
      const translated = voteSummaryMessages[index].replace("{0}", translateWebText(vote[1], lang)).replace("{1}", translateWebText(vote[2], lang));
      const startVote = source.indexOf(source.trim());
      return `${source.slice(0, startVote)}${translated}${source.slice(startVote + source.trim().length)}`;
    }
    const dynamic = dynamicMessages.find(([pattern]) => pattern.test(source.trim()));
    if (!dynamic) return text;
    const match = source.trim().match(dynamic[0]);
    const translatedDynamic = dynamic[1][index].replace(/\{(\d+)\}/g, (_, slot) => {
      const value = match[Number(slot) + 1] ?? "";
      if (dynamic[0].source.startsWith("^Kappe das")) return messages[value]?.[index] ?? translateWebText(value, lang);
      if (dynamic[0].source.startsWith("^Feld") && slot === "1" && value) return `: ${value}`;
      return value;
    });
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
        const translated = translateWebText(node.getAttribute(sourceAttribute), language);
        if (node.getAttribute(attribute) !== translated) node.setAttribute(attribute, translated);
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
