import { Server } from "./infrastructure/server/Server";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const server = new Server(PORT);
server.start();
