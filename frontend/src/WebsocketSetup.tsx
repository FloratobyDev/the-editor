// src/App.tsx
import { useEffect, useRef, useState } from "react";

const WEBSOCKET_URL = "http://localhost:4000/ws";

function WebsocketSetup() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "history":
          setMessages(data.messages.map((m: { content: never }) => m.content));
          break;
        case "message":
          setMessages((prev) => [...prev, data.content]);
          break;
        default:
          console.warn("Unknown message type:", data.type);
      }
    };

    socketRef.current = ws;
    // setSocket(ws);

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(input);
      setInput("");
    }
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default WebsocketSetup;
