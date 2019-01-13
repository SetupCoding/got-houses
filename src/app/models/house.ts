import {Character} from './character';

export interface House {
  index: number;
  overlordDetails: { index?: number, name?: string };
  cadetBranchesDetails: [{ index: number, name: string }?];
  currentLordDetails: Character;
  heirDetails: Character;
  founderDetails: Character;
  swornMembersDetails: Character[];
  url: string;
  name: string;
  region: string;
  coatOfArms: string;
  words: string;
  titles: string[];
  seats: string[];
  currentLord: string;
  heir: string;
  overlord: string;
  founded: string;
  founder: string;
  diedOut: string;
  ancestralWeapons: string[];
  cadetBranches: string[];
  swornMembers: string[];
}
