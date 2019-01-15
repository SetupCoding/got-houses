import {AppPage} from './app.po';
import {browser} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should reroute to houses', () => {
    const EC = browser.ExpectedConditions;
    page.navigateTo().then(() => {
      browser.getCurrentUrl().then((url: string) => {
        expect(url.includes('/house')).toBeTruthy();
      });
    });
  });
  it('should select and display 5 items per page', () => {
    page.getPaginatorSelection().click();
    page.getFisrtPaginatorSelection().click();
    expect(page.getrowByNumber(5)).toBeTruthy();
    expect(page.getrowByNumber(6).isPresent()).toEqual(false);
  });

  it('should go to page 2', () => {
    page.getPaginatorSelection().click();
    page.getPaginatorSelectionByNumber(3).click();
    page.getNextPage().click();
    page.getFirstRowFirstCol().getText().then((text: string) => {
      expect(text === '26').toBeTruthy();
    });
  });
  it('should go back from page 2', () => {
    page.getPreviousPage().click();
    page.getFirstRowFirstCol().getText().then((text: string) => {
      expect(text === '1').toBeTruthy();
    });
  });
  it('should go to first page from page 3', () => {
    page.getNextPage().click();
    page.getFirstRowFirstCol().getText().then((text: string) => {
      expect(text === '26').toBeTruthy();
    });
    page.getNextPage().click();
    page.getFirstRowFirstCol().getText().then((text: string) => {
      expect(text === '51').toBeTruthy();
    });
    page.getFirstPage().click();
    page.getFirstRowFirstCol().getText().then((text: string) => {
      expect(text === '1').toBeTruthy();
    });
  });
  it('should go to last page from page 1', () => {
    page.getLastPage().click();
    page.getFirstRowFirstCol().getText().then((text: string) => {
      expect(text === '426').toBeTruthy();
    });
  });
  it('should expand filter header', () => {
    page.getFilterHeader().click();
    expect(page.getFilterSelection().isPresent()).toEqual(true);
  });
  it('should open filter selection', () => {
    page.getFilterSelection().click();
  });
  it('should addFilter hasWords:true', () => {
    page.getFilterOptionByNumber(4).click();
    page.getFilterSelectionCheckbox().click();
    page.getAddFilterButton().click();
  });
  it('should addFilter hasTitles:true', () => {
    page.getFilterSelection().click();
    page.getFilterOptionByNumber(5).click();
    page.getAddFilterButton().click();
  });
  it('should removeFilter hasTitles:true', () => {
    page.getRemoveFilterButtonOfFilterNumber(2).click();
    expect(page.getFilterChipByNumber(2).isPresent()).toEqual(false);
  });
  it('should apply filter hasWords:true', () => {
    page.getApplyFilterButton().click();
    page.getFirstRowFirstCol().getText().then((text: string) => {
      expect(text === '2').toBeTruthy();
    });
  });
  it('should remove all filters', () => {
    page.getRemoveAllFiltersButton().click();
    page.getFirstRowFirstCol().getText().then((text: string) => {
      expect(text === '1').toBeTruthy();
    });
  });
});

