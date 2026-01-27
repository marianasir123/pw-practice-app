import { NavigationPage } from "./navigationPageObject"
import { DatePickerPage } from "./datePickerPage"
import { FormPage } from "./formLayoutPage"
import { Page } from "@playwright/test"
export class PageManager {
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly datePickerPage: DatePickerPage
    private readonly formPage: FormPage

    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(page)
        this.datePickerPage = new DatePickerPage(page)
        this.formPage = new FormPage(page)
    }

    navigateTo() {
        return this.navigationPage
    }
    ondatePickerPage() {
        return this.datePickerPage
    }
    onFormLayoutPage() {
        return this.formPage
    }
    

}