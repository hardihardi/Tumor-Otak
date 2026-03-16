import asyncio
from playwright.async_api import async_playwright
import os

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # Define viewports
        viewports = {
            'desktop': {'width': 1280, 'height': 800},
            'mobile': {'width': 375, 'height': 667}
        }

        # Define routes to capture
        routes = {
            'Dashboard': '/',
            'MRIAnalysis': '/analyze',
            'Patients': '/patients',
            'Reports': '/reports',
            'Monitoring': '/monitoring',
            'Users': '/users',
            'Logs': '/logs',
            'Settings': '/settings'
        }

        os.makedirs('screenshots/desktop', exist_ok=True)
        os.makedirs('screenshots/mobile', exist_ok=True)

        for vp_name, vp_size in viewports.items():
            print(f"Capturing {vp_name} screenshots...")
            context = await browser.new_context(
                viewport=vp_size,
                is_mobile=(vp_name == 'mobile')
            )
            page = await context.new_page()

            for name, route in routes.items():
                try:
                    url = f"http://localhost:3000{route}"
                    await page.goto(url, wait_until="networkidle", timeout=60000)
                    # Give extra time for charts to animate
                    await asyncio.sleep(2)

                    path = f"screenshots/{vp_name}/{name}.png"
                    await page.screenshot(path=path, full_page=False)
                    print(f"  ✅ {name} saved to {path}")
                except Exception as e:
                    print(f"  ❌ Failed {name}: {e}")

            await context.close()

        await browser.close()

if __name__ == "__main__":
    asyncio.run(capture())
