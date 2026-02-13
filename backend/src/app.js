import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import announcementRoutes from "./routes/announcement.routes.js";

const app = express();


app.use(express.json());





app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/auth", authRoutes);
app.use("/admins", adminRoutes);
app.use("/users", userRoutes);
app.use("/announcements", announcementRoutes);



export default app;






