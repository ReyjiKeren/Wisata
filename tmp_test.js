const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Catch all console logs
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    // Catch all unhandled exceptions
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    console.log("Navigating to index.html...");
    await page.goto('http://127.0.0.1:8080/index.html', { waitUntil: 'domcontentloaded' });

    await new Promise(r => setTimeout(r, 2000));

    console.log("Checking if window.authParams is defined...");
    const isDefined = await page.evaluate(() => typeof window.authParams !== 'undefined');
    console.log("window.authParams defined?", isDefined);

    console.log("Clicking the sign in button...");
    await page.evaluate(() => {
        const btn = document.querySelector('button[onclick="window.authParams.signIn()"]');
        if (btn) btn.click();
        else console.log("MASUK button not found in DOM");
    });
    await new Promise(r => setTimeout(r, 1000));

    console.log("Clicking the GOOGLE button...");
    await page.evaluate(() => {
        const btn = document.querySelector('button[onclick="window.authParams.signInWithGoogle()"]');
        if (btn) btn.click();
        else console.log("GOOGLE button not found in DOM");
    });
    await new Promise(r => setTimeout(r, 1000));

    console.log("Done checking.");
    await browser.close();
    process.exit(0);
})().catch(e => {
    console.error("SCRIPT ERROR:", e);
    process.exit(1);
});
