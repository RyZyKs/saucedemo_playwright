import { test, expect } from '@playwright/test';
import { UserCredentials } from '../../utils/UsersData';
import { Products } from '../../utils/ProductsData';
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

test.describe('Cart Test Suite', () => {
  test('Add product to cart and check overview, then remove items from cart page', async ({ page }) => {
    const utils = new Utils(page);
    const inventoryPage = new InventoryPage(page);
    const backpack = Products.backpack;
    const bikeLight = Products.bikeLight;
    const boltShirt = Products.boltShirt;
    const fleeceJacket = Products.fleeceJacket;
    const onesie = Products.onesie;
    const test = Products.test;

    await utils.addProductToCart(inventoryPage.BACKPACK);
    await utils.addProductToCart(inventoryPage.BOLT_SHIRT);
    await utils.addProductToCart(inventoryPage.ONESIE);
    await utils.addProductToCart(inventoryPage.BIKE_LIGHT);
    await utils.addProductToCart(inventoryPage.FLEECE_JACKET);
    await utils.addProductToCart(inventoryPage.TEST_ALL);
    await expect(page.locator(inventoryPage.SHOPPING_CART_LINK)).toHaveText(
      '6'
    );
    await inventoryPage.moveToCart();
    await utils.checkIfProductIsListedOnTheList(backpack.name);
    await utils.checkIfProductIsListedOnTheList(bikeLight.name);
    await utils.checkIfProductIsListedOnTheList(boltShirt.name);
    await utils.checkIfProductIsListedOnTheList(fleeceJacket.name);
    await utils.checkIfProductIsListedOnTheList(onesie.name);
    await utils.checkIfProductIsListedOnTheList(test.name);
    await utils.removeProductFromCart(inventoryPage.BACKPACK, 2);
    await utils.removeProductFromCart(inventoryPage.BOLT_SHIRT, 2);
    await utils.removeProductFromCart(inventoryPage.ONESIE, 2);
    await utils.removeProductFromCart(inventoryPage.BIKE_LIGHT, 2);
    await utils.removeProductFromCart(inventoryPage.FLEECE_JACKET, 2);
    await utils.removeProductFromCart(inventoryPage.TEST_ALL, 2);
    await expect(page.locator(inventoryPage.SHOPPING_CART_LINK)).toHaveText('');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
