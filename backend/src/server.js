import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { seedInitialAdmin } from "./services/seedAdmin.service.js";
import { connectDB } from "./config/db.js";

import { env } from "./config/env.js";
import { socketAuthMiddleware } from "./middleware/socketAuth.middleware.js";










const startServer = async () => {
 


await connectDB();
  await seedInitialAdmin();
  const server = http.createServer(app);



   const io = new Server(server, {
    cors: {
      origin: "*", // we will use frontend URL
      methods: ["GET", "POST"],
    },
  });


app.set("io", io);
   io.use(socketAuthMiddleware);

    io.on("connection", (socket) => {
   socket.join(socket.user.userId);

  console.log("User connected:", socket.user.userId);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user.userId);
    });
  });


  server.listen(env.PORT, () => {
    console.log(`Server running on port https://localhost:${env.PORT}`);
  });
};

startServer();

