import { createRequire } from "module";
const require = createRequire(
  "C:/Users/tshre/Desktop/pernod-ricard-web/pernod-ricard-web/node_modules/",
);
const { chromium } = require("playwright");

const EXE =
  "C:\\Users\\tshre\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe";
const BASE = "http://localhost:3000";
const ROUTES = [
  "/",
  "/group",
  "/group/our-history",
  "/brands",
  "/operations",
  "/sustainability",
  "/investors",
  "/careers",
];

const browser = await chromium.launch({ executablePath: EXE, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await context.addInitScript(() => {
  try {
    localStorage.setItem("ll-age-verified", "true");
    localStorage.setItem("ll-cookie-consent", "all");
  } catch {}
});
const page = await context.newPage();

let failures = 0;
for (const route of ROUTES) {
  const errs = [];
  page.removeAllListeners("pageerror");
  page.removeAllListeners("console");
  page.on("pageerror", (e) => errs.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errs.push("console: " + m.text());
  });
  try {
    const resp = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(1500);
    const status = resp ? resp.status() : "?";
    const ok = status === 200 && errs.length === 0;
    if (!ok) failures++;
    console.log(`${ok ? "OK  " : "FAIL"} ${status} ${route}${errs.length ? " :: " + errs.join(" | ") : ""}`);
    const shot = { "/group": "smoke-group.png", "/brands": "smoke-brands.png", "/careers": "smoke-careers.png", "/group/our-history": "smoke-history.png" }[route];
    if (shot) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.55));
      await page.waitForTimeout(1200);
      await page.screenshot({ path: "scripts/" + shot, fullPage: false });
    }
  } catch (e) {
    failures++;
    console.log(`FAIL ---- ${route} :: ${e.message}`);
  }
}

console.log(failures ? `\n${failures} route(s) with problems` : "\nall routes clean");
await browser.close();
process.exit(failures ? 1 : 0);
