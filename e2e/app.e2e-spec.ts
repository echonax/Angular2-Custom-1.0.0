import { NgsalvPage } from './app.po';

describe('ngsalv App', () => {
  let page: NgsalvPage;

  beforeEach(() => {
    page = new NgsalvPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
