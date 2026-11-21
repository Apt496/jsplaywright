# 🚀 Playwright Execution Guide

This document outlines common and specific execution scenarios for running tests using the Playwright framework.

## Common Commands & Scenarios

| Command | Description |
| :--- | :--- |
|  npx playwright test  | Runs all tests on all browsers in headless mode. |
|  npx playwright test -- workers 3  | Runs with 3 workers in parallel. |
|  npx playwright test one.spec.js  | Runs a specific test file. |
|  npx playwright test one.spec.js two.spec.js  | Runs the files specified. |
|  npx playwright test one two  | Runs files that have "one" or "two" in the file name. |
|  npx playwright test -g "check title"  | Runs a test with the title check feature enabled. |

---

### Quick Reference Breakdown

#### 1. Standard Execution
**Command:**  npx playwright test 
**Result:** Runs all tests on all browsers in headless mode.

#### 2. Parallel Execution
**Command:**  npx playwright test -- workers 3 
**Result:** Runs with 3 workers in parallel, optimizing execution speed across multiple browser instances.

#### 3. Specific File Execution
**Command:**  npx playwright test one.spec.js 
**Result:** Runs a specific test file defined by the path.

#### 4. Multiple File Execution
**Command:**  npx playwright test one.spec.js two.spec.js 
**Result:** Runs multiple specified files in sequence or parallel, depending on Playwright's configuration.

#### 5. File Name Matching
**Command:**  npx playwright test one two 
**Result:** Runs tests based on file names that contain "one" or "two."

#### 6. Feature/Title Execution
**Command:**  npx playwright test -g "check title" 
**Result:** Runs the test suite with a specific title, often used to check for a feature named "title."

# 🚀 Playwright Execution Guide

This document outlines various ways to execute tests using the Playwright framework, covering standard runs, parallel execution options, file-specific runs, and browser configuration settings.

## Command Reference Table

| Command | Description |
| :--- | :--- |
|  npx playwright test  | Runs all tests on all browsers in headless mode. |
|  npx playwright test -- workers 3  | Runs with 3 workers in parallel. |
|  npx playwright test one.spec.js  | Runs a specific test file. |
|  npx playwright test one.spec.js two.spec.js  | Runs the files specified. |
|  npx playwright test one two  | Runs files that have "one" or "two" in the file name. |
|  npx playwright test -g "check title"  | Runs a test with the title check feature enabled. |
|  npx playwright test --project={chromium}  | Runs on a specific browser (e.g., Chromium). |
|  npx playwright test --headed  | Runs tests in headed mode. |

---

### Detailed Execution Breakdown

#### 1. Standard Headless Run
**Command:**  npx playwright test
**Result:** Runs all tests on all browsers in headless mode.

#### 2. Parallel Execution
**Command:**  npx playwright test -- workers 3
**Result:** Runs with 3 workers in parallel, optimizing execution speed across multiple browser instances.

#### 3. Specific File Run
**Command:**  npx playwright test one.spec.js
**Result:** Runs a specific test file defined by the path.

#### 4. Multiple File Run
**Command:**  npx playwright test one.spec.js two.spec.js
**Result:** Runs multiple specified files in sequence or parallel, depending on Playwright's configuration.

#### 5. File Name Matching
**Command:**  npx playwright test one two
**Result:** Runs tests based on file names that contain "one" or "two."

#### 6. Feature/Title Execution
**Command:**  npx playwright test -g "check title"
**Result:** Runs the test suite with a specific title, often used to check for a feature named "title."

#### 7. Browser Project Configuration
**Command:** npx playwright test --project=chromium
**Result:** Runs on a specific browser project called Chromium. The project must be configured in the Playwright configuration.

#### 8. Headed Execution
**Command:**  npx playwright test --headed
**Result:** Runs tests in headed mode, which is useful for debugging or when the headless environment needs to be bypassed.

Running Test
npx playwright test

npx playwright test -- workers 3

npx playwright test one.spec.js

npx playwright test one.spec.js two.spec.js

npx playwright test one two

npx playwright test -g "check title"

npx playwright test --project=chromium

npx playwright test --headed

npx playwright test --debug

npx playwright test example.spec.js --debug

npx playwright test example.spec.js:21 --debug
