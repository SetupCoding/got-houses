import {Component, Input, OnInit} from '@angular/core';
import {HouseFilterService} from '../house-filter.service';

@Component({
  selector: 'app-house-filter-item',
  templateUrl: './house-filter-item.component.html',
  styleUrls: ['./house-filter-item.component.scss', '../house-filter.component.scss']
})
export class HouseFilterItemComponent implements OnInit {
  @Input() filter;
  @Input() filterKey;
  @Input() filterValue;

  constructor(private houseFilterService: HouseFilterService) {
  }

  ngOnInit() {
  }

  removeFilter(): void {
    this.houseFilterService.removeFilter(this.filterKey);
  }
}
