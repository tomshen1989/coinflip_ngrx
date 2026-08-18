export type CoinSide = 'heads' | 'tails';

export interface FlipRecord {
  id: number;
  call: CoinSide;
  result: CoinSide;
  won: boolean;
}

export interface CoinflipState {
  balance: number;
  flipping: boolean;
  history: FlipRecord[];
  error: string | null;
}

export const initialCoinflipState: CoinflipState = {
  balance: 100,
  flipping: false,
  history: [],
  error: null,
};
