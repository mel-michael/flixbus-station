import { FlixbusPage } from './app.po';

describe('flixbus App', () => {
  let page: FlixbusPage;

  beforeEach(() => {
    page = new FlixbusPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
