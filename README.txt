======================================================
 Vistice Foundation — Hostinger Deployment Guide
======================================================

REQUIREMENTS
------------
- Hostinger Node.js hosting (Node.js 18+ recommended)
- PostgreSQL database (Hostinger Database panel)
- Your own domain name

STEP-BY-STEP SETUP
-------------------

1. CREATE A DATABASE
   - In Hostinger panel → Databases → Create new PostgreSQL database
   - Note the host, port, database name, username, and password

2. CONFIGURE ENVIRONMENT VARIABLES
   - Open the .env file in this package
   - Fill in your values:
       DATABASE_URL = postgres://USER:PASS@HOST:PORT/DBNAME
       SESSION_SECRET = a-long-random-string-at-least-32-chars
       NODE_ENV = production
       PORT = 3000  (Hostinger may override this automatically)

3. UPLOAD FILES
   - Upload the entire contents of this folder to your Hostinger
     public_html (or the Node.js app root directory)
   - Make sure to include hidden files (.env, .htaccess if present)

4. SET THE STARTUP FILE
   - In Hostinger Node.js panel, set the entry point to:
       server.mjs

5. PUSH DATABASE SCHEMA (first time only)
   - In Hostinger terminal / SSH:
       cd /path/to/your/app
       node -e "import('./dist/index.mjs')"   (this auto-creates tables)
   - Or use the migration helper:
       bash db/migrate.sh

6. RESTART THE APP
   - In Hostinger panel, click "Restart" on your Node.js app

7. VERIFY
   - Visit your domain — you should see the Vistice landing page
   - Try logging in at /login with:
       Admin:       mrsakshammalik@gmail.com / Malik2276@#
       University:  university@vistice.in   / University@123
       Centre:      centre@vistice.in       / Centre@123

FOLDER STRUCTURE
-----------------
  server.mjs       → startup entry point (set this in Hostinger)
  dist/            → bundled Node.js API server
  public/          → built frontend (React app)
  node_modules/    → production dependencies
  .env             → your environment variables (KEEP PRIVATE)
  db/              → database migration helpers

TROUBLESHOOTING
---------------
- App not starting?    Check .env values, especially DATABASE_URL
- Database errors?     Make sure DATABASE_URL is correct and the DB exists
- Pages not loading?   Check that NODE_ENV=production is set
- Login not working?   Run the app at least once so seed accounts are created

SUPPORT
-------
  Admin email: mrsakshammalik@gmail.com
======================================================
