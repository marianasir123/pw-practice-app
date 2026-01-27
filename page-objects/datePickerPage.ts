import { Page, expect } from "@playwright/test";
import { Helper } from "./HelperBase";

export class DatePickerPage  {
    readonly page: Page
    constructor(page: Page) {
        //super(page)
        this.page=page
    }
    async selectDateFromRangePickerField(startdate: number, endDate: number) {
        const calenderInputField = this.page.getByPlaceholder("Range Picker")
         await calenderInputField.click()
        const startDateToAssert = await this.setDate(endDate)
        const endDateToAssert = await this.setDate(endDate)
      //  await calenderInputField.click()
        const dateToAssert = `${startDateToAssert} - ${endDateToAssert}`
        await expect(calenderInputField).toHaveValue(dateToAssert)

    }
      async selectDateFromCommonPickerField(days: number) {
        const calenderInputField = this.page.getByPlaceholder("Form Picker")
        await calenderInputField.click()
        const dateToAssert = await this.setDate(days)
       // await calenderInputField.click()
        await expect(calenderInputField).toHaveValue(dateToAssert)

    }
    private async setDate(days: number) {
        //For Tomorrow
        let date = new Date() // JS Object
        date.setDate(date.getDate() + days);
        const expectedDate = date.getDate().toString()
        const expectedMonth = date.toLocaleString('En-US', { month: 'short' })
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
        const expectedYear = date.getFullYear()
        const dateToAssert = expectedMonth + " " + expectedDate + ', ' + expectedYear //OR = `${expectedMonth} ${expectedDate}, ${ecpectedYear}`
        let actualMonthAndYear = await this.page.locator("nb-calendar-view-mode").textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
        while (!(actualMonthAndYear).includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            actualMonthAndYear = await this.page.locator("nb-calendar-view-mode").textContent()
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click()
        return dateToAssert
    }

}