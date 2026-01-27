import test from "@playwright/test"
import {PageManager} from "../page-objects/pageManager"

//Hooks
test.beforeEach(async ({page}) => {
    await page.goto('/')
   
})
test.beforeEach(async ({page}) =>{
const PageManagerObject = new PageManager(page)
await PageManagerObject.navigateTo().formLayoutPage()
})

//test.describe('Smoke Suite',() => {

test('Locator syntax Rules', async ({page}) => {
    //By PlaceHolder
    await page.getByPlaceholder("Email").first().click()
    //By ID
    await page.locator('#inputEmail1').fill("maria@gmail.com")
    //By Name
     await page.locator('.shape-rectangle').first().click()
    //Key -Value
    // No need for wait with locator if no action like click or fill is attached
     page.locator('[placeholder="Email"]')
    //2 Locators
     page.locator('[placeholder="Email"] [nbinput]')
    //By Tag Name
     page.locator('input')
    // Full CSS Value
     page.locator("input-full-width size-medium status-basic shape-rectangle nb-transition")
    //XPath (Not recommended)
    page.locator('//*[@id="inputEmail1"]')

    //BY PARTIAL text match
    page.locator(':text("Using")')
    //by exact text match
    page.locator(':text(Using the Grid")')
})
test('Test Navigation', async ({page}) => {
const PageManagerObject = new PageManager(page)
await PageManagerObject.navigateTo().formLayoutPage()
await PageManagerObject.navigateTo().datePickerPage()
await PageManagerObject.navigateTo().smartTablePage()
await PageManagerObject.navigateTo().toolTipPage()
await PageManagerObject.navigateTo().toasterPage()

})