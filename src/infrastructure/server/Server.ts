import express, { Application } from "express";
import { userRouter } from "../routes/User/user.routes";

export class Server {
  private app: Application;
  private port: number;

  constructor(port: number = 3000) {
    this.app = express();
    this.port = port;
    this.configMiddlewares();
    this.configRoutes();
  }

  private configMiddlewares(): void {
    this.app.use(express.json());
  }

  private configRoutes(): void {
    this.app.use("/api", userRouter);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on http://localhost:${this.port}`);
    });
  }

}
