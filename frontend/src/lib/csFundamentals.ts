import { Lesson } from "@/lib/types";

export const csFundamentals: Lesson[] = [
  {
    id: 1,
    title: "1.1 Algorithmic Execution & Logic",
    briefing: {
      coreConcept: "Execution Flow & Logic Paradigms",
      latencyImpact: "Runtime Efficiency & Safety",
      prerequisite: "Basic Computer Literacy",
    },
    steps: [
      {
        label: "1.1.1",
        subtitle: "Variable Lifecycles in Physical Space",
        icon: "bank",
        markdownContent:
          "Variables aren't ethereal ideas; they are temporary physical reservations inside your computer's hardware (RAM).\n\n" +
          "### The Curiosity View: The RAM Hotel\n" +
          "Imagine RAM as a massive hotel. When you create a variable, you are reserving a room. If you never checkout, the hotel fills up, and the system crashes.\n\n" +
          "### The Three Phases of Memory\n" +
          "| Phase | Action | Hardware Reality |\n" +
          "| :--- | :--- | :--- |\n" +
          "| **1. Allocation (Birth)** | Declaring the variable. | The Operating System walls off a specific physical block of RAM address space. |\n" +
          "| **2. Usage (Life)** | Reading/Writing data. | The CPU shoots electrical signals to that exact address to alter state. |\n" +
          "| **3. Deallocation (Death)** | Going out of scope. | The OS clears the reservation tag so other apps don't crash from starvation. |\n\n" +
          "> **Courage over Comfort:** Beginners fear memory bugs, so they rely blindly on modern language engines. But in high-scale execution, knowing whether your variable lives on the fast **Stack** or the dynamic **Heap** determines if your system handles 10 users or 10 million.",
        codeSnippet:
          "function processPayment() {\n" +
          "  // BIRTH: Physical RAM address is locked for 'receipt'\n" +
          "  let receipt = { amount: 50, user: 'Alice' }; \n\n" +
          "  // LIFE: CPU reads the RAM address\n" +
          "  console.log('Processing ' + receipt.amount);\n" +
          "} // DEATH: Function block ends. 'receipt' is now out of scope.\n" +
          "  // The Garbage Collector sweeps the RAM room clean.",
      },
      {
        label: "1.1.2",
        subtitle: "Scoping Rules & Boundary Defense",
        icon: "shield",
        markdownContent:
          "Scope is code-level architecture that acts as a security boundary. It dictates where a variable can be seen, modified, or executed.\n\n" +
          "### Why Scope Exists (Curiosity Insight)\n" +
          "Early computers had one giant global scope. If two developers accidentally named a temporary loop counter `i`, one function would corrupt the other midway through execution. Modern scope isolates state.\n\n" +
          "* **Global Scope:** Accessible everywhere. *Highly dangerous—creates unpredictable dependencies.*\n" +
          "* **Local/Function Scope:** Contained cleanly within a function. Dead to the outside world.\n" +
          "* **Block Scope:** The tightest constraint. Isolated within curly brackets `{}` like loops or `if` statements.",
        codeSnippet:
          "const globalTax = 0.08; // Global: Visible everywhere\n\n" +
          "function calculateTotal() {\n" +
          "  let subtotal = 100; // Local: Only lives inside this function\n\n" +
          "  if (subtotal > 50) {\n" +
          "    let discount = 10; // Block: Only lives inside these specific brackets\n" +
          "    return (subtotal - discount) * (1 + globalTax);\n" +
          "  }\n" +
          "  // console.log(discount); // CRASH! 'discount' died when the block closed.\n" +
          "}",
      },
      {
        label: "1.1.3",
        subtitle: "Complex Control Flows",
        icon: "network",
        markdownContent:
          "Control flow is the logical engine of your algorithm. While basic approaches stack conditional statements like Russian nesting dolls, professional architecture uses structured control flows to maximize readability and processing speed.\n\n" +
          "### The Guard Clause Pattern\n" +
          "Instead of wrapping your main logic inside layers of checks (the unreadable 'Arrow Anti-Pattern'), check for failures or exceptions at the **very top** and exit the execution immediately via an early return.\n\n" +
          "* **Eliminates Cognitive Load:** The 'Happy Path' (the core successful logic) remains flat and cleanly aligned to the left margin.\n" +
          "* **Saves CPU Cycles:** Halts execution instantly when handling invalid data inputs.",
        codeSnippet:
          "// THE COWARDLY PATH: Deeply nested, error-prone 'Arrow' code\n" +
          "function processUser(user) {\n" +
          "  if (user != null) {\n" +
          "    if (user.hasAccount) {\n" +
          "      if (user.balance > 0) {\n" +
          "        // Main logic buried deep inside...\n" +
          "      }\n" +
          "    }\n" +
          "  }\n" +
          "}\n\n" +
          "// THE COURAGEOUS PATH: Flat, explicit Guard Clauses\n" +
          "function processUser(user) {\n" +
          "  if (user == null) return;\n" +
          "  if (!user.hasAccount) return;\n" +
          "  if (user.balance <= 0) return;\n\n" +
          "  // Main execution logic runs here completely un-nested!\n" +
          "}",
      },
      {
        label: "1.1.4",
        subtitle: "Function Handling & First-Class Power",
        icon: "server",
        markdownContent:
          "To unlock advanced system design, functions cannot be viewed as static text routines. They must be handled as **First-Class Citizens**.\n\n" +
          "### What Does 'First-Class' Mean?\n" +
          "It means a function has the same structural status as an integer or string variable. You can treat logic as data:\n" +
          "1. Assign a function to a standard variable.\n" +
          "2. Pass a function as a parameters to another function (Callbacks).\n" +
          "3. Return a function out of another function completely.\n\n" +
          "This dynamic capability forms the foundation of modern asynchronous networking, event handlers, and data streaming architectures.",
        codeSnippet:
          "// 1. Assigning logic directly to a variable\n" +
          "const logError = function(msg) { return '[ALERT]: ' + msg; };\n\n" +
          "// 2. Passing a function as data (A Callback execution)\n" +
          "function monitorSystem(statusCheck, triggerTime) {\n" +
          "  console.log('Monitoring...');\n" +
          "  setTimeout(statusCheck, triggerTime * 1000);\n" +
          "}\n\n" +
          "// Passing the logic block itself to be run later\n" +
          "monitorSystem(() => console.log(logError('System Overload')), 2);",
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "To write clean code without nested conditions, developers use a(n) ________ clause at the top of functions to handle errors and exit execution immediately.",
      answer: "guard",
    },
  },
  {
    id: 2,
    title: "1.2 Data Structures & Performance Bounds",
    briefing: {
      coreConcept: "Memory Layouts & Scaling Theory",
      latencyImpact: "Big O Time & Space Scaling",
      prerequisite: "1.1 Algorithmic Execution",
    },
    steps: [
      {
        label: "1.2.1",
        subtitle: "Arrays vs. Linked Lists",
        icon: "server",
        markdownContent:
          "Data structures are physical layouts in memory. The choice between an Array and a Linked List isn't a stylistic choice—it shifts structural constraints completely.\n\n" +
          "### Contiguous vs. Scattered Memory\n" +
          "* **Arrays (Contiguous):** Blocks stored back-to-back in RAM. The CPU knows the exact physical location of index `[50]` instantly by doing simple pointer arithmetic.\n" +
          "  * *Con:* Inserting an item at index `[0]` requires moving every single other item over one slot in RAM.\n" +
          "* **Linked Lists (Scattered):** Elements are scattered anywhere in memory. Each item ('node') stores its data along with a pointer address to the next node.\n" +
          "  * *Pro:* Fast insertions. You just update a single pointer.\n" +
          "  * *Con:* Slow reading. To find the 50th node, you must walk through nodes 1 to 49 manually.\n\n" +
          "> **Consistency Tracker:** Developing an intuitive feel for memory architecture prevents system bottlenecks. Revisit these physical layouts daily until you see code as memory movement.",
      },
      {
        label: "1.2.2",
        subtitle: "Hash Mappings",
        icon: "bank",
        markdownContent:
          "Hash Maps are the premier structural mechanism for near-instant retrieval, mapping arbitrary string keys to specific memory values.\n\n" +
          "### The Curiosity Principle: The Hash Algorithm\n" +
          "How does a hash map look up an item without parsing a list? It uses a **Hash Function**. \n\n" +
          "When you pass a key like `'user_77'`, the function mathematically hashes that string into a raw index number (e.g., `4`). The computer jumps straight to address space `4` to find the record. No search loops required.\n\n" +
          "* **Lookup Cost:** $O(1)$ constant time.\n" +
          "* **Edge Case (Collisions):** If two distinct keys generate the exact same index address, advanced systems use chaining (mini-linked lists) to handle the collision gracefully.",
        codeSnippet:
          "// A native Hash Map execution\n" +
          "const databaseRegistry = {\n" +
          "  'alice99': { rank: 'Admin', code: 'A1' },\n" +
          "  'bob_dev': { rank: 'Editor', code: 'E5' }\n" +
          "};\n\n" +
          "// Near-instant lookup. No looping through records required.\n" +
          "console.log(databaseRegistry['alice99'].rank); // Out: Admin",
      },
      {
        label: "1.2.3",
        subtitle: "Big O Execution Profiling",
        icon: "shield",
        markdownContent:
          "Big O notation is the mathematical framework for profiling how an algorithm's execution time or memory footprint expands as the input dataset size ($n$) grows.\n\n" +
          "### Worst-Case Resource Bounds\n" +
          "| Complexity | Name | Behavior Scale | Common Example |\n" +
          "| :--- | :--- | :--- | :--- |\n" +
          "| **$O(1)$** | Constant | Perfect scalability. Time stays flat. | Hash Map access. |\n" +
          "| **$O(\log n)$** | Logarithmic | Exceptional scalability. Halves search space. | Binary Search. |\n" +
          "| **$O(n)$** | Linear | Steady, uniform growth. | Standard single loop. |\n" +
          "| **$O(n^2)$** | Quadratic | Dangerous collapse. Time explodes. | Nested loops. **Avoid at scale.** |\n\n" +
          "> **Courage Prompt:** Do not panic when analyzing performance. If your code has a loop inside a loop over a large array, it is $O(n^2)$. Have the courage to rebuild it by introducing a Hash Map to flatten execution to a linear $O(n)$.",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "If you run a single loop that contains a nested search loop over an input array of size 'n', what is the worst-case Big O execution complexity?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      answer: 3,
    },
  },
  {
    id: 3,
    title: "1.3 Network Interoperability",
    briefing: {
      coreConcept: "Data Serialization & Transmission",
      latencyImpact: "Network Congestion & Serialization Overheads",
      prerequisite: "1.2 Data Structures",
    },
    steps: [
      {
        label: "1.3.1",
        subtitle: "The OSI Layer Architecture",
        icon: "network",
        markdownContent:
          "The Open Systems Interconnection (OSI) model is the structural model that partitions network traffic into 7 isolated abstract layers.\n\n" +
          "### Key Engineering Boundaries\n" +
          "* **Layer 7 (Application):** Where web browsers, software code, APIs, and protocols like HTTP/HTTPS live.\n" +
          "* **Layer 4 (Transport):** Directs packet transport reliability across nodes (TCP vs. UDP).\n" +
          "* **Layer 3 (Network):** Handles logical addressing, routing systems, and global IP addresses.\n" +
          "* **Layer 1 (Physical):** The literal copper pins, fiber optic glass lines, and radio signals.\n\n" +
          "> **Curiosity Mindset:** When an API integration throws an error, don't guess randomly. Check systematically down the stack. If Layer 1 has power and Layer 3 has an IP address, your bug is isolated at Layer 7.",
      },
      {
        label: "1.3.2",
        subtitle: "Transport Dynamics: TCP vs. UDP",
        icon: "shield",
        markdownContent:
          "At the Transport Layer (Layer 4), data payloads are sliced into packets. You must trade off data integrity for raw delivery velocity.\n\n" +
          "### The Engineering Trade-off\n" +
          "* **TCP (Transmission Control Protocol):** Focuses on absolute data reliability. It enforces a strict **Three-Way Handshake** to confirm connections and requires receipt acknowledgments for every packet. If a packet drops, execution stops until it is resent.\n" +
          "  * *Primary Use:* Webpages, database synchronization, text messaging.\n" +
          "* **UDP (User Datagram Protocol):** Focuses on speed. It streams data packets continuously without handshakes or error checks.\n" +
          "  * *Primary Use:* Real-time gaming, voice-over-IP (VoIP), live video streaming.",
      },
      {
        label: "1.3.3",
        subtitle: "HTTP Lifecycles, Structure, & Headers",
        icon: "server",
        markdownContent:
          "HTTP is a stateless, client-server application layer architecture following a strict Request-Response loop pattern.\n\n" +
          "### Anatomy of an HTTP Transaction\n" +
          "1. **The Verb:** The target action (`GET` to fetch, `POST` to transmit new resources, `DELETE` to purge).\n" +
          "2. **The Headers:** Crucial metadata containing system instructions (e.g., `Authorization: Bearer [token]` or content type designations).\n" +
          "3. **The Payload Body:** The raw data state string (typically structured as a JSON string).\n\n" +
          "The server evaluates this incoming text packet and responds with a standardized **Status Code** (e.g., `200` for operational success, `404` for missing routes, or `500` for an internal software crash).",
      },
      {
        label: "1.3.4",
        subtitle: "Cross-Origin Resource Sharing (CORS) Security",
        icon: "shield",
        markdownContent:
          "CORS is an important security mechanism **enforced entirely by web browsers**, not backend network servers.\n\n" +
          "### The Under-the-Hood Necessity\n" +
          "Without the **Same-Origin Policy**, if you logged into a secure app on Tab 1, a malicious script running on Tab 2 could send silent API requests to your bank via your browser session cookies.\n\n" +
          "To allow valid cross-domain communication (such as an application interface at `domain-a.com` calling an API endpoint at `api-b.com`), the API server must respond with explicit headers (`Access-Control-Allow-Origin`). Otherwise, the browser blocks the data block from executing.",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "Which network protocol should an engineer select if they are building a real-time multiplayer system where delivery speed is highly prioritized over absolute reliability?",
      options: ["HTTP", "TCP", "UDP", "CORS"],
      answer: 2,
    },
  },
  {
    id: 4,
    title: "1.4 Programming Paradigms",
    briefing: {
      coreConcept: "Structural vs. Declarative Architecture",
      latencyImpact: "Code Maintainability & State Errors",
      prerequisite: "1.3 Network Interoperability",
    },
    steps: [
      {
        label: "1.4.1",
        subtitle: "Structural Paradigms vs. Declarative Architectures",
        icon: "network",
        markdownContent:
          "A paradigm shapes how an engineer designs code logic and tracks application state. Software architectures generally split into two high-level directions:\n\n" +
          "* **Structural/Imperative Patterns (e.g., Object-Oriented):** You write sequential instructions detailing *how* the machine must manipulate state, bundling fields and methods cleanly within distinct instances.\n" +
          "* **Declarative Patterns (e.g., Functional):** You explicitly state *what* the output requirements are, treating application processing as mathematical data pipelines.",
      },
      {
        label: "1.4.2",
        subtitle: "Object-Oriented Foundations: Encapsulation & Polymorphism",
        icon: "bank",
        markdownContent:
          "Object-Oriented Programming (OOP) groups fields and logic into singular blueprints known as **Classes** to manage enterprise-scale architectures.\n\n" +
          "### Core OOP Design Pillars\n" +
          "* **Encapsulation:** Shielding an object's internal data state from outside modification. You flag variables as `private` or `#`, forcing developers to use secure public methods to update fields.\n" +
          "* **Polymorphism:** The design pattern allowing distinct objects to be treated as instances of a shared parent contract, adapting their execution logic automatically at runtime.",
        codeSnippet:
          "class SecureWallet {\n" +
          "  // Encapsulation: The '#' prefix locks this field private\n" +
          "  #balance = 0;\n\n" +
          "  // Secure interface to alter inner state\n" +
          "  deposit(funds) {\n" +
          "    if (funds > 0) {\n" +
          "      this.#balance += funds;\n" +
          "      console.log('Balance updated.');\n" +
          "    }\n" +
          "  }\n" +
          "}",
      },
      {
        label: "1.4.3",
        subtitle: "Declarative Functional Design Patterns",
        icon: "server",
        markdownContent:
          "Functional Programming (FP) views application architecture as a continuous stream of calculations, completely rejecting shared mutable state.\n\n" +
          "### Core Functional Rules\n" +
          "* **Pure Functions:** Functions must yield the exact same output for an identical input payload, without relying on external system conditions.\n" +
          "* **Zero Side Effects:** A function is strictly forbidden from changing global state or altering variables outside its immediate block runtime.\n" +
          "* **Immutability:** Data states are never overwritten or altered directly. When data updates occur, the system constructs an entirely new copy of the collection.",
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "The object-oriented practice of marking internal properties as private and restricting outside modification is known as ________.",
      answer: "encapsulation",
    },
  },
  {
    id: 5,
    title: "1.5 Paradigm Synthesis: The 'Why' Behind the Architecture",
    briefing: {
      coreConcept: "Complexity Management & Trade-offs",
      latencyImpact: "Macro Decision Making",
      prerequisite: "1.4 Programming Paradigms",
    },
    steps: [
      {
        label: "1.5.1",
        subtitle: "Access Patterns: Choosing Your Weapons",
        icon: "bank",
        markdownContent:
          "Senior engineers do not choose between an Array and a Hash Map based on what feels comfortable. They choose based on data **Access Patterns**[cite: 126, 127].\n\n" +
          "### The Curiosity View: Read-Heavy vs. Write-Heavy\n" +
          "* **Read-Heavy Systems:** If your application is constantly looking up values (like a user database registry or a dictionary), you pay the memory overhead cost of a Hash Map to secure that lightning-fast, constant-time $O(1)$ retrieval[cite: 54, 128].\n" +
          "* **Write-Heavy / Ordered Systems:** If your app experiences non-stop data additions or requires absolute sequential sorting, you accept the linear time search costs of an Array or Tree structure to keep your memory footprint small and organized[cite: 43, 129].\n\n" +
          "> **Golden Rule:** True performance isn't about writing the 'fastest possible code' in a vacuum[cite: 130]. It is about optimizing your physical memory structures for the single most frequent operation your user performs[cite: 131].",
      },
      {
        label: "1.5.2",
        subtitle: "Protocols: The Price of Data Integrity",
        icon: "network",
        markdownContent:
          "Choosing between TCP and UDP at Layer 4 is an architectural negotiation between **Absolute Reliability** and **Raw Velocity**[cite: 73, 132].\n\n" +
          "### Engineering Trade-offs (The Cost of Failure)\n" +
          "* **TCP (The Protocol of Trust):** Operates under the assumption that networks are inherently hostile and unstable[cite: 133]. It introduces heavy structural overhead ('ceremony' like handshakes and receipts) to guarantee every bit arrives perfectly[cite: 80, 134].\n" +
          "* **UDP (The Protocol of Urgency):** Assumes data is fleeting and time-critical[cite: 135]. It strips away the safety net to send raw packets as fast as physically possible[cite: 85, 136].\n\n" +
          "> **Courage Prompt:** When building systems, evaluate the real-world consequence of a dropped packet[cite: 137]. If losing a pixel causes a brief, unnoticeable video flicker, embrace the speed of UDP[cite: 138]. If dropping a single binary digit in a bank ledger breaks financial state, demand the ironclad trust of TCP[cite: 139].",
      },
      {
        label: "1.5.3",
        subtitle: "OOP vs. FP: State Isolation vs. Pipelines",
        icon: "server",
        markdownContent:
          "This architectural battle contrasts Stateful Object Modeling with Pure Mathematical Predictability[cite: 140].\n\n" +
          "### The Synthesis\n" +
          "* **Object-Oriented Design:** Excellent for managing complex, real-world business domains[cite: 141]. By encapsulating data, it protects massive development teams from accidentally overwriting shared global variables[cite: 107, 142].\n" +
          "* **Functional Design:** Excellent for predictable calculations, parallel computing, and easy isolation testing[cite: 143]. Because data pipelines use pure functions, they are mathematically immune to unpredictable state side effects[cite: 122, 144].\n\n" +
          "### Consistency Habit\n" +
          "Professional production codebases do not use one paradigm exclusively. They consistently synthesize both: **OOP** is deployed to establish the macro component architecture (the structural 'shape' of your microservices), while **FP** is used to drive the clean data transformations inside those modules[cite: 145].",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "You are engineering a real-time multiplayer racing engine. Which structural combination of communication protocols and programming paradigms balances game state modeling with latency constraints?",
      options: [
        "Global Scope variables for rapid access + TCP packet streams",
        "Object-Oriented encapsulation for game objects + UDP network streams",
        "Pure functional pipelines + HTTP polling cycles",
      ],
      answer: 1,
    },
  },
];
