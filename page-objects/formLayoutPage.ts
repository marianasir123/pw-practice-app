import { Page } from "@playwright/test";
import { Helper } from "./HelperBase";

export class FormPage  {
    readonly page: Page
   constructor(page: Page) {
     //   super(page)
     this.page=page
    }

    async sumbitUsingGridForm(email: string, password: string, optionText: string) {
        const card = this.page.locator('nb-card', { hasText: "Using the Grid" })
        await card.getByRole('textbox', { name: "Email" }).fill(email)
        await card.getByRole('textbox', { name: "Password" }).fill(password)
        await card.getByRole("radio", { name: optionText }).check({ force: true });
        await card.getByRole("button").click()

    }
    /**
     * this method outline form with user details | handy to understand what this fun do (Annotation)
     * @param name 
     * @param email 
     * @param rememberMe 
     */
    async sumbitInlineForm(name:string, email: string, rememberMe: boolean) {
        const card = this.page.locator('nb-card', { hasText: "Inline form" })
        await card.getByPlaceholder("Jane Doe").fill(name)
        await card.getByPlaceholder("Email").fill(email)
        if (rememberMe)
            await card.getByRole("checkbox").check({ force: true })
        await card.getByRole("button").click()

    }

}
