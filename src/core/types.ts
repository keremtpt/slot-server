// --- types.ts ---

/**
 * Temel bir spin talebi için gereken parametreler.
 */
export interface SpinParams {
    agentId: string;
    userId: string;
    gameId: string;
    bet: number;
  }
  
  /**
   * Her spin sonucunun standardize edilmiş hali.
   */
  export interface SpinResult {
    spinId: string;
    userId: string;
    gameId: string;
    symbols: string[][];
    totalWin: number;
    rtp: number;
    reelSetId: number;
    timestamp: number;
  
    freespin?: {
      type: "scatter" | "feature";
      retrigger: boolean;
      count: number;
    };
  }
  
  /**
   * Bonus satın alma sonrası dönen sonuç yapısı.
   */
  export interface PurchaseBonusResult {
    spinId: string;
    gameId: string;
    userId: string;
    bonusType: string;
    totalWin: number;
    cost: number;
    timestamp: number;
  
    extraData?: Record<string, any>;
  }
  