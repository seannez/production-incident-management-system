import { test, expect } from "@playwright/test";

//Check for login page
test("login page is displayed", async ({ page }) => {
  await page.goto("/login");

  await expect(page).toHaveURL(/login/);
});