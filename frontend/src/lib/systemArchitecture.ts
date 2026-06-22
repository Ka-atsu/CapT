import { Lesson } from "@/lib/types";

export const systemArchitecture: Lesson[] = [
  {
    id: "3.1",
    title: "3.1 Recursion & Dynamic Programming",
    briefing: {
      description:
        "Dynamic Programming (DP) is a method for solving complex problems by breaking them down into smaller sub-problems, and saving those answers to avoid redundant work.",
      realWorldAnalogy:
        "Recursion is like looking up a word in a dictionary, finding a word you don't know in the definition, and looking *that* up. Dynamic Programming is simply writing down the definitions on a notepad so you never have to look up the same word twice.",
      usedByText:
        "Used extensively in route optimization, string matching (like spell checkers), and AI decision trees.",
      usedByCompany: "Google Maps Routing • DNA Sequence Alignment",
    },
    steps: [
      {
        label: "3.1.1",
        subtitle: "The Danger of Pure Recursion",
        icon: "network",
        markdownContent:
          "A recursive function is simply a function that calls itself. \n\n" +
          "While elegant, pure recursion can be incredibly dangerous. If you ask a function to calculate the 50th Fibonacci number purely recursively, it will spawn trillions of duplicate calculations and crash your call stack.",
        codeSnippet:
          "// Pure Recursion (Extremely Slow - O(2^n))\n" +
          "function fib(n) {\n" +
          "  if (n <= 2) return 1;\n" +
          "  // This recalculates the same numbers millions of times!\n" +
          "  return fib(n - 1) + fib(n - 2);\n" +
          "}",
      },
      {
        label: "3.1.2",
        subtitle: "Dynamic Programming (Memoization)",
        icon: "shield",
        markdownContent:
          "To fix recursion, we introduce **Memoization** (a core Dynamic Programming concept).\n\n" +
          "We pass a `memo` object (usually a Hash Map) into the function. Before doing any math, the function checks if the answer is already in the `memo`. If it is, it returns the answer instantly in **$O(1)$** time. This drops the runtime from millions of years down to milliseconds.",
        codeSnippet:
          "// Dynamic Programming (Lightning Fast - O(n))\n" +
          "function fibDP(n, memo = {}) {\n" +
          "  if (n in memo) return memo[n]; // Instant lookup!\n" +
          "  if (n <= 2) return 1;\n" +
          "  \n" +
          "  // Save the answer for later before returning it\n" +
          "  memo[n] = fibDP(n - 1, memo) + fibDP(n - 2, memo);\n" +
          "  return memo[n];\n" +
          "}",
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "The Dynamic Programming technique of storing the results of expensive function calls to avoid repeating them is known as ________.",
      answer: "memoization",
    },
  },
  {
    id: "3.2",
    title: "3.2 Concurrency: Threads & Processes",
    briefing: {
      description:
        "Concurrency is how modern CPUs handle executing multiple tasks at what appears to be the exact same time.",
      realWorldAnalogy:
        "A **Process** is a restaurant kitchen (it has its own space and ingredients). A **Thread** is a chef inside that kitchen. You can have multiple chefs (threads) chopping different vegetables at the same time, sharing the same kitchen (memory).",
      usedByText:
        "Web servers use threads to handle thousands of incoming user requests simultaneously without freezing the application.",
      usedByCompany: "Chrome Tab Processing • Nginx Web Servers",
    },
    steps: [
      {
        label: "3.2.1",
        subtitle: "Processes vs. Threads",
        icon: "server",
        markdownContent:
          "**Processes** are isolated programs. If you open Spotify and Google Chrome, they are separate processes. If Spotify crashes, Chrome doesn't care because they have completely isolated memory bounds.\n\n" +
          "**Threads** live *inside* a process. If Chrome opens 10 tabs, those are threads. Because threads share the same memory space, they are extremely fast to spin up, but if one thread fatally crashes, it can take down the whole process.",
        codeSnippet:
          "// Conceptual representation of Concurrency issues\n" +
          "let bankBalance = 100;\n\n" +
          "// If Thread A and Thread B run this exactly at the same millisecond,\n" +
          "// they might both read '100', both add '50', and both save '150'.\n" +
          "// $50 disappears into the void! This is a 'Race Condition'.\n" +
          "function deposit(amount) {\n" +
          "  let current = bankBalance;\n" +
          "  bankBalance = current + amount;\n" +
          "}",
      },
      {
        label: "3.2.2",
        subtitle: "Locks and Deadlocks",
        icon: "shield",
        markdownContent:
          "To prevent Race Conditions, operating systems use **Mutexes (Locks)**. When a thread accesses a shared variable, it 'locks' it. All other threads must wait in line until the lock is released.\n\n" +
          "However, if Thread A locks resource 1 and waits for resource 2, while Thread B locks resource 2 and waits for resource 1, they will wait forever. This system freeze is called a **Deadlock**.",
        codeSnippet:
          "// Preventing race conditions requires explicit hardware/OS locks\n" +
          "mutex.lock();\n" +
          "try {\n" +
          "  // Only ONE thread can execute this code at a time\n" +
          "  processBankTransaction();\n" +
          "} finally {\n" +
          "  mutex.unlock(); // Safe for the next thread to enter\n" +
          "}",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "If two concurrent threads are frozen indefinitely because they are both waiting for a resource locked by the other, the system has entered a state of:",
      options: ["Race Condition", "Deadlock", "Asynchrony", "Memoization"],
      answer: 1,
    },
  },
  {
    id: "3.3",
    title: "3.3 Hardware Caching (LRU)",
    briefing: {
      description:
        "Caches are microscopic, incredibly fast memory chips built directly into the CPU. They store the most frequently used data to bypass slow RAM.",
      realWorldAnalogy:
        "Your hard drive is a filing cabinet in the basement (huge, but slow). Your RAM is your bookshelf. Your Cache is your physical desk. You only keep the papers you are currently working on right on your desk.",
      usedByText:
        "Databases and browsers use caching to store recent queries so they don't have to fetch data over the internet twice.",
      usedByCompany: "Redis • Hardware CPU Architecture",
    },
    steps: [
      {
        label: "3.3.1",
        subtitle: "The LRU Eviction Policy",
        icon: "bank",
        markdownContent:
          "Because Cache memory is extremely expensive, it is very small. When the cache gets full, the system must decide what to delete to make room for new data.\n\n" +
          "The industry standard algorithm is **LRU (Least Recently Used)**. The computer keeps a timestamp of every data access. When space is needed, it ruthlessly deletes whichever item hasn't been touched in the longest amount of time.",
        codeSnippet:
          "// LRU Caches are often implemented using a Hash Map paired with a Doubly-Linked List\n" +
          "class LRUCache {\n" +
          "  get(key) {\n" +
          "    if (this.cache.has(key)) {\n" +
          "      this.markAsRecentlyUsed(key); // Move to front of the line\n" +
          "      return this.cache.get(key);\n" +
          "    }\n" +
          "    return -1;\n" +
          "  }\n" +
          "}",
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "When a cache reaches its maximum capacity, the ________ Recently Used algorithm evicts the data that has gone the longest without being accessed.",
      answer: "Least",
    },
  },
  {
    id: "3.4",
    title: "3.4 Network Packets & Protocols",
    briefing: {
      description:
        "Networking dictates how data moves physically across copper wires, fiber optics, and servers around the globe.",
      realWorldAnalogy:
        "TCP is sending a registered package via FedEx where you get a signature confirming delivery. UDP is standing on a roof and throwing 100 postcards into the wind, hoping the recipient catches them.",
      usedByText:
        "Engineers choose protocols based on whether an application prioritizes perfect data integrity or raw, uninterrupted speed.",
      usedByCompany: "Multiplayer Game Engines • Video Streaming CDNs",
    },
    steps: [
      {
        label: "3.4.1",
        subtitle: "The Transport Layer (TCP vs UDP)",
        icon: "network",
        markdownContent:
          "Data sent over the internet is sliced into tiny chunks called **Packets**.\n\n" +
          "* **TCP (Transmission Control Protocol):** Extremely reliable. It numbers every packet. If packet #4 gets lost, the receiver tells the server to halt and resend packet #4 before proceeding. Used for Webpages, Emails, and Banking.\n" +
          "* **UDP (User Datagram Protocol):** Extremely fast. It blasts packets continuously without checking if they arrived. If packet #4 drops, it is gone forever. Used for Live Video Calls and Multiplayer Gaming.",
        codeSnippet:
          "// If you are building a real-time game, you want UDP.\n" +
          "// It doesn't matter where a player was 2 seconds ago (dropped packet).\n" +
          "// You only care where they are RIGHT NOW.\n" +
          "server.on('packet_received', (data) => {\n" +
          "  renderPlayerPosition(data.x, data.y);\n" +
          "});",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "Which network transport protocol requires a strict 'handshake' and guarantees that every single packet is delivered in the correct order?",
      options: ["HTTP", "UDP", "TCP", "IP"],
      answer: 2,
    },
  },
];
