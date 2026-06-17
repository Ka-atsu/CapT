import { Lesson } from "@/lib/types";

export const fullStackEngineering: Lesson[] = [
  {
    id: 1,
    title: "2.1 Component-Driven UI Architecture",
    briefing: {
      coreConcept: "Reactive Interfaces",
      latencyImpact: "Render Cycle Optimization",
      prerequisite: "Track 1: CS Foundations",
    },
    steps: [
      {
        label: "2.1.1",
        subtitle: "DOM Construction & Engines",
        icon: "network",
        markdownContent:
          "Modern frontend engines (like React or Vue) abstract away manual HTML manipulation. Instead of directly querying and mutating the Document Object Model (DOM)—which is notoriously slow—these engines use a 'Virtual DOM' to compute the fastest way to update the screen before making any actual changes.",
      },
      {
        label: "2.1.2",
        subtitle: "Reactive State Patterns",
        icon: "server",
        markdownContent:
          "In component-driven design, UIs are a direct reflection of 'State'. When the underlying data (state) changes, the component automatically re-renders to reflect it. This eliminates the need to manually write logic that says 'update the text of this specific paragraph tag'.",
        codeSnippet: `// React example: State drives the UI
import { useState } from 'react';

function Counter() {
  // 'count' is the state. 'setCount' updates it and triggers a re-render.
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`,
      },
      {
        label: "2.1.3",
        subtitle: "Hooks & Lifecycle Loops",
        icon: "bank",
        markdownContent:
          "Components have a lifecycle: they 'mount' (appear), 'update', and 'unmount' (disappear). Hooks are functions that let you tap into these lifecycle events—for example, fetching data from an API exactly once when the component first mounts, rather than infinitely looping.",
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "In modern frontend frameworks, the data that dictates what a component renders and automatically triggers an update when changed is called _______.",
      answer: "state",
    },
  },
  {
    id: 2,
    title: "2.2 Backend Runtimes & Data Routing",
    briefing: {
      coreConcept: "API Orchestration",
      latencyImpact: "Request Throughput",
      prerequisite: "2.1 Component-Driven UI",
    },
    steps: [
      {
        label: "2.2.1",
        subtitle: "Server Runtimes",
        icon: "server",
        markdownContent:
          "A backend runtime environment, like Node.js, allows you to execute JavaScript outside of a web browser. This fundamentally changes the language's capability, granting it access to the computer's file system, network ports, and raw computing power to handle thousands of concurrent requests.",
      },
      {
        label: "2.2.2",
        subtitle: "RESTful Endpoint Schemas",
        icon: "network",
        markdownContent:
          "REST (Representational State Transfer) is a standardized architecture for routing data. It pairs URL paths with specific HTTP verbs (GET for reading, POST for creating, DELETE for removing). A strong API schema is predictable. Coupled with HTTP Status Validations (like returning a 404 vs a 500 error), it creates a reliable contract between frontend and backend.",
      },
      {
        label: "2.2.3",
        subtitle: "Execution Middlewares",
        icon: "shield",
        markdownContent:
          "Middlewares are functions that intercept an incoming HTTP request before it reaches your final route. They are critical for system security and utility—used to validate authentication tokens, parse incoming JSON data, or log request latency.",
        codeSnippet: `// Express.js Middleware Example
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send("Access Denied");
  
  // If valid, pass control to the next function
  next(); 
};

// The middleware runs BEFORE the final route logic
app.get('/api/secure-data', verifyToken, (req, res) => {
  res.json({ secret: "Classified data" });
});`,
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "What is the primary purpose of an Execution Middleware in a backend server architecture?",
      options: [
        "To compile the backend code into machine language.",
        "To intercept and process incoming requests before they reach the final route handler.",
        "To store persistent data securely on the server's hard drive.",
        "To render the HTML structure for the frontend client.",
      ],
      answer: 1,
    },
  },
  {
    id: 3,
    title: "2.3 Database Modeling & Persistency",
    briefing: {
      coreConcept: "Data Integrity",
      latencyImpact: "Query Speed",
      prerequisite: "2.2 Backend Runtimes",
    },
    steps: [
      {
        label: "2.3.1",
        subtitle: "SQL & Relation Mapping",
        icon: "bank",
        markdownContent:
          "Relational databases (SQL) store data in strict, interconnected tables. Through 'Foreign Keys', you can map a User table to an Orders table. This structure relies on rigid constraints (e.g., an order *must* have a valid user ID) to guarantee that orphaned or corrupted data cannot exist.",
      },
      {
        label: "2.3.2",
        subtitle: "Data Isolation & Transactions",
        icon: "shield",
        markdownContent:
          "A Database Transaction ensures a multi-step operation is treated as a single, all-or-nothing unit. If step 3 of a 4-step bank transfer fails, the transaction is 'rolled back', reverting steps 1 and 2. This isolation state guarantees the database never saves a partially completed, broken action.",
      },
      {
        label: "2.3.3",
        subtitle: "Document-Oriented NoSQL",
        icon: "server",
        markdownContent:
          "NoSQL databases (like MongoDB) abandon rigid tables for flexible JSON-like documents. While they sacrifice some of the strict constraints of SQL, they excel at rapidly storing unstructured data (like varied sensor readings) and scale horizontally with massive throughput.",
        codeSnippet: `// A NoSQL Document (MongoDB) allows nested, flexible schemas
{
  "_id": "user_8829",
  "name": "Alice",
  "devices": [
    { "type": "thermostat", "location": "hallway" },
    { "type": "camera", "active": true }
  ]
}`,
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "If an operation requires multiple database queries (like moving money from one account to another), what mechanism ensures that if one query fails, the entire operation is cancelled?",
      options: [
        "Horizontal Scaling",
        "Document Orientation",
        "A Database Transaction",
        "Foreign Key Mapping",
      ],
      answer: 2,
    },
  },
  {
    id: 4,
    title: "2.4 The Enterprise Workflow",
    briefing: {
      coreConcept: "Team Collaboration",
      latencyImpact: "Deployment Velocity",
      prerequisite: "2.3 Database Modeling",
    },
    steps: [
      {
        label: "2.4.1",
        subtitle: "Advanced Git Mechanics",
        icon: "network",
        markdownContent:
          "In enterprise environments, standard Git merges can create tangled, messy histories. Teams rely on strict workflow boundaries (like Feature Branching) and 'Rebasing'—a technique that rewrites commit history to maintain a perfectly linear, readable timeline of the project's evolution.",
      },
      {
        label: "2.4.2",
        subtitle: "Package Isolation",
        icon: "shield",
        markdownContent:
          "The 'it works on my machine' excuse is unacceptable in engineering. Technologies like Docker and virtual environments encapsulate your application and its precise dependencies into an isolated container. This guarantees the code behaves exactly the same in production as it did on your laptop.",
      },
      {
        label: "2.4.3",
        subtitle: "Shell Automation Scripts",
        icon: "server",
        markdownContent:
          "Manual tasks lead to human error. Engineers write Bash or Shell scripts to automate tedious workflows: tearing down databases, installing packages, running test suites, and deploying code. Automation is the bridge between writing software and maintaining scalable systems.",
        codeSnippet: `#!/bin/bash
# A simple automation script (deploy.sh)

echo "Starting deployment process..."
git pull origin main

echo "Installing isolated dependencies..."
npm ci

echo "Running test suite..."
npm test

echo "Restarting server container..."
docker restart web_server_1`,
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "The Git command that integrates changes from one branch into another by rewriting the commit history into a clean, linear progression is called git _______.",
      answer: "rebase",
    },
  },

  {
    id: 5,
    title: "2.5 Full-Stack Synthesis: The 'Why' Behind the Architecture",
    briefing: {
      coreConcept: "System Cohesion",
      latencyImpact: "Architectural Decision Making",
      prerequisite: "2.4 Enterprise Workflow",
    },
    steps: [
      {
        label: "2.5.1",
        subtitle: "Why Reactive State Over Manual DOM Manipulation",
        icon: "bank",
        markdownContent: `
You aren't just choosing React or Vue because they're popular; you're choosing them because **manual DOM manipulation doesn't scale to human complexity**.

### The Why
In the early web, developers wrote line-by-line instructions: "find this div, change its text, now find that span, hide it." This worked for simple pages but collapsed catastrophically as applications grew. A single variable change might require updating fifteen different DOM elements scattered across the codebase. Miss one, and the UI silently desynchronizes from the underlying data.

**Reactive state flips this model entirely.** Instead of the UI being something you *push updates to*, it becomes something that *pulls from a single source of truth*. When your data changes—whether from a user clicking a button, a WebSocket message arriving, or an API response resolving—the framework automatically reconciles what the screen should show.

**Key takeaway:** Reactive frameworks eliminate an entire category of bugs (UI-data desynchronization) by making it architecturally impossible. The screen is never "wrong" because it has no independent existence—it is a pure derivation of state.
`,
      },
      {
        label: "2.5.2",
        subtitle: "Why Middlewares Over Inline Route Logic",
        icon: "network",
        markdownContent: `
You aren't just adding middleware functions for ceremony; you're building a **layered defense and processing pipeline** that prevents your route handlers from becoming monolithic nightmares.

### The Why
Without middlewares, every single route handler must independently remember to parse JSON, validate authentication tokens, check permissions, log the request, and handle errors—before it even starts its actual business logic. This creates a codebase where the same five lines of authentication logic are copy-pasted across forty different endpoints. When a security vulnerability is discovered in that logic, you must hunt down and fix all forty copies.

**Middlewares solve this through separation of concerns at the request level.** The authentication middleware doesn't know or care what the final route does. The JSON parser doesn't need to know who the user is. Each middleware handles exactly one cross-cutting concern, then hands control to the next layer.

**Key takeaway:** Middlewares transform your server from a collection of isolated, redundant handlers into a pipeline where requests flow through standardized, reusable processing stages. This isn't just cleaner code—it means security policies are enforced uniformly by architecture, not by developer memory.
`,
      },
      {
        label: "2.5.3",
        subtitle: "Why Transactions Over Naive Sequential Queries",
        icon: "shield",
        markdownContent: `
You aren't just wrapping queries in transactions for academic correctness; you're defending against **partial failure states** that corrupt your data permanently.

### The Why
Consider a naive bank transfer without transactions:
1. Deduct \$100 from Account A. (Success)
2. Add \$100 to Account B. (Fails—database crashes mid-query)

Your system has now destroyed \$100. The money left Account A but never arrived at Account B. Even worse, this corruption is now permanently stored. No error message can recover that lost data.

**Transactions solve this by treating multi-step operations as atomic units.** The database guarantees that either every query in the transaction succeeds, or every single one is rolled back as if nothing happened. This is not a performance optimization—it is the difference between a system that can fail safely and one that silently corrupts data.

**Key takeaway:** Transactions are not optional ceremony. They are the fundamental mechanism that makes databases trustworthy. Without them, any multi-step operation is gambling with data integrity. The moment you have two related queries, you have a transaction boundary—even if you haven't explicitly coded one yet.
`,
      },
      {
        label: "2.5.4",
        subtitle: "Why Environment Isolation Over Local Development",
        icon: "server",
        markdownContent: `
You aren't just containerizing applications to follow DevOps trends; you're eliminating **environmental drift**—the silent killer of deployment reliability.

### The Why
The "it works on my machine" problem is not a joke; it's a symptom of a fundamental engineering failure. Your laptop has Python 3.11, but production runs 3.9. Your machine has a global npm package that a script accidentally depends on. Your version of OpenSSL handles certificates slightly differently. Every single one of these invisible differences is a potential production outage waiting to happen.

**Containerization and dependency locking solve this by making the environment part of the code itself.** Your Dockerfile and lockfile are not deployment scripts—they are machine-readable guarantees. They declare: "This application shall run with exactly Node 18.17.1, with exactly these 247 packages at exactly these versions." No ambiguity. No drift.

**Key takeaway:** Environment isolation transforms deployment from a hopeful transfer of code into a deterministic reproduction of a known-good state. The same container that passed tests on your machine will behave identically in production because it *is* the same container—not a similar one, not a compatible one, but a byte-for-byte identical execution environment.
`,
      },
      {
        label: "2.5.5",
        subtitle: "The Full-Stack Cohesion Principle",
        icon: "network",
        markdownContent: `
Having examined each layer in isolation, we can now state the unifying principle that separates full-stack engineering from simply knowing multiple technologies.

### The Cohesion Principle
**Every architectural decision at one layer of the stack must anticipate the failure modes of the layers above and below it.**

- Your frontend state management (2.1) must gracefully degrade when the API returns errors, not crash with unhandled promise rejections.
- Your backend middlewares (2.2) must validate data before it ever reaches the database, because the database's constraints are the last line of defense—not the first.
- Your database transactions (2.3) must assume that the server process could crash mid-query, because operating systems don't send courtesy notifications before killing processes.
- Your deployment pipeline (2.4) must ensure that the exact same code that ran integration tests is what reaches production, because any divergence invalidates the entire testing effort.

**Key takeaway:** Full-stack engineering is not about knowing React, Express, MongoDB, and Docker. It's about understanding that these are not four separate tools—they are four layers of a single system, and the weakness of any one layer will eventually expose the weaknesses of all the others. The stack is only as reliable as its least-cohesive interface.
`,
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "A full-stack application processes a payment: the frontend displays a confirmation, the backend validates the request, and the database deducts the amount. Mid-transaction, the server crashes. Which architectural principle, when properly implemented across the stack, prevents data corruption in this scenario?",
      options: [
        "Reactive state management on the frontend",
        "Middleware-based request validation",
        "Atomic database transactions with proper error propagation",
        "Docker containerization of the server",
      ],
      answer: 2,
    },
  },
];
