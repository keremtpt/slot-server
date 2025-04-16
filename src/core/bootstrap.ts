import { initGameEngine } from "./GameLoader";
import { startWebSocketServer } from "../ws/WebSocketServer";

export async function bootstrap() {
  console.log("🟢 Slot server başlatılıyor...");
  await initGameEngine();
  startWebSocketServer(8080);
}
