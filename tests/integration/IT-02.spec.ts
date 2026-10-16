import { test, expect, BrowserContext, Page } from '@playwright/test';

test('IT-02: DRIVER login state -> REAL Inventory and Cart', {
  annotation: {
    type: 'description',
    description: 'ใช้ Driver เตรียมสถานะ Login เพื่อทดสอบ Inventory และ Cart จริง'
  }
}, async ({ browser }) => {
  let context: BrowserContext;
  let page: Page;

  async function driverOpenInventory() {
    context = await browser.newContext();
    await context.addCookies([{
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/'
    }]);
    page = await context.newPage();
    await page.goto('https://www.saucedemo.com/inventory.html');
  }

  await test.step('สร้าง Driver และเปิด Inventory', async () => {
    await driverOpenInventory();
  });
  await test.step('ตรวจสอบ Inventory จริง', async () => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });
  await test.step('เพิ่มสินค้า 2 รายการ', async () => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });
  await test.step('ตรวจสอบสินค้าใน Cart', async () => {
    await page.locator('.shopping_cart_link').click();
    const cartItems = page.locator('.inventory_item_name');
    await expect(cartItems).toHaveCount(2);
    await expect(cartItems.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(cartItems.nth(1)).toHaveText('Sauce Labs Bike Light');
  });

  await context.close();
});