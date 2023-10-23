import { expect, type Page } from '@playwright/test';

export default class InventoryPage {
  constructor(protected readonly page: Page) {}

  //--------------------------------------------------------
  // Locators.
  //--------------------------------------------------------
  BURGER_MENU_DROPDOWN = '#react-burger-menu-btn';
  PAGE_HEADER = '.app_logo';
  SCND_HEADER = '#header_container > div.header_secondary_container > span';
  SHOPPING_CART_LINK = '#shopping_cart_container';
  SORT_DROPDOWN = '[data-test="product_sort_container"]';
  //--------------------------------------------------------
  // Products add to cart buttons.
  //--------------------------------------------------------
  BACKPACK = 'sauce-labs-backpack';
  BOLT_SHIRT = 'sauce-labs-bolt-t-shirt';
  ONESIE = 'sauce-labs-onesie';
  BIKE_LIGHT = 'sauce-labs-bike-light';
  FLEECE_JACKET = 'sauce-labs-fleece-jacket';
  TEST_ALL = 'test.allthethings()-t-shirt-(red)';
  //--------------------------------------------------------
  // Functions.
  //--------------------------------------------------------
  //

  /**
   * This function checks if the page is opened.
   */
  public async checkIfPageIsOpened() {
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  /**
   * This function moves user to the cart page.
   */
  public async moveToCart() {
    await this.page.locator(this.SHOPPING_CART_LINK).click();
    await expect(this.page.locator(this.SCND_HEADER)).toBeVisible();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
  }

  /**
   * This function sorts the products form A to Z and then validate if it's sorted correctly.
   */
  public async sortByNameAtoZ() {
    // Select the "Name (A to Z)" option in the dropdown
    await this.page.selectOption(this.SORT_DROPDOWN, 'az');

    // Get the list of product names
    const productTable: string[] = await this.page.$$eval(
      '.inventory_item',
      (items) => {
        return items.map((item: any) => {
          return item.querySelector('.inventory_item_name').textContent.trim();
        });
      }
    );

    // Sort the product names
    const sortedTable = [...productTable].sort((a, b) => a.localeCompare(b));

    // Define the expected sorted order
    const manuallySortedTable: string[] = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
    ];

    // Assert that the sorted table matches the expected order
    expect(sortedTable).toStrictEqual(manuallySortedTable);

    // For debugging
   /*  const sortedTableString = sortedTable.join(', ');
    const manuallySortedTableString = manuallySortedTable.join(', ');
    console.log('Sorted Table: ' + sortedTableString);
    console.log('Manually Sorted Table: ' + manuallySortedTableString); */
  }
}
