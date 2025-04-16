// --- GameLoader.ts ---
import { GameEngine } from "./GameEngine";
import { AgentRTPManager } from "./AgentRTPManager";
import { getMongoConnection } from "../db/Mongo";
import { loadAllGames } from "./AutoGameLoader";

export async function initGameEngine(): Promise<GameEngine> {
  const mongo = await getMongoConnection();
  const rtpManager = new AgentRTPManager();
  const engine = new GameEngine();

  await loadAllGames(engine, mongo, rtpManager);
  return engine;
}
