const express = require('express');
const app = express();
const puppeteer = require('puppeteer'); // For development
const puppeteerCore = require('puppeteer-core'); // For production
const chromium = require('@sparticuz/chromium-min'); // For production

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/capture-screenshot', async (req, res) => {
  let browser;

  try {
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
      // Production (Vercel)
      const executablePath = await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar');

      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath,
        headless: chromium.headless,
      });
    } else {
      // Development (localhost)
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }

    const page = await browser.newPage();

    // WARNING: localhost (127.0.0.1:5500) will not work on Vercel!
    // Change the URL to a PUBLICLY ACCESSIBLE URL
    await page.goto('http://127.0.0.1:5500', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    const screenshot = await page.screenshot({ type: 'png', fullPage: true });
    await browser.close();

    res.set('Content-Type', 'image/png');
    res.send(screenshot);

  } catch (error) {
    console.error('Error:', error);
    if (browser) await browser.close();
    res.status(500).send('Screenshot failed');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
