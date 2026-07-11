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

// In cloud deployments (Zeabur, Railway, etc.), requests come through a reverse proxy
// so loopback-only checks would block all traffic. Use DRIVESOID_ALLOW_REMOTE=1 to disable.
function loopbackOnly(req, res, next) {
  if (process.env.DRIVESOID_ALLOW_REMOTE === '1') return next();
  const addr = req.socket.remoteAddress;
  if (addr === '127.0.0.1' || addr === '::1' || addr === '::ffff:127.0.0.1') return next();
  res.status(403).json({ error: 'loopback only' });
}
