# Drivesoid — Cloud Deployment (Zeabur)

This branch adds cloud deployment support via a `postinstall` patch.

## What it changes

1. **Bind to `0.0.0.0`** instead of `127.0.0.1` — required for cloud platforms to accept external traffic
2. **`DRIVESOID_ALLOW_REMOTE=1`** — bypasses the `loopbackOnly` middleware so internal API endpoints work through the reverse proxy
3. **`PORT` env var fallback** — `SETUP_PORT` now falls back to `process.env.PORT` (the standard cloud platform port variable)

## Zeabur Setup

### Environment Variables

| Variable | Value | Required |
|---|---|---|
| `DRIVES_API_KEY` | Your DeepSeek API key (`sk-...`) | ✅ |
| `DRIVESOID_ALLOW_REMOTE` | `1` | ✅ |
| `PORT` | `24601` | ✅ (set in Zeabur networking) |

### HTTP Port

Set the HTTP port to **24601** in Zeabur's networking settings.

### First-time Setup

After deployment, visit `https://your-app.zeabur.app/setup` to complete the one-time configuration.

After setup, the dashboard will be at `https://your-app.zeabur.app/dashboard`.
