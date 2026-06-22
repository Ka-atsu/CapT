import { Lesson } from "@/lib/types";

export const csFundamentals: Lesson[] = [
  {
    id: "1.1",
    title: "1.1 Big-O & Algorithmic Complexity",
    briefing: {
      description:
        "Big-O notation is an engineering language used to describe how much a piece of code slows down or uses memory as your dataset gets larger.",
      realWorldAnalogy:
        "Looking up a page number via an alphabetical index is near-instant O(1), while reading every single page from cover to cover to find a word scales linearly as O(n).",
      usedByText:
        "Engineers profile code complexity to ensure a search routine that works for 100 items won't freeze the system when dealing with millions of users.",
      usedByCompany: "Google Search Core • Database Query Optimizers",
    },
    steps: [
      {
        label: "1.1.1",
        subtitle: "The Concept of Scaling (n)",
        icon: "server",
        markdownContent:
          "In Big-O, the letter **$n$** stands for the size of your input dataset (e.g., the number of items in an array).\n\n" +
          "When analyzing logic, we always assume the **worst-case scenario** (e.g., the item we are searching for is located at the absolute end of our collection, forcing our loop to run entirely to completion).\n\n" +
          "### Common Complexities:\n" +
          "* **$O(1)$ - Constant Time:** Takes the same number of steps regardless of size.\n" +
          "* **$O(n)$ - Linear Time:** Number of structural steps scales 1-to-1 with input size.\n" +
          "* **$O(n^2)$ - Quadratic Time:** Features nested loops, causing computation steps to multiply dangerously.",
        codeSnippet:
          "// Example of O(n) Linear Time scaling\n" +
          "function printAllItems(items) {\n" +
          "  for (let i = 0; i < items.length; i++) {\n" +
          "    console.log(items[i]);\n" +
          "  }\n" +
          "}",
      },
      {
        label: "1.1.2",
        subtitle: "Spotting Nested Loops O(n²)",
        icon: "network",
        markdownContent:
          "The easiest way for a beginner to spot an inefficient **$O(n^2)$** algorithm is to look for a **loop running inside another loop** over the same dataset.\n\n" +
          "If the outer loop runs $n$ times, and for *each* of those iterations the inner loop also runs $n$ times, your computer performs $n \\times n$ total processing executions.",
        codeSnippet:
          "// Example of O(n²) Quadratic Time scaling\n" +
          "function printAllPairs(arr) {\n" +
          "  for (let i = 0; i < arr.length; i++) {\n" +
          "    for (let j = 0; j < arr.length; j++) {\n" +
          "      console.log(arr[i], arr[j]);\n" +
          "    }\n" +
          "  }\n" +
          "}",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "If your code reads an input array of size 'n' using a single, standard non-nested 'for' loop, what is its mathematical Big-O runtime complexity?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      answer: 2,
    },
  },
  {
    id: "1.2",
    title: "1.2 The Array: Contiguous Memory",
    briefing: {
      description:
        "Arrays are the most fundamental data structure. They store items in a single, solid block of physical hardware memory right next to each other.",
      realWorldAnalogy:
        "Like a daily pill organizer or a row of numbered lockers. Because they are physically attached in a straight line, you can jump straight to Wednesday's pill without opening Monday or Tuesday.",
      usedByText:
        "Because arrays are physically grouped together, CPUs can read them incredibly fast using hardware-level caching.",
      usedByCompany: "Image Pixel Buffers • Video Game Inventories",
    },
    steps: [
      {
        label: "1.2.1",
        subtitle: "Instant Reading: O(1)",
        icon: "server",
        markdownContent:
          "Because an array is a continuous block, the computer doesn't need to search for an item. If it knows where the array starts, it uses simple math to jump directly to any index.\n\n" +
          "This means grabbing the 1st item or the 1,000,000th item takes the exact same amount of time: **$O(1)$ Constant Time**.",
        codeSnippet:
          "const highScores = [99, 85, 42, 12, 5];\n\n" +
          "// The CPU instantly calculates the physical address of index 2.\n" +
          "// It does NOT read index 0 or 1 first.\n" +
          "console.log(highScores[2]); // Outputs: 42",
      },
      {
        label: "1.2.2",
        subtitle: "The Cost of Shifting: O(n)",
        icon: "network",
        markdownContent:
          "Arrays have one major weakness. Because the memory is packed tightly, you cannot just squeeze a new item into the beginning.\n\n" +
          "To insert a new item at index `[0]`, the computer must physically copy and shift every single other item one space to the right to make room. If you have a million items, that is a million slow operations: **$O(n)$ Linear Time**.",
        codeSnippet:
          "const queue = ['Alice', 'Bob', 'Charlie'];\n\n" +
          "// This looks simple, but under the hood it is very slow!\n" +
          "// Bob and Charlie must physically move to new memory slots.\n" +
          "queue.unshift('Zack'); ",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "Why is inserting a new element at the very beginning of a large array considered a slow O(n) operation?",
      options: [
        "The computer has to reboot its memory cache.",
        "Every existing element must be shifted over to make room.",
        "Arrays cannot hold more than 100 items.",
        "It requires a nested loop to execute.",
      ],
      answer: 1,
    },
  },
  {
    id: "1.3",
    title: "1.3 Linked Lists: Following the Clues",
    briefing: {
      description:
        "Linked Lists solve the shifting problem of arrays by scattering data wherever there is free space, connecting them via a trail of pointers.",
      realWorldAnalogy:
        "A scavenger hunt. House A doesn't have the treasure; it just has a note saying 'Go to House B'. You have to walk to House B to find the note pointing to House C.",
      usedByText:
        "Used when a system needs to constantly add and remove items from the middle of a list without shifting millions of other records.",
      usedByCompany: "Blockchain Ledgers • Browser Back/Forward Buttons",
    },
    steps: [
      {
        label: "1.3.1",
        subtitle: "Nodes and Pointers",
        icon: "network",
        markdownContent:
          "Instead of a solid block of memory, a Linked List is made of isolated **Nodes**.\n\n" +
          "Each node holds two things:\n" +
          "1. **The Value:** The actual data you want to store.\n" +
          "2. **The Pointer:** The physical memory address of the *next* node in the chain.",
        codeSnippet:
          "// A simple representation of a Linked List node\n" +
          "const node1 = { value: 'Apple', next: null };\n" +
          "const node2 = { value: 'Banana', next: null };\n\n" +
          "// Linking them together\n" +
          "node1.next = node2; ",
      },
      {
        label: "1.3.2",
        subtitle: "The Trade-Off",
        icon: "shield",
        markdownContent:
          "Linked Lists are the exact opposite of Arrays when it comes to speed.\n\n" +
          "* **Inserting is Fast ($O(1)$):** You just change a single pointer to point to a new node. No shifting required!\n" +
          "* **Reading is Slow ($O(n)$):** You cannot jump straight to item #50. You must start at item #1 and follow the trail of clues 50 times to get there.",
        codeSnippet:
          "// To insert a new head, you just change one clue.\n" +
          "function insertAtBeginning(oldHead, newValue) {\n" +
          "  const newNode = { value: newValue, next: oldHead };\n" +
          "  return newNode; // The new node is now the start of the hunt\n" +
          "}",
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "While an array can jump instantly to an item, a Linked List must perform a linear ________ from the beginning to find a specific node.",
      answer: "search",
    },
  },
  {
    id: "1.4",
    title: "1.4 Stacks & Queues: Controlled Access",
    briefing: {
      description:
        "Stacks and Queues are simple rulesets placed on top of arrays or linked lists to strictly control how items are added and removed.",
      realWorldAnalogy:
        "A Stack is a pile of cafeteria plates (you take the top one). A Queue is a line at a coffee shop (first person in line gets served first).",
      usedByText:
        "These structures prevent data chaos by ensuring operations happen in a highly predictable, ordered sequence.",
      usedByCompany: "Operating System Task Schedulers • Undo/Redo Features",
    },
    steps: [
      {
        label: "1.4.1",
        subtitle: "The Stack (LIFO)",
        icon: "bank",
        markdownContent:
          "A **Stack** follows the rule of **Last-In, First-Out (LIFO)**. You can only interact with the absolute top of the pile.\n\n" +
          "* **Push:** Add an item to the top.\n" +
          "* **Pop:** Remove the item from the top.",
        codeSnippet:
          "const textEditorHistory = [];\n\n" +
          "textEditorHistory.push('Typed Hello');\n" +
          "textEditorHistory.push('Typed World');\n\n" +
          "// The user presses 'Undo'\n" +
          "const undoneAction = textEditorHistory.pop(); \n" +
          "console.log(undoneAction); // Outputs: 'Typed World'",
      },
      {
        label: "1.4.2",
        subtitle: "The Queue (FIFO)",
        icon: "network",
        markdownContent:
          "A **Queue** enforces fairness. It follows the rule of **First-In, First-Out (FIFO)**. Items enter at the back and are processed from the front.",
        codeSnippet:
          "const printerQueue = [];\n\n" +
          "printerQueue.push('TaxReturn.pdf'); // Added to back\n" +
          "printerQueue.push('Meme.png');\n\n" +
          "// The printer finishes a job\n" +
          "const nextToPrint = printerQueue.shift(); // Removed from front\n" +
          "console.log(nextToPrint); // Outputs: 'TaxReturn.pdf'",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "If you push three items onto a Stack in the order [A, B, C], which item will be returned first when you perform a single 'pop' operation?",
      options: ["A", "B", "C", "None of them"],
      answer: 2,
    },
  },
  {
    id: "1.5",
    title: "1.5 Hash Tables: The Ultimate Shortcut",
    briefing: {
      description:
        "Hash Tables store data using Key-Value pairs, allowing you to bypass searching entirely and find data instantly.",
      realWorldAnalogy:
        "Like a coat check room at a theater. You give them your coat, they give you a unique ticket number. When you return, you show the ticket and get your exact coat back instantly without searching the whole room.",
      usedByText:
        "Whenever a system needs to look up a specific user, product, or session token out of millions of records in a fraction of a millisecond.",
      usedByCompany: "Redis Caching • User Session Managers",
    },
    steps: [
      {
        label: "1.5.1",
        subtitle: "The Hash Function Magic",
        icon: "shield",
        markdownContent:
          "How does a Hash Table achieve **$O(1)$** instant lookups without scanning through a list?\n\n" +
          "It uses a **Hash Function**. When you provide a text key (like `'alice99'`), this mathematical function scrambles the text and converts it into a specific memory index number (like `4`).\n\n" +
          "The computer then goes directly to memory slot `4`. No loops. No searching.",
        codeSnippet:
          "// JavaScript Objects act natively as Hash Tables under the hood\n" +
          "const database = {\n" +
          "  'alice99': { role: 'Admin', age: 28 },\n" +
          "  'bob_dev': { role: 'User', age: 34 }\n" +
          "};\n\n" +
          "// The engine hashes 'alice99' and jumps straight to her data.\n" +
          "console.log(database['alice99'].role); // Outputs: 'Admin'",
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "A hash table achieves constant-time lookup by passing a string key through a ________ function to instantly compute its exact memory address.",
      answer: "hash",
    },
  },
];
