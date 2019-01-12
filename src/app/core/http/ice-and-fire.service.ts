import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {House} from '../../models/house';
import {HouseFilter} from '../../models/house-filter';
import {MatTableDataSource} from '@angular/material';
import {HouseStoreService} from '../../houses/house-store/house-store.service';
import {Observable, Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HouseFilterService} from '../../houses/house-filter/house-filter.service';


@Injectable({
  providedIn: 'root'
})
export class IceAndFireService {
  housesRequestSubscription: Subscription;
  houseDetailRequestSubscription: Subscription;
  currentPageSize = environment.defaultPageSize;

  constructor(private houseStoreService: HouseStoreService, private houseFilterService: HouseFilterService, private http: HttpClient) {
  }

  initializeHouseData(): void {
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

  generateRequestUrl(page: number, pageSize: number): URL {
    const requestUrl = new URL(environment.iceAndFireApi.url + '/houses');
    requestUrl.searchParams.set('page', String(page));
    requestUrl.searchParams.append('pageSize', String(pageSize));
    return requestUrl;
  }

  fetchHouse(index: number): void {
    this.cancelOngoingRequests(this.houseDetailRequestSubscription);
    const requestUrl = new URL(environment.iceAndFireApi.url + '/houses/' + index);
    this.houseDetailRequestSubscription = this.http.get<House>(requestUrl.toString()).subscribe((detailedHouseData: House) => {
      this.houseStoreService.setDetailedHouse(detailedHouseData, false);
    }, error => {
      console.error(error);
      this.houseStoreService.setDetailedHouse(undefined, true);
    });
  }

  addFiltersToRequest(requestUrl: URL) {
    for (const [key, value] of Object.entries(this.houseFilterService.selectedFilter)) {
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

}
