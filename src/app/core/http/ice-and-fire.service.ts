import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {House} from '../../model/house';
import {HouseFilters} from '../../model/house-filters';

export const iceAndFireApiUrl = new InjectionToken<string>('iceAndFireApiUrl');

@Injectable({
  providedIn: 'root'
})
export class IceAndFireService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject(iceAndFireApiUrl) baseUrl?: string) {
    this.baseUrl = baseUrl ? baseUrl : '';
  }

  fetchHouses(page = 1, pageSize = 10, filters?: HouseFilters) {
    const requestUrl = new URL(this.baseUrl + '/houses');
    requestUrl.searchParams.set('page', String(page));
    requestUrl.searchParams.append('pageSize', String(pageSize));
    if (filters) {
      for (let filterName of Object.keys(filters)) {
        requestUrl.searchParams.append(filterName, filters[filterName]);
      }
    }
    return this.http.get<House[]>(requestUrl.toString(), {observe: 'response'});
  }

  fetchHouse(index: number) {
    const requestUrl = new URL(this.baseUrl + '/houses/' + index);
    return this.http.get<House>(requestUrl.toString());
  }

}
