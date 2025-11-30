# Windows setup for the RWA Prediction API/UI

These steps assume a vanilla Windows 10/11 machine with Node.js 18+ and git installed. All commands are PowerShell-friendly.

1. **Clone and enter the repo**
   ```powershell
   git clone https://github.com/TransformerOptimus/AutoNode.git
   cd AutoNode
   ```

2. **Install dependencies**
   ```powershell
 npm install
  ```

3. **Create your environment file**
   Copy the template below into `.env` (PowerShell example uses a here-string):
   ```powershell
   @'
   PORT=3000
   USDC_ASSET_ID=USDC_POLYGON
   FIREBLOCKS_VAULT_ID=0
   FIREBLOCKS_API_KEY=
   FIREBLOCKS_SECRET_PATH=.\\fireblocks_secret.pem
   '@ | Set-Content .env
   ```
   - If you do not have Fireblocks credentials yet, leave `FIREBLOCKS_API_KEY` empty and the server will automatically fall back to simulated payouts.
   - When you do have the signing key, set `FIREBLOCKS_SECRET_PATH` to the full Windows path (e.g., `C:\keys\fireblocks_secret.pem`).

4. **Run the server (regular)**
   ```powershell
   npm start
   ```
   You should see `🚀 Prediction API on 3000` in the console. Keep the window open while you use the app.

   **Or, use the one-minute helper** (no manual steps):
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\windows-quickstart.ps1
   ```
   The helper creates `.env` if missing, installs dependencies, and starts the server for you.

5. **Open the UI**
   Navigate to `http://localhost:3000/` in your browser. The page runs entirely in the browser and calls the local API.

6. **Data and persistence**
   - The ledger lives in `db.json` beside `index.js`. On Windows it is stored in the repo folder (no extra setup required).
   - The server serves static assets from the same folder, so you can also open other local files if needed.

7. **Fireblocks payouts (optional)**
   - Provide `FIREBLOCKS_API_KEY` and a valid `FIREBLOCKS_SECRET_PATH` to enable real payouts.
   - If either value is missing or the key file is absent, the `/market/settle` route will still respond but will mark payouts as `simulated`.

