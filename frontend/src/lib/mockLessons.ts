import { Lesson } from "@/lib/types";

export const mockLessons: Lesson[] = [
  {
    id: 1,
    title: "1.1 Core Data Structures",
    briefing: {
      coreConcept: "Memory Organization",
      latencyImpact: "Access & Mutation Speed",
      prerequisite: "Variables & Pointers",
    },
    steps: [
      {
        label: "1.1.1",
        subtitle: "Arrays & Strings",
        icon: "server",
        markdownContent:
          "Arrays and Strings store data in contiguous blocks of memory. They provide instant access if you know the exact index, but inserting or deleting items in the middle is incredibly slow because every subsequent item must be shifted in memory.\n\n**Real-World Application:**\nYou are reading real-time temperature data from an SHT45 environmental probe over an I2C bus. You use a fixed-size Array as a 'rolling buffer' to hold the last 10 readings to calculate a moving average for your germination environment.",
        codeSnippet: `// Rolling buffer for sensor data
const readings = [24.5, 24.6, 24.8, 25.1];
const average = readings.reduce((a, b) => a + b) / readings.length;`,
      },
      {
        label: "1.1.2",
        subtitle: "Hash Tables",
        icon: "bank",
        markdownContent:
          "Also known as Dictionaries or Maps. Hash Tables use a cryptographic hash function to store key-value pairs. They are the ultimate software engineering tool, providing near-instant O(1) lookups.\n\n**Real-World Application:**\nWhen an ESP32-C6 node sends a telemetry packet, it only sends a device ID (e.g., 'NODE_4'). Instead of writing a slow loop to search an array for NODE_4's configuration, you use a Hash Table to instantly grab its calibration offsets in 1 millisecond.",
        codeSnippet: `// O(1) Instant Lookup
const calibrationOffsets = {
  "NODE_1": 0.45,
  "NODE_2": -0.12,
  "NODE_4": 0.05
};
const offset = calibrationOffsets[incomingPacket.nodeId];`,
      },
      {
        label: "1.1.3",
        subtitle: "Stacks & Queues",
        icon: "network",
        markdownContent:
          "These enforce strict rules on how data flows. Stacks operate on a Last-In-First-Out (LIFO) basis. Queues operate on a First-In-First-Out (FIFO) basis.\n\n**Real-World Application:**\nYou are streaming frames from a camera module into a machine learning model. If the YOLOv8 model predicts slower than the camera captures, you place the frames in a Queue. The model pulls the oldest frame first (FIFO) so it doesn't process data out of order.",
        codeSnippet: `// Standard FIFO Queue implementation
const frameQueue = [];
frameQueue.push(newCameraFrame); // Add to back

// Worker thread pulls from the front
const frameToProcess = frameQueue.shift();`,
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "To achieve instant O(1) data lookup times without iterating through a list, engineers rely heavily on _____ Tables.",
      answer: "hash",
    },
  },
  {
    id: 2,
    title: "1.2 Fundamental Algorithms",
    briefing: {
      coreConcept: "Data Manipulation",
      latencyImpact: "Execution Efficiency",
      prerequisite: "1.1 Core Data Structures",
    },
    steps: [
      {
        label: "1.2.1",
        subtitle: "Sorting & Searching",
        icon: "shield",
        markdownContent:
          "While you rarely write sorting algorithms from scratch, understanding Binary Search is critical. By repeatedly cutting a sorted array in half, Binary Search finds targets exponentially faster than checking every single item.\n\n**Real-World Application:**\nYou have a massive, sorted CSV file containing millions of historical network logs. A security team needs to find a breach that happened at exactly 14:05:00. Binary search finds that exact timestamp in 20 steps instead of 1,000,000 steps.",
        codeSnippet: `// Finding a target by cutting the search space in half
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  if (logs[mid].time === target) return logs[mid];
  if (logs[mid].time < target) left = mid + 1;
  else right = mid - 1;
}`,
      },
      {
        label: "1.2.2",
        subtitle: "Recursion",
        icon: "user",
        markdownContent:
          "Recursion occurs when a function calls itself to solve smaller sub-problems. It requires a strict 'base case' to stop the loop, otherwise it will cause a fatal Stack Overflow crash.\n\n**Real-World Application:**\nYou are writing an automated script to format thousands of seedling images for computer vision training. The images are buried deep inside nested folders. You write a recursive function that opens a folder, formats any images it finds, and if it sees another folder, it calls itself to dive deeper.",
        codeSnippet: `function formatImages(directory) {
  const files = readDirectory(directory);
  for (let file of files) {
    if (file.isDirectory) formatImages(file.path); // Recursive call
    else applyFormatting(file);
  }
}`,
      },
      {
        label: "1.2.3",
        subtitle: "Graph Traversal",
        icon: "network",
        markdownContent:
          "Used heavily in routing and networks. Breadth-First Search (BFS) explores relationships layer by layer, while Depth-First Search (DFS) dives down a single branch as far as possible before retreating.\n\n**Real-World Application:**\nIn an ethical hacking or cybersecurity assessment, a script uses BFS to map a target's local network. It pings the immediate router first, then discovers all devices directly connected to that router, mapping the entire topology outward layer by layer.",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "Which foundational algorithm exponentially speeds up lookups by repeatedly dividing a sorted array in half?",
      options: [
        "Breadth-First Search",
        "Binary Search",
        "Recursive Depth Search",
        "Linear Search",
      ],
      answer: 1,
    },
  },
  {
    id: 3,
    title: "1.3 Big-O & Optimization",
    briefing: {
      coreConcept: "Complexity Analysis",
      latencyImpact: "System Scaling Bottlenecks",
      prerequisite: "1.2 Fundamental Algorithms",
    },
    steps: [
      {
        label: "1.3.1",
        subtitle: "Time Complexity",
        icon: "server",
        markdownContent:
          "Big-O notation measures how the runtime of your code grows as the input data scales. A nested loop creates O(n²) time complexity. If your input doubles, the execution time quadruples.\n\n**Real-World Application:**\nIf you write an algorithm that compares every pixel in an image to every other pixel (a nested loop), processing a small 100x100 thumbnail might take 1 second. But processing a 1080p image won't take 10 seconds—it will take hours, completely locking up your CPU.",
      },
      {
        label: "1.3.2",
        subtitle: "Space Complexity",
        icon: "bank",
        markdownContent:
          "Space complexity measures how much extra RAM or memory an algorithm requires to run. \n\n**Real-World Application:**\nYou are deploying a Random Forest regression model on a Raspberry Pi 5. While the Pi 5 has decent RAM, if your backend code attempts to load a 10GB raw CSV dataset entirely into memory at once (O(n) space), the OS will panic and kill the process. You must optimize your space complexity by streaming the file in small chunks (O(1) space).",
      },
      {
        label: "1.3.3",
        subtitle: "The Time/Space Tradeoff",
        icon: "shield",
        markdownContent:
          "The most common optimization trick in software engineering. By caching data in a Hash Table (using extra Space), you can often completely remove nested loops, dropping a disastrous O(n²) algorithm down to a lightning-fast O(n) runtime.\n\n**Real-World Application:**\nYour dashboard requests the same complex statistical analysis every time the user refreshes. Instead of recalculating the math every single time (wasting Time/CPU), you calculate it once and save the result in memory (spending Space). Next time, you just serve the saved result instantly.",
        codeSnippet: `// Trading Space for Time (Memoization)
const cache = {};

function getComplexPrediction(sensorData) {
  if (cache[sensorData]) return cache[sensorData]; // O(1) instant return
  
  const result = runRandomForestModel(sensorData); // Heavy O(n) calculation
  cache[sensorData] = result; // Save to memory for next time
  return result;
}`,
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "What is the most common technique engineers use to optimize an O(n²) nested loop down to an O(n) runtime?",
      options: [
        "Switching the language from Python to C++",
        "Restarting the server instances asynchronously",
        "Trading Space for Time by caching data in a Hash Table",
        "Writing the loop using Recursion instead",
      ],
      answer: 2,
    },
  },
];
