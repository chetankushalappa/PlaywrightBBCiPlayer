exports.LoginPage=
class LoginPage{

constructor(page) {
this.page=page;
this.loginLink='//*[@id="idcta-username"]';
this.username='//*[@id="user-identifier-input"]';
this.continue='//*[@id="submit-button"]';
this.password='//input[@id="password-input"]';
this.submitbutton='//*[@id="submit-button"]';


}

async gotoHomePage(){

    await this.page.goto('https://www.bbc.co.uk/iplayer');

}

    async login(username,password) {
        await this.page.locator(this.loginLink).click();
        await this.page.locator(this.username).fill(username);
        await this.page.locator(this.continue).click();
        //await page.waitForTimeout(5000);
          await this.page.locator(this.password).fill(password);
          await this.page.locator(this.submitbutton).click();

    }


}