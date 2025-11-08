import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { initMQTT } from "./services/mqttService.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// MQTT service
initMQTT(io);

// API routes
app.use("/api/messages", messageRoutes);

// Default route
app.get("/", (req, res) => res.send("Backend running ✅"));

// Socket
io.on("connection", () => console.log("🟢 Web client connected"));

// Start server
server.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
