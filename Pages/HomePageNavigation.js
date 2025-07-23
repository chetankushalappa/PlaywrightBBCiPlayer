
exports.HomePage=
class HomePage{

    constructor(page) {
this.page=page;
this.acceptcookies='//*[@id="bbccookies-accept-button"]';
    }

    async gotoHomePage(){

    await this.page.goto('https://www.bbc.co.uk/iplayer');
      await this.page.waitForSelector(this.acceptcookies, { state: 'visible' });
    await this.page.locator(this.acceptcookies).click();
    }


}
