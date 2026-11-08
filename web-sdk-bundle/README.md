# Firebase browser SDK bundle

The static Firebase Hosting client bundles the official modular Firebase JavaScript SDK locally. This avoids a hard dependency on loading executable SDK modules from `gstatic.com` at runtime, which otherwise can leave the UI in an endless sign-in preparation state on restricted or slow networks. Firebase SDK 12.19.0 also includes the official Auth persistence fallback for inaccessible storage and initialization deadlocks.

Rebuild after changing the Firebase SDK version or exports:

```powershell
npm ci --prefix web-sdk-bundle
npm run build --prefix web-sdk-bundle
```

The generated `firebase-public/firebase-sdk.bundle.js` is deployed with the static site. Firebase JavaScript SDK is distributed under Apache-2.0; the bundler preserves its license comments in the adjacent `.LEGAL.txt` file. `esbuild` is a build-only dependency and is not shipped as runtime code.
