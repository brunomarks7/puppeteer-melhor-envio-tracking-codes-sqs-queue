const puppeteer = require('puppeteer');

(async () => {
  require('dotenv').config()
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://melhorenvio.com.br/login');
  await page.click('a[id="hs-eu-confirmation-button"]');
  await page.click('input[id="username"]');
  await page.keyboard.type(process.env.MELHORENVIO_USER);
  await page.click('input[id="password"]');
  await page.keyboard.type(process.env.MELHORENVIO_PASS);

  await page.evaluate(() => {
    document.querySelector('button[type=submit]').click();
  });

  await page.waitForTimeout(7000);

  await page.goto('https://melhorenvio.com.br/painel/meus-envios#liberados');

  await page.evaluate(() => {
    document.querySelector("#app > div > div > div.wrapper > div.painelData > div:nth-child(3) > div > div > div.tabWrapper > div.table.table--envios.meus-envios > ul.tableContent > li:nth-child(1) > div.tableBox > ul > li:nth-child(4) > a").click();
  });
  

  //await page.screenshot({ path: 'example.png' });
  //to be continued
  //await browser.close();
})();