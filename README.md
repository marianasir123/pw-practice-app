### Ngx-Admin Angular 14 application from akveo.com

This is modified and more lightweight version of original application to practice UI Automation with Playwright.

The original repo is here: https://github.com/akveo/ngx-admin

To start Application
npm run start
npx playwright codegen http://localhost:4200/pages 

npx playwright test tests/datePicker.spec.ts --headed 
npx playwright test tests/datePicker.spec.ts --project=chromium

--or run this as set in playwright.json(script)
npm run projectchromium

.--Run on different envoirnment
npx playwright test tests/datePicker.spec.ts --project=dev

--Run with Tags
 npx playwright test --project=chromium --grep @smoke


 For report allure installation

 npm i -D  @playwright/test allure-playwright --force



 to RUN Docker. (-t containter name | . where to copy)
 docker build -t pw-pageObject .


 To see docker images
 >> docker images

 to run test in a container
 docker run -it pw-pageObject-test
 