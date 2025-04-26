const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/capture-screenshot', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto('https://infographic32.vercel.app', {
      waitUntil: 'domcontentloaded',
      timeout: 3000
    });

    const screenshot = await page.screenshot({ type: 'png', fullPage: true });
    await browser.close();

    res.set('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Screenshot failed');
  }
});

// IMPORTANT: instead of app.listen(), export the app
app.listen(3000, () => {
  console.log('Server is running on port 3000');
} );
