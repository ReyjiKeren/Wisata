const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Catch network errors
    page.on('response', response => {
        if (!response.ok()) {
            console.log(`HTTP ERROR ${response.status()}: ${response.url()}`);
        }
    });

    // Catch page errors
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    console.log("Navigating...");
    await page.goto('http://127.0.0.1:8080/index.html', { waitUntil: 'domcontentloaded' });

    await new Promise(r => setTimeout(r, 2000));
    console.log("Done checking.");
    await browser.close();
    process.exit(0);
})();
