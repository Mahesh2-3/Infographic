const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.get('/capture-screenshot', async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        // Replace with your frontend URL (e.g., "http://localhost:5500")
        
        await page.goto('http://127.0.0.1:5500', {
          waitUntil: 'domcontentloaded',
          timeout: 3000
      });

        const screenshot = await page.screenshot({ type: 'png',fullPage: true });
        await browser.close();
        
        res.set('Content-Type', 'image/png');
        res.send(screenshot);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Screenshot failed');
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));