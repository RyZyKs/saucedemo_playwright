import { expect, type Page } from "@playwright/test";

export default class LoginPage {
  constructor(protected readonly page: Page) {}

  //--------------------------------------------------------
  // Locators.
  //--------------------------------------------------------
  USER_NAME_INPUT = '[data-test="username"]';
  PASSWORD_INPUT = '[data-test="password"]';
  LOGIN_BUTTON = '[data-test="login-button"]';
  ERROR_HINT = '[data-test="error"]';

  //--------------------------------------------------------
  // Error strings.
  //--------------------------------------------------------
  lockedUserError = "Epic sadface: Sorry, this user has been locked out.";
  wrongCredentialsError =
    "Epic sadface: Username and password do not match any user in this service";
  requiredUsernameError = "Epic sadface: Username is required";
  requiredPasswordError = "Epic sadface: Password is required";
  //--------------------------------------------------------
  // Functions.
  //--------------------------------------------------------
  //

  /**
   * This function enters user's name string into input.
   *
   * @param {string} username - The user's name.
   */
  public async enterUsername(username: string) {
    await this.page.locator(this.USER_NAME_INPUT).fill(username);
  }

  /**
   * This function enters user's password string into input.
   *
   * @param {string} password - The user's password.
   */
  public async enterPassword(password: string) {
    await this.page.locator(this.PASSWORD_INPUT).fill(password);
  }

  /**
   * This function clicks the login button.
   */
  public async submitLogin() {
    await this.page.locator(this.LOGIN_BUTTON).click();
  }

  /**
   * This function logs in the user.
   * 
   * @username user's username
   * @string user's password
   */
  public async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.submitLogin();
  }
}
