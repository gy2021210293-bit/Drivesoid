'use strict';
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app  = express();
app.use(express.json());

const ROOT        = path.join(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, 'drives.config.json');
const ENV_PATH    = path.join(ROOT, '.env');
const SETUP_PORT  = parseInt(process.env.DRIVESOID_SETUP_PORT || process.env.PORT || '24601', 10);

// In cloud deployments (Zeabur, Railway, etc.), requests arrive through a reverse proxy
// so loopback-only checks would block all traffic. Set DRIVESOID_ALLOW_REMOTE=1 to bypass.
function loopbackOnly(req, res, next) {
  if (process.env.DRIVESOID_ALLOW_REMOTE === '1') return next();
  const addr = req.socket.remoteAddress;
  if (addr === '127.0.0.1' || addr === '::1' || addr === '::ffff:127.0.0.1') return next();
  res.status(403).json({ error: 'loopback only' });
}

function needsSetup() {
  if (!fs.existsSync(CONFIG_PATH)) return true;
  let keyEnv = 'DRIVES_API_KEY';
  try {
    const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    keyEnv = cfg.classifier?.api_key_env || keyEnv;
  } catch {}
  const key = process.env[keyEnv] || '';
  return !key || key === 'your_api_key_here';
}
