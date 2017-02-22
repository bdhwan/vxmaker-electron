import { VxmakerAngularPage } from './app.po';

describe('vxmaker-angular App', function() {
  let page: VxmakerAngularPage;

  beforeEach(() => {
    page = new VxmakerAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
