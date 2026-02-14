import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
import announcementRoutes from "./routes/announcement.routes.js";
import { env } from "./config/env.js";

const app = express();





app.use(express.json());

// Configuring cors after deployement 
const allowedOrigins = env.CORS_ORIGIN.split(',').map(origin => origin.trim());

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));






app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});



app.use("/auth", authRoutes);
app.use("/admins", adminRoutes);
app.use("/users", userRoutes);
app.use("/announcements", announcementRoutes);



export default app;






