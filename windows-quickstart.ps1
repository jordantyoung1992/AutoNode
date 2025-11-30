# Windows quickstart helper for the RWA Prediction API/UI
# Run from PowerShell: powershell -ExecutionPolicy Bypass -File .\windows-quickstart.ps1

$ErrorActionPreference = "Stop"

# Move to the script directory so npm finds package.json
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

Write-Host "📂 Working directory: $projectRoot"

# Create a starter .env if missing
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env with defaults (update it later with your keys)"
    @'
PORT=3000
USDC_ASSET_ID=USDC_POLYGON
FIREBLOCKS_VAULT_ID=0
FIREBLOCKS_API_KEY=
FIREBLOCKS_SECRET_PATH=.\\fireblocks_secret.pem
'@ | Set-Content -NoNewline .env
}

# Install dependencies
Write-Host "📦 Installing npm packages (this may take a minute)..."
npm install

Write-Host "🚀 Starting the server on http://localhost:3000" -ForegroundColor Green
Write-Host "Leave this window open to keep the API/UI running." -ForegroundColor Yellow

npm start
