const { test, expect, request } = require('@playwright/test');
const { getProperty } = require('./test-config');
const clientUrl = getProperty('clientUrl');
const loginUrl = getProperty('loginUrl');
const username = getProperty('username');
const password = getProperty('password');

let token;
test.beforeAll(async () => {
   if (!password) {
      throw new Error('Set the "password" property in config.properties before running this test');
   }

   const apiContext = await request.newContext();

   const loginResponse = await apiContext.post(
      loginUrl,
      { data: { userEmail: username, userPassword: password } }
   );

   expect(loginResponse.ok()).toBeTruthy();
   const responseBody = await loginResponse.json();
   token = responseBody.token;
   expect(token).toBeTruthy();
   await apiContext.dispose();
});



test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage


   //api login
   await page.addInitScript(value => {
      window.localStorage.setItem('token', value);
   }, token);

   //normal login

   await page.goto(clientUrl);
   // await page.locator("#userEmail").fill(email);
   // await page.locator("#userPassword").fill("");
   // await page.locator("[value='Login']").click();
   // await page.waitForLoadState('networkidle');


   const products = page.locator(".card-body");

   const email = username;
   const productName = 'ZARA COAT 3';
   await products.first().waitFor();
   const product = products.filter({ hasText: productName });
   await expect(product).toHaveCount(1);
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
   await product.getByRole("button", { name: "Add To Cart" }).click();

   await page.locator("[routerlink*='cart']").click();
   //await page.pause();

   await expect(page.locator("h3:has-text('ZARA COAT 3')").first()).toBeVisible();
   await page.locator("text=Checkout").click();

   await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }

   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");


   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});