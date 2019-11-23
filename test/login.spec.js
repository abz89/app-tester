const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Test Pairing Process', async () => {
  let backendPage;
  let frontendPage;

  before(async () => {
    backendPage = await browser.newPage();
    frontendPage = await browser.newPage();

    await backendPage.goto(process.env.BACKEND_URL);
    await frontendPage.goto(process.env.FRONTEND_URL);
  });

  after(async () => {
    await backendPage.close();
    await frontendPage.close();
  });

  it('should work', async () => {
    console.log(await browser.version());

    expect(true).to.be.true;
  });

  it('should access BACKEND page', async () => {
    expect(await backendPage.title()).to.eql('Error');
  });

  it('should access FRONTEND page', async () => {
    expect(await frontendPage.title()).to.eql('Edubox 4.0');
  });

  it('should do PAIRING via FRONTEND', async () => {
    const pairSelector = '#pswrd ~ button ~ button';
    const inputSelector = 'input';
    const buttonSelector = 'button';

    linkPair = await frontendPage.$(pairSelector);
    linkInputs = await frontendPage.$$(inputSelector);
    linkButtons = await frontendPage.$$(buttonSelector);

    await linkPair.click({
      clickCount: 1
    });

    await linkInputs[0].click({ clickCount: 2 });
    await linkInputs[0].type(process.env.USERNAME);

    await linkInputs[1].click({ clickCount: 2 });
    await linkInputs[1].type(process.env.PASSWORD);

    await linkButtons[1].click({
      clickCount: 1
    });

    await frontendPage.waitForNavigation({ timeout: 5000 });
    await frontendPage.waitFor(500);

    await frontendPage.screenshot({ path: 'result-pair.png' });

    expect(frontendPage.url()).to.include('/admin');
  });

  /* it('should logging out via FRONTEND', async () => {
    const textSelector = '.text-xs-center';
    const buttonSelector = 'button';

    linkText = await frontendPage.$$(textSelector);
    linkButtons = await frontendPage.$$(buttonSelector);

    await linkText[1].click({
      clickCount: 1
    });

    await linkButtons[0].click({
      clickCount: 1
    });

    await frontendPage.waitForNavigation({ timeout: 5000 });
    await frontendPage.waitFor(500);

    await frontendPage.screenshot({ path: 'result-logout.png' });

    expect(frontendPage.url()).to.include('/login');
  });

  it('should LOGIN via FRONTEND', async () => {
    const usernameInput = '#usrnm';
    const passwordInput = '#pswrd';
    const loginSelector = '#pswrd ~ button';

    linkEmail = await frontendPage.$(usernameInput);
    linkPassword = await frontendPage.$(passwordInput);
    linkLogin = await frontendPage.$(loginSelector);

    await linkEmail.click({ clickCount: 2 });
    await linkEmail.type(process.env.USERNAME);

    await linkPassword.click({ clickCount: 2 });
    await linkPassword.type(process.env.PASSWORD);

    await linkLogin.click({
      clickCount: 1
    });

    await frontendPage.waitForNavigation({ timeout: 5000 });
    await frontendPage.waitFor(500);

    await frontendPage.screenshot({ path: 'result-login.png' });

    expect(frontendPage.url()).to.include('/admin');
  });

  it('should logging out via FRONTEND', async () => {
    const textSelector = '.text-xs-center';
    const buttonSelector = 'button';

    linkText = await frontendPage.$$(textSelector);
    linkButtons = await frontendPage.$$(buttonSelector);

    await linkText[1].click({
      clickCount: 1
    });

    await linkButtons[0].click({
      clickCount: 1
    });

    await frontendPage.waitForNavigation({ timeout: 5000 });
    await frontendPage.waitFor(500);

    await frontendPage.screenshot({ path: 'result-logout.png' });

    expect(frontendPage.url()).to.include('/login');
  }); */

  it('should login via BACKEND', async () => {
    const expect = global.expect;

    chai
      .request(process.env.BACKEND_URL)
      .post('/auth/login')
      .send({
        username: process.env.USERNAME,
        password: process.env.PASSWORD
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        // expect(res.body).to.have.property('auth');
        expect(res.body.auth).to.be.true;
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('_id');
      });
  });
});
