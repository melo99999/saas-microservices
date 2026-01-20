import express from "express";

const app = express();

const PROFILES = [
  {
    id: "1",
    name: "Default",
    created: "2024-01-01T12:00:00Z",
    lastUsed: "2024-05-20T10:30:00Z",
  },
  {
    id: "2",
    name: "Shopping",
    created: "2024-02-15T09:00:00Z",
    lastUsed: "2024-05-18T15:45:00Z",
  },
  {
    id: "3",
    name: "Work",
    created: "2024-03-10T14:20:00Z",
    lastUsed: "2024-05-21T08:00:00Z",
  },
];

app.get("/emulation/api/profiles", (req, res) => {
  res.json(PROFILES);
});

app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(3002, () => {
  console.log(`Emulation app listening on port 3002`);
});
