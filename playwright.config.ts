import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './testOptions'; // Template imported for multiple domain
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
//require('dotenv').config()
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({//add here too

  //set custom timeout
  //timeout:10000,

  //for locator timeout

  expect:{
    timeout:2000
  },
  //globalTimeout: 60000, // by defaulut no timeout
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html',{outputFile:'test-results/htmlReport.html'}],
            ['junit',{outputFile:'test-results/junitReporter.xml'}],
            ['allure-playwright']], //list , json

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    globalSQAURL:"https://www.globalsqa.com/demo-site/draganddrop/",
     baseURL : process.env.DEV ==='1'? 'http://localhost:4200/'
             : process.env.STAGEING ==='2' ? 'http://localhost:4200/'
             : 'http://localhost:4200/', // PASS DEV AND STAGE VALUE IN CMD (e.g DEV=1)
     

   //used for actions timeout (action,navigation)
  //actionTimeout:5000,
//  navigationTimeout
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    //To make video| on failure only?|on first-retry?| use terminal to see video | resolution can be set as well
     video:{
    mode:  'on',
   // size:{height:100, width:1920}
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }, // add chrome timeout different as compared to global one
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }, // add video property for only recording in project firefox
    },

    //To setUp different envoirnments
     {
      name: 'dev',
      use: { ...devices['Desktop Chrome'],
       baseURL:"dev.com"
       },
      
    },
      {
      name: 'mycustomProject',
      testMatch:'getByRole.spec.ts',
      timeout:5000,
      use: { ...devices['Desktop Chrome'],
       baseURL:"dev.com",
       viewport:{height:100, width:1920},
       video:{
        mode:  'on'}
        
       },
      
       
      
    },
    { //For Mobile
      name: 'mobile',
      testMatch:'testMobile.spec.ts',
      use: { ...devices['Galaxy S24'] } //or use viewport of mobile height and width
    }


  ],

  /* Run your local dev server before starting the tests | playwright will not run test until this server is set*/
   webServer: {
     command: 'npm run start',
     url: 'http://localhost:4200',
    // reuseExistingServer: !process.env.CI,
   },
});
