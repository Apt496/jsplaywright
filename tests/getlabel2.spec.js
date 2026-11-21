const { test, expect } = require('@playwright/test');
const { getProperty } = require('./test-config');
 
 
 
 //rewrite of shopping site using getByRole, getByText, getByPlaceholder, getByLabel, filter, nth
test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = getProperty('username');
   const password = getProperty('password');
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto(getProperty('clientUrl'));
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill(password);
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByRole("heading", { name: "ZARA COAT 3" }).first()).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})

