const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Dashboard
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/home/jules/verification/v_dashboard.png', fullPage: true });

  // Patients
  await page.goto('http://localhost:3000/patients');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/jules/verification/v_patients.png', fullPage: true });

  // Analysis
  await page.goto('http://localhost:3000/analyze');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/jules/verification/v_analysis.png', fullPage: true });

  // Logs
  await page.goto('http://localhost:3000/logs');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/jules/verification/v_logs.png', fullPage: true });

  await browser.close();
})();
