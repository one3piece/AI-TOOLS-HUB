export const SITE_NAME = "AI工具集";
export const SITE_DESCRIPTION =
  "AI 工具导航与资讯站，帮助开发者与效率学习者发现、对比、订阅 AI 工具动态。";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-tools-hub.vercel.app";

export const DEFAULT_OG = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
};
