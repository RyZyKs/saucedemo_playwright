import { test, expect } from '@playwright/test';
import { UserCredentials } from '../../utils/UsersData';
import { Products } from '../../utils/ProductsData';
import CartPage from '../../pages/CartPage';
import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import Utils from '../../utils/Utils';
import CheckoutStepOnePage from '../../pages/CheckoutStepOnePage';
import CheckoutStepTwoPage from '../../pages/CheckoutStepTwoPage';
import CheckoutCompletePage from '../../pages/CheckoutCompletePage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const stdUser = UserCredentials.stdUser;
  await page.goto('/');
  await loginPage.login(stdUser.username, stdUser.password);
  await inventoryPage.checkIfPageIsOpened();
});

test.describe('Checkout Complete Test Suite', () => {
  test('Add product to cart and complete the checkout', async ({ page }) => {
    const utils = new Utils(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    const cartPage = new CartPage(page);
    const backpack = Products.backpack;
    const bikeLight = Products.bikeLight;

    await utils.addProductToCart(inventoryPage.BACKPACK);
    await utils.addProductToCart(inventoryPage.BIKE_LIGHT);
    await expect(page.locator(inventoryPage.SHOPPING_CART_LINK)).toHaveText(
      '2'
    );
    await inventoryPage.moveToCart();
    await utils.checkIfProductIsListedOnTheList(backpack.name);
    await utils.checkIfProductIsListedOnTheList(bikeLight.name);
    await cartPage.moveToCheckoutStepOnePage();
    await checkoutStepOnePage.fillUpyourInformation(
      'Peeeee',
      ' Gieeeeee',
      '100-1000'
    );
    await checkoutStepOnePage.moveToCheckoutStepTwoPage();
    await utils.checkIfProductIsListedOnTheList(backpack.name);
    await utils.checkIfProductIsListedOnTheList(bikeLight.name);
    await checkoutStepTwoPage.moveToCheckoutCompletePage();
    await checkoutCompletePage.viewCheckoutCompleteConfirmation();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
