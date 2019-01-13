import {Injectable} from '@angular/core';
import {Character} from '../../models/character';
import {ExtractService} from '../../core/extract/extract.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterStoreService {

  constructor(private extractService: ExtractService) {
  }


  setDetailedCharacter(character: Character, hasError?: boolean): Character {
    if (character) {
      return this.mapCharactersData(Array.of(character))[0];
    }
  }

  mapCharactersData(charactersData: Character[]): Character[] {
    return charactersData.map(characterData => {
      return {
        index: this.extractService.extractIndexFromUrl(characterData.url),
        ...characterData
      };
    });
  }
}
