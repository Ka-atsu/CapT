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
];
