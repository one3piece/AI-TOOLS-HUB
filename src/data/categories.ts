import type { Category } from "@/types";

/** 仅保留：AI模型、AI零代码平台、AI智能体平台、AI代码编辑器、部署上线 */
export const categories: Category[] = [
  { id: "1", slug: "model", name: "AI模型", description: "大模型与对话助手", sort_order: 1, created_at: "" },
  { id: "2", slug: "nocode", name: "AI零代码平台", description: "零代码/低代码应用搭建", sort_order: 2, created_at: "" },
  { id: "3", slug: "agent", name: "AI智能体平台", description: "智能体与自主执行", sort_order: 3, created_at: "" },
  { id: "4", slug: "editor", name: "AI代码编辑器", description: "代码辅助与开发", sort_order: 4, created_at: "" },
  { id: "5", slug: "deploy", name: "部署上线", description: "部署与 CDN 平台", sort_order: 5, created_at: "" },
];
