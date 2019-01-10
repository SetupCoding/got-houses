import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {House} from '../../model/house';
import {HouseFilters} from '../../model/house-filters';
import {MatTableDataSource} from '@angular/material';
import {HouseStoreService} from '../../houses/service/house-store.service';
import {Observable, Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IceAndFireService {
  housesRequestSubscription: Subscription;
  houseDetailRequestSubscription: Subscription;

  constructor(private houseStoreService: HouseStoreService, private http: HttpClient) {
  }

  initializeHouseData(): void {
    this.fetchHouses(1, 1, undefined, true);
  }

  fetchHouses(page = 1, pageSize = 10, filters?: HouseFilters, isInitialDataLengthFetch?: boolean): void {
    this.cancelOngoingRequests(this.housesRequestSubscription);
    const requestUrl = new URL(environment.iceAndFireApi.url + '/houses');
    requestUrl.searchParams.set('page', String(page));
    requestUrl.searchParams.append('pageSize', String(pageSize));
    // if (filters) {
    //   for (let filterName of Object.keys(filters)) {
    //     requestUrl.searchParams.append(filterName, filters[filterName]);
    //   }
    // }
    this.housesRequestSubscription = this.http.get<House[]>(requestUrl.toString(), {observe: 'response'})
      .subscribe((response: HttpResponse<House[]>) => {
        if (isInitialDataLengthFetch) {
          const paginationInformation = response.headers.get('link');
          this.houseStoreService.maximumHouseDataLength = this.extractLastPageNumber(paginationInformation);
          this.fetchHouses(1, environment.defaultPageSize);
        } else {
          this.houseStoreService.setHouses(response.body);
        }
      }, error => {
        console.error(error);
        //remove houses or show error to user
      });
  }

  fetchHouse(index: number): void {
    this.cancelOngoingRequests(this.houseDetailRequestSubscription);
    const requestUrl = new URL(environment.iceAndFireApi.url + '/houses/' + index);
    this.houseDetailRequestSubscription = this.http.get<House>(requestUrl.toString()).subscribe((detailedHouseData: House) => {
      this.houseStoreService.setDetailedHouse(detailedHouseData);
    });
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
