import { expect, type Page } from '@playwright/test';

export default class Utils {
  constructor(protected readonly page: Page) {}

  //--------------------------------------------------------
  // Functions.
  //--------------------------------------------------------
  //

  /**
   * This function adds products to the cart.
   *
   * @param {string} productName - Product name's string.
   */
  public async addProductToCart(productName: string) {
    await this.page.locator(`[data-test="add-to-cart-${productName}"]`).click();
    await expect(
      this.page.locator(`[data-test="remove-${productName}"]`)
    ).toBeVisible();
  }

  /**
   * This function removes products from the cart on a specific page.
   *
   * @param {string} productName - Product name's string.
   * @param {number} page - Parameter to differentiate the specific page, 1 - means inventory page and 2 - means cart page.
   */
  public async removeProductFromCart(productName: string, page: number) {
    if (page === 1) {
      await this.page.locator(`[data-test="remove-${productName}"]`).click();
      await expect(
        this.page.locator(`[data-test="add-to-cart-${productName}"]`)
      ).toBeVisible();
    } else if (page === 2) {
      await this.page.locator(`[data-test="remove-${productName}"]`).click();
      await expect(
        this.page.locator(`[data-test="remove-${productName}"]`)
      ).toBeHidden();
    }
  }

  /**
   * This function checks if product is listed on the list.
   *
   * @param {string} productName - Product name's string.
   */
  public async checkIfProductIsListedOnTheList(productName: string) {
    await expect(
      this.page.getByRole('link', { name: productName })
    ).toBeVisible();
  }
}
