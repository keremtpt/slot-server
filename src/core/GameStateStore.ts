// --- GameStateStore.ts ---
type FreespinState = {
    count: number;
    gameId: string;
  };
  
  export class GameStateStore {
    private static stateMap: Map<string, FreespinState> = new Map();
  
    static setFreespin(userId: string, gameId: string, count: number) {
      this.stateMap.set(userId, { gameId, count });
    }
  
    static consumeFreespin(userId: string): FreespinState | null {
      const state = this.stateMap.get(userId);
      if (!state) return null;
  
      if (state.count <= 1) {
        this.stateMap.delete(userId);
      } else {
        state.count--;
        this.stateMap.set(userId, state);
      }
  
      return state;
    }
  
    static hasFreespin(userId: string): boolean {
      return this.stateMap.has(userId);
    }
  
    static getState(userId: string): FreespinState | null {
      return this.stateMap.get(userId) ?? null;
    }
  }
  