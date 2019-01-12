import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material';
import {IceAndFireService} from '../../core/http/ice-and-fire.service';
import {HouseFilterService} from './house-filter.service';
import {HouseFilter, HouseFilterClass} from '../../models/house-filter';
import {FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-house-filter',
  templateUrl: './house-filter.component.html',
  styleUrls: ['./house-filter.component.scss']
})
export class HouseFilterComponent implements OnInit, OnDestroy {
  objectKeys = Object.keys;
  possibleFilterTypes: HouseFilter = new HouseFilterClass();
  filterTypes;
  filter: HouseFilter;
  selectFilterFormControl = new FormControl('', [Validators.required]);
  @ViewChild(MatSelect) selectedFilterType: MatSelect;
  @ViewChild('filterInput', {read: ElementRef}) filterInput: ElementRef;
  @ViewChild('filterCheckbox', {read: ElementRef}) filterCheckbox: ElementRef;
  filtersChangeSubscription: Subscription;


  constructor(private iceAndFireService: IceAndFireService, private houseFilterService: HouseFilterService) {
  }

  ngOnInit() {
    this.subscribeToChanges();
    this.filterTypes = Object.keys(this.possibleFilterTypes).map(filterType => {
      return {name: filterType, type: typeof this.possibleFilterTypes[filterType]};
    });
  }

  ngOnDestroy() {
    if (this.filtersChangeSubscription) {
      this.filtersChangeSubscription.unsubscribe();
    }
  }

  subscribeToChanges(): void {
    this.filtersChangeSubscription = this.houseFilterService.filtersChanged.subscribe((houseFilter: HouseFilter) => {
      if (this.isEmptyObject(houseFilter)) {
        delete this.filter;
      } else {
        this.filter = houseFilter;
      }
    });
  }

  addFilter(selectedFilterType: MatSelect, filterInput: string, isFilterCheckboxChecked: boolean): void {
    if (selectedFilterType.value == null) {
      this.selectFilterFormControl.markAsTouched({onlySelf: true});
      this.selectFilterFormControl.setErrors({'required': true});
    } else {
      this.houseFilterService.addFilter(selectedFilterType, filterInput, isFilterCheckboxChecked);
      this.resetFilterFields();
    }
  }

  removeFilter(selectedFilterType: MatSelect, filterInput: string, isFilterCheckboxChecked: boolean) {
    this.houseFilterService.removeFilter(selectedFilterType, filterInput, isFilterCheckboxChecked);
  }

  applyFilters(selectedFilterType: MatSelect, filterInput: string, isFilterCheckboxChecked: boolean): void {
    this.addFilter(selectedFilterType, filterInput, isFilterCheckboxChecked);
    this.resetFilterFields();
    this.iceAndFireService.initializeHouseData();
  }

  resetFilterFields(): void {
    this.selectedFilterType.value = undefined;
    this.filterInput.nativeElement.value = '';
    this.filterCheckbox.nativeElement.checked = false;
  }

  resetFilters(): void {
    this.resetFilterFields();
    this.houseFilterService.removeAllFilters();
    this.iceAndFireService.initializeHouseData();
  }

  isString(value): boolean {
    return typeof value === 'string';
  }

  isEmptyObject(object): boolean {
    return Object.keys(object).length === 0 && object.constructor === Object;
  }
}
