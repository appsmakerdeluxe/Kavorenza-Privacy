export const GAME_MUSIC_TRACKS = Object.freeze([
  'music_bugmintide.mp3',
  'music_determinedstart.mp3',
  'music_europaice.mp3',
  'music_europaice_extended.mp3',
  'music_orientalparty.mp3',
  'music_sewercity.mp3',
  'music_spacerangers.mp3',
  'music_staringatreflections.mp3',
  'music_suspended.mp3',
  'music_sweettalk.mp3',
  'music_thedivineelf.mp3',
  'music_unease.mp3',
  'rpg_11_setback.wav',
  'rpg_12_darkwood.wav',
  'rpg_4_adventure.wav',
]);

export function nextMusicTrackIndex(lastIndex, random = Math.random) {
  const count = GAME_MUSIC_TRACKS.length;
  const selected = Math.min(count - 1, Math.floor(random() * count));
  return count > 1 && selected === lastIndex ? (selected + 1) % count : selected;
}
