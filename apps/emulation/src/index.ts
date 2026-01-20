import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

interface Device {
  id: string;
  name: string;
  status: "online" | "offline";
  userAgent: string;
}

let DEVICES: Device[] = [
  {
    id: "1",
    name: "iPhone 14 Pro",
    status: "online",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
  },
  {
    id: "2",
    name: "Samsung Galaxy S23",
    status: "offline",
    userAgent:
      "Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
  },
  {
    id: "3",
    name: "Google Pixel 7",
    status: "online",
    userAgent:
      "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
  },
];

app.get("/api/emulation/devices", (req, res) => {
  return res.json({ devices: DEVICES });
});

app.put("/api/emulation/devices/:id", express.json(), (req, res) => {
  const deviceId = req.params.id;
  const { userAgent } = req.body;

  DEVICES = DEVICES.map((device) =>
    device.id === deviceId ? { ...device, userAgent } : device
  );

  const updatedDevice = DEVICES.find((device) => device.id === deviceId);

  if (updatedDevice) {
    return res.json(updatedDevice);
  } else {
    return res.status(404).json({ error: "Device not found" });
  }
});

// Health check
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(3002, () => {
  console.log(`Emulation app listening on port 3002`);
});
