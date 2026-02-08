import { ToolCard } from "./ToolCard";
import type { ToolWithRelations } from "@/types";

interface ToolListProps {
  tools: ToolWithRelations[];
}

export function ToolList({ tools }: ToolListProps) {
  if (tools.length === 0) {
    return (
      <p className="py-12 text-center text-neutral-500">暂无工具。</p>
    );
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => (
        <li key={tool.id}>
          <ToolCard tool={tool} />
        </li>
      ))}
    </ul>
  );
}
