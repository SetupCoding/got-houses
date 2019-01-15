import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material';
import {HouseFilterService} from './house-filter.service';
import {HouseFilter, HouseFilterClass} from '../../models/house-filter';
import {FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-house-filter',
  templateUrl: './house-filter.component.html',
  styleUrls: ['./house-filter.component.scss']
})
export class HouseFilterComponent implements OnInit, OnDestroy {
  possibleFilterTypes: HouseFilter = new HouseFilterClass();
  filterTypes;
  filter: HouseFilter;
  selectFilterFormControl = new FormControl('', [Validators.required]);
  @ViewChild(MatSelect) selectedFilterType: MatSelect;
  @ViewChild('filterInput', {read: ElementRef}) filterInput: ElementRef;
  @ViewChild('filterCheckbox', {read: ElementRef}) filterCheckbox: ElementRef;
  filtersChangeSubscription: Subscription;


  constructor(private houseFilterService: HouseFilterService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscribeToChanges();
    this.filterTypes = Object.keys(this.possibleFilterTypes).map(filterType => {
      return {name: filterType, type: typeof this.possibleFilterTypes[filterType]};
    });
  }

  ngOnDestroy(): void {
    if (this.filtersChangeSubscription) {
      this.filtersChangeSubscription.unsubscribe();
    }
  }

  subscribeToChanges(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['filter']) {
        this.filter = JSON.parse(params['filter']);
        this.houseFilterService.addFilters(this.filter);
      }
    });
    this.filtersChangeSubscription = this.houseFilterService.filtersChanged.subscribe((houseFilter: HouseFilter) => {
      if (!this.hasFilters(houseFilter) && this.filter) {
        delete this.filter;
        this.resetFilters();
      } else {
        this.filter = houseFilter;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {filter: JSON.stringify(this.filter)},
          queryParamsHandling: 'merge'
        });
      }
    });
  }

  addFilter(selectedFilterType: MatSelect, filterInput: string, isFilterCheckboxChecked: boolean): void {
    if (selectedFilterType.value == null) {
      this.selectFilterFormControl.markAsTouched({onlySelf: true});
      if (this.filter == null || Object.keys(this.filter).length === 0) {
        this.selectFilterFormControl.setErrors({'required': true});
      }
    } else {
      this.houseFilterService.addFilter(selectedFilterType, filterInput, isFilterCheckboxChecked);
      this.resetFilterFields();
    }
  }


  applyFilters(selectedFilterType: MatSelect, filterInput: string, isFilterCheckboxChecked: boolean): void {
    this.addFilter(selectedFilterType, filterInput, isFilterCheckboxChecked);
    this.resetFilterFields();
  }

  resetFilterFields(): void {
    this.selectedFilterType.value = undefined;
    this.filterInput.nativeElement.value = '';
    this.filterCheckbox.nativeElement.checked = false;
  }

  resetFilters(): void {
    this.resetFilterFields();
    this.houseFilterService.removeAllFilters();
  }

  hasFilters(object): boolean {
    return !this.houseFilterService.isEmptyObject(object);
  }

  objectKeys(filter = {}): string[] {
    return Object.keys(filter);
  }
}
