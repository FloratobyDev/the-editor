import { WebSocketServer, WebSocket, Server } from "ws";
import { Server as HTTPServer } from "http"
import { DatabaseService } from "./DatabaseService";
// ServerManager.ts
export class ServerManager {
  private port = process.env.PORT || 8080;

  constructor(
    private server: HTTPServer,
    private wss: Server,
    private dbService: DatabaseService
  ) {}

  async start() {
    try {
      await this.dbService.initialize();
      console.log("Database connections established");

      this.server.listen(this.port, () => {
        console.log(`Server is running on port ${this.port}`);
      });

      this.setupShutdownHandlers();
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  }

  private setupShutdownHandlers() {
    const shutdown = async () => {
      console.log("Shutting down server...");
      
      this.server.close(() => console.log("HTTP server closed"));
      
      this.wss.clients.forEach((client) => client.terminate());
      this.wss.close(() => console.log("WebSocket server closed"));
      
      await this.dbService.shutdown();
      process.exit(0);
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  }
}
