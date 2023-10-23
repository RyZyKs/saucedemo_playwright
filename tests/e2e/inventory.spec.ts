import { test, expect } from '@playwright/test';
import { UserCredentials } from '../../utils/UsersData';
import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import Utils from '../../utils/Utils';


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
    const utils = new Utils(page);
    const inventoryPage = new InventoryPage(page);
    await utils.addProductToCart(inventoryPage.BACKPACK);
    await utils.addProductToCart(inventoryPage.BOLT_SHIRT);
    await utils.addProductToCart(inventoryPage.ONESIE);
    await utils.addProductToCart(inventoryPage.BIKE_LIGHT);
    await utils.addProductToCart(inventoryPage.FLEECE_JACKET);
    await utils.addProductToCart(inventoryPage.TEST_ALL);
    await expect(page.locator(inventoryPage.SHOPPING_CART_LINK)).toHaveText(
      '6'
    );
    await utils.removeProductFromCart(inventoryPage.BACKPACK, 1);
    await utils.removeProductFromCart(inventoryPage.BOLT_SHIRT, 1);
    await utils.removeProductFromCart(inventoryPage.ONESIE, 1);
    await utils.removeProductFromCart(inventoryPage.BIKE_LIGHT, 1);
    await utils.removeProductFromCart(inventoryPage.FLEECE_JACKET, 1);
    await utils.removeProductFromCart(inventoryPage.TEST_ALL, 1);
    await expect(page.locator(inventoryPage.SHOPPING_CART_LINK)).toHaveText('');
  });

  test('Sort products alphabetically', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortByNameAtoZ();
  });

  test('Sort products and add to cart the last one', async ({ page }) => {
    const utils = new Utils(page);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortByNameAtoZ();
    await utils.addProductToCart(inventoryPage.TEST_ALL);
    await expect(page.locator(inventoryPage.SHOPPING_CART_LINK)).toHaveText(
      '1'
    );
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
