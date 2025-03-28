#!/bin/sh

rm -rf /tmp && mkdir /tmp

echo "Cleared tmp directory"

cd /app/apps/api

# Start the server
bun dev