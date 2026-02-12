import http from "http";
import app from "./app.js";
import { seedInitialAdmin } from "./services/seedAdmin.service.js";
import { connectDB } from "./config/db.js";

import { env } from "./config/env.js";

const startServer = async () => {
 
await connectDB();
  await seedInitialAdmin();
  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    console.log(` Server running on port https://localhost:${env.PORT}`);
  });
};

startServer();
