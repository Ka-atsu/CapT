import { Lesson } from "@/lib/types";

export const softwareEngineering: Lesson[] = [
  {
    id: "6.1",
    title: "6.1 Design Patterns",
    briefing: {
      description:
        "Design patterns are standard, reusable blueprints that solve common software architecture problems.",
      realWorldAnalogy:
        "If you are building a car, you don't invent a new way to attach a wheel. You use the standard 5-lug nut pattern because every mechanic in the world understands it.",
      usedByText:
        "Used in enterprise Object-Oriented codebases to keep massive teams of developers writing code that connects together smoothly.",
      usedByCompany: "Java Spring Boot • Apple iOS SDK",
    },
    steps: [
      {
        label: "6.1.1",
        subtitle: "Singleton & Factory Patterns",
        icon: "bank",
        markdownContent:
          "* **Singleton Pattern:** Ensures that a class only ever has ONE instance running at a time. (Great for a database connection manager so you don't accidentally open 50 connections).\n" +
          "* **Factory Pattern:** A function that creates objects for you based on conditions, so you don't have to write `new Object()` a hundred times throughout your code.",
        codeSnippet:
          "// Example: The Singleton Pattern\n" +
          "class Database {\n" +
          "  constructor() {\n" +
          "    if (Database.instance) {\n" +
          "      return Database.instance; // Return existing connection!\n" +
          "    }\n" +
          "    this.connection = 'Connected to DB';\n" +
          "    Database.instance = this;\n" +
          "  }\n" +
          "}\n\n" +
          "const db1 = new Database();\n" +
          "const db2 = new Database();\n" +
          "console.log(db1 === db2); // true! They are the exact same object.",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "Which design pattern is used to guarantee that a specific class only ever creates one single instance of itself across the entire application?",
      options: [
        "Observer Pattern",
        "Singleton Pattern",
        "Factory Pattern",
        "Decorator Pattern",
      ],
      answer: 1,
    },
  },
  {
    id: "6.2",
    title: "6.2 Software Testing Methodologies",
    briefing: {
      description:
        "How professionals write code that tests their other code, ensuring that fixing a bug today doesn't break a feature tomorrow.",
      realWorldAnalogy:
        "Unit Testing is checking if the steering wheel turns the axle. Integration Testing is putting the car on the road to see if the steering wheel, brakes, and engine all work together without exploding.",
      usedByText:
        "Every major tech company uses automated testing pipelines. If tests fail, the code is literally blocked from being shipped to users.",
      usedByCompany: "Jest • GitHub Actions • Selenium",
    },
    steps: [
      {
        label: "6.2.1",
        subtitle: "Unit Tests & Mocks",
        icon: "shield",
        markdownContent:
          "**Unit Tests** isolate a single tiny function to make sure it works in a vacuum.\n\n" +
          "If your function makes a call to a live database, it's not a unit test anymore! To solve this, we use **Mocking**—we create a fake, simulated database response so the test runs instantly and doesn't rely on the internet.",
        codeSnippet:
          "// A standard Unit Test checking core logic\n" +
          "function addTaxes(price) {\n" +
          "  return price * 1.10;\n" +
          "}\n\n" +
          "// The Test (using a framework syntax like Jest)\n" +
          "test('addTaxes adds 10% to the price', () => {\n" +
          "  expect(addTaxes(100)).toBe(110);\n" +
          "});",
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "To isolate a function during a unit test, developers use ________ objects to simulate real databases or network APIs.",
      answer: "mock",
    },
  },
];
