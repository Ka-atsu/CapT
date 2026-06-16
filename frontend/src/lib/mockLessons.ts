import { Lesson } from "@/lib/types";

export const mockLessons: Lesson[] = [
  {
    id: 1,
    title: "1.1 Git Internals & State",
    briefing: {
      coreConcept: "The Three-Tree Architecture",
      latencyImpact: "Local Data Integrity",
      prerequisite: "Basic Command Line Navigation",
    },
    steps: [
      {
        label: "Component A",
        subtitle: "The Working Directory",
        markdownContent:
          "This is your physical sandbox. When you create or edit a file in your code editor, it exists here. Git sees these changes as 'untracked' or 'modified'. If you delete a file here without committing, it's gone forever.",
      },
      {
        label: "Component B",
        subtitle: "The Staging Area (Index)",
        markdownContent:
          "When you run `git add`, you are moving files into the Staging Area. Think of this as the loading dock. You are grouping specific changes together to prepare them for a single, logical snapshot. It allows you to commit three specific files while leaving a messy fourth file behind.",
      },
      {
        label: "Component C",
        subtitle: "The Local Repository",
        markdownContent:
          "Running `git commit` takes everything on the loading dock and permanently freezes it into a 'Commit Object' (a SHA-1 hash) inside the `.git` folder. This is now a permanent, restorable point in your local history.",
      },
      {
        label: "Component D",
        subtitle: "The Remote Upstream",
        markdownContent:
          "Running `git push` syncs your local `.git` history with a remote server (like GitHub). This is the final step that makes your code accessible to the rest of your 15-person engineering team.",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "Which internal Git mechanism acts as a 'loading dock' where you group specific changes before permanently freezing them into history?",
      options: [
        "The Remote Upstream",
        "The Staging Area",
        "The Working Directory",
        "The SHA-1 Hash",
      ],
      answer: 1,
    },
  },
  {
    id: 2,
    title: "1.2 Branching Workflows",
    briefing: {
      coreConcept: "Trunk-Based Development",
      latencyImpact: "Minimal Merge Conflicts",
      prerequisite: "1.1 Git Internals & State",
    },
    steps: [
      {
        label: "Component A",
        subtitle: "The Main Trunk",
        markdownContent:
          "The `main` branch represents the official, deployable state of your application. In Trunk-Based Development, this branch is sacred. Direct commits are blocked, and it must always be in a healthy, buildable state.",
      },
      {
        label: "Component B",
        subtitle: "Short-Lived Feature Branches",
        markdownContent:
          "When an engineer builds a feature, they cut a branch from `main`. Unlike GitFlow (where branches live for weeks), these feature branches are designed to be extremely short-lived—often merged back within 24 to 48 hours to prevent massive integration nightmares.",
      },
      {
        label: "Component C",
        subtitle: "Feature Flags (Toggles)",
        markdownContent:
          "Because we merge code every day, we use Feature Flags. This allows developers to safely merge half-finished code into the `main` trunk without users seeing it. The code runs in production, but the UI is hidden behind a boolean toggle.",
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "To safely merge incomplete code into production without exposing it to users, engineers wrap the new logic in a Feature _____.",
      answer: "flag",
    },
  },
  {
    id: 3,
    title: "1.3 Continuous Integration (CI)",
    briefing: {
      coreConcept: "Automated Code Verification",
      latencyImpact: "Pipeline Blocking",
      prerequisite: "1.2 Branching Workflows",
    },
    steps: [
      {
        label: "Component A",
        subtitle: "The Pull Request (PR)",
        markdownContent:
          "An engineer finishes their work on a feature branch and opens a Pull Request against `main`. This signals the team that the code is ready for review, instantly triggering the CI pipeline.",
      },
      {
        label: "Component B",
        subtitle: "The Linter & Formatter",
        markdownContent:
          "The CI server boots up a temporary container and runs a linter (like ESLint). It scans the code for syntax errors, unused variables, and formatting violations. If the code is messy, the pipeline fails immediately.",
      },
      {
        label: "Component C",
        subtitle: "The Automated Test Suite",
        markdownContent:
          "If the linter passes, the CI server executes the Unit and Integration tests. It checks the new code against the existing codebase to ensure no older features (regressions) were accidentally broken.",
      },
      {
        label: "Component D",
        subtitle: "The Merge Block",
        markdownContent:
          "If any test fails, the CI pipeline sends a rejection signal to GitHub. The 'Merge' button is physically disabled, completely protecting the `main` trunk from broken code.",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "What is the primary purpose of a Continuous Integration (CI) test suite?",
      options: [
        "To compile the code into machine language",
        "To automatically deploy the code to AWS",
        "To prevent broken or unformatted code from merging into the main branch",
        "To generate documentation for the API",
      ],
      answer: 2,
    },
  },
];
