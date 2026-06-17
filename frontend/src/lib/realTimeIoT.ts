// src/lib/realTimeIoT.ts
import { Lesson } from "@/lib/types";

export const realTimeIoT: Lesson[] = [
  {
    id: 1,
    title: "4.5 Hardware Interrupt Architecture",
    briefing: {
      coreConcept: "Event-Driven Hardware Response",
      latencyImpact: "Microsecond Reaction Time",
      prerequisite: "4.4 Low-Level Memory Synthesis",
    },
    steps: [
      {
        label: "4.5.1",
        subtitle: "Interrupt Vector Tables",
        icon: "network",
        markdownContent:
          "An interrupt is a hardware signal that causes the CPU to immediately pause its current execution, save its state, and jump to a specific function (the Interrupt Service Routine, or ISR) to handle the event. The Interrupt Vector Table (IVT) is the data structure that maps each interrupt source to its corresponding ISR address.\n\n" +
          "### How the IVT Works\n" +
          "The IVT is typically located at a fixed memory address (often `0x0000` or the beginning of flash). Each entry is a pointer to an ISR function. When interrupt number 7 fires (e.g., a UART byte received), the CPU hardware automatically:\n" +
          "1. Finishes the current instruction\n" +
          "2. Pushes critical registers onto the stack\n" +
          "3. Reads entry 7 from the IVT\n" +
          "4. Jumps to that ISR address\n\n" +
          "This entire sequence completes in a handful of CPU cycles—orders of magnitude faster than polling.",
        codeSnippet: `// Embedded C: Defining an ISR and placing it in the vector table
// UART receive interrupt handler
void __attribute__((interrupt)) UART_RX_ISR(void) {
    uint8_t receivedByte = UART_DATA_REG;
    
    // Process the byte immediately
    bufferPush(&rxBuffer, receivedByte);
    
    // Clear the interrupt flag so it can fire again
    UART_FLAG_REG &= ~UART_RX_FLAG;
}

// Vector table (simplified - actual location is linker-defined)
void (*const vectorTable[])(void) __attribute__((section(".vectors"))) = {
    [0] = resetHandler,
    [7] = UART_RX_ISR,    // Interrupt 7 → UART RX
    [15] = timerISR,      // Interrupt 15 → Timer overflow
};`,
      },
      {
        label: "4.5.2",
        subtitle: "ISR Design Constraints",
        icon: "shield",
        markdownContent:
          "Interrupt Service Routines operate under severe constraints that make them fundamentally different from normal functions. Violating these constraints leads to the most difficult-to-debug failures in embedded systems.\n\n" +
          "### The Iron Rules of ISR Design\n" +
          "1. **No blocking:** An ISR cannot wait for anything—no delays, no polling loops, no waiting for a mutex. The main program is frozen until the ISR returns.\n" +
          "2. **Minimal duration:** ISRs should execute in microseconds, not milliseconds. Long ISRs delay all other interrupts and the main program, a condition called 'interrupt starvation.'\n" +
          "3. **No heap allocation:** `malloc()` is never ISR-safe. The allocator may be in an inconsistent state when the interrupt fires.\n" +
          "4. **Communicate via flags and buffers:** The ISR captures the data (e.g., reads a byte from hardware) and signals the main loop to process it later. Never do heavy processing inside an ISR.\n\n" +
          "**The ISR pattern:** Interrupt fires → ISR captures data to a buffer → ISR sets a flag → ISR returns immediately → Main loop sees the flag and processes the buffer at its leisure.",
      },
      {
        label: "4.5.3",
        subtitle: "Interrupt Priority & Nesting",
        icon: "bank",
        markdownContent:
          "Not all interrupts are equally urgent. A motor overcurrent fault demands immediate attention; a button press can wait a millisecond. Interrupt priority controllers allow higher-priority interrupts to preempt lower-priority ISRs—a capability called interrupt nesting.\n\n" +
          "### Priority Assignment Strategy\n" +
          "- **Highest priority:** Safety-critical faults (overcurrent, overtemperature, emergency stop)\n" +
          "- **Medium priority:** Time-sensitive data acquisition (ADC conversion complete, radio packet received)\n" +
          "- **Lower priority:** User interface events (button presses, encoder rotation)\n\n" +
          "**The priority inversion trap:** A medium-priority ISR running while a low-priority ISR holds a shared resource can block a high-priority ISR that also needs that resource. This is why shared data between ISRs of different priorities requires careful atomic access design.",
      },
    ],
    exercise: {
      type: "fill-blank",
      prompt:
        "The data structure stored at a fixed memory address that maps each interrupt source number to the address of its corresponding handler function is called the Interrupt _______ Table.",
      answer: "vector",
    },
  },
  {
    id: 2,
    title: "4.6 Sensor Polling & Data Streaming",
    briefing: {
      coreConcept: "Continuous Data Acquisition",
      latencyImpact: "Sampling Accuracy",
      prerequisite: "4.5 Hardware Interrupt Architecture",
    },
    steps: [
      {
        label: "4.6.1",
        subtitle: "ADC Sampling Strategies",
        icon: "server",
        markdownContent:
          "An Analog-to-Digital Converter (ADC) transforms continuous physical signals (voltage, current, pressure) into discrete digital values. How you sample this data fundamentally affects its usefulness.\n\n" +
          "### Sampling Rate & The Nyquist Theorem\n" +
          "The Nyquist-Shannon theorem states: to accurately reconstruct a signal, you must sample at least twice as fast as its highest frequency component. A vibration sensor detecting 500Hz oscillations requires at least 1000 samples per second. Sample slower, and you encounter 'aliasing'—high-frequency signals masquerading as low-frequency artifacts.\n\n" +
          "### Oversampling vs Undersampling\n" +
          "- **Oversampling:** Sample faster than Nyquist requires. Increases effective resolution through averaging but consumes more power.\n" +
          "- **Undersampling:** Sample below Nyquist. Acceptable only when you know the signal's frequency content in advance and are intentionally capturing a lower-frequency alias.\n\n" +
          "**Decision framework:** Sampling rate is a negotiation between signal fidelity, processor bandwidth, and power budget.",
      },
      {
        label: "4.6.2",
        subtitle: "Circular Buffer Telemetry",
        icon: "network",
        markdownContent:
          "Sensor data arrives continuously, but processing or transmitting it may be bursty. A circular buffer (ring buffer) decouples the producer (ISR capturing samples) from the consumer (main loop processing or radio transmitting).\n\n" +
          "### Circular Buffer Mechanics\n" +
          "A circular buffer is a fixed-size array with two pointers: a write index (where the ISR places new data) and a read index (where the consumer retrieves it). When either pointer reaches the end of the array, it wraps around to the beginning—hence 'circular.'\n\n" +
          "**Key advantage:** No dynamic allocation, no fragmentation, O(1) insertion and removal. The buffer size is the only tunable parameter—too small and data is lost on processing spikes; too large and memory is wasted.",
        codeSnippet: `// Embedded C: Circular buffer for sensor data
#define BUFFER_SIZE 128

typedef struct {
    uint16_t data[BUFFER_SIZE];
    volatile uint8_t writeIdx;  // ISR writes here
    uint8_t readIdx;            // Main loop reads here
} CircularBuffer;

CircularBuffer sensorBuffer = {0};

// Called from ISR - must be fast!
void bufferPush(CircularBuffer* buf, uint16_t sample) {
    uint8_t nextWrite = (buf->writeIdx + 1) % BUFFER_SIZE;
    
    if (nextWrite != buf->readIdx) {  // Not full
        buf->data[buf->writeIdx] = sample;
        buf->writeIdx = nextWrite;
    }
    // If full, sample is dropped (or overwrite oldest)
}

// Called from main loop - processes accumulated data
bool bufferPop(CircularBuffer* buf, uint16_t* out) {
    if (buf->readIdx == buf->writeIdx) return false; // Empty
    
    *out = buf->data[buf->readIdx];
    buf->readIdx = (buf->readIdx + 1) % BUFFER_SIZE;
    return true;
}`,
      },
      {
        label: "4.6.3",
        subtitle: "DMA-Driven Acquisition",
        icon: "server",
        markdownContent:
          "Direct Memory Access (DMA) is a hardware feature that allows peripherals to transfer data directly to memory without involving the CPU. For high-bandwidth sensor streaming, DMA eliminates the interrupt-per-sample overhead entirely.\n\n" +
          "### DMA vs Interrupt-Driven Sampling\n" +
          "- **Interrupt-driven:** Each sample triggers an ISR. At 10,000 samples/second, the CPU spends significant time just entering and exiting ISRs.\n" +
          "- **DMA-driven:** You configure the DMA controller with a source (ADC data register), destination (buffer in RAM), and transfer count. The DMA silently fills the buffer in the background. A single interrupt fires when the buffer is full—reducing interrupt overhead by orders of magnitude.\n\n" +
          "**Trade-off:** DMA requires careful buffer management (ping-pong buffers to process one half while DMA fills the other) but is essential for audio, high-speed sensor arrays, and video data.",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "What is the primary advantage of using DMA (Direct Memory Access) over interrupt-driven sampling for high-bandwidth sensor data?",
      options: [
        "DMA provides higher analog-to-digital conversion resolution",
        "DMA eliminates per-sample CPU interrupt overhead, allowing the processor to do other work",
        "DMA automatically compresses sensor data before storage",
        "DMA increases the Nyquist frequency of the sensor",
      ],
      answer: 1,
    },
  },
  {
    id: 3,
    title: "4.7 Edge Device Communication",
    briefing: {
      coreConcept: "Constrained Network Protocols",
      latencyImpact: "Transmission Reliability",
      prerequisite: "4.6 Sensor Polling & Data Streaming",
    },
    steps: [
      {
        label: "4.7.1",
        subtitle: "Lightweight Protocol Stacks",
        icon: "network",
        markdownContent:
          "Traditional TCP/IP stacks consume tens of kilobytes of RAM and significant processing power—unacceptable for many battery-powered sensors. Lightweight protocols like MQTT (Message Queuing Telemetry Transport) and CoAP (Constrained Application Protocol) are designed specifically for resource-constrained devices.\n\n" +
          "### MQTT (Publish-Subscribe)\n" +
          "Devices don't communicate directly. They publish data to 'topics' on a central broker, and other devices subscribe to those topics. The broker handles queuing and delivery. This decouples sensors from actuators—a temperature sensor doesn't need to know which specific devices consume its data.\n\n" +
          "### CoAP (Request-Response)\n" +
          "CoAP mirrors HTTP's RESTful model but runs over UDP instead of TCP and uses binary encoding instead of text headers. This reduces overhead dramatically—a CoAP header is 4 bytes; an HTTP header can be hundreds.\n\n" +
          "**Selection heuristic:** Use MQTT for one-to-many telemetry distribution. Use CoAP for direct device-to-device command and control.",
      },
      {
        label: "4.7.2",
        subtitle: "Radio Duty Cycling",
        icon: "shield",
        markdownContent:
          "The radio transceiver is typically the most power-hungry component in an IoT device—often consuming 10-100x more power than the microcontroller. Radio duty cycling means keeping the radio off as much as possible.\n\n" +
          "### Duty Cycle Strategies\n" +
          "- **Scheduled transmission:** The device wakes at fixed intervals (e.g., every 15 minutes), transmits buffered sensor data, and immediately powers down the radio.\n" +
          "- **Event-driven transmission:** The radio stays off until a significant event occurs (e.g., a threshold exceeded). This achieves minimal power but introduces latency.\n" +
          "- **Listen-before-talk:** For protocols requiring bidirectional communication, the device briefly listens for a 'gateway beacon' at known intervals before transmitting.\n\n" +
          "**The fundamental trade-off:** Lower duty cycle → longer battery life, but higher latency and reduced responsiveness to commands.",
      },
      {
        label: "4.7.3",
        subtitle: "Data Serialization for Constrained Devices",
        icon: "server",
        markdownContent:
          "JSON and XML are text-heavy formats designed for human readability. On constrained devices, every byte transmitted costs battery life. Binary serialization formats like Protocol Buffers (Protobuf) and MessagePack reduce payload size by 3-10x compared to JSON.\n\n" +
          "### Binary vs Text Encoding\n" +
          "| Format | Payload (100 sensor readings) | Human Readable |\n" +
          "| :--- | :--- | :--- |\n" +
          "| JSON | ~800 bytes | Yes |\n" +
          "| MessagePack | ~300 bytes | No (binary) |\n" +
          "| Protobuf | ~200 bytes | No (binary, requires schema) |\n" +
          "| Custom packed struct | ~200 bytes | No (requires documentation) |\n\n" +
          "**The critical insight:** Transmitting one byte over a LoRa radio can cost as much energy as executing 1000 CPU instructions. Optimizing for payload size is an energy optimization, not just a bandwidth optimization.",
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "An IoT soil moisture sensor must operate for 5 years on a single battery, reporting data every 6 hours. Which radio strategy best aligns with this requirement?",
      options: [
        "Keep the radio always listening for real-time commands",
        "Use scheduled transmission: wake radio every 6 hours, transmit, then power down",
        "Stream continuous real-time data for maximum resolution",
        "Use TCP with keep-alive packets to maintain a persistent connection",
      ],
      answer: 1,
    },
  },
  {
    id: 4,
    title: "4.8 IoT Synthesis: The 'Why' Behind Real-Time & Edge Processing",
    briefing: {
      coreConcept: "Physical-Digital Co-Design",
      latencyImpact: "System Battery Life",
      prerequisite: "4.7 Edge Device Communication",
    },
    steps: [
      {
        label: "4.8.1",
        subtitle: "Why Interrupts Over Continuous Polling",
        icon: "bank",
        markdownContent: `
You aren't choosing interrupt-driven design because polling is harder to code (it's often easier). You're choosing it because **polling couples CPU activity to waiting, not to doing**.

### The Why
In a polling loop, the CPU repeatedly asks "is the sensor ready? is the sensor ready? is the sensor ready?"—burning cycles and energy while receiving the answer "no" 99.9% of the time. This is the computational equivalent of picking up a phone every 10 seconds to check if someone called.

An interrupt inverts this relationship. The CPU declares: "I have nothing to do until the hardware needs me." It enters a low-power sleep state. The hardware—which is always physically present and consuming its own minimal quiescent current—raises a signal when it has data. The CPU wakes, handles the event in microseconds, and returns to sleep.

**The power ratio is staggering:** A polling CPU at 10MHz might consume 5mA continuously. The same CPU sleeping and waking on interrupts might average 50µA—a 100x reduction. No code optimization, no faster processor, no algorithmic improvement can close a 100x gap created by architectural choice.

**Key takeaway:** Polling vs. interrupts is not a coding preference. It is the single largest lever for power consumption in embedded systems. The choice determines whether your device runs for days or years.
`,
      },
      {
        label: "4.8.2",
        subtitle: "Why Circular Buffers Over Queue Data Structures",
        icon: "network",
        markdownContent: `
You aren't using circular buffers because dynamic queues are unavailable in C (they are). You're using them because **the ISR context imposes constraints that general-purpose data structures cannot satisfy**.

### The Why
An interrupt service routine cannot allocate memory. \`malloc()\` is not reentrant—if the interrupt fires while the main program is in the middle of an allocation, the heap's internal bookkeeping structures are in an inconsistent state. Calling \`malloc\` from an ISR risks corrupting the entire heap, causing failures that manifest hours later in completely unrelated code.

A circular buffer is a fixed-size, statically allocated array. Its insertion operation—write the sample, advance the write pointer, check for wraparound—has no dependencies on any shared allocator state. It is trivially lock-free for the single-producer, single-consumer case. The ISR can safely push data while the main loop simultaneously pops it, with no locking and no allocation.

**Key takeaway:** Data structures in embedded systems are not chosen by algorithmic complexity alone. They are chosen by context safety—what operations are legal in an ISR, what operations tolerate preemption, and what operations can fail under memory pressure.
`,
      },
      {
        label: "4.8.3",
        subtitle: "Why Binary Protocols Over JSON",
        icon: "server",
        markdownContent: `
You aren't transmitting packed binary structures because embedded developers enjoy unreadable wire formats. You're transmitting them because **in low-power radio systems, the energy cost of a single transmitted byte dominates all other computational costs**.

### The Why
Consider a LoRaWAN sensor transmitting temperature and humidity every hour. The JSON payload \`{"temp":23.5,"humidity":61.2}\` is 32 bytes. A packed binary structure with two 16-bit integers is 4 bytes. The difference is 28 bytes per transmission.

At LoRa's data rate (SF12, 125kHz), 28 additional bytes translates to roughly 400 milliseconds of additional radio-on time. If the radio consumes 40mA during transmission, that's 4.4 microamp-hours of battery per transmission. Over 87,600 hourly transmissions in 10 years, those "negligible" 28 bytes accumulate to 385 milliamp-hours—draining a CR2032 battery completely, just on protocol overhead.

**This math generalizes:** Every byte transmitted is an energy decision. JSON's human readability costs real battery life. Binary protocols are not premature optimization; they are the difference between a device that meets its battery life specification and one that fails in the field.

**Key takeaway:** Protocol design for IoT is energy economics, not software engineering. The question is never "can we afford to transmit this?" but "does this byte justify its share of the battery?"
`,
      },
      {
        label: "4.8.4",
        subtitle: "Why MQTT Over Direct TCP Connections",
        icon: "shield",
        markdownContent: `
You aren't choosing MQTT because direct TCP is impossible on microcontrollers (it isn't). You're choosing it because **the publish-subscribe model decouples device firmware from system topology**.

### The Why
In a direct TCP architecture, a temperature sensor must know the IP address and port of every device that consumes its data. When you add a new display to the system, you must update the sensor's firmware. When you move the system to a different building with different IP assignments, you must reconfigure every device. The firmware is coupled to the physical deployment.

MQTT breaks this coupling entirely. A sensor publishes to \`greenhouse/north/temperature\`—a logical topic name that describes the data, not the network location of its consumers. A display subscribes to that topic. The MQTT broker—a central server or gateway—routes messages between them. Adding a new consumer requires no changes to the sensor. Moving the system requires updating only the broker's address.

**This is not a protocol preference. It is a system architecture decision that determines whether your firmware can outlast a single deployment.** MQTT topics are semantic addresses; IP addresses are topological addresses. Semantic addresses are stable across deployments; topological addresses are not.

**Key takeaway:** The publish-subscribe model decouples the data producer from the data consumer in both space (they don't know each other's addresses) and time (they don't need to be online simultaneously). For devices deployed for years in changing environments, this decoupling is not optional.
`,
      },
      {
        label: "4.8.5",
        subtitle: "The Edge Processing Cohesion Principle",
        icon: "network",
        markdownContent: `
Having examined each real-time and IoT layer in isolation, we can now state the principle that ties edge processing to systems engineering.

### The Edge Autonomy Principle
**An edge device must continue to perform its core function correctly even when the network is absent, the cloud is unreachable, and the power budget is at its limit.**

This principle drives every architectural decision in IoT firmware:
- **Interrupt-driven design (4.5)** ensures the device can respond to physical events in microseconds, without waiting for a cloud round-trip that may never arrive.
- **Circular buffering (4.6)** decouples sensor acquisition from network availability. Data accumulates locally until transmission is possible.
- **Binary protocols (4.7)** minimize the energy cost of the rare moments when transmission succeeds, extending the window of autonomy.
- **Publish-subscribe architectures (4.7)** decouple the device from specific consumers, so the device continues functioning correctly even as the system around it evolves.

A cloud-dependent IoT device is a remote sensor with a tether. An edge-autonomous device is a self-contained instrument that happens to have a radio. The difference is not technical sophistication—it is whether the device can fulfill its purpose when the tether is cut.

**Key takeaway:** Edge computing is not about moving computation closer to the data source for performance. It is about ensuring the data source can operate independently of anything beyond itself. The network is a supplement to edge capability, not a prerequisite for it.
`,
      },
    ],
    exercise: {
      type: "multiple-choice",
      prompt:
        "A wildlife tracking collar must log GPS positions for 18 months and upload data when the animal passes near a base station. The collar has no guaranteed network access. Which design philosophy best describes the required architecture?",
      options: [
        "Cloud-first design with real-time streaming to a central server",
        "Edge autonomy: the device performs its core function (logging) independently, with network upload as an opportunistic supplement",
        "Continuous polling of the GPS module to ensure maximum location resolution",
        "JSON-formatted telemetry transmitted over a persistent TCP connection",
      ],
      answer: 1,
    },
  },
];
