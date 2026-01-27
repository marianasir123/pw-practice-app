import { test as base } from '@playwright/test'
import {PageManager} from '../pw-practice-app/page-objects/pageManager'

export type TestOptions = { //creating our own type
    globalSQAURL: string //fixture Type like string
    formLayoutPage: string
    pageManager: PageManager
}
export const test = base.extend<TestOptions>({  //Object
    globalSQAURL: ['', { option: true }],// 
    formLayoutPage: async ({ page }, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText("Form Layout").click()
        await use('')// empty use as we need nothing to pass to the test
       console.log("after test executes this line will print")  
},//{auto:true}], // will automatically executes even before beforeHooks

pageManager:async({page,formLayoutPage},use)=>{ // fo dependencty btw fixturesrm laput passed to set
    const pm= new PageManager(page)
    await use(pm)
}
    
})
//Template for multipal domain URL's
