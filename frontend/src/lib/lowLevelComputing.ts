import { Lesson } from "@/lib/types";

export const lowLevelComputing: Lesson[] = [
  {
    id: "5.1",
    title: "5.1 CPU Execution & Registers",
    briefing: {
      description:
        "How the brain of the computer (the CPU) physically executes your code using the Fetch-Decode-Execute cycle.",
      realWorldAnalogy:
        "The CPU is a Chef. Your Hard Drive is the grocery store (slow). The RAM is the kitchen fridge (faster). The CPU Cache is the kitchen counter. The CPU Registers are the Chef's actual hands.",
      usedByText:
        "Understanding this helps systems engineers write code that plays nicely with hardware caches to achieve microsecond performance.",
      usedByCompany: "Intel Chip Designers • C++ Game Engine Devs",
    },
    steps: [
      {
        label: "5.1.1",
        subtitle: "The Hardware Hierarchy",
        icon: "server",
        markdownContent:
          "The CPU cannot do math directly on the Hard Drive or the RAM. It must pull data all the way up into its **Registers**.\n\n" +
          "Registers are microscopic memory slots built directly into the processor. A 64-bit computer literally means its registers can hold 64 bits of data at exactly one time.",
        codeSnippet:
          "// High-level code:\n" +
          "let x = 5 + 2;\n\n" +
          "/* \n" +
          "  What the CPU actually does (Assembly):\n" +
          "  1. FETCH: Grab '5' from RAM, put it in Register A\n" +
          "  2. FETCH: Grab '2' from RAM, put it in Register B\n" +
          "  3. EXECUTE: ALU (Arithmetic Logic Unit) adds A + B\n" +
          "  4. STORE: Put the result '7' back into RAM\n" +
          "*/",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "What is the absolute fastest, smallest type of memory located directly inside the CPU core?",
      options: ["RAM", "L3 Cache", "Registers", "Solid State Drive"],
      answer: 2,
    },
  },
  {
    id: "5.2",
    title: "5.2 Floating Point Numbers",
    briefing: {
      description:
        "How computers attempt to store decimals using 1s and 0s, and why they are fundamentally inaccurate.",
      realWorldAnalogy:
        "Try writing the fraction 1/3 as a standard decimal. You get 0.3333... repeating forever. You eventually have to stop writing and round it off. Computers have the exact same problem with certain numbers in binary.",
      usedByText:
        "Crucial for financial applications where a floating-point rounding error could cost a company millions of dollars.",
      usedByCompany: "Stripe Payment Processing • Banking Software",
    },
    steps: [
      {
        label: "5.2.1",
        subtitle: "The 0.1 + 0.2 Problem",
        icon: "shield",
        markdownContent:
          "Computers use the **IEEE 754** standard to store decimals. Because a computer only has a limited number of bits (like 64 bits) to store an infinite number of decimals, it has to round off the binary translation.\n\n" +
          "This is why you should **never** use floating-point numbers to calculate money.",
        codeSnippet:
          "// The most famous bug in computer science:\n" +
          "console.log(0.1 + 0.2);\n" +
          "// Outputs: 0.30000000000000004\n\n" +
          "// FIX: When dealing with money, convert to integers (cents) first.\n" +
          "let priceCents = 10 + 20;\n" +
          "console.log(priceCents / 100); // Outputs perfectly: 0.3",
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "Because floating-point numbers create rounding errors, financial applications store money as whole ________ (like cents) before doing math.",
      answer: "integers",
    },
  },
];
