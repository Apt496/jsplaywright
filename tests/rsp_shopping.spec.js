const { test, expect } = require('@playwright/test');
const { getProperty } = require('./test-config');

test('shopping_test', async ({ page }) => {
    const username = getProperty('username');
    const passwordValue = getProperty('password');
    const email = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginbutton = page.locator("#login");
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';

    await page.goto(getProperty('clientUrl'));
    await email.fill(username);
    await password.fill(passwordValue);
    await loginbutton.click();
    await page.locator(".card-body").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const product = products.filter({ hasText: productName });
    await expect(product).toHaveCount(1);
    await product.getByRole('button', { name: 'Add To Cart' }).click();
    await page.locator('//button[@routerlink="/dashboard/cart"]').click();
    await expect(page.locator("h3:has-text('ZARA COAT 3')").first()).toBeVisible();
    await page.locator("//button[@class='btn btn-primary']").nth(1).click();
    await page.locator("input[placeholder='Select Country']").pressSequentially("India");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionscount = await dropdown.locator("button").count();
    for (let i = 0; i < optionscount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click();
            console.log(text);
            break;
        }
    }
    await page.locator('.btnn.action__submit.ng-star-inserted').click();
    await expect(page.locator("//h1[@class='hero-primary']")).toHaveText(' Thankyou for the order. ');
    const orderid = (await page.locator('label.ng-star-inserted').textContent())
        ?.replace(/\|/g, '')
        .trim();
    console.log(orderid);
    //direct check
    // await page.locator("//button[@routerlink='/dashboard/myorders']").click();
    // const orderHeader = page.locator(`//th[normalize-space()='${orderid}']`);
    // await expect(orderHeader).toBeVisible();
    // const ordercheck = await orderHeader.textContent();
    // const normalizedOrderCheck = ordercheck?.replace(/\|/g, '').trim();
    // console.log(normalizedOrderCheck);
    // expect(orderid).toEqual(normalizedOrderCheck);

    //loop apprach
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderid.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderid.includes(orderIdDetails)).toBeTruthy();


});