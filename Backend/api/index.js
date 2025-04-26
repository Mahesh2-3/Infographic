const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const cors=require('cors')
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cors)

app.get('/', async (req, res) => {
    res.send("Hello World");
})


app.get('/api/capture-screenshot', async (req, res) => {
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

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

// IMPORTANT: instead of app.listen(), export the app
module.exports = app;
