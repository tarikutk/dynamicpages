import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Calculator works", async ({ page }) => {
  await page.type("#first", "1");
  await page.type("#second", "2");
  await page.click("#operation");
  await page.locator("#operation").selectOption("multiply");
  await page.click("button[type='submit']");

  const result = await page.locator("#result");
  await expect(result).toContainText("2");
});

test("Calculator wants numbers", async ({ page }) => {
  await page.type("#first", "fsdfsdfdsf");
  await page.type("#second", "2");
  await page.click("#operation");
  await page.locator("#operation").selectOption("add");
  await page.click("button[type='submit']");

  const result = await page.locator("#result");
  await expect(result).toContainText("Params");
});

// test('calulator defalut operation is op', ({page})=>{
//   expect(page.locator('#operation').inputValue()).toBe('Op')
// })