export interface HouseFilter {
  name: string;
  region: string;
  words: string;
  hasWords: boolean;
  hasTitles: boolean;
  hasSeats: boolean;
  hasDiedOut: boolean;
  hasAncestralWeapons: boolean;
}

export class HouseFilterClass implements HouseFilter {
  name = '';
  region = '';
  words = '';
  hasWords = false;
  hasTitles = false;
  hasSeats = false;
  hasDiedOut = false;
  hasAncestralWeapons = false;
  constructor() {
  }
}
