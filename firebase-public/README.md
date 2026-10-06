# Kavorenza browser test player

This static Firebase Hosting page is a lightweight cross-platform test client for Kavorenza.

## Current scope

- Anonymous Firebase Authentication; no email, phone number, contacts, location, ads, or analytics.
- Create a room or join by six-character code / invitation link; room capacity is two players.
- Shared game voting, a per-match tutorial, both players' ready confirmations, live presence, refresh recovery, and reconnect/leave controls.
- Tic Tac Toe is the only game currently playable from a browser. Other game cards stay disabled until their web controls and game-specific state are implemented. Android currently offers the full game catalog.

The Firebase Web API key in the client configuration is a public app identifier, not an Admin/service-account credential. Never put a Firebase Admin key, Play key, keystore, or password in this folder. Firestore access is controlled by the deployed Security Rules.

## Local preview and deploy

Use the repository's `firebase.json` and `.firebaserc`; serve this directory locally, then verify create/join, voting, tutorial/readiness, Tic Tac Toe moves, and reconnect before deployment. Deploy the Hosting target with:

```powershell
firebase deploy --only hosting --project kavorenza-1
```

The deployed address is `https://kavorenza-1.web.app/`. Keep the Firebase project on the no-cost Spark plan; do not link a Cloud Billing account or enable Blaze. Hosting has project-level no-cost quotas, so monitor usage and pause deploys if limits are reached rather than upgrading.

Rooms and child documents carry expiry metadata. Native Firestore TTL is intentionally not enabled; the private Kavorenza repository's scheduled cleanup job removes expired room trees every six hours.
