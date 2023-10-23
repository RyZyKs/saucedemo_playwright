# QA Playwright Automation
This repository was created to present a few automation practice tests for saucedemo page.

## Tech 
Tests use:
* [node.js](https://nodejs.org/) v20.6.1
* [npm](https://www.npmjs.com/) v10.2.1
* [Typescript](https://www.typescriptlang.org/) v5.2.2
* [Playwright](https://playwright.dev/) 1.39.0

### How to execute the tests with CI tool - Github Actions

- The tests are gonna be triggered on push and pull requests to the repository

Yo can also trigger CI manually

- Login to github with your personal account
- Fork this repository using "Fork" button on top right corner of the repository UI
- Open "Actions" tab in Github repository UI, confirm "I understand my workflows, go ahead and enable them"
- Select "Playwright Tests" from workflows and click 'Run workflow'.

### How to execute the tests locally
- clone the repository:
```sh
$ git clone https://github.com/RyZyKs/saucedemo_playwright.git
$ cd saucedemo_playwright
```
When repository is ready and you open it via your IDE - it should automatically ask you to install dependencies, click install.
You can also do it manually:
- install the dependencies:
```sh
$ npm install
```
Initialisation of the test run is very easy, just put the following commands into the terminal:
- example how to run the tests wit UI mode:
```sh
$ npx playwright test --ui
```
- you can also can use other alternatives described here:
* [Running and debugging tests docs](https://playwright.dev/docs/running-tests)