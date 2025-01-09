// src/server.ts
import express, { Request } from "express";
import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import session from "express-session";
import { DatabaseService } from "./services/DatabaseService";
import { GameEvent, GameEventType } from "./consts";
import { GameWebSocketHandler } from "./services/GameWebSocketHandler";
import { ServerManager } from "./services/ServerManager";

// Initialize express app
const app = express();

// Initialize DatabaseService
const dbService = DatabaseService.getInstance();


// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key", // Replace with a secure secret from environment variables
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);


// Create HTTP server instance
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const gameHandler = new GameWebSocketHandler();
const serverManager = new ServerManager(server, wss, dbService);

wss.on("connection", (ws: WebSocket, req: Request) => {
  console.log("New client... ", req.cookies);

  ws.on("message", (data: any) => {
    const { type, payload } = JSON.parse(Buffer.from(data).toString("utf-8"));

    switch (type) {
      case GameEvent.GAME_START:
        console.log('Starting Server...');
        gameHandler.gameStart(ws);
        break;
      case GameEvent.WORD_CHECK:
        gameHandler.checkWord(ws, payload.word, payload.gameId);
        break;
      case GameEvent.GRAMMAR_CHECK:
        gameHandler.checkGrammar(ws, payload.sentenceIndex, payload.gameId);
        break;
      default:
        console.log("Unknown message type");
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
  ws.on("error", (error) => console.error("WebSocket error:", error));
});

serverManager.start();

