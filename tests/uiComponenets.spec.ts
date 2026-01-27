import test, { expect } from "@playwright/test";
import {PageManager} from "../page-objects/pageManager"
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("My First Test Suite", () => {
   //to retries some flaky tests multiple times| only in describe or top level
    test.describe.configure({retries:2})
    //Not recommende but to run test case 1 before test case 2(some dependency)
   // test.describe.configure({mode:serial})// to run sequantially
  test.beforeEach(async ({ page }) => {
    const PageManagerObject = new PageManager(page)
    await PageManagerObject.navigateTo().formLayoutPage()
  });

  // --- INPUT FIELDS TEST ---
  test("Input Fields - Form Page", async ({ page }) => {
   
    const inputEmail = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await page.locator("#inputEmail1").fill("test@gmail.com");

    await inputEmail.clear();
    await inputEmail.pressSequentially("test@gmail.com");
    await inputEmail.clear();
    await inputEmail.pressSequentially("mm@gmail.com", { delay: 500 });

    const emailValue = await inputEmail.inputValue();
    await expect(inputEmail).toHaveValue("mm@gmail.com");
    await page.screenshot({path:"screenshot/FormPageLayout.png"})
    expect(emailValue).toEqual("mm@gmail.com");
  });

  // --- RADIO BUTTONS TEST ---
  test("Radio Buttons - Form Page", async ({ page }) => {
    const grid = page.locator("nb-card", { hasText: "Using the Grid" });

    await grid.getByRole("radio", { name: "Option 1" }).check({ force: true });

    await expect(grid.getByRole("radio", { name: "Option 1" })).toBeChecked();
    await expect(
      grid.getByRole("radio", { name: "Option 2" })
    ).not.toBeChecked();
  });
}); // ✅ properly closed describe block

// --- CHECKBOXES TEST SUITE ---
test.describe("My Test Suite 2", () => {
  test.beforeEach(async ({ page }) => {
    const PageManagerObject = new PageManager(page)
    await PageManagerObject.navigateTo().toasterPage()
  });

  test("CheckBoxes", async ({ page }) => {
    await page
      .getByRole("checkbox", { name: "Hide on click" })
      .uncheck({ force: true });
    await page
      .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
      .check({ force: true });

    const checkAll = page.getByRole("checkbox");

    for (const box of await checkAll.all()) {
      await box.uncheck({ force: true });
      await expect(box).not.toBeChecked();
    }

    for (const box of await checkAll.all()) {
      await box.check({ force: true });
      await expect(box).toBeChecked();
    }
  })
})

// --- DROPDOWN TEST SUITE ---
test.describe("Test Suite 3 - Drop Down", () => {
  test("Drop Down", async ({ page }) => {
    const dropDown = page.locator("ngx-header nb-select button");
    await dropDown.click();
    // await dropDown.getByRole("list")//when tag is ul
    //await dropDown.getByRole("listitem")// when li is used
    //------Option 1
    const optionList = page.getByRole("list").locator("nb-option").filter({ hasText: "Dark" })
    await optionList.click()
    const pageHeader = page.locator("nb-layout-header")
    await expect(pageHeader).toHaveCSS('background-color', 'rgb(34, 43, 69)')
    //-------Approch 2
    await dropDown.click();
    const optionList2 = page.locator("nb-option-list nb-option");
    await expect(optionList2).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    const colors = {
      "Light": "rgb(255, 255, 255)"
      , "Dark": "rgb(34, 43, 69)"
      , "Cosmic": "rgb(50, 50, 89)"
      , "Corporate": "rgb(255, 255, 255)"
    }
    dropDown.click()
    for (const color in colors) {
      await optionList2.filter({ hasText: color }).click()
      await expect(pageHeader).toHaveCSS('background-color', colors[color])
      dropDown.click()

    }
  })
})