import {Injectable} from '@angular/core';
import {House} from '../../model/house';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private _houses: House[] = [];

  constructor() {
  }

  get houses(): House[] {
    return this._houses;
  }

  setHouses(houses: House[]) {
    this._houses = this.mapHousesData(houses);

  }

  getHouseByIndex(index: number): House {
    return this._houses.find(house => house.index === index);
  }

  private mapHousesData(housesData: House[]): House[] {
    return housesData.map(houseData => {
      return {
        index: this.extractIndexFromUrl(houseData.url),
        ...houseData
      };
    });
  }

  private extractIndexFromUrl(url: string): number {
    const pathnameToSegment = new URL(url).pathname;
    const extractedIndex = pathnameToSegment.substr(pathnameToSegment.lastIndexOf('/') + 1);
    return parseInt(extractedIndex, 10);
  }
}
