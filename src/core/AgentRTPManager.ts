// --- AgentRTPManager.ts ---
export class AgentRTPManager {
  private agentGameRTP: Map<string, Map<string, number>> = new Map();

  constructor() {
    // Örnek başlangıç verileri
    this.setRTP("agentA", "BuffaloKing", 95);
    this.setRTP("agentA", "SweetBonanza", 93);
    this.setRTP("agentB", "SweetBonanza", 90);
  }

  setRTP(agentId: string, gameId: string, rtp: number): void {
    if (!this.agentGameRTP.has(agentId)) {
      this.agentGameRTP.set(agentId, new Map());
    }
    this.agentGameRTP.get(agentId)!.set(gameId, rtp);
  }

  getRTP(agentId: string, gameId: string): number {
    return this.agentGameRTP.get(agentId)?.get(gameId) ?? 95;
  }
}
