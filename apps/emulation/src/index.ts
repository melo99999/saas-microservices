import express from "express";

const app = express();
app.use(express.json());

const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Mock device data
const devices = [
  { id: "1", name: "Pixel 6", os: "Android", os_version: "13", available: true },
  { id: "2", name: "iPhone 14", os: "iOS", os_version: "16.1", available: false },
  { id: "3", name: "Pixel 7 Pro", os: "Android", os_version: "13", available: true },
  { id: "4", name: "iPhone 13", os: "iOS", os_version: "15.6", available: true },
];

router.get("/devices", (req, res) => {
  res.status(200).json(devices);
});

// Mock session data
const sessions = new Map<string, any>();

// Create a new session
router.post("/sessions", (req, res) => {
  const { deviceId } = req.body;
  const device = devices.find((d) => d.id === deviceId);

  if (!device || !device.available) {
    return res.status(400).json({ error: "Device not available" });
  }

  const sessionId = Math.random().toString(36).slice(2, 11);
  const session = {
    id: sessionId,
    deviceId,
    status: "active",
    start_time: new Date().toISOString(),
  };

  sessions.set(sessionId, session);
  device.available = false;

  res.status(201).json(session);
});

// Get session status
router.get("/sessions/:id", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }
  res.status(200).json(session);
});

// Terminate a session
router.delete("/sessions/:id", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }

  const device = devices.find((d) => d.id === session.deviceId);
  if (device) {
    device.available = true;
  }

  sessions.delete(req.params.id);
  res.status(204).send();
});

// Forward input to a session
router.post("/sessions/:id/input", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }

  // In a real implementation, this would forward the input to the device
  console.log(`Received input for session ${req.params.id}:`, req.body);

  res.status(200).json({ message: "Input received" });
});

// Get a streaming token for a session
router.post("/sessions/:id/token", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }

  // In a real implementation, this would generate a signed JWT
  const token = `fake-token-for-session-${req.params.id}`;

  res.status(200).json({ token });
});

app.use("/api/emulation", router);

app.listen(3002, () => {
  console.log(`Emulation app listening on port 3002`);
});
