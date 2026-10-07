import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { transform } from "esbuild";

const htmlUrl = new URL("../firebase-public/index.html", import.meta.url);

test("Firebase-hosted player page exposes a complete two-player cross-platform flow", async () => {
  const html = await readFile(htmlUrl, "utf8");
  for (const id of ["home", "createBtn", "showJoinBtn", "room", "voteCard", "readyCard", "gameCard", "connectionError", "queueScreen", "quickMatchBtn"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`), `missing UI element ${id}`);
  }
  assert.match(html, /Firebase Anonymous Auth/);
  assert.match(html, /maxPlayers:2/);
  assert.match(html, /onAuthStateChanged/);
  assert.match(html, /beforeunload/);
  for (const game of ["tic_tac_toe", "reflex", "connect_four", "code_breaker", "rock_paper", "number_target", "color_rush", "word_sprint", "emoji_memory", "cyber_tap", "bomb_party", "chooser", "would_you_rather"]) {
    assert.ok(html.includes(`'${game}'`), `missing browser game ${game}`);
  }
  assert.match(html, /MATCHMAKER_URL/);
  assert.match(html, /position.*queueSize/);
  assert.match(html, /queueApi\('cancel'/);
});

test("Firebase-hosted inline module parses and includes no server credential material", async () => {
  const html = await readFile(htmlUrl, "utf8");
  const marker = '<script type="module">';
  const start = html.indexOf(marker);
  const end = html.indexOf("</script>", start);
  assert.ok(start >= 0 && end > start, "inline app module exists");
  await transform(html.slice(start + marker.length, end), { loader: "js", target: "es2022" });
  assert.doesNotMatch(html, /BEGIN PRIVATE KEY|service_account|firebase-adminsdk/);
});

test("browser page includes a persistent five-language picker and runtime translator", async () => {
  const html = await readFile(htmlUrl, "utf8");
  const translator = await readFile(new URL("../firebase-public/web-i18n.js", import.meta.url), "utf8");
  for (const language of ["de", "en", "es", "fr", "it"]) {
    assert.match(html, new RegExp(`<option value="${language}">`));
  }
  assert.match(html, /installWebLocalization\(document/);
  assert.match(translator, /kavorenza_language/);
  assert.match(translator, /new MutationObserver/);
});

test("browser game picker describes the current 23-game catalogue without stale counts", async () => {
  const html = await readFile(htmlUrl, "utf8");
  const translator = await readFile(new URL("../firebase-public/web-i18n.js", import.meta.url), "utf8");
  assert.match(html, /Alle 23 Mini-Spiele sind im Browser spielbar\./);
  assert.match(translator, /All 23 mini-games are playable in the browser\./);
  assert.doesNotMatch(html + translator, /13 Spiele|13 games|13 juegos|13 jeux|13 giochi/);
});

test("audio controls live in a global settings dialog, never inside the game surface", async () => {
  const html = await readFile(htmlUrl, "utf8");
  const gameCard = html.match(/<section id="gameCard"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.ok(gameCard, "game surface exists");
  assert.doesNotMatch(gameCard, /audioControls|musicToggle|sfxToggle/);
  assert.match(html, /<dialog id="settingsDialog"/);
  assert.match(html, /id="settingsOpen"/);
  assert.match(html, /<dialog id="settingsDialog"[\s\S]*?<select id="languageSelect"/);
  assert.doesNotMatch(html.match(/<div class="languageRow">[\s\S]*?<\/div><\/div>/)?.[0] ?? "", /languageSelect/);
  assert.match(html, /showModal\(\)/);
  const translator = await readFile(new URL("../firebase-public/web-i18n.js", import.meta.url), "utf8");
  for (const key of ["audioSettingsButton", "audioSettingsHint", "closeDialog"]) assert.match(translator, new RegExp(`${key}: \\[`));
  assert.match(translator, /Changes apply instantly, including during a match\./);
});

test("Echo Wave hides its answer sequence and unlocks picks only after the reveal window", async () => {
  const html = await readFile(htmlUrl, "utf8");
  assert.match(html, /NEW_MINIGAME_ECHO_REVEAL_MS/);
  assert.match(html, /button\.disabled = button\.disabled \|\| !echoReady/);
  assert.match(html, /button\.disabled = newMiniBusy/);
  assert.match(html, /Sequence memorized · repeat it now/);
});

test("Switchstorm renders an interactive Lights Out board and submits its full press mask", async () => {
  const html = await readFile(htmlUrl, "utf8");
  assert.match(html, /switchstormDraftMask \^= 1 << cell/);
  assert.match(html, /className = 'switchstormBoard'/);
  assert.match(html, /submitMove\('pick',\{value:String\(switchstormDraftMask\),round:mine\.length\}\)/);
  assert.match(html, /Every switch flips itself and its neighbors/);
  assert.doesNotMatch(html.match(/function renderNewMiniGame\(game\)[\s\S]*?const renderNewMiniGameBase/)?.[0] ?? "", /switchstorm target module/);
});

test("Prism Relay ray-traces a live four-mirror board around the center blocker", async () => {
  const html = await readFile(htmlUrl, "utf8");
  assert.match(html, /prismRelayDraftMask\^=1<<slot/);
  assert.match(html, /className='prismRelayBoard'/);
  assert.match(html, /prismRelayReachesGoal\(roomSeed\(\),mine\.length,prismRelayDraftMask\)/);
  assert.match(html, /prismRelaySolutionMask/);
  assert.match(html, /submitMove\('pick',\{value:String\(prismRelayDraftMask\),round:mine\.length\}\)/);
});

test("Shape Shift rotates a player-controlled silhouette and submits the selected angle", async () => {
  const html = await readFile(htmlUrl, "utf8");
  assert.match(html, /shapeShiftDraft=\(shapeShiftDraft\+delta\)%4/);
  assert.match(html, /style\.transform=`rotate\(\$\{shapeShiftDraft\*90\}deg\)`/);
  assert.match(html, /submitMove\('pick',\{value:String\(shapeShiftDraft\),round:mine\.length\}\)/);
  assert.match(html, /className='shapeShiftPanel'/);
});

test("Maze Courier renders a navigable grid, legal direction controls and route confirmation", async () => {
  const html = await readFile(htmlUrl, "utf8");
  assert.match(html, /mazeCourierCanMove\(roomSeed\(\),mine\.length,current,direction\)/);
  assert.match(html, /className='mazeCourierBoard'/);
  assert.match(html, /mazeCourierDraftPath\.push\(direction\)/);
  assert.match(html, /mazeCourierEncode\(mazeCourierDraftPath\)/);
  assert.match(html, /current!==8\|\|mazeCourierDraftPath\.length!==4/);
  assert.match(html, /text\('START','START','INICIO','DÉPART','PARTENZA'\)/);
  assert.match(html, /text\('ZIEL','EXIT','META','SORTIE','ARRIVO'\)/);
});

test("Cargo Sort requires assigning every crate to a distinct bay before shipping", async () => {
  const html = await readFile(htmlUrl, "utf8");
  assert.match(html, /cargoSortDraft=cargoSortDraft\.map\(\(current,index\)=>index===cargoSortSelected\?bay:current\)/);
  assert.match(html, /className='cargoSortCrates'/);
  assert.match(html, /className='cargoSortBays'/);
  assert.match(html, /cargoSeal/);
  assert.match(html, /targetBays\[crate\]/);
  assert.match(html, /new Set\(cargoSortDraft\)\.size===3/);
  assert.match(html, /cargoSortEncode\(cargoSortDraft\)/);
});

test("Orbit Rescue builds and submits a three-burn orbit instead of a generic option list", async () => {
  const html = await readFile(htmlUrl, "utf8");
  assert.match(html, /className='orbitTrace'/);
  assert.match(html, /className='orbitBurns'/);
  assert.match(html, /orbitDraft\.push\(direction\)/);
  assert.match(html, /orbitRescueEncode\(orbitDraft\)/);
});

test("Tower Balance and Comet Curling expose dedicated adjustment controls and themed tracks", async () => {
  const html = await readFile(htmlUrl, "utf8");
  assert.match(html, /className='balanceRig'/);
  assert.match(html, /balanceDraft-target/);
  assert.match(html, /className='cometTrack'/);
  assert.match(html, /cometDraft\+delta/);
});

test("Pixel Forge renders its four-by-four nonogram from row and column clues", async () => {
  const html = await readFile(htmlUrl, "utf8");
  assert.match(html, /pixelForgeDraftMask\^=1<<cell/);
  assert.match(html, /board\.className = 'pixelForgeBoard'/);
  assert.match(html, /pixelForgeTargetMask\(roomSeed\(\), mine\.length\)/);
  assert.match(html, /submitMove\('pick',\{value:String\(pixelForgeDraftMask\),round:mine\.length\}\)/);
  assert.match(html, /ROWS \$\{rows\.join\(' · '\)\}\s+\/\s+COLUMNS/);
});

test("Echo Wave renders an ordered memory sequence with a short reveal and ordered submission", async () => {
  const html = await readFile(htmlUrl, "utf8");
  assert.match(html, /echoWaveSequence\(roomSeed\(\),mine\.length\)/);
  assert.match(html, /echoWaveDraft\.push\(color\)/);
  assert.match(html, /echoWaveEncode\(echoWaveDraft\)/);
  assert.match(html, /querySelectorAll\('\.echoWavePad'\)/);
  assert.match(html, /NEW_MINIGAME_ECHO_REVEAL_MS/);
});

test("Memory renderer streams each revealed card and only the shared resolve hides a mismatch", async () => {
  const html = await readFile(htmlUrl, "utf8");
  const start = html.indexOf("renderEmojiMemory = function renderEmojiMemoryV2()");
  const end = html.indexOf("\n  };", start);
  assert.ok(start >= 0 && end > start, "active Memory renderer exists");
  const renderer = html.slice(start, end);
  assert.match(renderer, /submitMove\('pick',\{value:`card:\$\{index\}`\}\)/);
  assert.match(renderer, /state\.pending\.length===2/);
  assert.match(renderer, /submitMove\('pick',\{value:'resolve'\}/);
  assert.doesNotMatch(renderer, /memoryMismatchTimer===null\?\[\]:state\.visible/);
});

test("presence and queue heartbeats stay below chatty polling intervals", async () => {
  const html = await readFile(htmlUrl, "utf8");
  assert.match(html, /refreshConnectionWarning\(\)\},60000\)/);
  assert.match(html, /Date\.now\(\)-lastSeen>120000/);
  assert.match(html, /queueHeartbeatTimer=setInterval\(\(\)=>\{if\(queueSocket\?\.readyState===WebSocket\.OPEN\)queueSocket\.send\('heartbeat'\)\},90000\)/);
});
