import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";
import { FireblocksSDK } from "fireblocks-sdk";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { v4 as uuid } from "uuid";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("."));

const apiKey = process.env.FIREBLOCKS_API_KEY;
const secretPath = process.env.FIREBLOCKS_SECRET_PATH;
let fireblocks = null;

if (apiKey && secretPath && fs.existsSync(secretPath)) {
  try {
    const privateKey = fs.readFileSync(secretPath, "utf8");
    fireblocks = new FireblocksSDK(privateKey, apiKey);
  } catch (err) {
    console.warn("⚠️ Failed to initialize Fireblocks SDK:", err.message);
  }
} else {
  console.warn("⚠️ Fireblocks credentials missing. Settlement endpoint will return simulated responses.");
}

const adapter = new JSONFile("db.json");
const db = new Low(adapter, { markets: [], bets: [] });
await db.read();

// Health
app.get("/", (_, res) => res.send("✅ RWA Prediction MVP up"));

// Create market: name, metric, resolvesAt (ISO), question, yesPayout, noPayout
app.post("/market/create", async (req, res) => {
  const { name, metric, question, resolvesAt, yesPayout, noPayout } = req.body;
  if (!name || !metric || !question || !resolvesAt) return res.status(400).json({ error: "missing fields" });
  const resolvesDate = new Date(resolvesAt);
  if (Number.isNaN(resolvesDate.valueOf())) return res.status(400).json({ error: "invalid resolvesAt" });
  const mkt = {
    id: uuid(),
    name, metric, question,
    resolvesAt: resolvesDate.toISOString(),
    status: "open",
    yesPayout: Number(yesPayout ?? 1),
    noPayout: Number(noPayout ?? 1),
    outcome: null
  };
  db.data.markets.push(mkt);
  await db.write();
  res.json(mkt);
});

// List markets
app.get("/market/list", async (_, res) => {
  await db.read();
  res.json(db.data.markets);
});

// Place bet: marketId, side ("yes"|"no"), wallet, amount (USDC units)
app.post("/market/bet", async (req, res) => {
  const { marketId, side, wallet, amount } = req.body;
  await db.read();
  const mkt = db.data.markets.find(m => m.id === marketId);
  if (!mkt) return res.status(404).json({ error: "market not found" });
  if (mkt.status !== "open") return res.status(400).json({ error: "market closed" });
  if (!["yes","no"].includes(side)) return res.status(400).json({ error: "side invalid" });
  if (!wallet) return res.status(400).json({ error: "wallet required" });
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) return res.status(400).json({ error: "amount invalid" });
  const bet = { id: uuid(), marketId, side, wallet, amount: numericAmount, ts: Date.now() };
  db.data.bets.push(bet);
  await db.write();
  res.json({ ok: true, bet });
});

// Close & resolve (oracle): marketId, outcome ("yes"|"no")
app.post("/market/resolve", async (req, res) => {
  const { marketId, outcome } = req.body;
  await db.read();
  const mkt = db.data.markets.find(m => m.id === marketId);
  if (!mkt) return res.status(404).json({ error: "market not found" });
  if (!["yes","no"].includes(outcome)) return res.status(400).json({ error: "outcome invalid" });
  mkt.status = "resolved";
  mkt.outcome = outcome;
  await db.write();
  res.json({ ok: true, market: mkt });
});

// Settle winners via Fireblocks USDC: marketId
app.post("/market/settle", async (req, res) => {
  const { marketId } = req.body;
  await db.read();
  const mkt = db.data.markets.find(m => m.id === marketId);
  if (!mkt) return res.status(404).json({ error: "market not found" });
  if (mkt.status !== "resolved") return res.status(400).json({ error: "not resolved" });

  const winners = db.data.bets.filter(b => b.marketId === marketId && b.side === mkt.outcome);
  const assetId = process.env.USDC_ASSET_ID || "USDC_POLYGON";
  const vaultId = process.env.FIREBLOCKS_VAULT_ID || "0";
  if (winners.length === 0) return res.json({ ok: true, message: "no winners", simulated: !fireblocks });

  const payouts = [];
  for (const w of winners) {
    const rate = mkt.outcome === "yes" ? mkt.yesPayout : mkt.noPayout;
    const amount = (w.amount * rate).toFixed(2);

    if (!fireblocks) {
      payouts.push({ wallet: w.wallet, amount, simulated: true });
      continue;
    }

    try {
      const tx = await fireblocks.createTransaction({
        assetId,
        source: { type: "VAULT_ACCOUNT", id: String(vaultId) },
        destination: { type: "ONE_TIME_ADDRESS", oneTimeAddress: { address: w.wallet }},
        amount: String(amount),
        note: `Prediction payout: ${mkt.name} (${mkt.outcome})`
      });
      payouts.push({ wallet: w.wallet, amount, txId: tx?.id || null });
    } catch (e) {
      payouts.push({ wallet: w.wallet, error: e.message });
    }
  }
  res.json({ ok: true, payouts, simulated: !fireblocks });
});

app.listen(process.env.PORT || 3000, () => console.log("🚀 Prediction API on", process.env.PORT || 3000));
