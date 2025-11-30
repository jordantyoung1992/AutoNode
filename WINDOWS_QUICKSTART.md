# One-minute Windows quickstart

This walkthrough is written for non-developers using Windows 10/11.

## 0) Install Node.js once
1. Visit https://nodejs.org and install the LTS release.
2. After installation, open **PowerShell**.

## 1) Start the app
Run these two lines in PowerShell from the project folder:
```powershell
cd AutoNode
powershell -ExecutionPolicy Bypass -File .\windows-quickstart.ps1
```
The script will:
- create a starter `.env` if you do not have one yet,
- install the npm packages, and
- start the API/UI on `http://localhost:3000`.

> Keep the PowerShell window open while you are using the app.

## 2) Open the UI
Visit http://localhost:3000/ in your browser. The controls for creating markets, placing bets, resolving, and settling are all on one page.

## 3) Optional: enable real USDC payouts
Open `.env` in Notepad and add your Fireblocks values:
```
FIREBLOCKS_API_KEY=your_api_key
FIREBLOCKS_SECRET_PATH=C:\\full\\path\\to\\fireblocks_secret.pem
FIREBLOCKS_VAULT_ID=0
USDC_ASSET_ID=USDC_POLYGON
```
If these values are missing or the key file is not found, settlements are simulated so you can still test the flow.
