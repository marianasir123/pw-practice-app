import test from "@playwright/test"
import { NavigationPage } from "../page-objects/navigationPageObject"
//Hooks
test.beforeEach(async ({ page }) => {
    await page.goto('/')
})
//test.describe('Smoke Suite',() => {

test.beforeEach(async ({ page }) => {
    const navigationPageObject = new NavigationPage(page)
    await navigationPageObject.formLayoutPage()
})
    test("Get By Role | facing locator", async ({ page }) => {
        await page.getByRole('textbox', { name: "Email" }).first().click()
        await page.getByRole('button', { name: 'Sign in' }).first().click()
        //test id added in code by testers
        await page.getByTestId("SignIn").click()
        await page.getByTitle("IoT Dashboard").click();
    })

    test("Click radio button | facing locator", async ({ page }) => {

        await page.locator('nb-card nb-radio :text-is("Option 1")').click()
        await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click() // avoid this by space is fine
        await page.locator('nb-card').nth(3).locator(':text-is("Submit")').click() // child, index starts with 0 avoid this as well
        await page.locator('nb-card').nth(2).getByRole('button', { name: "SEND" }).click();
    })
    test.only("Parent Elements", async ({ page }) => {
        //Parent Elements
        await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).click()
        await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: "Email" }).click()
        await page.locator('nb-card').filter({ hasText: "Basic Form" }).getByRole('textbox', { name: "Email" }).click()
        await page.locator('nb-card').filter({ has: page.locator(".status-danger") }).getByRole('textbox', { name: "Password" }).click()
        await page.locator('nb-card').filter({ has: page.locator(".status-danger") }).getByRole('textbox', { name: "Password" }).click()
        await page.locator('nb-card').filter({ has: page.getByRole('checkbox', { name: "Remember me" }) }).getByRole('textbox', { name: "Password" }).click()
        await page.locator(':text-is("Using the Grid")').locator("..").getByRole('textbox', { name: "Password" }).click() //Xpath, one level up in the DOM

    })