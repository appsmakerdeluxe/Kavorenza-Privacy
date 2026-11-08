import test from 'node:test';
import assert from 'node:assert/strict';
import { serviceMessage } from '../firebase-public/service-state.js';

test('temporary Firestore quota/network failures never imply a real queue position', () => {
  for (const code of ['unavailable', 'resource-exhausted', 'deadline-exceeded', 'network-request-failed', 'aborted']) {
    const message = serviceMessage({ code: `firestore/${code}` });
    assert.match(message, /nicht in einer Warteschlange/);
    assert.match(message, /verlasse die Sitzung/);
  }
});

test('permanent errors remain actionable and English copy is localized', () => {
  assert.equal(serviceMessage({ code: 'permission-denied', message: 'Zugriff verweigert' }), 'Zugriff verweigert');
  assert.match(serviceMessage({ code: 'firestore/unavailable' }, 'en'), /not queued yet/);
});
