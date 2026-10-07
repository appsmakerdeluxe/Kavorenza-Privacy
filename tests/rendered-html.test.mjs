import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { transform } from "esbuild";

const htmlUrl = new URL("../firebase-public/index.html", import.meta.url);

test("Firebase-hosted player page exposes a complete two-player cross-platform flow", async () => {
  const html = await readFile(htmlUrl, "utf8");
  for (const id of ["home", "createBtn", "showJoinBtn", "room", "voteCard", "readyCard", "gameCard", "connectionError", "queueScreen", "quickMatchBtn"]) {
    assert.match(html, new RegExp(`id=[\"']${id}[\"']`), `missing UI element ${id}`);
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
