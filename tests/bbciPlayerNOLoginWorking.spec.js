import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePageNavigation';
import fs from 'fs';


test('Select a program and check if playback is available', async ({ page }) => {
//Navigate to BBC Home Page using POM
const login = new HomePage(page);
await login.gotoHomePage();


    const sectionHeaders1 = page.locator('section h2');
        const count1 = await sectionHeaders1.count();

        for (let i = 7; i < count1; i++) {
        const section1 = sectionHeaders1.nth(i);
        const sectionName1 = await section1.allTextContents();

        // Programmes within the section
       
    const programmes1 = page.locator('//*[@id="main"]/div[2]/div[2]/div/section[1]/div/div[2]/div/div/ul/li');
    //expect (programmes).toBeVisible();
    const programmeCount1 = await programmes1.count();
    
            if (sectionName1=='New & Trending') {
        	
      
            // Locate the first program within the section
            const firstProgram = page.locator('//*[@id="main"]/div[2]/div[2]/div/section[1]/div/div[2]/div/div/ul/li').first();

            // Capture and log the program title
            const programTitle = await firstProgram.textContent();
            console.log('✅ First program in first section:', {programTitle});

             // Click to select the program
             await firstProgram.click();
             //verify if the playback button is visible
            //await expect(page.locator('span', { hasText: 'Start watching' })).toBeVisible();
            const locator = page.locator("span.contained-button__text.typo.typo--raven.typo--bold span");
            await expect(locator).toBeVisible();
            await expect(locator).toHaveText('Start watching');
        }

        }    

});

test.only('BBS Age Restriction  pop up', async ({ page }) => {
  await page.goto('https://www.bbc.co.uk/iplayer#age-restricted');
  //assert to confirm the dialog box is visible
  const dialog = page.locator('xpath=//div[@role="alertdialog"]');
   await expect(dialog).toBeVisible();
     // Capture the text
  const dialogText = await dialog.innerText();
  // Display in console
  console.log('Dialog Text:', dialogText);
  //accept the cookies
  await page.getByRole('button', { name: 'Accept additional cookies' }).click();
  //close the age restricted dialog box
  await page.getByRole('button', { name: 'Okay' }).click();
});