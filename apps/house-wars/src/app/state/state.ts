import { Player } from '@games/house-wars/player';
import { House } from '@games/house-wars/house';

interface GameState {
  players: Player[],
  houses: House[]
}

export class State implements GameState{
  players = [];
  houses = [];
}
