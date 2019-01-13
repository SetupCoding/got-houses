import {Injectable} from '@angular/core';
import {House} from '../../models/house';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseStoreService {
  private _houses: House[] = [];
  private _detailedHouse: House;
  private _maximumHouseDataLength = 0;
  private _housesChanged = new Subject<House[]>();
  private _detailedHouseChanged = new Subject<House>();
  private _hasError: boolean;


  constructor() {
  }

  get houses(): House[] {
    return this._houses;
  }

  set detailedHouse(value: House) {
    this._detailedHouse = value;
  }

  get maximumHouseDataLength(): number {
    return this._maximumHouseDataLength;
  }

  set maximumHouseDataLength(value: number) {
    this._maximumHouseDataLength = value;
  }

  get housesChanged(): Subject<House[]> {
    return this._housesChanged;
  }

  set housesChanged(value: Subject<House[]>) {
    this._housesChanged = value;
  }

  get detailedHouseChanged(): Subject<House> {
    return this._detailedHouseChanged;
  }

  set detailedHouseChanged(value: Subject<House>) {
    this._detailedHouseChanged = value;
  }

  get hasError(): boolean {
    return this._hasError;
  }

  set hasError(value: boolean) {
    this._hasError = value;
  }

  setHouses(houses: House[], hasError?: boolean): void {
    this._hasError = hasError;
    this._houses = this.mapHousesData(houses);
    this.housesChanged.next(this.houses.slice());
  }

  setDetailedHouse(house: House, hasError?: boolean): void {
    this._hasError = hasError;
    if (house) {
      this._detailedHouse = this.mapHousesData(Array.of(house))[0];
    }
    this.detailedHouseChanged.next(this._detailedHouse);
  }

  getHouseByIndex(index: number): House {
    return this.houses.find(house => house.index === index);
  }

  mapHousesData(housesData: House[]): House[] {
    return housesData.map(houseData => {
      return {
        index: this.extractIndexFromUrl(houseData.url),
        cadetBranchesDetails: [],
        ...houseData
      };
    });
  }

  extractIndexFromUrl(url: string): number {
    const pathnameToSegment = new URL(url).pathname;
    const extractedIndex = pathnameToSegment.substr(pathnameToSegment.lastIndexOf('/') + 1);
    return parseInt(extractedIndex, 10);
  }
}
