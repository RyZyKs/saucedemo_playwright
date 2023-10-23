import { expect, type Page } from '@playwright/test';

export default class CartPage {
  constructor(protected readonly page: Page) {}

  //--------------------------------------------------------
  // Locators.
  //--------------------------------------------------------
  CHECKOUT_BUTTON = '[data-test="checkout"]';
  //--------------------------------------------------------
  // Functions.
  //--------------------------------------------------------
  //
  /**
   * This function moves user to checkout step one page.
   *
   */
  public async moveToCheckoutStepOnePage() {
    await this.page.locator(this.CHECKOUT_BUTTON).click();
    await expect(
      this.page.getByText('Checkout: Your Information')
    ).toBeVisible();
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-one.html'
    );
  }
}
