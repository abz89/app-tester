require('dotenv').config();

const puppeteer = require('puppeteer-core');
const { expect } = require('chai');
const _ = require('lodash');

const globalVariables = _.pick(global, ['browser', 'expect']);

before(async () => {
  global.expect = expect;
  global.browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 100,
    timeout: 5000,
    // args: ['--start-maximized', '--window-size=1280,800'],
    executablePath: process.env.CHROME_PATH
  });
});

after(() => {
  browser.close();

  global.browser = globalVariables.browser;
  global.expect = globalVariables.expect;
});
