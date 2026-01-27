import { Page } from "@playwright/test"
import { Helper } from "./HelperBase"
export class NavigationPage  {

    readonly page: Page
    constructor(page: Page) {
        this.page=page
      //  super(page)
    }
    async datePickerPage() {
        await this.page.getByText("Forms").click()
        await this.page.getByText("Datepicker").click()
    }

    async formLayoutPage() {
        await this.page.getByText("Forms").click();
        await this.page.getByTitle("Form Layouts").click();
        
    }
    async toolTipPage() {
        await this.page.getByText("Modal & Overlays").click();
        await this.page.getByTitle("Tooltip").click();
    }
    async smartTablePage() {
        await this.page.getByText("Tables & Data").click();
        await this.page.getByTitle("Smart Table").click();
    }
    async toasterPage() {
        await this.page.getByText("Modal & Overlays").click();
        await this.page.getByTitle("Toastr").click();
    }
    // Use this func if any navigation menu item is collapsed 

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const isExpanded = await groupMenuItem.getAttribute("aria-expanded")
        if (isExpanded == "false")
            groupMenuItem.click()

    }
}