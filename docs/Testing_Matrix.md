# Testing Matrix

Matrix maps each feature to required test types and tools.

| Feature                   | Unit Tests | Integration Tests | E2E Tests    | Accessibility Tests | Tooling                     |
| ------------------------- | ---------- | ----------------- | ------------ | ------------------- | --------------------------- |
| Authentication            | ✅ Jest     | ✅ Supertest       | ✅ Playwright |                     | Jest, React Testing Library |
| User Profiles             | ✅ Jest     | ✅ RTL             |              | ✅ axe-core          | Jest, RTL, axe-core         |
| Booking & Scheduling      | ✅ Jest     | ✅ Supertest       | ✅ Playwright |                     | Playwright, Supertest       |
| E-commerce                | ✅ Jest     | ✅ Supertest       | ✅ Playwright |                     | Jest, Playwright            |
| AI Personalization        | ✅ Jest     |                   |              |                     | Jest                        |
| Social & Community        | ✅ Jest     | ✅ RTL             | ✅ Playwright | ✅ axe-core          | RTL, Playwright, axe-core   |
| Virtual Try-On            | ✅ Jest     |                   |              |                     | Jest                        |
| Treatment Plans           | ✅ Jest     | ✅ Supertest       |              |                     | Jest, Supertest             |
| PWA & Offline Support     | ✅ Jest     |                   | ✅ Playwright |                     | Workbox testing, Playwright |
| Dark Mode & Theming       | ✅ Jest     |                   |              | ✅ axe-core          | RTL, axe-core               |
| Headless CMS              | ✅ Jest     | ✅ Supertest       |              |                     | Supertest                   |
| AI Chatbot & Voice Assist | ✅ Jest     |                   | ✅ Playwright |                     | Jest, Playwright            |
| Live Shopping             | ✅ Jest     | ✅ Supertest       | ✅ Playwright |                     | Playwright, Supertest       |
| Personalization Engine    | ✅ Jest     |                   |              |                     | Jest                        |
| Influencer/Affiliate      | ✅ Jest     |                   |              |                     | Jest                        |
| Sustainability Features   | ✅ Jest     |                   |              | ✅ axe-core          | Jest, axe-core              |

**Coverage Targets:**

* Core modules: ≥ 80% unit coverage.
* End-to-end critical flows: 100% success rate.
* Accessibility: no high/critical issues.

**Example Test Case Template:**

```js
describe('Booking API', () => {
  it('should create a booking', async () => {
    // arrange
    // act
    // assert
  });
}); 