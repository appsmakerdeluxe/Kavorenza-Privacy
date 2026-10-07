# Kavorenza browser player

This static Firebase Hosting page is the browser client for Kavorenza. It can create or join a two-player room and play the same 13-game catalog as the Android client. Web and Android clients share room state and moves through Firestore.

## Current scope

- Anonymous Firebase Authentication; no email, phone number, contacts, location, ads, or analytics.
- Create a room or join by six-character code / invitation link; room capacity is two players.
- Shared game voting, a per-match tutorial, both players' ready confirmations, live presence, refresh recovery, and reconnect/leave controls.
- All 13 catalog games have browser controls and deterministic rules shared with the Android game model: Tic Tac Toe, Reflex Duel, Connect Four, Rock Paper Glow, Decision Blitz, Would You Rather, Bomb Party, Cyber Tap Rush, Number Target, Color Rush, Word Sprint, Emoji Memory, and Speed Quiz.
- A persistent language selector supports German, English, Spanish, French, and Italian. Shared room/voting/readiness controls, audio labels, catalogue copy, tutorials, quiz questions, all 36 Would You Rather prompts, Color Rush, Word Sprint, core play instructions, round counters/scores, and common room/reconnect errors are localized. Remaining game-specific result states, timeout details, and error messages still need translation and visual verification.
- A game proposal is confirmed by the other player; both players must confirm the short tutorial before a match starts. Each game applies its own turn/rundown timeout and exposes reconnect/leave actions.
- Optional background music and sound effects run only during a match. The player can switch them off at any time; the browser randomly selects from 15 locally hosted licensed tracks and avoids repeating the previous track.
- The optional global matchmaking client is hidden unless a public Worker endpoint is explicitly configured. It is currently not deployed; room-code invitations work without it.

The Firebase Web API key in the client configuration is a public app identifier, not an Admin/service-account credential. Never put a Firebase Admin key, Play key, keystore, or password in this folder. Firestore access is controlled by the deployed Security Rules.

## Local preview and deploy

Use the repository's `firebase.json` and `.firebaserc`; serve this directory locally, then verify create/join, game proposal, both tutorial confirmations, representative game moves, refresh recovery, and reconnect before deployment. The offline Node tests cover reducers for all 13 games, cross-player state agreement, Memory timeout/reveal behavior, and room cleanup. A passing reducer test does not replace a live two-client Firestore test. Deploy the Hosting target with:

```powershell
firebase deploy --only hosting --project kavorenza-1
```

The deployed address is `https://kavorenza-1.web.app/`. Keep the Firebase project on the no-cost Spark plan; do not link a Cloud Billing account or enable Blaze. Hosting has project-level no-cost quotas, so monitor usage and pause deploys if limits are reached rather than upgrading.

For an explicit live backend smoke test, run `node scripts/live-firestore-two-player-smoke.mjs` from the repository root. It creates two anonymous test users and one uniquely named room, tests room join/readiness/move-write/read access for every game ID, and attempts to remove the temporary room and accounts in `finally`. It uses only the public web API configuration and short-lived ID tokens in process memory; it never reads or needs a service-account key. Do not run repeatedly in a loop because anonymous sign-in has Firebase quota limits. The test checks Firestore security-rule and shared-history behavior; it is not a visual UI test or a substitute for Android device QA.

Rooms and child documents carry expiry metadata. Native Firestore TTL is intentionally not enabled; the private Kavorenza repository's scheduled cleanup job removes expired room trees every six hours.
