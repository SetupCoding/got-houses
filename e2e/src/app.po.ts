import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getPaginatorSelection() {
    return element('#tablePaginator');
  }

  getPaginatorSelectionOptions() {
    return this.getPaginatorSelection().findElement('option');
  }
}
