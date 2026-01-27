import test, { expect } from "@playwright/test"
import {PageManager} from "../page-objects/pageManager"
//Hooks
test.beforeEach(async ({ page }) => {
    await page.goto('/')
})
test.describe('Smoke Suite', () => {

    test.beforeEach(async ({ page }) => {
       const pageManagerObject = new PageManager(page)
        await pageManagerObject.navigateTo().datePickerPage()
    })

    test.skip("Select any random date", async ({ page }) => {
        const calenderInputField = page.getByPlaceholder("Form Picker")
        calenderInputField.click()
        await page.locator('.day-cell').getByText('27', { exact: true }).click()
        await expect(calenderInputField).toHaveValue('Oct 27, 2025')
        await calenderInputField.click()
        await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', { exact: true }).click() // exact is used to get 1 only nit 11,12 etc(not desired approch to hard code date)
        await expect(calenderInputField).toHaveValue('Oct 1, 2025')

    })
    test.only("Select sepecfic date", async ({ page }) => {
        const pageManagerObject = new PageManager(page)
        await pageManagerObject.ondatePickerPage().selectDateFromCommonPickerField(5)
        await pageManagerObject.ondatePickerPage().selectDateFromRangePickerField(1,4)
     })

})
test("Test Slider", async ({ page }) => {

    const guage = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger  circle')
    await guage.evaluate(node => { // set values in js
        node.setAttribute('cx', "13.173888032802138.")
        node.setAttribute('cy', "165.10569065374472")
    })
    await guage.click()

})
test.only("Slider mouse action", async ({ page }) => {
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()
    const box = await tempBox.boundingBox()// set a box around with x and y coordinated by default 0,0
    //set x and y
    const x = box.x + (await box).width / 2
    const y = box.y + (await box).height / 2
    //mouse moments
    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x + 100, y)
    await page.mouse.move(x + 100, y + 100)
    await page.mouse.up()
    await expect(tempBox).toContainText("30")


})