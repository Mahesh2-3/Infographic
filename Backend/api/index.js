const puppeteer = require('puppeteer');
const cors = require('cors');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === 'GET' && req.url === '/') {
    res.status(200).send('Hello World');
    return;
  }

  if (req.method === 'GET' && req.url === '/api/capture-screenshot') {
    try {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
      });
      const page = await browser.newPage();
      
      await page.goto('https://infographic32.vercel.app', {
        waitUntil: 'domcontentloaded',
        timeout: 3000
      });

      const screenshot = await page.screenshot({ type: 'png', fullPage: true });
      await browser.close();

      res.setHeader('Content-Type', 'image/png');
      res.status(200).send(screenshot);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Screenshot failed');
    }
    return;
  }

  // Default response for unknown routes
  res.status(404).send('Not found');
};

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

// IMPORTANT: instead of app.listen(), export the app
module.exports = app;
