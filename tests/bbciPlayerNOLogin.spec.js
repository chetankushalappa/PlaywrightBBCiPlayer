import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePageNavigation';
import fs from 'fs';


test('Navigate to BBC iPlayer and Check for Sections', async ({ page }) => {
//Navigate to BBC Home Page using POM
const login = new HomePage(page);
await login.gotoHomePage();

//Validation 1: Verify the homepage has a title of “BBC iPlayer – Home”.

//declare the home page title to be a string
const pageTitle = "BBC iPlayer - Home";
//assertion to confirm the page title is a string and matches to the expected value
await expect(page).toHaveTitle(pageTitle);


//Check the number of sections in the home page

    // Locate all section headers
    const sectionHeaders = page.locator('section h2');

    // Get section names as an array
    const sectionNames = await sectionHeaders.allTextContents();

    //Display all section names  
    console.log("BBC iPlayer Sections:");
    sectionNames.forEach((name, index) => {
        console.log(`${index + 1}. ${name}`);
    });
    /// Display total section count 
    console.log(sectionNames.length);
    
    //validate if there are more than 4 sections
    const count = await sectionHeaders.count();
    expect(count).toBeGreaterThan(4);

    let assertionResult = '';

        if (count > 4) {
            assertionResult = `✅ PASS: Found ${count} sections (more than 4).`;
            console.log(assertionResult);
        } else {
            assertionResult = `❌ FAIL: Only ${count} sections found (should be more than 4).`;
            console.log(assertionResult);
        }

    });

        //Verify the programmes in each section and use of carousel
    test('Navigate Sections and carousel', async ({ page }) => {
        //Navigate to BBC Home Page using POM
        const login = new HomePage(page);
        await login.gotoHomePage();


         const sectionHeaders = page.locator('section h2');
        const count = await sectionHeaders.count();

        for (let i = 7; i < count; i++) {
        const section = sectionHeaders.nth(i);
        const sectionName = await section.allTextContents();

        // Programmes within the section
       
    const programmes = page.locator('//*[@id="main"]/div[2]/div[2]/div/section[1]/div/div[2]/div/div/ul/li');
    //expect (programmes).toBeVisible();
    const programmeCount = await programmes.count();
    
   
        	
        if (programmeCount >= 4) {
            console.log(`✅ PASS: ${sectionName} has ${programmeCount} programmes.`);
                 } else {
            console.log(`❌ FAIL: ${sectionName} has only ${programmeCount} programmes (less than 4).`);
            }
      // await page.getByLabel(sectionName, { exact: true }).getByRole('button', { name: 'Scroll carousel right' }).click();     
    }

        // click on carousel and check if more programs are visible for one Section
     await page.getByLabel('New & Trending', { exact: true }).getByRole('button', { name: 'Scroll carousel right' }).click();
  
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
        	
        if (programmeCount1 >= 4) {
            console.log(`✅ PASS: ${sectionName1} has ${programmeCount1} programmes.`);
                 } else {
            console.log(`❌ FAIL: ${sectionName1} has only ${programmeCount1} programmes (less than 4).`);
            }
      // await page.getByLabel(sectionName, { exact: true }).getByRole('button', { name: 'Scroll carousel right' }).click();     
    }
}
    } );


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


test('BBS Age Restriction  pop up', async ({ page }) => {
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

     // Generate HTML report
/*    let htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>BBC iPlayer Sections Report</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #b80000; }
        ul { line-height: 1.6; }
    </style>
</head>
<body>
    <h1>BBC iPlayer Sections</h1>
    <ul>
`;

    sectionNames.forEach((name, index) => {
        htmlContent += `        <li>${index + 1}. ${name}</li>\n`;
    });

    htmlContent += `
    </ul>
</body>
</html>
`;

    fs.writeFileSync('bbc_iplayer_sections_report.html', htmlContent);
    console.log("✅ HTML report generated: bbc_iplayer_sections_report.html");

    // Optional validation
    expect(sectionNames.length).toBeGreaterThan(0);

*/




