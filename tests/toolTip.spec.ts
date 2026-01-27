import test, { expect } from "@playwright/test";
import {PageManager} from "../page-objects/pageManager"
test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test.describe.parallel("My First Test Suite", () => {
    
    test.beforeEach(async ({ page }) => {
        const PageManagerObject = new PageManager(page)
        await PageManagerObject.navigateTo().toolTipPage()
    })
    test("Click ToolTip", async ({ page }) => {
        const toolTipCard = page.locator("nb-card").filter({ hasText: "Tooltip Placements" });
        await toolTipCard.getByRole("button", { name: "TOP" }).hover();
        const toolTip = await page.locator("nb-tooltip").textContent();
        expect(toolTip).toEqual("This is a tooltip")



    })
    test("Click ToolTip card with icon", async ({ page }) => {
        const toolTipIconCard = page.locator("nb-card").filter({ hasText: "Tooltip With Icon" });
        await toolTipIconCard.locator('button[nbtooltipicon="alert-triangle"]').hover();
        //take SS of a section
       await page.locator('nb-tooltip nb-icon[ng-reflect-config="alert-triangle"]').screenshot({path:"screenshot/toolTip.png"})
        const toolTip = page.locator('nb-tooltip nb-icon[ng-reflect-config="alert-triangle"]')
        await expect(toolTip).toBeVisible()

    })
})
test.describe("My Test Suite", () => {
    test.beforeEach(async ({ page }) => {
        const PageManagerObject = new PageManager(page)
        await PageManagerObject.navigateTo().smartTablePage()
    
    })
    test("Browser alert box testing ", async ({ page }) => { //playwright auto/default cancel brower alerts,

        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual("Are you sure you want to delete?")
            dialog.accept()
        })
        // await page.getByRole("table").locator("tr",{hasText:"mdo@gmail.com"}).locator(".nb-trash").click()
        //playwright auto/default cancel brower alerts,

        //First row of table
        const row = page.locator('table').locator('tr').nth(2);
        const rowData = page.locator('table').locator('tr').nth(2)
        const email = await rowData.locator("td").nth(5).innerText();
        await row.locator(".nb-trash").click()
        await expect(page.locator("table tr").nth(2)).not.toHaveText(email)


    })
    test("Web Tables", async ({ page }) => {
        const row = page.getByRole('row', { name: "snow@gmail.com" })// as emhail is unique
        await row.locator(".nb-edit").click()
        await page.locator("input-editor").getByPlaceholder("Age").clear()
        await page.locator("input-editor").getByPlaceholder("Age").fill("12")
        await page.locator(".nb-checkmark").click()
        await page.locator('.ng2-smart-pagination').getByText("2").click()
        //TO GET ID AS UNIQUE
        const targetId = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText("11") })
        await targetId.click()
        await targetId.locator(".nb-edit").click()
        await page.locator("input-editor").getByPlaceholder("E-mail").clear()
        await page.locator("input-editor").getByPlaceholder("E-mail").fill("maray@gmail.com")
        await page.locator(".nb-checkmark").click()




    })
    test("Search Feature of table", async ({ page }) => {
        const ages = ["28", "20", "30", "50", "100"]
        page.locator("").getByPlaceholder("Age")
        // const ageRows = page.locator("tbody tr") // all rows
        for (let age of ages) {
            await page.locator("input-filter").getByPlaceholder("Age").clear()
            await page.locator("input-filter").getByPlaceholder("Age").fill(age)
            await page.waitForTimeout(500)
            const ageRows = page.locator("tbody tr")
            for (let row of await ageRows.all())// to iterate thru rows
            {
                const cellValue = await row.locator("td").last().textContent()
                if (cellValue == " No data found ")
                    expect(cellValue).toEqual(" No data found ")
                else
                    expect(cellValue).toEqual(age)
            }
        }



    })

})
