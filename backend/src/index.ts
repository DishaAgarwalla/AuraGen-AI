import express from "express";
import cors from "cors";

import formRoutes from "./routes/formRoutes";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 AuraGen Backend is running...");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is healthy 🚀",
  });
});

// Register Form Routes
app.use("/api/form", formRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});