# Test Plan - Automation Exercise (Cypress)

## 1. Scope of Automation
Selected scenarios for https://automationexercise.com/:
- [cite_start]**UI: Happy Path (Checkout Flow):** Full user journey from cart to order completion.
- [cite_start]**UI: Negative Case (Login):** Validating system behavior with invalid credentials.
- [cite_start]**UI: State Management:** Verifying that adding items updates the cart count correctly.
- [cite_start]**API: Data Integrity:** Testing product retrieval and schema validation using ReqRes.

## 2. Technology Stack
- **Framework:** Cypress (JavaScript).
- [cite_start]**Design Pattern:** Page Object Model (POM)[cite: 56].
- [cite_start]**Tools:** VS Code, Mochawesome Reporter (for reporting)[cite: 77].

## 3. Stability & Maintainability
- [cite_start]**Assertions:** Using Cypress's built-in retry-ability for asynchronous elements.
- [cite_start]**Selectors:** Focused on `data-qa` attributes to ensure stability against UI changes.
- **Custom Commands:** Abstracted repetitive tasks like login into `cypress/support/commands.js`.

## 4. Risks & Assumptions
- **Risk:** The application is known to have ads/pop-ups which may interfere with test execution. 
- **Mitigation:** Use `cy.intercept()` or specific CSS overrides to hide overlays during tests.