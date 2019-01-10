import {Component, OnInit, ViewChild} from '@angular/core';
import {IceAndFireService} from '../../core/http/ice-and-fire.service';
import {House} from '../../model/house';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {HttpResponse} from '@angular/common/http';
import {HouseService} from '../service/house.service';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss']
})
export class HouseListComponent implements OnInit {
  houses: House[] = [];
  tableDataSource = new MatTableDataSource<House>([]);
  displayedColumns: string[] = ['houseIndex', 'houseName'];
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  maxTableDataLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private iceAndFireService: IceAndFireService, private houseService: HouseService) {
  }

  ngOnInit() {
    this.tableDataSource.paginator = this.paginator;
    this.fetchHousesByPage(1);
  }

  fetchHousesByPage(page: number) {
    this.iceAndFireService.fetchHouses(page, this.pageSize).subscribe((response: HttpResponse<House[]>) => {
      const paginationInformation = response.headers.get('link');
      this.maxTableDataLength = this.extractLastPageNumber(paginationInformation) * this.pageSize;
      this.houses = this.mapHousesData(response.body);
      this.houseService.setHouses(this.houses);
      this.tableDataSource = new MatTableDataSource<House>(this.houseService.houses);
    }, error => {
      console.error(error);
    });
  }

  private mapHousesData(housesData: House[]): House[] {
    return housesData.map(houseData => {
      return {
        index: this.extractIndexFromUrl(houseData.url),
        ...houseData
      };
    });
  }

  private extractIndexFromUrl(url: string): number {
    const pathnameToSegment = new URL(url).pathname;
    const extractedIndex = pathnameToSegment.substr(pathnameToSegment.lastIndexOf('/') + 1);
    return parseInt(extractedIndex, 10);
  }

  private extractLastPageNumber(paginationInformation: string): number {
    const lastPageUrl = new URL(paginationInformation.substring(
      paginationInformation.lastIndexOf('<') + 1, paginationInformation.lastIndexOf('>; rel="last"')));
    return parseInt(lastPageUrl.searchParams.get('page'), 10);
  }

  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    this.fetchHousesByPage(event.pageIndex + 1);
  }

  applySearch(houseName: string) {

  }
}
