// --- AutoGameLoader.ts ---
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { GameEngine } from "./GameEngine";
import { AgentRTPManager } from "./AgentRTPManager";
import { BaseSlotGame } from "../games/base/BaseSlotGame";

export async function loadAllGames(
  engine: GameEngine,
  mongo: mongoose.Connection,
  rtpManager: AgentRTPManager
): Promise<void> {
  const gameDir = path.resolve(__dirname, "../games/pragmatic");
  const files = fs.readdirSync(gameDir);

  for (const file of files) {
    if (!file.endsWith(".ts") && !file.endsWith(".js")) continue;

    const modulePath = path.join(gameDir, file);
    const module = await import(modulePath);

    const GameClass: any = Object.values(module).find(
      (exp) => typeof exp === "function" && exp.prototype instanceof BaseSlotGame
    );

    if (!GameClass) {
      console.warn(`⚠️  ${file} içinde geçerli bir oyun sınıfı bulunamadı.`);
      continue;
    }

    const instance = new GameClass(mongo, rtpManager);
    engine.registerGame(instance.gameId, instance);
    console.log(`✅ Yüklendi: ${instance.gameId}`);
  }
}
