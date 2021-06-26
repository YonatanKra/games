import { House } from '@games/house-wars/house';

export interface Player {
  color: string;
  id: string;
  houses: House[];
  mainHouseId: string | null;
  resources: {
    gold: number;
  }
}
