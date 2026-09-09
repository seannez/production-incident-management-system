import { test, expect } from "@playwright/test";

test("user can create a new incident", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill(process.env.E2E_EMAIL);
  await page.getByLabel("Password").fill(process.env.E2E_PASSWORD);

  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(page).toHaveURL(/\/incidents$/);

  await page.getByRole("link", { name: /New Incident/i }).click();
});