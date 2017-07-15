import { TpHelperClientNgPage } from './app.po';

describe('tp-helper-client-ng App', () => {
  let page: TpHelperClientNgPage;

  beforeEach(() => {
    page = new TpHelperClientNgPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
