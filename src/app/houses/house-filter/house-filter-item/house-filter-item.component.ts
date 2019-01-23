import {Component, Input} from '@angular/core';
import {HouseFilterService} from '../house-filter.service';

@Component({
  selector: 'app-house-filter-item',
  templateUrl: './house-filter-item.component.html',
  styleUrls: ['../house-filter.component.scss']
})
export class HouseFilterItemComponent {
  @Input() filter;
  @Input() filterKey;
  @Input() filterValue;

  constructor(private houseFilterService: HouseFilterService) {
  }

  removeFilter(): void {
    this.houseFilterService.removeFilter(this.filterKey);
  }
}
