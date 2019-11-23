# app-tester

Automated Testing using Puppeteer, Mocha, chai.
Inspired by [Automated UI/UX Testing with Puppeteer Mocha and Chai](https://medium.com/@tariqul.islam.rony/automated-ui-ux-testing-with-puppeteer-mocha-and-chai-800cfb028ab9)

## Prequesites for automated testing

1.  Node JS (v.1.8.10)
2.  Chrome Browser
3.  yarn

## Installation

1. clone the project `https://github.com/abz89/app-tester.git`
2. go to folder `cd app-tester`
3. run `yarn install`

## Directory Structure

```
|-- app-tester
|---- node_modules
|---- test (Directory for where the test file are contains)
|------ bootstrap.js (Puppeteer Configuration file)
|------ login.spec.js (Login Automated Testing file)
|---- .env.example (Environment Configuration Example)
|---- .gitignore
|---- index.js (Main entry script *currently empty)
|---- package.json
|---- README.md
```

## Configure to run Automated Test

1. Copy .env.example to .env and edit the content accordingly.
2. Run predefined test from command line:

```javascript
yarn test
```

![app-tester](https://github.com/abz89/app-tester/blob/master/app%20tester.png)
