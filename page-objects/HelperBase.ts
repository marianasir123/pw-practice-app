import { waitForAsync } from "@angular/core/testing"
import { Page } from "@playwright/test"

export class Helper { // Data generation | filtering 
    readonly  page : Page
    constructor(page : Page)
        {   
            this.page = page
        }

       async waitForNumberfSec(sec: number)
        {
            await this.page.waitForTimeout(sec)
        }
    
}