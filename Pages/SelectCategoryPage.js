exports.SelectCPage=

class SelectCPage{


constructor(page) {

    this.page=page;
    this.account='//span[normalize-space()="C"]';
    this.Category='//span[normalize-space()="Categories"]';
    this.SelectCategory='//a[contains(text(),"Drama & Soaps")]';


}

async SelectC(account,Category,SelectCategory) {

    await this.page.locator(this.account).click();
    await this.page.locator(this.Category).click();
    await this.page.locator(this.SelectCategory).click();
}

}