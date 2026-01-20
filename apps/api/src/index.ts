import express from "express";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const DATA_FILE = path.join(path.dirname(__filename), "data.json");

const app = express();
app.use(cookieParser());
app.use(express.json());

interface User {
  id: string;
  name: string;
}

interface EmulationProfile {
  id: string;
  name: string;
  fingerprint: {
    userAgent: string;
    platform: string;
    screenResolution: {
      width: number;
      height: number;
    };
  };
  identity: {
    username: string;
  };
  limits: {
    maxRequests: number;
  };
}

const USERS: User[] = [
  {
    id: "1",
    name: "John Doe",
  },
  {
    id: "2",
    name: "Jane Smith",
  },
];

let EMULATION_PROFILES: EmulationProfile[] = [];

const readData = () => {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    EMULATION_PROFILES = JSON.parse(data);
  }
};

const writeData = () => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(EMULATION_PROFILES, null, 2));
};

readData();

const AUTH_COOKIE_NAME = "saas_microservices_authed_user";

app.get("/api/users/login", (req, res) => {
  const existingUser = req.cookies[AUTH_COOKIE_NAME];
  if (!existingUser) {
    const user = USERS[Math.floor(Math.random() * USERS.length)];
    res.cookie(AUTH_COOKIE_NAME, user.id);
  }
  return res.redirect("/");
});

app.get("/api/users/logout", (req, res) => {
  return res.clearCookie(AUTH_COOKIE_NAME).redirect("/");
});

app.get("/api/users/user", (req, res) => {
  const existingUser = req.cookies[AUTH_COOKIE_NAME];
  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }
  const user = USERS.find((user) => user.id === existingUser);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json(user);
});

// Fake data generators
const firstNames = [
  "Alex",
  "Jordan",
  "Taylor",
  "Morgan",
  "Casey",
  "Riley",
  "Avery",
  "Quinn",
  "Emma",
  "Liam",
  "Olivia",
  "Noah",
  "Ava",
  "Ethan",
  "Sophia",
  "Mason",
  "Isabella",
  "William",
  "Mia",
  "James",
  "Charlotte",
  "Benjamin",
  "Amelia",
  "Lucas",
  "Harper",
  "Henry",
  "Evelyn",
  "Alexander",
  "Abigail",
  "Michael",
  "Emily",
  "Daniel",
  "Elizabeth",
  "Jacob",
  "Sofia",
  "Logan",
  "Avery",
  "Jackson",
  "Ella",
  "Sebastian",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
];

const actions = [
  "created a new project",
  "deleted a file",
  "shared a document",
  "commented on a task",
  "completed a milestone",
  "invited a team member",
  "updated project settings",
  "exported data report",
  "created a new team",
  "archived old project",
  "updated billing information",
  "changed password",
  "enabled two-factor authentication",
  "uploaded a new file",
  "created a backup",
  "merged a pull request",
  "deployed to production",
  "ran automated tests",
  "reviewed code changes",
  "created a new API key",
  "updated integration settings",
  "scheduled a meeting",
  "published a blog post",
  "updated documentation",
  "created a new workflow",
  "optimized database queries",
  "configured monitoring alerts",
  "updated security policies",
];

function generateRandomActivity() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];

  // Generate timestamp within the last 30 days
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const randomTime = new Date(
    thirtyDaysAgo.getTime() +
      Math.random() * (now.getTime() - thirtyDaysAgo.getTime())
  );

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: `${firstName} ${lastName}`,
    action: action,
    timestamp: randomTime.toISOString(),
  };
}

app.get("/api/dashboard/activity", (req, res) => {
  const activities = Array.from({ length: 20 }, () => generateRandomActivity());
  activities.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  res.json({
    activities,
    total: activities.length,
    generated_at: new Date().toISOString(),
  });
});

// Health check
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Create a new emulation profile
app.post("/api/emulation/profiles", (req, res) => {
  const { name, fingerprint, identity, limits } = req.body;
  if (!name || !fingerprint || !identity || !limits) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newProfile: EmulationProfile = {
    id: uuidv4(),
    name,
    fingerprint,
    identity,
    limits,
  };
  EMULATION_PROFILES.push(newProfile);
  writeData();
  return res.status(201).json(newProfile);
});

// Get all emulation profiles
app.get("/api/emulation/profiles", (req, res) => {
  return res.json(EMULATION_PROFILES);
});

// Get a single emulation profile by id
app.get("/api/emulation/profiles/:id", (req, res) => {
  const profile = EMULATION_PROFILES.find((p) => p.id === req.params.id);
  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }
  return res.json(profile);
});

// Update an emulation profile
app.put("/api/emulation/profiles/:id", (req, res) => {
  const profileIndex = EMULATION_PROFILES.findIndex((p) => p.id === req.params.id);
  if (profileIndex === -1) {
    return res.status(404).json({ error: "Profile not found" });
  }
  const { name, fingerprint, identity, limits } = req.body;
  if (!name || !fingerprint || !identity || !limits) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  EMULATION_PROFILES[profileIndex] = {
    ...EMULATION_PROFILES[profileIndex],
    name,
    fingerprint,
    identity,
    limits,
  };
  writeData();
  return res.json(EMULATION_PROFILES[profileIndex]);
});

// Delete an emulation profile
app.delete("/api/emulation/profiles/:id", (req, res) => {
  const profileIndex = EMULATION_PROFILES.findIndex((p) => p.id === req.params.id);
  if (profileIndex === -1) {
    return res.status(404).json({ error: "Profile not found" });
  }
  EMULATION_PROFILES.splice(profileIndex, 1);
  writeData();
  return res.status(204).send();
});

app.listen(3001, () => {
  console.log(`API app listening on port 3001`);
});
