import { Lesson } from "@/lib/types";

export const advancedAlgorithms: Lesson[] = [
  {
    id: "4.1",
    title: "4.1 Bitwise Operations",
    briefing: {
      description: "Bitwise operations allow you to manipulate data at the lowest possible level: the individual 1s and 0s inside the CPU.",
      realWorldAnalogy: "Imagine a row of 8 light switches. Instead of saying 'turn on the lights for the living room' (high-level), bitwise operations let you say 'flip switch #3 up, and invert switch #7.'",
      usedByText: "Used in cryptography, graphics programming, and extremely memory-constrained systems to pack multiple true/false values into a single number.",
      usedByCompany: "Cryptography Engines • Hardware Drivers",
    },
    steps: [
      {
        label: "4.1.1",
        subtitle: "AND, OR, and XOR",
        icon: "network",
        markdownContent:
          "Computers use logic gates to compare bits:\n\n" +
          "* **AND (`&`)**: Only outputs `1` if BOTH bits are `1`.\n" +
          "* **OR (`|`)**: Outputs `1` if AT LEAST ONE bit is `1`.\n" +
          "* **XOR (`^`)**: Outputs `1` if the bits are DIFFERENT. (Extremely useful for toggling states).",
        codeSnippet:
          "// Comparing 5 (0101) and 3 (0011) in binary\n\n" +
          "console.log(5 & 3); // AND: Outputs 1 (0001)\n" +
          "console.log(5 | 3); // OR:  Outputs 7 (0111)\n" +
          "console.log(5 ^ 3); // XOR: Outputs 6 (0110)",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt: "Which bitwise operator outputs a '1' ONLY when the two compared bits are completely different?",
      options: ["AND (&)", "OR (|)", "XOR (^)", "NOT (~)"],
      answer: 2,
    },
  },
  {
    id: "4.2",
    title: "4.2 NP-Complete & Approximations",
    briefing: {
      description: "NP-Complete problems are famous computer science puzzles that are incredibly easy to verify, but currently impossible to solve quickly as the dataset grows.",
      realWorldAnalogy: "The Traveling Salesman Problem: Imagine being a delivery driver who must hit 50 different cities. Checking if a given route is under 500 miles is instant. But calculating the *absolute shortest* possible route out of all trillions of combinations would take a supercomputer millions of years.",
      usedByText: "When engineers face these problems, they don't try to find the 'perfect' answer. They use Approximation Algorithms to find a 'good enough' answer very quickly.",
      usedByCompany: "Amazon Delivery Logistics • UPS Route Planners",
    },
    steps: [
      {
        label: "4.2.1",
        subtitle: "P vs. NP",
        icon: "shield",
        markdownContent:
          "This is a million-dollar math prize concept:\n\n" +
          "* **P (Polynomial Time):** Problems a computer can *solve* quickly (like sorting an array).\n" +
          "* **NP (Nondeterministic Polynomial):** Problems a computer can *verify* quickly, but we don't know how to solve quickly yet.\n\n" +
          "If anyone ever proves that P = NP, it would break all modern encryption overnight, because guessing passwords would become as easy as verifying them.",
        codeSnippet:
          "// You will rarely code an NP-Complete solver from scratch.\n" +
          "// Instead, you use Heuristics (educated guesses).\n" +
          "// Example: 'Nearest Neighbor' for the Traveling Salesman.\n" +
          "function getApproximateShortestRoute(cities) {\n" +
          "  // Just go to the closest city next. It's not perfect,\n" +
          "  // but it's incredibly fast (O(n^2) instead of O(n!))\n" +
          "}",
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt: "Because NP-Complete problems take too long to solve perfectly, engineers use ________ algorithms to find a 'good enough' solution quickly.",
      answer: "approximation",
    },
  }
];