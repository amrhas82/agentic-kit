---
description: Test local web applications using Playwright - verify functionality, debug UI, capture screenshots
argument-hint: <webapp-url-or-local-server>
---

Test local web applications using native Python Playwright scripts with bundled helper utilities.

## Available Operations

- `static` - Test static HTML files
- `dynamic` - Test dynamic web applications  
- `debug` - Debug UI behavior and capture logs
- `screenshot` - Capture browser screenshots
- `server` - Manage server lifecycle for testing

## Decision Tree

```
Task → Is it static HTML?
    ├─ Yes → Read HTML file directly to identify selectors
    │         ├─ Success → Write Playwright script using selectors
    │         └─ Fails/Incomplete → Treat as dynamic (below)
    │
    └─ No (dynamic webapp) → Is the server already running?
        ├─ No → Run: python scripts/with_server.py --help
        │        Then use the helper + write simplified Playwright script
        │
        └─ Yes → Reconnaissance-then-action:
            1. Navigate and wait for networkidle
            2. Take screenshot or inspect DOM
            3. Identify selectors from rendered state
            4. Execute actions with discovered selectors
```

## Basic Playwright Setup

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)  # Always chromium in headless
    page = browser.new_page()
    page.goto('http://localhost:5173')  # Your local server
    page.wait_for_load_state('networkidle')  # CRITICAL: Wait for JS execution
    
    # Your automation logic here
    
    browser.close()
```

## Server Management with with_server.py

**Single server:**
```bash
python scripts/with_server.py \
  --server "npm run dev" \
  --port 5173 \
  -- python your_automation.py
```

**Multiple servers (backend + frontend):**
```bash
python scripts/with_server.py \
  --server "cd backend && python server.py" --port 3000 \
  --server "cd frontend && npm run dev" --port 5173 \
  -- python your_automation.py
```

**Always run `--help` first:**
```bash
python scripts/with_server.py --help
```

## Reconnaissance-Then-Action Pattern

### 1. Inspect Rendered DOM
```python
# Take full page screenshot
page.screenshot(path='/tmp/inspect.png', full_page=True)

# Get page content
content = page.content()

# Discover all buttons, links, inputs
page.locator('button').all()
page.locator('a').all() 
page.locator('input').all()
```

### 2. Identify Selectors
Common selector strategies:
- **Text-based**: `page.locator('text=Login')`
- **Role-based**: `page.locator('role=button')`
- **CSS selectors**: `page.locator('.button-primary')`
- **IDs**: `page.locator('#submit-form')`

### 3. Execute Actions
```python
# Click elements
page.click('button:has-text("Submit")')

# Fill forms
page.fill('input[name="email"]', 'user@example.com')
page.fill('input[type="password"]', 'password123')

# Select from dropdown
page.select_option('select[name="country"]', 'US')

# Wait for elements
page.wait_for_selector('.loading-spinner', state='hidden')
```

## Common Patterns

### Form Interaction
```python
# Complete multi-step form
page.goto('http://localhost:3000/form')
page.wait_for_load_state('networkidle')

# Fill form fields
page.fill('input[name="firstName"]', 'John')
page.fill('input[name="lastName"]', 'Doe')
page.fill('input[name="email"]', 'john.doe@example.com')

# Select dropdown
page.select_option('select[name="country"]', 'United States')

# Submit form
page.click('button[type="submit"]')

# Verify success
page.wait_for_selector('.success-message')
assert page.locator('.success-message').text_content() == 'Form submitted successfully!'
```

### Navigation Testing
```python
# Test navigation between pages
page.click('a[href="/dashboard"]')
page.wait_for_load_state('networkidle')

# Verify URL changed
assert page.url == 'http://localhost:3000/dashboard'

# Check page content
assert page.locator('h1:has-text("Dashboard")').is_visible()
```

### Data Loading and Waiting
```python
# Wait for data to load
page.wait_for_selector('.data-table')
page.wait_for_load_state('networkidle')

# Check table content
table = page.locator('.data-table')
rows = table.locator('tbody tr')

# Verify data loaded
assert rows.count() > 0

# Check specific data
assert page.locator('text=John Doe').is_visible()
```

### Error Handling
```python
# Test error states
page.goto('http://localhost:3000/invalid-page')
page.wait_for_load_state('networkidle')

# Check for error message
error_message = page.locator('.error-message')
assert error_message.is_visible()
assert '404' in error_message.text_content()
```

## Debugging and Logging

### Console Logs
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)  # Non-headless for debugging
    page = browser.new_page()
    
    # Capture console messages
    page.on('console', lambda msg: print(f'Browser console: {msg.text}'))
    
    # Capture JavaScript errors
    page.on('pageerror', lambda error: print(f'Page error: {error}'))
    
    page.goto('http://localhost:5173')
    browser.close()
```

### Screenshot Capture
```python
# Capture on failure
try:
    page.click('button')
except Exception as e:
    page.screenshot(path='/tmp/failure.png', full_page=True)
    raise e

# Full page screenshot
page.screenshot(path='/tmp/full-page.png', full_page=True)

# Element screenshot
element = page.locator('.widget')
element.screenshot(path='/tmp/widget.png')
```

## Best Practices

### Critical Rules
- **Always** wait for `networkidle` on dynamic apps before DOM inspection
- Use `sync_playwright()` for synchronous scripts
- Always close the browser when done
- Use descriptive selectors (text, role, CSS, or IDs)
- Add appropriate waits: `wait_for_selector()` or `wait_for_timeout()`

### Performance Tips
- Use headless mode for CI/automation: `headless=True`
- Close unused pages to free memory
- Use specific selectors over generic ones
- Avoid unnecessary waits

### Selector Strategy
```python
# Prefer these (most reliable):
page.locator('text=Submit')           # Text content
page.locator('role=button')           # ARIA role
page.locator('#submit-form')          # ID
page.locator('.button-primary')       # CSS class

# Avoid these (less reliable):
page.locator('button:nth-child(2)')   # Position-based
page.locator('a[href*="login"]')      # Partial attribute match
```

## Reference Examples

**Element Discovery:**
```python
# Find all interactive elements
buttons = page.locator('button').all()
for button in buttons:
    print(f"Button: {button.text_content()}")
```

**Static HTML Testing:**
```python
# For local HTML files
page.goto('file:///path/to/local/file.html')
page.wait_for_load_state('networkidle')
```

## Usage Examples

**Test React app:**
`/webapp-testing "http://localhost:3000"`

**Test with server management:**
`/webapp-testing "npm run dev --port 3000"`

**Debug UI issues:**
`/webapp-testing "http://localhost:5173 --debug"`

**Capture screenshots:**
`/webapp-testing "http://localhost:3000 --screenshot"`

Remember: Use bundled scripts as black boxes for complex workflows - they handle common patterns reliably.
