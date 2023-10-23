import { expect, type Page } from '@playwright/test';

export default class CheckoutStepOnePage {
  constructor(protected readonly page: Page) {}

  //--------------------------------------------------------
  // Locators.
  //--------------------------------------------------------
  FIRSTNAME_INPUT = '[data-test="firstName"]';
  LASTNAME_INPUT = '[data-test="lastName"]';
  POSTALCODE = '[data-test="postalCode"]';
  CONTINUE_BUTTON = '[data-test="continue"]';
  //--------------------------------------------------------
  // Functions.
  //--------------------------------------------------------
  //

  /**
   * This function fills up your information.
   *
   * @param {string} firstName - The product's name.
   * @param {string} lastName - The product's name.
   * @param {string} postalCode - The product's name.
   */
  public async fillUpyourInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.page.locator(this.FIRSTNAME_INPUT).fill(firstName);
    await this.page.locator(this.LASTNAME_INPUT).fill(lastName);
    await this.page.locator(this.POSTALCODE).fill(postalCode);
  }

  /**
   * This function moves user to checkout step two page.
   *
   */
  public async moveToCheckoutStepTwoPage() {
    await this.page.locator(this.CONTINUE_BUTTON).click();
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-two.html'
    );
  }
}
