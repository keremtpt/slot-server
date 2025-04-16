// --- WebSocketServer.ts ---
import WebSocket from "ws";
import { getEngine } from "../core/GameLoader";

export function startWebSocketServer(port: number = 8080) {
  const wss = new WebSocket.Server({ port });

  wss.on("connection", (ws) => {
    console.log("📡 Yeni bağlantı kuruldu.");

    ws.on("message", async (message) => {
      try {
        const req = JSON.parse(message.toString());

        if (req.type === "spin") {
          const engine = getEngine();
          const result = await engine.spin(req.gameId, req.userId, req.bet);

          ws.send(JSON.stringify({
            type: "spinResult",
            data: result,
          }));
        } else {
          ws.send(JSON.stringify({ error: "Bilinmeyen mesaj tipi." }));
        }
      } catch (err) {
        console.error("Spin hatası:", err instanceof Error ? err.message : err);
        ws.send(JSON.stringify({ error: "İşlem sırasında hata oluştu." }));
      }
    });
  });

  console.log(`🚀 WebSocket sunucusu ${port} portunda çalışıyor.`);
}