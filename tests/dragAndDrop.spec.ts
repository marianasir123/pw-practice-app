import  { expect } from "@playwright/test"
import {test} from "../testOptions"
test("Test Drag & Drop with iFrame", async ({ page,globalSQAURL }) => { //Iframe (2 html tags) Page inside a page
    await page.goto(globalSQAURL)
    let frame= page.frameLocator('[rel-title="Photo Manager"] iframe')
    await frame.locator("li", {hasText:"High Tatras 2"}).dragTo(frame.locator("#trash"))

    //Mouse moments
    await frame.locator("li", {hasText:"High Tatras 4"}).hover()
    await page.mouse.down()
    await frame.locator("#trash").hover()
    await page.mouse.up()
    expect(frame.locator("#trash li h5")).toHaveText(["High Tatras 2" ,"High Tatras 4"])
    


})

