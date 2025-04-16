import { BaseSlotGame } from "../base/BaseSlotGame";
import { SpinSelector, SpinDocument } from "../../core/SpinSelector";
import { AgentRTPManager } from "../../core/AgentRTPManager";
import mongoose from "mongoose";
import { SpinParams, SpinResult } from "../../core/types";

export class SweetBonanzaGame extends BaseSlotGame {
  private configLoaded = false;
  private spinSelector: SpinSelector;
  private rtpManager: AgentRTPManager;

  constructor(mongo: mongoose.Connection, rtpManager: AgentRTPManager) {
    super("SweetBonanza");
    this.spinSelector = new SpinSelector(mongo, rtpManager);
    this.rtpManager = rtpManager;
  }

  async loadConfig(): Promise<void> {
    this.configLoaded = true;
  }

  async getSpinFromSelector(params: SpinParams): Promise<SpinResult> {
    const currentRTP = 94;
    const raw = await this.spinSelector.selectSpin(params.agentId, this.gameId, currentRTP);
    return this.applySpinData(raw, params);
  }

  applySpinData(rawData: any, _params: SpinParams): SpinResult {
    const { _id, data, odd } = rawData as SpinDocument;
    const symbolString = data.split("@mo_ttr=")[1];
    const flatSymbols = symbolString.split(",");

    const layout: string[][] = [];
    for (let i = 0; i < 6; i++) {
      layout.push(flatSymbols.slice(i * 5, i * 5 + 5));
    }

    const result: SpinResult = {
      spinId: _id.toString(),
      userId: "-",
      gameId: this.gameId,
      symbols: layout,
      totalWin: odd,
      rtp: odd > 0 ? this.rtpManager.getRTP("agentA", this.gameId) : 0,
      reelSetId: 0,
      timestamp: Date.now()
    };

    const scatterCount = flatSymbols.filter((s) => s === "S").length;
    if (scatterCount >= 4) {
      (result as any).freespin = {
        type: "scatter",
        retrigger: false,
        count: 10
      };
    }

    return result;
  }
}
