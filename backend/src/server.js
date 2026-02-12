import http from "http";
import app from "./app.js";

import { env } from "./config/env.js";

const startServer = async () => {
 

  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    console.log(` Server running on port https://localhost:${env.PORT}`);
  });
};

startServer();
