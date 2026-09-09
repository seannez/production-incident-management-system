import { test, expect } from "@playwright/test";

//Check for login page
test("login page is displayed", async ({ page }) => {
  await page.goto("/login");

  await expect(page).toHaveURL(/login/);
});

test("unauthenticated user is redirected to login", async ({ page }) => {
  await page.goto("/incidents");

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("button", { name: /Sign in/i })).toBeVisible();
});

test("check invalid email and password", async ({page}) =>{
    await page.goto('/login')
    await page.getByLabel("Email").fill("wrong@example.com")
    await page.getByLabel("Password").fill("password")

    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(
        page.getByText(/Failed to login/i)
    ).toBeVisible();
})

test("user can login successfully", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("shon@example.com");
  await page.getByLabel("Password").fill("mypassword");

  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(page).toHaveURL(/\/incidents$/);
});