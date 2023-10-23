import { expect, type Page } from '@playwright/test';

export default class CheckoutStepTwoPage {
  constructor(protected readonly page: Page) {}

  //--------------------------------------------------------
  // Locators.
  //--------------------------------------------------------
  FINISH_BUTTON = '[data-test="finish"]';

  //--------------------------------------------------------
  // Functions.
  //--------------------------------------------------------
  //

  /**
   * This function moves user to checkout complete page.
   */
  public async moveToCheckoutCompletePage() {
    await this.page.locator(this.FINISH_BUTTON).click();
    await expect(this.page.getByText('Checkout: Complete!')).toBeVisible();
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/checkout-complete.html'
    );
  }
}
