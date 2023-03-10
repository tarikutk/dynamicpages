import { test, expect } from "@playwright/test";

test.describe("API basic functionality", () => {
  test("simple addition", async ({ request }) => {
    const result = await request.get("/api/calculate/add/1/1", {});
    expect(result.ok()).toBeTruthy();
    expect(await result.json()).toEqual({ result: 2 });
  });

  test('simple multiplication', async ({ request }) =>{
    const result = await request.get("/api/calculate/multiply/2/4", {});
    expect(result.ok()).toBeTruthy();
    expect(await result.json()).toEqual({ result: 8 });
  })
});