const TEMPORARY_CODES = new Set([
  'unavailable',
  'resource-exhausted',
  'deadline-exceeded',
  'network-request-failed',
  'aborted',
]);

export function serviceMessage(error, locale = 'de') {
  const code = String(error?.code || '').split('/').at(-1).toLowerCase();
  if (!TEMPORARY_CODES.has(code)) return error?.message || String(error || 'Unbekannter Fehler');
  if (locale === 'en') {
    return 'Kavorenza is temporarily busy or offline. Your room is not queued yet. Retry in a moment, or leave the session.';
  }
  return 'Kavorenza ist gerade ausgelastet oder offline. Du bist noch nicht in einer Warteschlange. Versuche es gleich erneut oder verlasse die Sitzung.';
}
