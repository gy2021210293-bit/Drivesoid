#!/bin/sh
# Patch server.js for cloud deployment (Zeabur/Railway)
# - Bind to 0.0.0.0 instead of 127.0.0.1
# - Add DRIVESOID_ALLOW_REMOTE=1 support to loopbackOnly
# - Fallback to PORT env var

FILE="src/server.js"

if [ ! -f "$FILE" ]; then
  echo "[patch] $FILE not found, skipping"
  exit 0
fi

# 1. SETUP_PORT: add PORT fallback
sed -i "s|process.env.DRIVESOID_SETUP_PORT || '24601'|process.env.DRIVESOID_SETUP_PORT || process.env.PORT || '24601'|g" "$FILE"

# 2. loopbackOnly: add DRIVESOID_ALLOW_REMOTE bypass
sed -i '/^function loopbackOnly/,/^}/ {
  /^function loopbackOnly/a\  if (process.env.DRIVESOID_ALLOW_REMOTE === '\''1'\'') return next();
}' "$FILE"

# 3. Bind to 0.0.0.0
sed -i "s|app.listen(SETUP_PORT, '127.0.0.1'|app.listen(SETUP_PORT, '0.0.0.0'|g" "$FILE"
sed -i "s|app.listen(PORT, '127.0.0.1'|app.listen(PORT, '0.0.0.0'|g" "$FILE"

echo "[patch] Cloud deployment patches applied to $FILE"
