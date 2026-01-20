import express from "express";

const app = express();
const port = 3025;

app.get("/api/emulation/status", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Emulation service listening at http://localhost:${port}`);
});
