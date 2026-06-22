import { Lesson } from "@/lib/types";

export const advancedDataStructures: Lesson[] = [
  {
    id: "2.1",
    title: "2.1 Trees & Binary Search Trees",
    briefing: {
      description:
        "Trees are hierarchical data structures. Instead of a single straight line, data branches out from a single root down to multiple leaves.",
      realWorldAnalogy:
        "Think of a corporate organizational chart. The CEO is at the top (Root). They manage Directors, who manage Managers, who manage Employees (Leaves). You never search linearly; you follow the chain of command.",
      usedByText:
        "Used when data has a natural hierarchy or when you need to perform logarithmic O(log n) lookups without having to manually shift contiguous memory.",
      usedByCompany: "HTML DOM Trees • Auto-Complete Dictionaries",
    },
    steps: [
      {
        label: "2.1.1",
        subtitle: "The Binary Search Tree (BST) Rule",
        icon: "network",
        markdownContent:
          "A Binary Search Tree (BST) is a specific type of tree with a strict organizational rule that makes searching incredibly fast:\n\n" +
          "1. Every node can have a maximum of **two** children (Left and Right).\n" +
          "2. All values **smaller** than the parent go to the **Left**.\n" +
          "3. All values **larger** than the parent go to the **Right**.\n\n" +
          "Because of this rule, every time you move down a level, you automatically eliminate half of the remaining tree—giving you that beautiful **O(log n)** speed.",
        codeSnippet:
          "// A simple BST Node structure\n" +
          "class TreeNode {\n" +
          "  constructor(value) {\n" +
          "    this.value = value;\n" +
          "    this.left = null;  // Smaller values\n" +
          "    this.right = null; // Larger values\n" +
          "  }\n" +
          "}",
      },
      {
        label: "2.1.2",
        subtitle: "Traversal: BFS vs DFS",
        icon: "shield",
        markdownContent:
          "How do you print every value in a tree? You have two main strategies:\n\n" +
          "**1. Breadth-First Search (BFS):** Explores level-by-level. It checks the CEO, then all Directors, then all Managers. It uses a **Queue** to remember what to check next.\n\n" +
          "**2. Depth-First Search (DFS):** Plunges all the way down a single branch to the very bottom leaf before backing up. It uses a **Stack** (or recursion).",
        codeSnippet:
          "// Depth-First Search (In-Order Traversal)\n" +
          "// For a BST, this prints the numbers in perfect ascending order!\n" +
          "function traverse(node) {\n" +
          "  if (node === null) return;\n" +
          "  traverse(node.left);       // Go all the way left\n" +
          "  console.log(node.value);   // Print the current node\n" +
          "  traverse(node.right);      // Go right\n" +
          "}",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "In a standard Binary Search Tree, if the top Root node is 50, where would a newly inserted node with the value of 35 be placed?",
      options: [
        "To the right of the Root",
        "To the left of the Root",
        "It replaces the Root",
        "At the very end of the array",
      ],
      answer: 1,
    },
  },
  {
    id: "2.2",
    title: "2.2 Heaps & Priority Queues",
    briefing: {
      description:
        "A Heap is a specialized tree that completely ignores sorting rules, focusing entirely on keeping the absolute largest (or smallest) item at the very top.",
      realWorldAnalogy:
        "An Emergency Room waiting area. It is not a standard queue (First-In, First-Out). If someone walks in with a paper cut, they sit down. If someone arrives later with a heart attack, they instantly 'bubble up' to the absolute front of the line.",
      usedByText:
        "Whenever a system needs continuous, instant access to the 'most important' or 'next scheduled' item dynamically.",
      usedByCompany: "Operating System Task Schedulers • VIP Queues",
    },
    steps: [
      {
        label: "2.2.1",
        subtitle: "The Max-Heap Rule",
        icon: "bank",
        markdownContent:
          "In a **Max-Heap**, the only rule is that a parent node must always be larger than its children. The left/right ordering does not matter at all.\n\n" +
          "When you add a new item, you attach it to the very bottom of the tree. Then, it compares itself to its parent. If it is bigger, it swaps places and 'bubbles up' until it finds its rightful priority level.",
        codeSnippet:
          "// Concept: Bubbling Up in a Max Priority Queue\n" +
          "function bubbleUp(item) {\n" +
          "  while (item > item.parent) {\n" +
          "    swap(item, item.parent); // Move the critical task higher!\n" +
          "    item = item.parent;\n" +
          "  }\n" +
          "}",
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "A data structure where the most urgent item is always served first, regardless of when it arrived, is called a(n) ________ Queue.",
      answer: "Priority",
    },
  },
  {
    id: "2.3",
    title: "2.3 Sorting Algorithms",
    briefing: {
      description:
        "Sorting is the process of arranging data into a meaningful order. Different algorithms do this with vastly different levels of efficiency.",
      realWorldAnalogy:
        "Sorting a messy bookshelf. You could compare every single book to every other book one-by-one (slow), or you could divide the books into small alphabetical piles and merge them together (fast).",
      usedByText:
        "Used universally to prepare datasets for Binary Search or to present ordered interfaces to end-users.",
      usedByCompany: "E-Commerce Price Filters • Database Indexing",
    },
    steps: [
      {
        label: "2.3.1",
        subtitle: "The Danger of Bubble Sort: O(n²)",
        icon: "shield",
        markdownContent:
          "**Bubble Sort** is famous for being terrible. It steps through the list, compares two adjacent items, and swaps them if they are in the wrong order. It repeats this entire process until the list is sorted.\n\n" +
          "Because it relies on nested loops over the same array, its runtime is **O(n²)**. It should never be used in production.",
        codeSnippet:
          "// Bubble Sort: Easy to write, terrible to run.\n" +
          "for (let i = 0; i < arr.length; i++) {\n" +
          "  for (let j = 0; j < arr.length - 1; j++) {\n" +
          "    if (arr[j] > arr[j + 1]) {\n" +
          "      // Swap them!\n" +
          "      let temp = arr[j];\n" +
          "      arr[j] = arr[j + 1];\n" +
          "      arr[j + 1] = temp;\n" +
          "    }\n" +
          "  }\n" +
          "}",
      },
      {
        label: "2.3.2",
        subtitle: "Merge Sort: Divide and Conquer",
        icon: "server",
        markdownContent:
          "**Merge Sort** is an enterprise-grade algorithm running at **O(n log n)**. \n\n" +
          "Instead of looping, it splits the array perfectly in half over and over until it has tiny arrays of just 1 item. Then, it stitches (merges) them back together in the correct order. Because it splits the data, it utilizes logarithmic efficiency.",
        codeSnippet:
          "// The core logic of Merge Sort\n" +
          "function mergeSort(arr) {\n" +
          "  if (arr.length <= 1) return arr;\n\n" +
          "  const mid = Math.floor(arr.length / 2);\n" +
          "  const left = mergeSort(arr.slice(0, mid));   // Split left\n" +
          "  const right = mergeSort(arr.slice(mid));     // Split right\n\n" +
          "  return merge(left, right); // Stitch them back together\n" +
          "}",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "Which sorting algorithm relies on repeatedly dividing the dataset in half before reassembling it in order?",
      options: [
        "Bubble Sort",
        "Merge Sort",
        "Selection Sort",
        "Insertion Sort",
      ],
      answer: 1,
    },
  },
  {
    id: "2.4",
    title: "2.4 Graphs & Networks",
    briefing: {
      description:
        "A Graph is a collection of distinct points connected by lines. Unlike trees, graphs have no strict 'Root' and can connect in any direction, forming loops and webs.",
      realWorldAnalogy:
        "A map of airplane flight paths. Each city is a 'Node', and each flight route between them is an 'Edge'. You can fly from LA to NY, and NY back to LA.",
      usedByText:
        "Used to calculate the shortest possible paths between two points, recommend friends in social networks, and map out internet packet routing.",
      usedByCompany: "Google Maps Navigation • Facebook Friend Graph",
    },
    steps: [
      {
        label: "2.4.1",
        subtitle: "Nodes and Edges",
        icon: "network",
        markdownContent:
          "Graphs consist of two things:\n" +
          "1. **Vertices (Nodes):** The actual entities (e.g., People, Cities, Routers).\n" +
          "2. **Edges:** The connections between them.\n\n" +
          "If an edge goes both ways (like a two-way street), it is an **Undirected Graph**. If it only goes one way (like a one-way street or a Twitter follower), it is a **Directed Graph**.",
        codeSnippet:
          "// Representing a graph using an Adjacency List\n" +
          "const flightMap = {\n" +
          "  'JFK': ['LAX', 'MIA'],    // JFK connects to LAX and MIA\n" +
          "  'LAX': ['JFK', 'SFO'],    // LAX connects to JFK and SFO\n" +
          "  'MIA': ['JFK']\n" +
          "};",
      },
      {
        label: "2.4.2",
        subtitle: "Graph Traversal & Dijkstra",
        icon: "shield",
        markdownContent:
          "To search a graph, we use the same tools as trees: **BFS** (Queue) and **DFS** (Stack). However, because graphs have loops, we must keep a 'Visited' list so we don't get stuck walking in a circle forever.\n\n" +
          "When the edges have weights (e.g., it costs $300 to fly to LAX, but $100 to fly to MIA), we use **Dijkstra's Algorithm**. Dijkstra systematically calculates the absolute cheapest path from your starting point to all other nodes.",
        codeSnippet:
          "// A critical part of Graph Search: Tracking what we've seen\n" +
          "const visited = new Set();\n\n" +
          "function explore(city) {\n" +
          "  if (visited.has(city)) return; // Prevent infinite loops!\n" +
          "  \n" +
          "  visited.add(city);\n" +
          "  console.log('Arrived at: ' + city);\n" +
          "}",
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "In graph terminology, the lines or paths that connect the individual vertices (nodes) together are called ________.",
      answer: "edges",
    },
  },
  {
    id: "2.5",
    title: "2.5 Advanced Sorting (Quick & Heap)",
    briefing: {
      description:
        "While Merge Sort is incredibly stable, Quick Sort and Heap Sort are the high-performance algorithms that power the internal sorting mechanisms of modern programming languages.",
      realWorldAnalogy:
        "Quick Sort is like organizing a messy room: you pick one item (a 'pivot'), throw everything smaller than it to the left, and everything bigger to the right. Then you just repeat that process for the left and right piles.",
      usedByText:
        "When you call `.sort()` on an array in JavaScript or C++, the language engine under the hood is almost always using a heavily optimized version of Quick Sort or Heap Sort.",
      usedByCompany: "V8 JavaScript Engine • C++ Standard Library",
    },
    steps: [
      {
        label: "2.5.1",
        subtitle: "Quick Sort & The Pivot",
        icon: "network",
        markdownContent:
          "**Quick Sort** is famous for being incredibly fast in practice (Average Time: **O(n log n)**). It doesn't require extra memory space like Merge Sort does.\n\n" +
          "It works by selecting a **Pivot** value. It iterates through the array and moves all values smaller than the pivot to the left side, and all larger values to the right. It then recursively applies this same logic to the smaller sub-arrays.",
        codeSnippet:
          "// Conceptual Quick Sort logic\n" +
          "function quickSort(arr) {\n" +
          "  if (arr.length <= 1) return arr;\n\n" +
          "  const pivot = arr[arr.length - 1];\n" +
          "  const left = [];\n" +
          "  const right = [];\n\n" +
          "  for (let i = 0; i < arr.length - 1; i++) {\n" +
          "    if (arr[i] < pivot) left.push(arr[i]);\n" +
          "    else right.push(arr[i]);\n" +
          "  }\n" +
          "  return [...quickSort(left), pivot, ...quickSort(right)];\n" +
          "}",
      },
      {
        label: "2.5.2",
        subtitle: "Heap Sort: Guaranteed Efficiency",
        icon: "server",
        markdownContent:
          "Quick Sort has a rare, fatal flaw: if the array is already sorted, picking the wrong pivot causes it to degrade into a terrible **O(n²)** runtime.\n\n" +
          "**Heap Sort** fixes this. It converts the array into a Max-Heap (where the largest item is always at the top). It removes the top item, puts it at the end of the sorted list, and lets the heap re-balance itself. This guarantees a worst-case speed of **O(n log n)**.",
        codeSnippet:
          "// Heap Sort relies heavily on the 'bubble down' heapify method\n" +
          "function heapSort(array) {\n" +
          "  buildMaxHeap(array);\n\n" +
          "  for (let i = array.length - 1; i > 0; i--) {\n" +
          "    // Swap the largest item (index 0) to the back of the array\n" +
          "    swap(array, 0, i);\n" +
          "    // Re-balance the remaining heap\n" +
          "    heapifyDown(array, 0, i);\n" +
          "  }\n" +
          "  return array;\n" +
          "}",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "Quick Sort achieves its speed by selecting a specific element to partition the array. What is this element called?",
      options: ["The Root", "The Pivot", "The Median", "The Anchor"],
      answer: 1,
    },
  },
  {
    id: "2.6",
    title: "2.6 Balanced Trees & Tries",
    briefing: {
      description:
        "Basic trees can break if data is added in the wrong order. Advanced trees actively balance themselves, and specialized trees (Tries) are built specifically to search through text.",
      realWorldAnalogy:
        "A balanced tree is like a mobile hanging above a crib. If you add too much weight to one side, it tilts and breaks. The structure must physically rotate to keep the weight evenly distributed.",
      usedByText:
        "Tries are the absolute foundation of any system where you start typing a word and the computer instantly guesses the rest.",
      usedByCompany: "Google Search Autocomplete • Spell Checkers",
    },
    steps: [
      {
        label: "2.6.1",
        subtitle: "The Imbalance Problem (AVL / Red-Black)",
        icon: "shield",
        markdownContent:
          "If you insert numbers into a standard Binary Search Tree in perfect chronological order (1, 2, 3, 4, 5), the tree never branches out. It just creates a long, straight line down the right side.\n\n" +
          "Your $O(\\log n)$ tree has just secretly degraded into an $O(n)$ Linked List! \n\n" +
          "**Red-Black Trees** and **AVL Trees** solve this. Every time you insert a node, they check their own height. If one side gets too long, the tree physically performs a 'Rotation' to pull the long branch up and push the short branch down, guaranteeing perfect balance.",
        codeSnippet:
          "// In an unbalanced BST, finding '5' takes 5 steps (O(n)).\n" +
          "// 1 -> 2 -> 3 -> 4 -> 5\n\n" +
          "// An AVL Tree detects the imbalance and automatically rotates it to:\n" +
          "//       3\n" +
          "//      / \\\n" +
          "//     2   4\n" +
          "//    /     \\\n" +
          "//   1       5\n" +
          "// Now finding '5' only takes 2 steps! (O(log n))",
      },
      {
        label: "2.6.2",
        subtitle: "The Trie (Prefix Tree)",
        icon: "network",
        markdownContent:
          "A **Trie** (pronounced 'Try') is a tree specifically designed for string manipulation.\n\n" +
          "Instead of storing whole words in a node, every node represents a single **letter**. To search for the word 'CAT', you start at the root, find 'C', move down to 'A', and move down to 'T'.\n\n" +
          "This is incredibly fast: the time it takes to find a word is only tied to the *length of the word itself*, totally ignoring the millions of other words in the dictionary.",
        codeSnippet:
          "class TrieNode {\n" +
          "  constructor() {\n" +
          "    this.children = {}; // Stores letter paths (e.g., {'a': node, 'b': node})\n" +
          "    this.isEndOfWord = false;\n" +
          "  }\n" +
          "}\n\n" +
          "// To insert 'CAT', we chain nodes: Root -> C -> A -> T",
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "A tree structure where every node represents a single character, used extensively for autocomplete algorithms, is known as a(n) ________.",
      answer: "trie",
    },
  },
];
