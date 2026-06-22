import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// CSS Modules
import revealStyles from "../styles/RevealPanel.module.css";
import markdownStyles from "../styles/Markdown.module.css";

// --- TYPES ---
type CodeSnippetProps = {
  code: string;
};

type RevealPanelProps = {
  step: any; // Consider tightening this up with a strict type later!
};

// --- COMPONENTS ---

// 1. CodeSnippet (Internal helper component)
export function CodeSnippet({ code }: CodeSnippetProps) {
  return (
    <div className="mt-12 bg-[#070708] rounded-xl border border-neutral-800 overflow-hidden">
      <div className="bg-neutral-900 px-4! py-3! border-b border-neutral-800">
        <span className="text-xs uppercase text-neutral-500">
          Proof of Concept
        </span>
      </div>

      <pre className="p-6! overflow-x-auto">
        <code className="text-emerald-400 whitespace-pre-wrap">{code}</code>
      </pre>
    </div>
  );
}

// 2. EmptyState (Placeholder when no node is selected)
export function EmptyState() {
  return (
    <div
      className={`${revealStyles.revealArea} flex items-center justify-center opacity-50`}
    >
      <p className="text-neutral-500 text-lg">
        Click a node above to explore its details.
      </p>
    </div>
  );
}

// 3. RevealPanel (Main Display Wrapper)
export default function RevealPanel({ step }: RevealPanelProps) {
  return (
    <div className="bg-[#121214] border border-white/5 rounded-2xl p-6! mb-6!">
      <h3 className="text-3xl! font-black! text-white! py-4! border-b border-neutral-800">
        {step.subtitle}
      </h3>

      <div className={`${markdownStyles.markdownBody}`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            table: (props) => (
              <div className="overflow-x-auto my-10 rounded-xl border border-neutral-800">
                <table
                  {...props}
                  className="w-full border-collapse bg-neutral-900/30"
                />
              </div>
            ),

            th: (props) => (
              <th
                {...props}
                className="p-5 bg-neutral-900 border-b-2 border-neutral-800 text-left text-white"
              />
            ),

            td: (props) => (
              <td {...props} className="p-5! border-b border-neutral-800/50" />
            ),

            img: (props) => (
              <img {...props} className={markdownStyles.markdownImage} />
            ),
          }}
        >
          {step.markdownContent}
        </ReactMarkdown>
      </div>

      {step.codeSnippet && <CodeSnippet code={step.codeSnippet} />}
    </div>
  );
}
