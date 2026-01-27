import test from "@playwright/test"
import {PageManager} from "../page-objects/pageManager"
import {faker} from "@faker-js/faker"

test.beforeEach("Navigate to Page", async ({ page }) => {
    await page.goto('/')
    const PageManagerObject = new PageManager(page)
  await  PageManagerObject.navigateTo().formLayoutPage()
})
test("Sumbit Using the Grid form  @block", async ({ page }) => {
    //USe faker to generate random email,name,gender specific name etc
   const PageManagerObject = new PageManager(page)
   const randomName = faker.person.fullName()
   const randomEmail= `${randomName.replace(' ','')}${faker.number.int(1000)}@test.com`
    await PageManagerObject.onFormLayoutPage().sumbitUsingGridForm(randomEmail, "123", "Option 1")
    await PageManagerObject.onFormLayoutPage().sumbitInlineForm(randomName,randomEmail,true)
})
