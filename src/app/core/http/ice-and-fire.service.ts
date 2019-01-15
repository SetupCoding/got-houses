import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {House} from '../../models/house';
import {HouseStoreService} from '../../houses/stores/house-store.service';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HouseFilterService} from '../../houses/house-filter/house-filter.service';
import {Character} from '../../models/character';
import {CharacterStoreService} from '../../houses/stores/character-store.service';
import {HouseFilter} from '../../models/house-filter';


@Injectable({
  providedIn: 'root'
})
export class IceAndFireService {
  housesRequestSubscription: Subscription;
  houseDetailRequestSubscription: Subscription;
  currentPageSize = environment.defaultPageSize;
  filter: HouseFilter = <HouseFilter>{};

  constructor(private houseStoreService: HouseStoreService,
              private houseFilterService: HouseFilterService,
              private characterStoreService: CharacterStoreService,
              private http: HttpClient) {
  }

  initializeHouseData(): void {
    this.subscribeToChanges();
    this.fetchHouses(1, 1, true);
  }

  fetchHouses(page = 1, pageSize = 10, isInitialDataLengthFetch?: boolean): void {
    this.cancelOngoingRequests(this.housesRequestSubscription);
    const requestUrl = this.generateRequestUrl(page, pageSize);
    this.addFiltersToRequest(requestUrl);
    this.housesRequestSubscription = this.http.get<House[]>(requestUrl.toString(), {observe: 'response'})
      .subscribe((response: HttpResponse<House[]>) => {
        if (isInitialDataLengthFetch) {
          const paginationInformation = response.headers.get('link');
          this.houseStoreService.maximumHouseDataLength = this.extractLastPageNumber(paginationInformation);
          this.fetchHouses(1, this.currentPageSize);
        } else {
          this.currentPageSize = pageSize;
          this.houseStoreService.setHouses(response.body, false);
        }
      }, error => {
        console.error(error);
        this.houseStoreService.setHouses([], true);
      });
  }

  subscribeToChanges(): void {
    this.houseFilterService.filtersChanged.subscribe((changedFilter: HouseFilter) => {
      if (this.filterChanged(changedFilter)) {
        this.filter = {...changedFilter};
        this.fetchHouses(1, 1, true);
      }
    });
  }

  filterChanged(changedFilter: HouseFilter): boolean {
    return !this.jsonEqual(this.filter, changedFilter) ||
      (!this.houseFilterService.isEmptyObject(this.filter) && this.houseFilterService.isEmptyObject(changedFilter));
  }

  generateRequestUrl(page: number, pageSize: number): URL {
    const requestUrl = new URL(environment.iceAndFireApi.url + '/houses');
    requestUrl.searchParams.set('page', String(page));
    requestUrl.searchParams.append('pageSize', String(pageSize));
    return requestUrl;
  }

  fetchHouse(index: number, isAdditionalInformationRequest?: boolean): Promise<House> {
    return new Promise((resolve, reject) => {
      if (!isAdditionalInformationRequest) {
        this.cancelOngoingRequests(this.houseDetailRequestSubscription);
      }
      const requestUrl = new URL(environment.iceAndFireApi.url + '/houses/' + index);
      this.houseDetailRequestSubscription = this.http.get<House>(requestUrl.toString()).subscribe((detailedHouseData: House) => {
        if (isAdditionalInformationRequest) {
          resolve(this.houseStoreService.mapHousesData(Array.of(detailedHouseData))[0]);
        } else {
          this.houseStoreService.setDetailedHouse(detailedHouseData, false);
        }
      }, error => {
        console.error(error);
        if (isAdditionalInformationRequest) {
          reject(undefined);
        } else {
          this.houseStoreService.setDetailedHouse(undefined, true);
        }
      });
    });
  }

  fetchCharacter(index: number): Promise<Character> {
    return new Promise((resolve, reject) => {
      const requestUrl = new URL(environment.iceAndFireApi.url + '/characters/' + index);
      this.http.get<Character>(requestUrl.toString()).subscribe((detailedCharacterData: Character) => {
        resolve(this.characterStoreService.setDetailedCharacter(detailedCharacterData, false));
      }, error => {
        reject(this.characterStoreService.setDetailedCharacter(undefined, true));
      });
    });
  }

  addFiltersToRequest(requestUrl: URL):void {
    for (const [key, value] of Object.entries(this.filter)) {
      requestUrl.searchParams.append(key, value);
    }
  }

  private cancelOngoingRequests(requestSubscription: Subscription): void {
    if (requestSubscription && !requestSubscription.closed) {
      requestSubscription.unsubscribe();
    }
  }


  private extractLastPageNumber(paginationInformation: string): number {
    const lastPageUrl = new URL(paginationInformation.substring(
      paginationInformation.lastIndexOf('<') + 1, paginationInformation.lastIndexOf('>; rel="last"')));
    return parseInt(lastPageUrl.searchParams.get('page'), 10);
  }

  jsonEqual(a, b): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }
}
