// const { test,expect } = require('@playwright/test');

// test('1st_test', async ({ page }) => {
//     const uname = page.locator('#username');
    
//     await page.goto('https://practice.expandtesting.com/login');
//     console.log(await page.title());
//     await page.uname.fill("practice");
//     await page.locator('#password').fill("132");
//     await page.locator("[type='submit']").click();
//     console.log(await page.locator("div[id='flash'] b").textContent());
//     await expect(page.locator("div[id='flash'] b")).toContainText('You logged into a secure area!');

// });

// test('2nd_test', async ({ page }) => {
//     //chrome
//     await page.goto('https://google.com/');
//     console.log(await page.title());
//     await expect(page).toHaveTitle('Google');


// });