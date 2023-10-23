import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import { UserCredentials } from '../../utils/UsersData';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const stdUser = UserCredentials.stdUser;
  await page.goto('/');
  await loginPage.login(stdUser.username, stdUser.password);
  await inventoryPage.checkIfPageIsOpened();
});

test.describe('Invetory Test Suite', () => {
  test('Add and remove all products from the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart(inventoryPage.BACKPACK);
    await inventoryPage.addProductToCart(inventoryPage.BOLT_SHIRT);
    await inventoryPage.addProductToCart(inventoryPage.ONESIE);
    await inventoryPage.addProductToCart(inventoryPage.BIKE_LIGHT);
    await inventoryPage.addProductToCart(inventoryPage.FLEECE_JACKET);
    await inventoryPage.addProductToCart(inventoryPage.TEST_ALL);
    await expect(page.locator(inventoryPage.SHOPPING_CART_LINK)).toHaveText(
      '6'
    );
    await inventoryPage.removeProductFromCart(inventoryPage.BACKPACK, 1);
    await inventoryPage.removeProductFromCart(inventoryPage.BOLT_SHIRT, 1);
    await inventoryPage.removeProductFromCart(inventoryPage.ONESIE, 1);
    await inventoryPage.removeProductFromCart(inventoryPage.BIKE_LIGHT, 1);
    await inventoryPage.removeProductFromCart(inventoryPage.FLEECE_JACKET, 1);
    await inventoryPage.removeProductFromCart(inventoryPage.TEST_ALL, 1);
    await expect(page.locator(inventoryPage.SHOPPING_CART_LINK)).toHaveText('');
  });

  test('Sort products alphabetically', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortByNameAtoZ();
  });

  test('Sort products and add to cart the last one', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortByNameAtoZ();
    await inventoryPage.addProductToCart(inventoryPage.TEST_ALL);
    await expect(page.locator(inventoryPage.SHOPPING_CART_LINK)).toHaveText(
      '1'
    );
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
