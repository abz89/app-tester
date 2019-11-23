const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Test Login Process', async () => {
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
    expect(await backendPage.title()).to.eql('Welcome to Feathers');
  });

  it('should login via BACKEND', async () => {
    const expect = global.expect;

    chai
      .request(process.env.BACKEND_URL)
      .post('/auth')
      .send({
        strategy: 'local',
        username: process.env.USERNAME,
        password: process.env.PASSWORD
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);

        expect(res.body).to.have.property('accessToken');
        expect(res.body).to.have.property('data');

        const token = res.body.accessToken;

        chai
          .request(process.env.BACKEND_URL)
          .get('/labs')
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);

            expect(res.body).to.have.property('total');
            expect(res.body).to.have.property('limit');
            expect(res.body).to.have.property('skip');
            expect(res.body).to.have.property('data');
          });
      });
  });

  it('should access FRONTEND page', async () => {
    expect(await frontendPage.title()).to.eql('Login');
  });

  it('should login via FRONTEND', async () => {
    const usernameInput = '#mat-input-0';
    const passwordInput = '#mat-input-1';
    const submitSelector = '[type=submit]';

    linkEmail = await frontendPage.$(usernameInput);
    linkPassword = await frontendPage.$(passwordInput);
    linkSubmit = await frontendPage.$(submitSelector);

    await linkEmail.click({ clickCount: 2 });
    await linkEmail.type(process.env.USERNAME); // add the email address for linkedin //

    await linkPassword.click({ clickCount: 2 });
    await linkPassword.type(process.env.PASSWORD); // add password for linkedin account

    await linkSubmit.click();
    await frontendPage.waitForNavigation({ timeout: 5000 });
    await frontendPage.waitFor(500);

    await frontendPage.screenshot({ path: 'result.png' });

    expect(frontendPage.url()).to.include('/home');
  });
});
