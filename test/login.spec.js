const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Test Login Process', async () => {
  let backendPage;

  before(async () => {
    backendPage = await browser.newPage();

    await backendPage.goto(process.env.BACKEND_URL);
  });

  after(async () => {
    await backendPage.close();
  });

  it('should work', async () => {
    console.log(await browser.version());

    expect(true).to.be.true;
  });

  it('should access BACKEND page', async () => {
    expect(await backendPage.title()).to.eql('Edubox 3.0');
  });

  it('should login via BACKEND', async () => {
    const usernameInput = '#LoginForm_username';
    const passwordInput = '#LoginForm_password';
    const submitSelector = '[type=submit]';

    linkEmail = await backendPage.$(usernameInput);
    linkPassword = await backendPage.$(passwordInput);
    linkSubmit = await backendPage.$(submitSelector);

    await linkEmail.click({ clickCount: 2 });
    await linkEmail.type(process.env.USERNAME); // add the email address for linkedin //

    await linkPassword.click({ clickCount: 2 });
    await linkPassword.type(process.env.PASSWORD); // add password for linkedin account

    await linkSubmit.click();
    await backendPage.waitForNavigation({ timeout: 5000 });
    await backendPage.waitFor(500);

    await backendPage.screenshot({ path: 'result.png' });

    expect(backendPage.url()).to.include('/guru/option/atur');
  });
});
