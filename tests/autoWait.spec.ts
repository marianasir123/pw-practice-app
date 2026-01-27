import test, { expect } from "@playwright/test"


//Hooks
test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(process.env.URL)
    await page.locator("#ajaxButton").click()
    testInfo.setTimeout(testInfo.timeout + 2000) // set timeout of 2 secs for each test

})
test("Wait for the button to be visible", async ({ page }) => {
    let btn = page.getByText("Data loaded with AJAX get request.")
    //await btn.click()
    const textBtn = await btn.textContent() // auto wait works here, see dos for which elements auto-wait works
    //const textBtn = await btn.allTextContents()// doesn't waiot auto
    expect(textBtn).toEqual("Data loaded with AJAX get request.")

})
test("attached state check", async ({ page }) => {
    let btn = page.getByText("Data loaded with AJAX get request.")
    await btn.waitFor({ state: "attached" })

})
test("set time out ", async ({ page }) => {
    let btn = page.getByText("Data loaded with AJAX get request.")

    await expect(btn).toHaveText("Data loaded with AJAX get request.", { timeout: 20000 })
})
test("alternative waits", async ({ page }) => {
    //wait for element
    //await page.waitForSelector('.bg-success')
    //-----------------
    //wait for elements with a response call/net 
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
    //------------
    //wait for network (not recommended)
    await page.waitForLoadState('networkidle')

})

test.only("different timeouts", async ({ page }) => {
    /* Global Timeout by default no
        Test timeout default 5secs
        Action time out 
        Navigation time out 
        Expect time out 5secs
    *Higher level can't have greater timeout than lower


    */
    const btn = page.locator('.bg-success')
    //await  btn.click();
    test.slow() // for specific slower TC
    await btn.click();//override from config

})
