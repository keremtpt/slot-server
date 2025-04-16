import { SpinParams, SpinResult } from "./types";
import { BaseSlotGame } from "../games/base/BaseSlotGame";
import { BonusManager } from "./BonusManager";

export class GameEngine {
  private games: Map<string, BaseSlotGame> = new Map();

  registerGame(gameId: string, gameInstance: BaseSlotGame) {
    if (this.games.has(gameId)) {
      throw new Error(`Game '${gameId}' already registered.`);
    }
    this.games.set(gameId, gameInstance);
  }

  getGame(gameId: string): BaseSlotGame {
    const game = this.games.get(gameId);
    if (!game) throw new Error(`Game '${gameId}' not found.`);
    return game;
  }

  async spin(params: SpinParams): Promise<SpinResult> {
    const game = this.getGame(params.gameId);

    // Eğer kullanıcı için aktif bonus varsa önce onu oyna
    if (BonusManager.has(params.userId)) {
      const bonus = BonusManager.get(params.userId);

      // Bonus bittiğinde temizle
      BonusManager.clear(params.userId);

      const raw = await game.getSpinFromSelector(params);
      const result = game.applySpinData(raw, params);

      result.freespin = {
        type: "feature",
        retrigger: false,
        count: 0,
      };

      return result;
    }

    // Normal spin akışı
    const rawSpin = await game.getSpinFromSelector(params);
    const result = game.applySpinData(rawSpin, params);

    return result;
  }
}
