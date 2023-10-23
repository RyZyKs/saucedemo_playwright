import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import InventoryPage from "../../pages/InventoryPage";
import { UserCredentials } from "../../utils/UsersData";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Login Test Suite", () => {
  test("Log in with correct credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const stdUser = UserCredentials.stdUser;
    await loginPage.login(stdUser.username, stdUser.password);
    await inventoryPage.checkIfPageIsOpened();
  });

  test("Log in with locked user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const lockedUser = UserCredentials.lockedUser;
    await loginPage.login(lockedUser.username, lockedUser.password);
    await expect(page.locator(loginPage.ERROR_HINT)).toBeVisible();
    await expect(page.locator(loginPage.ERROR_HINT)).toHaveText(
      loginPage.lockedUserError
    );
  });

  test("Log in with problem user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const problemUser = UserCredentials.problemUser;
    const inventoryPage = new InventoryPage(page);
    await loginPage.login(problemUser.username, problemUser.password);
    await inventoryPage.checkIfPageIsOpened();
  });

  test("Log in with performance glitch user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const performanceUser = UserCredentials.performanceUser;
    await loginPage.login(performanceUser.username, performanceUser.password);
    await inventoryPage.checkIfPageIsOpened();
  });

  test("Log in with standard user with wrong password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const userWithWrongPassword = UserCredentials.userWithWrongPassword;
    await loginPage.login(
      userWithWrongPassword.username,
      userWithWrongPassword.password
    );
    await expect(page.locator(loginPage.ERROR_HINT)).toBeVisible();
    await expect(page.locator(loginPage.ERROR_HINT)).toHaveText(
      loginPage.wrongCredentialsError
    );
  });

  test("Log in with wrong username", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const nonExistingUser = UserCredentials.nonExistingUser;
    await loginPage.login(nonExistingUser.username, nonExistingUser.password);
    await expect(page.locator(loginPage.ERROR_HINT)).toBeVisible();
    await expect(page.locator(loginPage.ERROR_HINT)).toHaveText(
      loginPage.wrongCredentialsError
    );
  });

  test("Log in without credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.submitLogin();
    await expect(page.locator(loginPage.ERROR_HINT)).toBeVisible();
    await expect(page.locator(loginPage.ERROR_HINT)).toHaveText(
      loginPage.requiredUsernameError
    );
  });

  test("Log in without password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const stdUser = UserCredentials.stdUser;
    await loginPage.enterUsername(stdUser.username);
    await loginPage.submitLogin();
    await expect(page.locator(loginPage.ERROR_HINT)).toBeVisible();
    await expect(page.locator(loginPage.ERROR_HINT)).toHaveText(
      loginPage.requiredPasswordError
    );
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
});
