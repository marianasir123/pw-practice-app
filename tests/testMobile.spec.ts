import test, { expect } from "@playwright/test"
test("Input Fields - Form Page", async ({ page}, testInfo ) => {

    await page.goto("/");
    if(testInfo.project.name=='mobile')
     await page.locator(".sidebar-toggle").click();
    await page.getByText("Forms").click();
    await page.getByTitle("Form Layouts").click();

    const inputEmail = page
        .locator("nb-card", { hasText: "Using the Grid" })
        .getByRole("textbox", { name: "Email" });

    await page.locator("#inputEmail1").fill("test@gmail.com");

    await inputEmail.clear();
    await inputEmail.pressSequentially("test@gmail.com");
    await inputEmail.clear();
    await inputEmail.pressSequentially("mm@gmail.com", { delay: 500 });

    const emailValue = await inputEmail.inputValue();
    await expect(inputEmail).toHaveValue("mm@gmail.com");
    await page.screenshot({ path: "screenshot/FormPageLayout.png" })
    expect(emailValue).toEqual("mm@gmail.com");
});