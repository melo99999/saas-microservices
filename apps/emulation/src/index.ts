import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

interface Device {
  id: string;
  name: string;
  status: "online" | "offline";
}

const DEVICES: Device[] = [
  { id: "1", name: "iPhone 14 Pro", status: "online" },
  { id: "2", name: "Samsung Galaxy S23", status: "offline" },
  { id: "3", name: "Google Pixel 7", status: "online" },
];

app.get("/api/emulation/devices", (req, res) => {
  return res.json({ devices: DEVICES });
});

// Health check
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(3002, () => {
  console.log(`Emulation app listening on port 3002`);
});
