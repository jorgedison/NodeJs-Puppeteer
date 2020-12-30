const puppeteer = require('puppeteer');

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var hour= dateObj.getHours();
var min= dateObj.getMinutes();
var sec= dateObj.getSeconds();

newdate = year + "" + month + "" + day + "" + hour + "" + min + "" + sec;

(async()=> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 720});
    await page.goto('https://demo.com', { waitUntil: 'networkidle0' }); 
    
    await page.type('#userlogin', 'username');
    await page.type('#userpass', 'contraseñña');

    await Promise.all([
      page.click('#submit'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    await page.screenshot({ path: `image_${newdate}.png` });
    //await page.pdf({path: `image_${newdate}`.pdf, format: 'A3'});

    await browser.close();
})();