import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getPaginatorSelection() {
    return element(by.css('mat-select[aria-label="Items per page:"]>div:nth-of-type(1)>div:nth-of-type(1)'));
  }


  getFisrtPaginatorSelection() {
    return element(by.css('mat-option:nth-of-type(1)>span'));
  }

  getPaginatorSelectionByNumber(optionNumber: number) {
    return element(by.css('mat-option:nth-of-type(' + optionNumber + ')>span'));
  }

  getFilterHeader() {
    return element(by.css('mat-panel-description'));
  }

  getFilterSelection() {
    return element(by.css('app-house-filter>mat-list>mat-list-item>div:nth-of-type(1)>' +
      'mat-form-field:nth-of-type(1)>div:nth-of-type(1)>div:nth-of-type(1)>div:nth-of-type(1)'));
  }

  getFilterSelectionCheckbox() {
    return element(by.css('mat-checkbox>label>div:nth-of-type(1)'));
  }

  getAddFilterButton() {
    return element(by.css('mat-list-item:nth-of-type(1)>div:nth-of-type(1)>button>span>mat-icon'));
  }

  getRemoveFilterButtonOfFilterNumber(filterNumber: number) {
    return element(by.css('app-house-filter-item:nth-of-type(' + filterNumber + ')>mat-chip>mat-icon'));
  }

  getApplyFilterButton() {
    return element(by.css('mat-action-row>button:nth-of-type(2)>span'));
  }

  getRemoveAllFiltersButton() {
    return element(by.css('mat-action-row>button:nth-of-type(1)>span>mat-icon'));
  }

  getFilterChipByNumber(chipNumber: number) {
    return element(by.css('app-house-filter-item:nth-of-type(' + chipNumber + ')>mat-chip'));
  }

  getFilterOptionByNumber(optionNumber: number) {
    return element(by.css('mat-option:nth-of-type(' + optionNumber + ')>span'));
  }

  getrowByNumber(rowNumber: number) {
    return element(by.css('mat-row:nth-of-type(' + rowNumber + ')>mat-cell:nth-of-type(3)'));
  }

  getNextPage() {
    return element(by.css('button[aria-label="Next page"]'));
  }

  getLastPage() {
    return element(by.css('button[aria-label="Last page"]'));
  }

  getFirstPage() {
    return element(by.css('button[aria-label="First page"]'));
  }

  getPreviousPage() {
    return element(by.css('button[aria-label="Previous page"]'));
  }

  getFirstRowFirstCol() {
    return element(by.css('mat-row:nth-of-type(1)>mat-cell:nth-of-type(1)'));
  }
}
