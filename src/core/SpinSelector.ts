import mongoose from "mongoose";

export interface SpinDocument {
  _id: any;
  spintype: number;
  odd: number;
  data: string;
}

export class SpinSelector {
  constructor(private mongo: mongoose.Connection) {}

  private getSpinCollection(gameId: string) {
    return this.mongo.collection(gameId);
  }

  async selectSpin(gameId: string, currentRTP: number, targetRTP: number): Promise<SpinDocument> {
    const spins = this.getSpinCollection(gameId);

    const condition = currentRTP > targetRTP
      ? { odd: 0 }
      : { odd: { $gt: 0 } };

    const count = await spins.countDocuments(condition);
    const randomOffset = Math.floor(Math.random() * count);

    const cursor = spins.find(condition).skip(randomOffset).limit(1);
    const result = await cursor.next();

    if (!result) throw new Error("Uygun spin bulunamadı");
    return result as SpinDocument;
  }
}
