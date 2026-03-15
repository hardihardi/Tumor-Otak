from playwright.sync_api import sync_playwright

def verify(page):
    page.goto("http://localhost:3000/")
    page.wait_for_timeout(3000)
    page.screenshot(path="/home/jules/verification/v_dashboard.png", full_page=True)

    page.goto("http://localhost:3000/patients")
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/v_patients.png", full_page=True)

    page.goto("http://localhost:3000/analyze")
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/v_analysis.png", full_page=True)

    page.goto("http://localhost:3000/logs")
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/v_logs.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify(page)
        finally:
            browser.close()
