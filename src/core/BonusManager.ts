// --- BonusManager.ts ---
import { SpinParams } from "./types";

export interface BonusSpinResult {
  bonusId: string;
  type: string; // örnek: "freespin", "pick", "wheel"
  params: Record<string, any>;
}

export class BonusManager {
  private static bonusMap: Map<string, BonusSpinResult> = new Map();

  static set(userId: string, bonus: BonusSpinResult) {
    this.bonusMap.set(userId, bonus);
  }

  static get(userId: string): BonusSpinResult | null {
    return this.bonusMap.get(userId) ?? null;
  }

  static has(userId: string): boolean {
    return this.bonusMap.has(userId);
  }

  static clear(userId: string): void {
    this.bonusMap.delete(userId);
  }
}
