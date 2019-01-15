import {AppPage} from './app.po';
import {browser} from 'protractor';
import {timeout} from 'rxjs/operators';

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
});
