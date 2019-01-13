import {Injectable} from '@angular/core';
import {HouseFilter} from '../../models/house-filter';
import {Subject} from 'rxjs';
import {MatSelect} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class HouseFilterService {
  private _selectedFilter: HouseFilter = <HouseFilter>{};
  private _filtersChanged = new Subject<HouseFilter>();

  constructor() {
  }


  get selectedFilter(): HouseFilter {
    return this._selectedFilter;
  }

  set selectedFilter(value: HouseFilter) {
    this._selectedFilter = value;
  }

  get filtersChanged(): Subject<HouseFilter> {
    return this._filtersChanged;
  }

  set filtersChanged(value: Subject<HouseFilter>) {
    this._filtersChanged = value;
  }

  addFilter(selectedFilterType: MatSelect, filterInput: string, isFilterCheckboxChecked: boolean): void {
    const filterType = selectedFilterType.value.name;
    if (filterType) {
      this.selectedFilter[filterType] = selectedFilterType.value.type === 'string' ? filterInput : isFilterCheckboxChecked;
    }
    this.filtersChanged.next(this.selectedFilter);
  }

  removeFilter(selectedFilterType: string): void {
    const filterType = selectedFilterType;
    if (filterType) {
      delete this.selectedFilter[filterType];
    }
    this.filtersChanged.next(this.selectedFilter);
  }

  removeAllFilters(): void {
    this.selectedFilter = <HouseFilter>{};
    this.filtersChanged.next(this.selectedFilter);
  }
  isEmptyObject(object = this.selectedFilter): boolean {
    return Object.keys(object).length === 0 && object.constructor === Object;
  }
}
