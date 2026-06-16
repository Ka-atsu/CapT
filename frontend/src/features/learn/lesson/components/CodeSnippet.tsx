type Props = {
  code: string;
};

export default function CodeSnippet({ code }: Props) {
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
