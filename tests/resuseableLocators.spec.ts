import test, { expect } from "@playwright/test"
import { NavigationPage } from "../page-objects/navigationPageObject"
import {PageManager} from "../page-objects/pageManager"
//Hooks
test.beforeEach(async ({page}) => {
    await page.goto('/')
    const PageManagerObject= new PageManager(page)
    await PageManagerObject.navigateTo().formLayoutPage()

})

test("reuseable Locators @smoke", async ({page})=> //tag as smoke added
{
    const basicForm = await page.locator('nb-card').filter({hasText :"Basic Form"})
    const emailField= basicForm.getByRole('textbox', {name:"Email"})
    await emailField.fill("m@gmail.com")
    await basicForm.getByRole('textbox', {name:"Password"}).fill("123")
    await basicForm.getByRole('button').click()
    await expect(emailField).toHaveValue('m@gmail.com')
})

test("Extracting Values", async ({page})=>
{
    //textContext
    const basicForm = await page.locator('nb-card').filter({hasText :"Basic Form"})
    const btnText =  await basicForm.getByRole('button').textContent()
    await expect(btnText).toEqual('Submit')


    //AllTextContext-> Returns array
     const radioBtns = await page.locator('nb-radio').allTextContents()
     expect(radioBtns).toContain("Option 1")


     //for Retrieval of  Input Field Values =? inputValue
     const email = "mm@gmail.com";
     const emailTextBox = await basicForm.getByRole('textbox', {name:"Email"})
     await emailTextBox.fill(email)
     let actualResponse = await emailTextBox.inputValue()
     expect(actualResponse).toEqual(email)

})
test.only("Assertion(General/Locator", async({page}) =>{

    //Genral Assertion
    const value = 5
    expect(value).toBe(5) 
     // For Arrays Contain
    
    //Locator Assertion interact with web elements
     const basicForm = await page.locator('nb-card').filter({hasText :"Basic Form"}).getByRole('button')
     await expect(basicForm).toHaveText("Submit")

     //Soft Assertion
      await expect.soft(basicForm).toHaveText("Submit5")// Fails but from next step it continue , Not recommended
      await basicForm.click()
})