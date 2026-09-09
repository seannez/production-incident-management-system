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

  await page.getByLabel("Email").fill(process.env.E2E_EMAIL);
  await page.getByLabel("Password").fill(process.env.E2E_PASSWORD);

  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(page).toHaveURL(/\/incidents$/);
});


test("user can create a new incident", async ({ page }) => {
  //unique name for incident
  const incidentTitle = `Playwright Incident ${Date.now()}`;

  //login
  await page.goto("/login");

  await page.getByLabel("Email").fill(process.env.E2E_EMAIL);
  await page.getByLabel("Password").fill(process.env.E2E_PASSWORD);

  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(page).toHaveURL(/\/incidents$/);

  //press the button that opens the create incident page
  await page.getByRole("link", { name: /new incident/i }).click();

  //Fill the form
  await page.getByLabel("Title").fill(incidentTitle)
  await page.getByLabel("Description").fill("filled automaticlly by playwright")
  await page.getByLabel("Severity").selectOption("high")
  await page.getByLabel("Affected service").fill("Authentication Service")
  //submit
  await page.getByRole("button", {name: /create incident/i}).click()
  //verify
   await expect(page).toHaveURL(/\/incidents$/);
   await expect(page.getByText(incidentTitle)).toBeVisible()


})

test("user can update incident status", async ({ page }) => {
  const incidentTitle = `Status Test ${Date.now()}`;

  // Login
  await page.goto("/login");

  await page.getByLabel("Email").fill(process.env.E2E_EMAIL);
  await page.getByLabel("Password").fill(process.env.E2E_PASSWORD);

  await page
    .getByRole("button", { name: /sign in/i })
    .click();

  await expect(page).toHaveURL(/\/incidents$/);

  // Open create incident page
  await page
    .getByRole("link", { name: /new incident/i })
    .click();

  await expect(page).toHaveURL(/\/incidents\/new$/);

  //Fill incident form
  await page
    .getByLabel("Title")
    .fill(incidentTitle);

  await page
    .getByLabel("Description")
    .fill("Incident for testing status changes");

  await page
    .getByLabel("Severity")
    .selectOption("high");

  await page
    .getByLabel("Affected Service")
    .fill("Authentication Service");

  //Create incident
  await page
    .getByRole("button", { name: /create incident/i })
    .click();

  await expect(page).toHaveURL(/\/incidents$/);

  //Open the incident we just created
  await page
    .getByText(incidentTitle, { exact: true })
    .click();

  await expect(page).toHaveURL(/\/incidents\/\d+$/);

  const statusSelect = page.getByLabel("Status");

const responsePromise = page.waitForResponse(
  response =>
    response.url().includes("/api/incidents/") &&
    response.url().includes("/status") &&
    response.request().method() === "PATCH"
);

await statusSelect.selectOption("resolved");

const response = await responsePromise;

expect(response.ok()).toBeTruthy();

await expect(statusSelect).toHaveValue("resolved");

await expect(
  page.getByText(/changes status from open to resolved/i)
).toBeVisible();

});

