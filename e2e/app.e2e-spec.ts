import { AngularTimerPage } from './app.po';

describe('angular-timer App', () => {
  let page: AngularTimerPage;

  beforeEach(() => {
    page = new AngularTimerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
