import assert from 'node:assert/strict';
import { access, readFile, stat } from 'node:fs/promises';
import test from 'node:test';
import { GAME_MUSIC_TRACKS, nextMusicTrackIndex } from '../firebase-public/music-tracks.js';

test('browser audio catalog contains 15 unique, locally hosted commercial-safe source tracks', async () => {
  assert.equal(GAME_MUSIC_TRACKS.length, 15);
  assert.equal(new Set(GAME_MUSIC_TRACKS).size, 15);
  for (const track of GAME_MUSIC_TRACKS) {
    const path = new URL(`../firebase-public/audio/${track}`, import.meta.url);
    await access(path);
    assert.ok((await stat(path)).size > 0, `${track} is not empty`);
  }
});

test('browser music selection never repeats the immediately previous track', () => {
  const sameTrack = () => 0;
  assert.equal(nextMusicTrackIndex(0, sameTrack), 1);
  assert.equal(nextMusicTrackIndex(14, () => 14 / 15), 0);
  assert.equal(nextMusicTrackIndex(4, () => 7 / 15), 7);
});

test('browser music is only synchronized for active matches and exposes separate opt-out controls', async () => {
  const html = await readFile(new URL('../firebase-public/index.html', import.meta.url), 'utf8');
  assert.match(html, /id="gameMusic" loop preload="none"/);
  assert.match(html, /id="musicToggle"[^>]*aria-pressed/);
  assert.match(html, /id="sfxToggle"[^>]*aria-pressed/);
  assert.match(html, /room\?\.status==='playing'&&!!room\.matchId/);
  assert.match(html, /audio\.pause\(\)/);
  assert.match(html, /localStorage\.setItem\('kavorenza_music_enabled'/);
  assert.match(html, /localStorage\.setItem\('kavorenza_sfx_enabled'/);
});
