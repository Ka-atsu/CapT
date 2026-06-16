import { Lesson } from "@/lib/types";

export const csFundamentals: Lesson[] = [
  {
    id: 1,
    title: "1.1 Algorithmic Execution & Logic",
    briefing: {
      coreConcept: "Execution Flow",
      latencyImpact: "Runtime Efficiency",
      prerequisite: "Basic Computer Literacy",
    },
    steps: [
      {
        label: "1.1.1",
        subtitle: "Variable Lifecycles",
        icon: "bank",
        markdownContent:
          "Variables are not permanent fixtures in your code; they occupy physical space in your computer's RAM. Understanding a variable's lifecycle is the first step to writing crash-resistant software.\n\n" +
          "### The Three Phases of Memory\n" +
          "| Phase | Action | Under the Hood |\n" +
          "| :--- | :--- | :--- |\n" +
          "| **1. Allocation (Birth)** | Declaring the variable. | The OS reserves a specific block of physical RAM for your data. |\n" +
          "| **2. Usage (Life)** | Reading/Writing data. | The CPU accesses that specific RAM address to perform logic. |\n" +
          "| **3. Deallocation (Death)** | Variable goes out of scope. | Memory is freed up so other programs can use it. |\n\n" +
          "In modern languages (JavaScript, Python), a **Garbage Collector** automatically handles deallocation. In mid-level languages (C, C++), you must manually free memory. Failing to do so causes a 'Memory Leak,' eventually crashing the system.",
        codeSnippet:
          "function processPayment() {\n" +
          "  // BIRTH: Memory is physically allocated for 'receipt'\n" +
          "  let receipt = { amount: 50, user: 'Alice' }; \n\n" +
          "  // LIFE: The CPU reads the variable\n" +
          "  console.log('Processing ' + receipt.amount);\n" +
          "} // DEATH: Function ends. 'receipt' goes out of scope. \n" +
          "  // The Garbage Collector sweeps it from RAM.",
      },
      {
        label: "1.1.2",
        subtitle: "Scoping Rules",
        icon: "shield",
        markdownContent: `
Scope acts as a security boundary for your variables. It dictates exactly where in your code a specific piece of data can be seen and modified. 

### Types of Scope
* **Global Scope:** Declared outside any function. Accessible from anywhere. *Dangerous because any part of the program can accidentally overwrite it.*
* **Local/Function Scope:** Declared inside a function. Invisible to the outside world. Destroyed when the function finishes running.
* **Block Scope:** Declared inside a specific '{}' block (like an 'if' statement or loop). 

**Best Practice:** Always default to the tightest scope possible (Block/Local). This prevents "Spaghetti Code" where variables are unpredictably modified by rogue functions.
`,
        codeSnippet: `const globalTax = 0.08; // Global: Visible everywhere (Use sparingly)

function calculateTotal() {
  // Local: Only exists inside this function
  let subtotal = 100; 

  if (subtotal > 50) {
    // Block: Only exists inside these brackets
    let discount = 10; 
    return (subtotal - discount) * (1 + globalTax);
  }
  
  // console.log(discount); // ERROR: 'discount' is dead here.
}`,
      },
      {
        label: "1.1.3",
        subtitle: "Complex Control Flows",
        icon: "network",
        markdownContent: `
Control flow is the brain of your algorithm, dictating how the CPU makes decisions. While beginners rely heavily on nested 'if/else' statements, professionals use structured control patterns to keep code readable and fast.

### The "Guard Clause" Pattern
A Guard Clause (or Early Return) checks for invalid data at the very top of a function and exits immediately. This prevents the "Arrow Anti-Pattern" (code that is deeply nested and visually pushed to the right).

* **Pros of Guard Clauses:**
    * Eliminates massive, hard-to-read 'if/else' blocks.
    * Frees up CPU cycles by aborting bad executions instantly.
    * Makes the "Happy Path" (the main logic) completely flat and easy to read.
`,
        codeSnippet: `// BAD: Nested "Arrow" Code
function processUser(user) {
  if (user != null) {
    if (user.hasAccount) {
      if (user.balance > 0) {
        // Finally do the logic...
      }
    }
  }
}

// GOOD: Guard Clauses (Early Returns)
function processUser(user) {
  // 1. Guard against bad data instantly
  if (user == null) return;
  if (!user.hasAccount) return;
  if (user.balance <= 0) return;

  // 2. The "Happy Path" is clean and flat
  // Execute main logic here...
}`,
      },
      {
        label: "1.1.4",
        subtitle: "Function Handling",
        icon: "server",
        markdownContent: `
In modern computer science, functions are treated as **First-Class Citizens**. This means a function is not just a static set of instructions; it is a piece of data itself. 

### First-Class Capabilities
Because functions are treated as variables, you can:
1.  **Assign them** to a variable.
2.  **Pass them** as an argument into another function (Callbacks).
3.  **Return them** out of another function.

This allows for incredibly modular, reusable architecture, heavily utilized in asynchronous networking and UI event handling.
`,
        codeSnippet: `// 1. Assigning a function to a variable
const greet = function(name) { return "Hello " + name; };

// 2. Passing a function as an argument (Callback)
function executeWithDelay(callback, delayInSeconds) {
  console.log("Waiting...");
  setTimeout(callback, delayInSeconds * 1000);
}

// We pass the 'greet' function itself, not its result!
executeWithDelay(() => console.log(greet("Alice")), 2);`,
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "The concept that determines where a variable is visible and accessible within your code is known as _______.",
      answer: "scope",
    },
  },
  {
    id: 2,
    title: "1.2 Data Structures & Performance Bounds",
    briefing: {
      coreConcept: "Memory Organization",
      latencyImpact: "Big O Scaling",
      prerequisite: "1.1 Algorithmic Execution",
    },
    steps: [
      {
        label: "1.2.1",
        subtitle: "Arrays vs Linked Lists",
        icon: "server",
        markdownContent: `
![Linked List vs Array](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Singly-linked-list.svg/500px-Singly-linked-list.svg.png)

Arrays and Linked Lists are the two foundational linear data structures. While both store collections of data, their memory allocation strategies are opposites.

### 1. The Array (Contiguous Memory)
Stores elements in **contiguous** (sequential) memory locations. The CPU can calculate exactly where any element lives instantly using its index.
* **Pro:** Instant read access.
* **Pro:** Cache-friendly (data is grouped together physically).
* **Con:** Slow to insert/delete at the beginning, because every subsequent element must be physically shifted over in RAM.

### 2. The Linked List (Scattered Memory)
Consists of "Nodes". Each node stores the data *and* a physical pointer (memory address) to the next node. They are scattered randomly across RAM.
* **Pro:** Extremely fast insertions/deletions (just change the pointer direction).
* **Pro:** Dynamic size without requiring memory reallocation.
* **Con:** Slow read access. To find the 50th element, you must traverse pointers 1 through 49 sequentially.
`,
      },
      {
        label: "1.2.2",
        subtitle: "Hash Mappings",
        icon: "bank",
        markdownContent: `
![Hash Table](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg/400px-Hash_table_3_1_1_0_1_0_0_SP.svg.png)

A Hash Map (or Dictionary) is the ultimate data structure for rapid data retrieval, storing data in **Key-Value pairs**.

### How it works (The Hash Function)
When you save data using a key (like 'alice99'), the computer doesn't just put it anywhere. It passes the string 'alice99' through a mathematical algorithm called a **Hash Function**. This function converts the text into a specific memory index (e.g., 'Index 04'). 

When you want to retrieve Alice's data later, the system runs 'alice99' through the algorithm again, gets 'Index 04', and instantly jumps to that memory slot.

* **Speed:** Lookup time is constant O(1). No looping or searching is required.
* **Collisions:** Rarely, two different keys might hash to the same index. Advanced hash maps handle this under the hood via chaining (linked lists).
`,
        codeSnippet: `// A simple Hash Map (Object/Dictionary)
const userRoles = {
  "alice99": "Admin",
  "bob_builder": "Editor",
  "charlie_x": "Viewer"
};

// Instant O(1) lookup without searching through an array
console.log(userRoles["alice99"]); // Output: Admin`,
      },
      {
        label: "1.2.3",
        subtitle: "Big O Execution Profiling",
        icon: "shield",
        markdownContent: `
![Big O Graph](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Comparison_computational_complexity.svg/500px-Comparison_computational_complexity.svg.png)

Big O Notation is the mathematical language engineers use to describe how an algorithm's speed degrades as the size of the dataset (n) grows. It measures **Worst-Case Scenario**.

### The Big O Cheat Sheet
| Notation | Name | Behavior as Data Grows | Example |
| :--- | :--- | :--- | :--- |
| **O(1)** | Constant | Time stays exactly the same. | Looking up a Hash Map key. |
| **O(log n)** | Logarithmic | Time increases very slowly. | Binary search in a sorted database. |
| **O(n)** | Linear | Time increases proportionally. | Looping through an array once. |
| **O(n²)** | Quadratic | Time explodes exponentially. | A nested loop (loop inside a loop). **Avoid!** |

**Golden Rule:** If your algorithm requires a nested loop (O(n²)) to process 1 million rows of data, it could take hours. By refactoring it to use a Hash Map, you can often reduce it to O(n), finishing in milliseconds.
`,
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "Which data structure utilizes a mathematical function to store and retrieve key-value pairs with near-instantaneous speed?",
      options: ["Linked List", "Hash Map", "Sequential Array", "Binary Tree"],
      answer: 1,
    },
  },
  {
    id: 3,
    title: "1.3 Network Interoperability",
    briefing: {
      coreConcept: "Data Transmission",
      latencyImpact: "Network Bottlenecks",
      prerequisite: "1.2 Data Structures",
    },
    steps: [
      {
        label: "1.3.1",
        subtitle: "The OSI Layers",
        icon: "network",
        markdownContent: `
![OSI Model Layers](https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Osi-model-jb.svg/400px-Osi-model-jb.svg.png)

The Open Systems Interconnection (OSI) model is the theoretical framework used to understand how computers communicate over a network. It breaks data transmission down into 7 layers.

### Key Layers for Engineers
* **Layer 7 (Application):** The software layer. Where HTTP requests, web browsers, and APIs live.
* **Layer 4 (Transport):** Determines *how* the data packets are sent across the void (TCP vs UDP).
* **Layer 3 (Network):** Handles routing and IP addresses (how a packet finds its way from New York to Tokyo).
* **Layer 1 (Physical):** The literal copper cables, fiber optics, and Wi-Fi radio waves.

When a server crashes, engineers use this stack to debug. "Is it an Application bug, or is a router unplugged at Layer 1?"
`,
      },
      {
        label: "1.3.2",
        subtitle: "TCP vs UDP",
        icon: "shield",
        markdownContent: `
At Layer 4 of the OSI model, data is chopped into "packets". You must choose how these packets are delivered based on your application's needs.

### TCP (Transmission Control Protocol)
* **Mechanic:** Requires a "Three-Way Handshake" before sending data. The receiver must mathematically acknowledge every single packet. If a packet is lost, TCP resends it.
* **Pros/Cons:** 100% reliable and ordered, but slower due to overhead.
* **Use Cases:** Webpages (HTTP), Emails, Text Messages, File Downloads.

### UDP (User Datagram Protocol)
* **Mechanic:** Fires packets blindly at the IP address as fast as possible. No handshakes, no error checking, no guarantees.
* **Pros/Cons:** Blisteringly fast, but packets can arrive out of order or get lost entirely.
* **Use Cases:** Multiplayer Gaming, Live Video Streaming (Twitch/Zoom), VoIP.
`,
      },
      {
        label: "1.3.3",
        subtitle: "HTTP Lifecycles & Headers",
        icon: "server",
        markdownContent: `
HTTP (Hypertext Transfer Protocol) operates at Layer 7. It is the language of the modern web, based on a strict Request/Response lifecycle between a Client and a Server.

### Anatomy of an HTTP Request
1.  **The Verb:** What do you want to do? ('GET' to read, 'POST' to create, 'DELETE' to remove).
2.  **The URI:** The specific URL endpoint ('/api/users/12').
3.  **Headers:** Hidden metadata. This is where authentication tokens ('Authorization: Bearer xyz') and data format definitions ('Content-Type: application/json') are stored.
4.  **The Body:** The actual data payload (e.g., the JSON string of a new user's profile).

The server processes this and replies with a **Status Code** (e.g., '200 OK' for success, '404 Not Found' for bad routing, or '500 Internal Server Error' for a crash).
`,
      },
      {
        label: "1.3.4",
        subtitle: "CORS Policies",
        icon: "shield",
        markdownContent: `
Cross-Origin Resource Sharing (CORS) is a highly misunderstood security feature. **It is enforced by the web browser, not the server.**

### Why does CORS exist?
Imagine you are logged into your bank on Tab 1. On Tab 2, you accidentally open a malicious website. Without CORS, the malicious website could secretly send an HTTP Request to your bank's API via JavaScript, utilizing your active session cookies to steal money.

To prevent this, browsers enforce the **Same-Origin Policy**. If a script on 'evil.com' tries to request data from 'bank.com', the browser blocks it immediately. 

To allow legitimate cross-origin traffic (like a React app on 'localhost:3000' talking to a backend on 'localhost:8080'), the backend server must explicitly send a CORS Header ('Access-Control-Allow-Origin') to tell the browser it is safe to proceed.
`,
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "Which transport protocol is best suited for real-time video streaming because it prioritizes speed over guaranteed data delivery?",
      options: [
        "TCP (Transmission Control Protocol)",
        "HTTP (Hypertext Transfer Protocol)",
        "UDP (User Datagram Protocol)",
        "FTP (File Transfer Protocol)",
      ],
      answer: 2,
    },
  },
  {
    id: 4,
    title: "1.4 Programming Paradigms",
    briefing: {
      coreConcept: "Code Architecture",
      latencyImpact: "Maintainability",
      prerequisite: "1.3 Network Interoperability",
    },
    steps: [
      {
        label: "1.4.1",
        subtitle: "Object-Oriented Principles",
        icon: "bank",
        markdownContent: `
Object-Oriented Programming (OOP) is an architectural paradigm that models software around real-world "Objects." It is designed to bring structure to massive, enterprise-level codebases (like Java and C#).

### State and Behavior
Instead of writing 100 scattered functions and variables, OOP groups them into a single blueprint called a **Class**. 
* **State (Properties):** The data the object holds (e.g., a Car has a 'color' and 'fuelLevel').
* **Behavior (Methods):** The actions the object can perform (e.g., a Car can 'accelerate()').

By organizing code into distinct Objects, large teams of developers can build separate systems without their variables colliding.
`,
      },
      {
        label: "1.4.2",
        subtitle: "Encapsulation & Polymorphism",
        icon: "shield",
        markdownContent: `
OOP relies on four main pillars. Two of the most critical for software safety and scaling are Encapsulation and Polymorphism.

* **Encapsulation:** Bundling data inside an object and restricting outside access. You hide the internal state using "Private" fields, forcing developers to use specific methods to alter the data safely.
* **Polymorphism:** The ability of different objects to be treated as instances of the same class. For example, a 'Dog' class and 'Cat' class can both inherit an 'Animal' interface, meaning you can call '.speak()' on both of them without needing to know which specific animal it is at runtime.
`,
        codeSnippet: `// Encapsulation in action
class BankAccount {
  // The # makes this field totally private. 
  // It cannot be edited from the outside.
  #balance = 0; 

  // Developers MUST use this method, ensuring bad data 
  // (like negative deposits) is blocked.
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log("Deposited $" + amount);
    } else {
      console.log("Error: Invalid amount");
    }
  }
}`,
      },
      {
        label: "1.4.3",
        subtitle: "Functional Patterns",
        icon: "server",
        markdownContent: `
Functional Programming (FP) is a declarative paradigm that serves as a direct alternative to OOP. It is highly popular in modern frontend frameworks (like React).

### The Core of FP
Functional programming strictly avoids changing state and mutable data. 
* **Pure Functions:** A function must *always* return the exact same output for a given input. 
* **No Side Effects:** A function is not allowed to modify external variables, manipulate the DOM, or alter global state while it runs. 
* **Immutability:** Instead of modifying an array, you create a brand-new copy of the array with the new data.

While OOP relies on objects maintaining and changing their state over time, FP treats data like a pipeline: data flows in, is mathematically transformed by pure functions, and flows out.
`,
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "The Object-Oriented principle of restricting direct access to an object's internal data and requiring developers to use specific methods instead is called _______.",
      answer: "encapsulation",
    },
  },

  {
    id: 5,
    title: "1.5 Paradigm Synthesis: The 'Why' Behind the Architecture",
    briefing: {
      coreConcept: "Complexity Management",
      latencyImpact: "Decision Making",
      prerequisite: "1.4 Programming Paradigms",
    },
    steps: [
      {
        label: "1.5.1",
        subtitle: "Why We Choose Certain Structures",
        icon: "bank",
        markdownContent: `


You aren't just choosing between an Array and a Hash Map for speed; you are choosing based on **Access Patterns**.

### Access Patterns
* **The Why:** If your app is "Read-Heavy" (like a dictionary), you pay the memory cost of a Hash Map to ensure constant-time retrieval. If your app is "Write-Heavy" or requires sorted data, you accept the linear time cost of an Array or Tree to keep the memory footprint small and ordered. 

**Key takeaway:** Performance is rarely about "fastest code"; it is about optimizing for the *most frequent operation* the user performs.
`,
      },
      {
        label: "1.5.2",
        subtitle: "Protocols: Integrity vs. Latency",
        icon: "network",
        markdownContent: `
Choosing between TCP and UDP is a negotiation between **Reliability and Speed**.

### The Why
* **TCP (The Protocol of "Trust"):** Assumes the network is unreliable. It adds "Ceremony" (handshakes, acknowledgments) to ensure the message arrives perfectly.
* **UDP (The Protocol of "Urgency"):** Assumes the network is fleeting. It removes all ceremony to achieve raw speed.

**Key takeaway:** You choose your protocol based on the cost of failure. If a lost pixel in a video stream causes a flicker, that is acceptable (UDP). If a lost bit in a bank transfer causes a loss of money, that is unacceptable (TCP).
`,
      },
      {
        label: "1.5.3",
        subtitle: "OOP vs. FP: State vs. Predictability",
        icon: "server",
        markdownContent: `
This is a battle between **Stateful Modeling** and **Mathematical Predictability**.

* **OOP (The "Organized System"):** We use OOP when our software needs to represent complex, real-world relationships. It is designed for large teams; by encapsulating data, we prevent one developer's code from accidentally breaking another's variable state.
* **FP (The "Pipeline"):** We use FP when our software requires high reliability and easy testing. Because pure functions don't rely on hidden state, they are mathematically guaranteed to behave the same way every time.

**Key takeaway:** Modern software uses both. We use OOP to build the "shape" of our application (the services and modules) and FP to handle the "logic" of data transformation inside those services.
`,
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "You are building a real-time multiplayer racing game. Which combination of paradigms and protocols would you likely prioritize?",
      options: [
        "OOP for game world objects + TCP for position syncing",
        "Functional Programming for game logic + UDP for position syncing",
        "Global Scope variables for easy access + TCP for all data",
      ],
      answer: 1,
    },
  },
];
