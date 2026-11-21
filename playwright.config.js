//test runner equivalent for JS

// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { config } from 'process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,  },
    reporter: [['html'], ['allure-playwright']],
  use: {
    browserName: 'chromium',
    headless: true,
   actionTimeout: 30 * 1000,
   navigationTimeout: 30 * 1000,
   screenshot: 'only-on-failure',
   trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'shared-account',
      testMatch: [
        'e2etest.spec.js',
        'getlabel2.spec.js',
        'rsp_shopping.spec.js',
        'shoppingwithapi.spec.js',
      ],
      workers: 1,
    },
    {
      name: 'independent',
      testIgnore: [
        'e2etest.spec.js',
        'getlabel2.spec.js',
        'rsp_shopping.spec.js',
        'shoppingwithapi.spec.js',
      ],
    },
  ],
});
//module.exports = config
