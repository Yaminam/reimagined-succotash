import { createRequire } from "module";
const require = createRequire(
  "C:/Users/tshre/Desktop/pernod-ricard-web/pernod-ricard-web/node_modules/",
);
const { chromium } = require("playwright");

const EXE =
  "C:\\Users\\tshre\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe";
const browser = await chromium.launch({ executablePath: EXE, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await context.addInitScript(() => {
  try {
    localStorage.setItem("ll-age-verified", "true");
    localStorage.setItem("ll-cookie-consent", "all");
  } catch {}
});
const page = await context.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));

await page.goto("http://localhost:3000/privacy", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(1200);
await page.screenshot({ path: "scripts/shot-privacy.png", fullPage: false });
console.log(errs.length ? errs : "(no errors)");
await browser.close();
