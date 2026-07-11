# Drivesoid — Cloud Deployment (Zeabur)

This fork adds cloud deployment support via a `postinstall` patch.

## What it changes

Three patches applied automatically via `scripts/cloud-patch.sh` at `npm install` time:

1. **Bind to `0.0.0.0`** instead of `127.0.0.1` — required for cloud platforms to accept external traffic
2. **`DRIVESOID_ALLOW_REMOTE=1`** — bypasses the `loopbackOnly` middleware so internal API endpoints work through the reverse proxy
3. **`PORT` env var fallback** — `SETUP_PORT` now falls back to `process.env.PORT` (the standard cloud platform port variable)

## Zeabur Setup

### 1. Deploy from GitHub

Point Zeabur to your forked repo, branch `main`.

### 2. Environment Variables

In Zeabur → Project → Variables, add:

| Variable | Value | Required |
|---|---|---|
| `DRIVES_API_KEY` | Your DeepSeek API key (`sk-...`) | ✅ |
| `DRIVESOID_ALLOW_REMOTE` | `1` | ✅ |

### 3. HTTP Port

In Zeabur → Networking, set the HTTP port to **24601**.

### 4. First-time Setup

After deployment succeeds, visit:

```
https://your-app.zeabur.app/setup
```

Fill in the form (AI name, your name, relationship, timezone, API key) and submit.

### 5. Dashboard

After setup, the dashboard is at:

```
https://your-app.zeabur.app/dashboard
```

You can see all 16 emotional dimensions updating in real-time.
