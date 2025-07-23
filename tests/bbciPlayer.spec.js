import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { SelectCPage } from '../Pages/SelectCategoryPage';

test('test', async ({ page }) => {
//login using POM
const login = new LoginPage(page);
await login.gotoHomePage();
await login.login('chetankushalappa@gmail.com','ArEnHc022618');
await page.waitForTimeout(5000);

//Navigate to Drama and Soaps using POM
const category=new SelectCPage(page);
await category.SelectC('C','Categories','Drama & Soaps');

});
