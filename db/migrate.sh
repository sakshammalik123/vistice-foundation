#!/usr/bin/env bash
# Run this once on first deployment to push your schema to the database
# Requires: DATABASE_URL to be set in environment
echo "Running database migration..."
cd "$(dirname "$0")/.."
npx drizzle-kit push --config db/drizzle.config.ts
echo "Migration complete."
