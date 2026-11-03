import type { Block, CalloutVariant } from "@/types/content";
import { cn } from "@/utils/cn";
import { MathBlock, RichText } from "@/components/common/RichText";
import { Icon, type IconName } from "@/components/common/Icon";

const CALLOUT: Record<CalloutVariant, { icon: IconName; label: string; box: string; title: string }> = {
  definition: { icon: "book", label: "Definition", box: "border-indigo-200 bg-indigo-50", title: "text-indigo-900" },
  tip: { icon: "bulb", label: "Tip", box: "border-teal-200 bg-teal-50", title: "text-teal-900" },
  warning: { icon: "alert", label: "Watch out", box: "border-amber-300 bg-amber-50", title: "text-amber-950" },
  "real-life": { icon: "star", label: "In real life", box: "border-sky-200 bg-sky-50", title: "text-sky-900" },
  remember: { icon: "check", label: "Remember", box: "border-violet-200 bg-violet-50", title: "text-violet-900" },
};

export function Callout({ variant, title, text }: { variant: CalloutVariant; title?: string; text: string }) {
  const c = CALLOUT[variant];
  return (
    <aside className={cn("rounded-xl border p-4", c.box)}>
      <p className={cn("mb-1 flex items-center gap-2 text-sm font-bold uppercase tracking-wide", c.title)}>
        <Icon name={c.icon} className="h-4 w-4" />
        {title ? <RichText text={title} /> : c.label}
      </p>
      <p className="text-slate-800">
        <RichText text={text} />
      </p>
    </aside>
  );
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4 text-[1.05rem] leading-relaxed text-slate-700">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i}>
                <RichText text={block.text} />
              </p>
            );
          case "math":
            return <MathBlock key={i} tex={block.tex} caption={block.caption} />;
          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag key={i} className={cn("space-y-2 pl-6", block.ordered ? "list-decimal" : "list-disc")}>
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    <RichText text={item} />
                  </li>
                ))}
              </Tag>
            );
          }
          case "callout":
            return <Callout key={i} variant={block.variant} title={block.title} text={block.text} />;
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[20rem] text-left text-base">
                  <thead className="bg-slate-100 text-sm text-slate-700">
                    <tr>
                      {block.headers.map((h) => (
                        <th key={h} scope="col" className="px-4 py-2.5 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {block.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td key={c} className="px-4 py-2.5 align-top">
                            <RichText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "termBreakdown":
            return (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
                {block.title && <p className="mb-3 text-center font-semibold text-slate-900">{block.title}</p>}
                <div className="grid gap-3 sm:grid-cols-3">
                  {block.terms.map((t) => (
                    <div key={t.display} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                      <div className="text-2xl">
                        <RichText text={`$${t.display}$`} />
                      </div>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-indigo-700">{t.label}</p>
                      <dl className="mt-2 space-y-1 text-sm">
                        <div className="flex justify-between gap-2">
                          <dt className="text-slate-500">Coefficient</dt>
                          <dd className="font-semibold text-slate-900">{t.coefficient}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-slate-500">Variable part</dt>
                          <dd className="font-semibold text-slate-900">{t.variable}</dd>
                        </div>
                      </dl>
                    </div>
                  ))}
                </div>
              </div>
            );
        }
      })}
    </div>
  );
}
