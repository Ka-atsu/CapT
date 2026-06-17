import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import markdownStyles from "../styles/Markdown.module.css";
import CodeSnippet from "./CodeSnippet";

type Props = {
  step: any;
};

export default function RevealPanel({ step }: Props) {
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
