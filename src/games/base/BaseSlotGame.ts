import { SpinParams, SpinResult } from "../../core/types";

export abstract class BaseSlotGame {
  constructor(public readonly gameId: string) {}

  abstract loadConfig(): Promise<void>;

  abstract getSpinFromSelector(params: SpinParams): Promise<SpinResult>;

  abstract applySpinData(rawData: any, params: SpinParams): SpinResult;
}
