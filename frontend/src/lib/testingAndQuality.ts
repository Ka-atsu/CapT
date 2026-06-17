import { Lesson } from "@/lib/types";

export const testingAndQuality: Lesson[] = [
  {
    id: 1,
    title: "3.1 Test-Driven Development Foundations",
    briefing: {
      coreConcept: "Verification-First Design",
      latencyImpact: "Bug Detection Speed",
      prerequisite: "Track 2: Full-Stack Engineering",
    },
    steps: [
      {
        label: "3.1.1",
        subtitle: "The Red-Green-Refactor Loop",
        icon: "bank",
        markdownContent:
          "Test-Driven Development (TDD) inverts the traditional coding workflow. Instead of writing code first and testing later, you write a failing test *before* writing any implementation code. This three-step cycle—Red (write a failing test), Green (write minimal code to pass), Refactor (improve the code while tests stay green)—ensures every line of production code exists to satisfy a specific, verifiable requirement.\n\n" +
          "### Why This Order Matters\n" +
          "Writing the test first forces you to define success before you define implementation. This eliminates 'confirmation bias testing'—where developers unconsciously write tests that pass their already-written code rather than tests that verify correct behavior.",
        codeSnippet: `// RED PHASE: Write a failing test first
describe('calculateDiscount', () => {
  it('should apply a 10% discount for orders over $100', () => {
    const result = calculateDiscount(150);
    expect(result).toBe(135); // $150 - 10% = $135
  });
});

// GREEN PHASE: Minimal code to pass
function calculateDiscount(total) {
  if (total > 100) {
    return total * 0.9;
  }
  return total;
}

// REFACTOR PHASE: Improve without breaking tests
function calculateDiscount(total) {
  const DISCOUNT_THRESHOLD = 100;
  const DISCOUNT_RATE = 0.9;
  
  return total > DISCOUNT_THRESHOLD 
    ? total * DISCOUNT_RATE 
    : total;
}`,
      },
      {
        label: "3.1.2",
        subtitle: "Unit Test Isolation",
        icon: "shield",
        markdownContent: `
A unit test verifies the smallest testable piece of logic in isolation—typically a single function. True unit testing requires mocking or stubbing external dependencies so the test measures *only* the logic within that function, not the behavior of the database, network, or file system.

### The Isolation Principle
If a unit test fails, you should know exactly which function broke without needing to debug a chain of dependencies. This is achieved through:
- **Stubs:** Fake objects that return predetermined responses (e.g., a fake database that always returns a specific user).
- **Mocks:** Objects that record how they were called, allowing you to assert that your function invoked the dependency correctly (e.g., verifying an email service was called exactly once).

**Anti-pattern:** A unit test that connects to a real database is not a unit test—it's an integration test. It will fail when the network is down, not just when your logic is wrong.
`,
        codeSnippet: `// Testing with stubs: isolating payment logic
function processRefund(paymentGateway, amount) {
  if (amount <= 0) throw new Error("Invalid amount");
  return paymentGateway.refund(amount);
}

// Test: Stub the gateway so we test ONLY our logic
describe('processRefund', () => {
  it('rejects negative refunds instantly', () => {
    const stubGateway = { refund: jest.fn() };
    
    // We're testing the guard clause, not the gateway
    expect(() => processRefund(stubGateway, -50))
      .toThrow("Invalid amount");
  });
});`,
      },
      {
        label: "3.1.3",
        subtitle: "Test Coverage Boundaries",
        icon: "network",
        markdownContent: `
Test coverage measures what percentage of your codebase is executed during your test suite. However, **high coverage does not mean high quality**. 

### The Coverage Trap
100% code coverage means every line was executed during testing—it does not mean every edge case was verified. A test that calls a function without asserting its return value still counts as "coverage" despite proving nothing.

### Strategic Coverage
Focus coverage efforts on **critical paths**: authentication logic, payment calculations, data transformations, and authorization checks. Utility functions that format dates can tolerate lower coverage. The goal is not 100% coverage—it's zero uncovered critical paths.

**Key metric:** Instead of chasing a percentage, ask: "If this function silently broke, would we detect it immediately?"
`,
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "In Test-Driven Development, the three-step cycle of writing a failing test, writing minimal code to pass it, and then improving the code while keeping the test green is called _______.",
      answer: "red-green-refactor",
    },
  },
  {
    id: 2,
    title: "3.2 Integration & End-to-End Verification",
    briefing: {
      coreConcept: "System-Wide Validation",
      latencyImpact: "Regression Prevention",
      prerequisite: "3.1 TDD Foundations",
    },
    steps: [
      {
        label: "3.2.1",
        subtitle: "Integration Test Boundaries",
        icon: "server",
        markdownContent:
          "While unit tests verify individual functions in isolation, integration tests verify that multiple components interact correctly when combined. The critical skill in integration testing is defining the boundary—which real dependencies are included and which remain mocked.\n\n" +
          "### Common Integration Boundaries\n" +
          "- **API Layer Tests:** A real server instance with a real router but a stubbed database. Verifies that middleware, validation, and routing work together.\n" +
          "- **Database Layer Tests:** Real database queries against a test database that resets between test runs. Verifies that SQL queries and transaction logic behave correctly.\n" +
          "- **Service Layer Tests:** Multiple services wired together with real logic but mocked external APIs.",
      },
      {
        label: "3.2.2",
        subtitle: "End-to-End Test Scenarios",
        icon: "network",
        markdownContent:
          "End-to-End (E2E) tests simulate a real user interacting with your application through a browser or client. They are the most expensive tests to run but the closest to catching real-world failures.\n\n" +
          "### E2E Best Practices\n" +
          "- Test critical user journeys: sign up, log in, create content, make a purchase. Do not test every edge case here—that belongs in unit tests.\n" +
          "- Use stable selectors: `data-testid` attributes rather than CSS classes that change with redesigns.\n" +
          "- Run E2E tests in CI on every pull request but keep the suite under 15 minutes.\n\n" +
          "**The Testing Pyramid:** Many cheap, fast unit tests at the bottom. Fewer integration tests in the middle. Very few expensive E2E tests at the top.",
        codeSnippet: `// E2E test example (Playwright/Cypress style)
test('user can complete checkout flow', async ({ page }) => {
  // Add item to cart
  await page.click('[data-testid="add-to-cart"]');
  
  // Navigate to checkout
  await page.click('[data-testid="checkout-button"]');
  
  // Fill payment form
  await page.fill('[data-testid="card-number"]', '4242424242424242');
  await page.click('[data-testid="confirm-payment"]');
  
  // Assert success page rendered
  await expect(page.locator('[data-testid="order-confirmed"]'))
    .toBeVisible();
});`,
      },
      {
        label: "3.2.3",
        subtitle: "Regression Test Suites",
        icon: "shield",
        markdownContent:
          "A regression test is any test that was written because a bug previously shipped to production. The test reproduces the exact bug conditions and verifies they never reoccur.\n\n" +
          "### The Regression Protocol\n" +
          "1. A bug is reported in production.\n" +
          "2. BEFORE fixing it, write a test that reproduces the bug and watch it fail.\n" +
          "3. Fix the bug and watch the test pass.\n" +
          "4. The test remains in the suite forever as a regression guard.\n\n" +
          "Over time, a project's regression test collection becomes a living record of every production incident. No bug that was ever fixed can silently return.",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "According to the Testing Pyramid, which type of test should your project contain the MOST of?",
      options: [
        "End-to-End tests (simulating real user flows)",
        "Integration tests (testing component interactions)",
        "Unit tests (isolated function verification)",
        "Manual QA testing sessions",
      ],
      answer: 2,
    },
  },
  {
    id: 3,
    title: "3.3 Continuous Integration & Quality Gates",
    briefing: {
      coreConcept: "Automated Enforcement",
      latencyImpact: "Merge Confidence",
      prerequisite: "3.2 Integration & E2E",
    },
    steps: [
      {
        label: "3.3.1",
        subtitle: "CI/CD Pipeline Architecture",
        icon: "network",
        markdownContent:
          "Continuous Integration (CI) is the practice of automatically building and testing every commit pushed to a repository. A CI pipeline runs on every pull request, enforcing that code cannot be merged unless it passes all verification gates.\n\n" +
          "### Standard CI Pipeline Stages\n" +
          "| Stage | Purpose | Failure Means |\n" +
          "| :--- | :--- | :--- |\n" +
          "| **Install** | Install dependencies in a clean environment | Project has broken dependency declarations |\n" +
          "| **Lint** | Enforce code style and catch syntax errors | Code violates team standards |\n" +
          "| **Build** | Compile the application | Code has compilation errors |\n" +
          "| **Unit Tests** | Run fast, isolated tests | Logic is broken |\n" +
          "| **Integration Tests** | Run cross-component tests | Systems don't interact correctly |\n" +
          "| **Deploy Preview** | Create a temporary environment | App doesn't run in production-like settings |\n\n" +
          "Each stage acts as a quality gate. If any stage fails, the pipeline stops immediately—no further stages run.",
      },
      {
        label: "3.3.2",
        subtitle: "Automated Linting & Formatting",
        icon: "shield",
        markdownContent:
          "Linters are static analysis tools that examine source code without executing it. They catch syntax errors, enforce code style conventions, and detect dangerous patterns before code ever runs.\n\n" +
          "### Why Automate Rather Than Trust Developer Discipline\n" +
          "Code review should focus on architecture and logic—not on whether a developer used tabs or spaces, or whether they remembered to handle a promise rejection. Automated linting removes these mechanical concerns from human review entirely.\n\n" +
          "**Common Linting Targets:**\n" +
          "- **ESLint:** JavaScript/TypeScript code quality and style\n" +
          "- **Prettier:** Automatic code formatting (indentation, quotes, semicolons)\n" +
          "- **Stylelint:** CSS and styling conventions\n" +
          "- **ShellCheck:** Bash script validation\n\n" +
          "When combined with a pre-commit hook (like Husky) or a CI step, linters become an unskippable enforcement layer. Code that doesn't pass linting literally cannot be merged.",
        codeSnippet: `// .github/workflows/lint.yml (GitHub Actions)
name: Code Quality Check

on: [pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Check formatting with Prettier
        run: npx prettier --check .
      
      # If any step fails, the PR cannot be merged`,
      },
      {
        label: "3.3.3",
        subtitle: "GitHub Actions Workflows",
        icon: "server",
        markdownContent:
          "GitHub Actions is a CI/CD platform integrated directly into GitHub repositories. Workflows are defined as YAML files in the `.github/workflows/` directory and are triggered by repository events like pushes, pull requests, or scheduled intervals.\n\n" +
          "### Anatomy of a Workflow\n" +
          "- **Trigger:** What event starts the workflow? (`on: pull_request`)\n" +
          "- **Job:** A collection of steps that run on a specific runner (e.g., `ubuntu-latest`)\n" +
          "- **Step:** An individual command or reusable action (`run: npm test`)\n" +
          "- **Artifacts:** Files produced during the run that are saved for later inspection\n\n" +
          "**Key capability:** GitHub Actions can deploy to cloud platforms, send Slack notifications on failure, run database migrations, and perform security audits—not just run tests. It is the automation backbone of modern team workflows.",
      },
      {
        label: "3.3.4",
        subtitle: "Pre-Merge Quality Gates",
        icon: "bank",
        markdownContent:
          "A quality gate is a condition that must be met before code can proceed to the next stage. In CI, quality gates are automated checks that block merging when they fail.\n\n" +
          "### Essential Quality Gates\n" +
          "- **All tests pass:** Non-negotiable. A single failing test blocks the merge.\n" +
          "- **Coverage does not decrease:** If the pull request reduces overall test coverage, it is rejected.\n" +
          "- **Linter violations count is zero:** Any linting error blocks the merge.\n" +
          "- **Build succeeds:** The application must compile without errors.\n" +
          "- **Required reviewers approve:** At least one (or two) human reviewers must approve the changes.\n\n" +
          "These gates are configured in GitHub's branch protection settings, creating a system where the default branch is always in a deployable state. No broken code can reach production because broken code cannot be merged.",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "In a CI pipeline, what happens when a quality gate fails (e.g., a linting error is detected)?",
      options: [
        "The pipeline skips the failed step and continues to the next stage.",
        "The pipeline stops immediately and the pull request cannot be merged.",
        "A warning is logged but the code is merged with a flag for later review.",
        "The failed step is automatically fixed by the pipeline.",
      ],
      answer: 1,
    },
  },
  {
    id: 4,
    title: "3.4 Quality Synthesis: The 'Why' Behind Automated Verification",
    briefing: {
      coreConcept: "Confidence Engineering",
      latencyImpact: "Mean Time To Resolution (MTTR)",
      prerequisite: "3.3 CI & Quality Gates",
    },
    steps: [
      {
        label: "3.4.1",
        subtitle: "Why TDD Over Debugging-Later",
        icon: "bank",
        markdownContent: `
You aren't just writing tests first for discipline; you're eliminating the **temporal gap between writing a bug and discovering it**.

### The Why
In the traditional "code first, test later" model, a developer writes a feature on Monday, manually verifies it, and moves on. The automated tests—if they exist at all—are written later, perhaps Friday afternoon. By then, the developer's mental model of the code has already decayed. They write tests that confirm what the code *appears* to do, not what it *should* do. The test suite becomes a rubber stamp, not a verification mechanism.

**TDD collapses this gap to zero.** The test is written when the requirement is freshest—before any implementation code exists. The test defines success, and the implementation must rise to meet it. When the test fails six months later during a refactor, it fails because the *behavior changed*, not because the test was poorly designed.

**Key takeaway:** TDD is not a testing strategy; it is a requirements-capture strategy. Every test is an executable specification that cannot drift out of sync with the code because the code was written to satisfy it.
`,
      },
      {
        label: "3.4.2",
        subtitle: "Why the Testing Pyramid Over Uniform Testing",
        icon: "network",
        markdownContent: `
You aren't just organizing tests into a pyramid for aesthetic reasons; you're optimizing for **feedback speed per dollar of execution time**.

### The Why
Every type of test exists on a spectrum of speed versus confidence. Unit tests run in milliseconds and catch logic errors. E2E tests run in minutes and catch integration errors. Both are valuable, but they have radically different cost profiles.

If you write only E2E tests, your suite takes hours to run. Developers stop running it locally. It becomes a CI-only afterthought. Bugs are discovered 45 minutes after a push rather than 45 milliseconds after saving a file. The feedback loop stretches, and development velocity collapses.

If you write only unit tests, your suite is fast but blind. Every function works in isolation, but the system as a whole is broken. The first time the components are tested together is in production—on real users.

**The Testing Pyramid solves this by matching test granularity to failure granularity.** If a function's logic is broken, a unit test catches it instantly. If two services disagree on an API contract, an integration test catches it. If the entire system can't complete a user journey, an E2E test catches it. Each layer catches the failures that the layer below cannot see.

**Key takeaway:** The pyramid is not about counting tests—it's about ensuring that every type of failure is caught at the cheapest possible layer.
`,
      },
      {
        label: "3.4.3",
        subtitle: "Why Automated Gates Over Trust-Based Review",
        icon: "shield",
        markdownContent: `
You aren't just adding CI checks to slow down merges; you're **removing human judgment from mechanical decisions**.

### The Why
A senior developer reviewing a pull request has finite attention. They should spend it evaluating architectural decisions, naming clarity, and edge case handling. They should not spend it counting whether every function has a return statement or whether the semicolons are consistent.

When humans are responsible for enforcing mechanical rules, two failure modes emerge:
1. **Enforcement fatigue:** The reviewer stops checking for formatting issues because it's tedious. Standards silently decay.
2. **Inconsistent enforcement:** Different reviewers enforce different standards. The codebase becomes a patchwork of styles.

Automated gates (linters, formatters, coverage thresholds) solve both problems. They never get tired. They never have an off day. They apply the exact same rules to every commit from every developer, forever. When a linting step fails in CI, there is no argument—the machine has spoken.

**This is not about trusting developers less. It's about freeing developers to focus on what humans do best (design judgment, empathy for future readers) and letting machines handle what machines do best (consistent, exhaustive rule application).**

**Key takeaway:** The most valuable code review comment is the one that was never written—because an automated check caught the issue before a human ever saw the pull request.
`,
      },
      {
        label: "3.4.4",
        subtitle: "Why Regression Tests Over 'Fixed It' Assumptions",
        icon: "server",
        markdownContent: `
You aren't just adding a test every time you fix a bug for bureaucracy; you're **encoding organizational memory into executable form**.

### The Why
When a bug ships to production, it means your existing test suite had a blind spot. That specific failure mode was not covered. If you fix the bug without adding a test, you are betting that nobody will ever reintroduce the same failure condition—despite the fact that it already happened once.

Teams forget. Developers rotate. Six months later, a new engineer refactors the module and accidentally reintroduces the exact same bug. The original fixer is on a different team now. Nobody remembers why the code was structured that way. The same bug ships to production again.

**A regression test is a permanent, machine-enforceable memory.** It says: "This exact failure happened, on this date, and we assert it shall never happen again." When the regression test fails during a future refactor, it doesn't just say "something broke"—it says "the specific thing that hurt us in March 2024 is about to hurt us again."

**Key takeaway:** A bug that ships once is unfortunate. A bug that ships twice because nobody wrote a regression test is a process failure. Regression tests turn painful incidents into permanent immunity.
`,
      },
      {
        label: "3.4.5",
        subtitle: "The Automated Quality Cohesion Principle",
        icon: "network",
        markdownContent: `
Having examined each testing and quality layer in isolation, we can now state the principle that ties automated verification to engineering excellence.

### The Verification Cohesion Principle
**Automated quality systems must be comprehensive enough to catch regressions before human review, fast enough to run on every commit, and trustworthy enough that a green pipeline means deployable code.**

Each layer of the testing and CI stack exists to uphold one aspect of this principle:
- **TDD and unit tests** provide speed and precision. They run in seconds and pinpoint exact failure locations.
- **Integration and E2E tests** provide comprehensiveness. They catch failures that span system boundaries.
- **Regression tests** provide memory. They ensure known failures stay dead.
- **Linters and quality gates** provide trustworthiness. They eliminate the "it probably works" ambiguity from merges.
- **CI pipelines** provide enforcement. They make verification unskippable.

**Key takeaway:** The goal of automated quality is not to prevent bugs from existing—it's to prevent bugs from reaching users. A bug caught in CI is a conversation between developers. A bug caught in production is a conversation with angry customers. The entire testing and CI apparatus exists to keep that conversation internal.
`,
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "A developer fixes a production bug but does not add a regression test. Six months later, a refactor silently reintroduces the same bug. Which principle of the verification stack was violated?",
      options: [
        "The Test-Driven Development red-green-refactor loop",
        "The Testing Pyramid's unit test foundation",
        "The principle that every production bug must be encoded as a permanent regression test",
        "The CI pipeline quality gate enforcement",
      ],
      answer: 2,
    },
  },
];