import type { ToolWithRelations } from "@/types";
import { categories } from "./categories";

function tool(
  slug: string,
  name: string,
  short_description: string,
  website_url: string,
  categorySlug: "model" | "design" | "nocode" | "agent" | "editor" | "deploy" | "automation" | "payment",
  options?: {
    is_featured?: boolean;
    logo_url?: string;
    description?: string | null;
    pros?: string[] | null;
    cons?: string[] | null;
    price_tier?: string | null;
    price_note?: string | null;
  }
): ToolWithRelations {
  const cat = categories.find((c) => c.slug === categorySlug) ?? null;
  return {
    id: slug,
    slug,
    name,
    short_description,
    description: options?.description ?? null,
    pros: options?.pros ?? null,
    cons: options?.cons ?? null,
    price_tier: options?.price_tier ?? null,
    price_note: options?.price_note ?? null,
    website_url,
    affiliate_url: null,
    logo_url: options?.logo_url ?? null,
    category_id: cat?.id ?? null,
    is_featured: options?.is_featured ?? false,
    sort_order: 0,
    published: true,
    created_at: "",
    updated_at: "",
    categories: cat,
    tags: [],
  };
}

export const tools: ToolWithRelations[] = [
  // === AI模型 ===
  tool("claude", "Claude (Anthropic)", "编程能力最强，Sonnet 4.5 性价比最高", "https://claude.ai", "model", {
    is_featured: true,
    description: "Anthropic 推出的顶级 AI 模型。Opus 4.5 编程能力最强但速度较慢；Sonnet 4.5 是平衡版本，性价比最高，是目前独立开发者的首选。在权威的 SWE-bench 测试中表现卓越。",
    price_tier: "Freemium",
    logo_url: "https://www.anthropic.com/favicon.ico",
  }),
  tool("chatgpt", "ChatGPT (OpenAI)", "速度更快，知识更新及时，中文理解力强", "https://chatgpt.com", "model", {
    is_featured: true,
    description: "OpenAI 的旗舰产品。优势在于响应速度极快，知识库更新及时，且在中文语境下的理解与表达能力非常出色。生态丰富，插件支持完善。",
    price_tier: "Freemium",
    logo_url: "https://openai.com/favicon.ico",
  }),
  tool("gemini", "Gemini (Google)", "1M 超长上下文，UI 设计能力强", "https://gemini.google.com", "model", {
    is_featured: true,
    description: "Google 的多模态大模型。Gemini 3 Pro 支持 1M Token 超长上下文，UI 设计能力极强；Gemini 3 Flash 则是轻量版，速度快且价格便宜。",
    price_tier: "Freemium",
    logo_url: "https://www.gstatic.com/lamda/images/favicon_v1_150160d13ff286506246.png",
  }),
  tool("perplexity", "Perplexity", "集成多种模型，支持深度搜索", "https://perplexity.ai", "model", {
    description: "集成多种顶级 AI 模型，支持深度搜索和知识框架生成，是获取准确信息的利器。",
    price_tier: "Freemium",
    logo_url: "https://www.perplexity.ai/favicon.ico",
  }),
  tool("deepseek", "DeepSeek-V3", "开源免费，编程能力强，API 价格极低", "https://deepseek.com", "model", {
    is_featured: true,
    description: "国产之光。开源且完全免费，编程能力极强，API 价格极低，是目前最具性价比的国产大模型之一。",
    price_tier: "Free",
    logo_url: "https://chat.deepseek.com/favicon.ico",
  }),
  tool("qwen", "通义千问 Qwen", "LiveCodeBench 表现超 GPT-5", "https://qwenlm.ai", "model", {
    description: "阿里巴巴出品。在 LiveCodeBench 表现超过 GPT-5，中文理解能力极强，是国产模型中的佼佼者。",
    price_tier: "Freemium",
    logo_url: "https://img.alicdn.com/imgextra/i4/O1CN01S9fXvY1WvXvXvXvXv_!!6000000002850-2-tps-200-200.png",
  }),
  tool("glm", "智谱 GLM-4.7", "多语言编程能力强，200K 长上下文", "https://chatglm.cn", "model", {
    description: "多语言编程能力强，支持 200K Token 长上下文，针对中文开发场景深度优化。",
    price_tier: "Freemium",
    logo_url: "https://chatglm.cn/favicon.ico",
  }),
  tool("kimi", "月之暗面 Kimi", "支持 200 万字超长上下文", "https://kimi.moonshot.cn", "model", {
    description: "月之暗面推出的 AI 助手。核心优势在于支持 200 万字的超长上下文处理，适合长文档分析。",
    price_tier: "Freemium",
    logo_url: "https://kimi.moonshot.cn/favicon.ico",
  }),
  tool("hunyuan", "腾讯混元 CodeBuddy", "与腾讯云深度集成", "https://hunyuan.tencent.com", "model", {
    description: "腾讯推出的 AI 助手，与腾讯云生态深度集成，适合云原生开发场景。",
    price_tier: "Freemium",
    logo_url: "https://hunyuan.tencent.com/favicon.ico",
  }),
  tool("wenxin", "百度文心一言", "有免费额度，与百度生态集成", "https://yiyan.baidu.com", "model", {
    description: "百度出品，有免费额度，与百度秒哒等生态深度集成，适合国内商业化项目。",
    price_tier: "Freemium",
    logo_url: "https://yiyan.baidu.com/favicon.ico",
  }),

  // === UI设计 ===
  tool("stitch", "Stitch (Google Labs)", "基于 Gemini 3 Pro 的多模态 UI 设计", "https://labs.google/stitch", "design", {
    is_featured: true,
    description: "基于 Gemini 3 Pro 的多模态能力，支持文本/图像生成 UI 设计，并能生成前端代码(HTML/CSS/JS)，与 Figma 无缝集成。",
    price_tier: "Free",
  }),
  tool("figma", "Figma", "专业 UI 设计工具，与 Stitch 集成", "https://figma.com", "design", {
    is_featured: true,
    description: "行业标准的专业 UI 设计工具。支持多人协作，并能与 Stitch 等 AI 工具深度集成，提升设计效率。",
    price_tier: "Freemium",
    logo_url: "https://www.figma.com/favicon.ico",
  }),
  tool("shadcn", "Shadcn UI", "基于 Tailwind CSS 的组件库", "https://ui.shadcn.com", "design", {
    is_featured: true,
    description: "基于 Tailwind CSS 的组件库。可拥有代码而非依赖库，适合独立开发者快速构建专业 UI。",
    price_tier: "Free",
    logo_url: "https://ui.shadcn.com/favicon.ico",
  }),

  // === AI零代码平台 ===
  tool("bolt-new", "Bolt.new", "1 分钟从想法到效果，实时预览", "https://bolt.new", "nocode", {
    is_featured: true,
    description: "速度极快，从想法到看到效果只需 1 分钟。支持实时预览、一键部署和自动修复。",
    price_tier: "Freemium",
    logo_url: "https://bolt.new/favicon.svg",
  }),
  tool("lovable", "Lovable", "全栈能力，内置 Supabase", "https://lovable.dev", "nocode", {
    is_featured: true,
    description: "全栈能力（前端+后端+数据库），内置 Supabase 支持用户认证，生成的代码质量极高。",
    price_tier: "Freemium",
    logo_url: "https://lovable.dev/favicon.ico",
  }),
  tool("baidu-miada", "百度秒哒", "国内最成功零代码，内置支付", "https://miada.baidu.com", "nocode", {
    is_featured: true,
    description: "国内最成功的零代码平台，内置支付功能(微信小程序支付)，界面完全中文，适合快速商业化。",
    price_tier: "Freemium",
    logo_url: "https://miada.baidu.com/favicon.ico",
  }),
  tool("v0", "V0 (Vercel)", "Vercel 出品，UI 质量极高", "https://v0.dev", "nocode", {
    is_featured: true,
    description: "Vercel 推出的 AI 协作助手。UI 质量高，支持 shadcn/ui，支持设计模式手动调整。",
    price_tier: "Freemium",
    logo_url: "https://v0.dev/favicon.ico",
  }),
  tool("replit-agent", "Replit Agent", "在线开发环境，内置数据库与部署", "https://replit.com", "nocode", {
    description: "在线开发环境，支持多种编程语言，内置数据库和部署，支持移动设备。",
    price_tier: "Freemium",
    logo_url: "https://replit.com/favicon.ico",
  }),
  tool("firebase-studio", "Firebase Studio", "Google 协作空间，集成 Firebase", "https://firebase.google.com", "nocode", {
    description: "Google 推出的协作工作空间，集成 Firebase 后端服务，使用 Gemini AI 辅助开发。",
    price_tier: "Freemium",
    logo_url: "https://firebase.google.com/favicon.ico",
  }),
  tool("google-ai-studio", "Google AI Studio", "免费集成开发环境，支持多模态", "https://aistudio.google.com", "nocode", {
    description: "基于浏览器的免费集成开发环境，支持多模态任务(文本/图像/语音)，完全免费使用。",
    price_tier: "Free",
    logo_url: "https://aistudio.google.com/favicon.ico",
  }),

  // === AI智能体平台 ===
  tool("flowith", "Flowith", "无限执行能力，自主规划修正", "https://flowith.io", "agent", {
    is_featured: true,
    description: "无限执行能力，持续运行几小时甚至几天。AI 自主规划和自我修正，支持并行执行和云端部署。",
    price_tier: "Freemium",
    logo_url: "https://flowith.io/favicon.ico",
  }),
  tool("manus", "Manus", "通用 AI 智能体，多模型协同", "https://manus.im", "agent", {
    is_featured: true,
    description: "通用 AI 智能体平台，采用多模型协同机制，具备强大的工具调用能力。",
    price_tier: "Freemium",
    logo_url: "https://manus.im/favicon.ico",
  }),
  tool("coze", "Coze (扣子)", "字节跳动出品，Agent 技能系统", "https://coze.cn", "agent", {
    is_featured: true,
    description: "字节跳动推出的 AI 办公助手。拥有 Agent Skills 技能系统和长期计划功能，可通过对话构建智能体。",
    price_tier: "Free",
    logo_url: "https://www.coze.cn/favicon.ico",
  }),
  tool("openclaw", "OpenClaw", "开源免费个人 AI 助手，本地运行", "https://openclaw.io", "agent", {
    is_featured: true,
    description: "OpenClaw（原Clawdbot） 是开源免费的个人 AI 助手，能在个人电脑上运行，支持通过 WhatsApp、Telegram、iMessage 等聊天软件接收指令并直接操作电脑完成任务。具备永久记忆功能，能记住用户偏好和上下文自我进化。",
    price_tier: "Free",
    pros: ["开源免费", "本地运行保护隐私", "持久化记忆", "多平台网关集成"],
    price_note: "完全开源免费",
  }),

  // === AI代码编辑器 ===
  tool("cursor", "Cursor", "功能最全，多模型切换", "https://cursor.com", "editor", {
    is_featured: true,
    description: "功能最全面的 AI 代码编辑器。支持 Tab 补全、Agent 模式 and Chat 对话，支持多模型切换，上下文感知达 1M Token。",
    price_tier: "Freemium",
    logo_url: "https://www.cursor.com/favicon.ico",
  }),
  tool("windsurf", "Windsurf", "完全免费，Cascade 智能体模式", "https://codeium.com/windsurf", "editor", {
    description: "Codeium 公司推出，目前完全免费。提供 Cascade 智能体模式，编程体验流畅。",
    price_tier: "Free",
    logo_url: "https://codeium.com/favicon.ico",
  }),
  tool("antigravity", "Antigravity", "Google 智能体开发平台，Agent 优先", "https://antigravity.google", "editor", {
    description: "Google 推出的智能体开发平台，Agent 优先设计，集成 Gemini，支持 1M Token 上下文。",
    price_tier: "Freemium",
    logo_url: "https://antigravity.google/favicon.ico",
  }),
  tool("kiro", "Kiro", "Amazon 出品，规范驱动开发", "https://aws.amazon.com/kiro", "editor", {
    description: "Amazon 推出的 AI IDE，强调“规范驱动开发”，与 AWS 深度集成。",
    price_tier: "Freemium",
    logo_url: "https://aws.amazon.com/favicon.ico",
  }),
  tool("trae", "Trae", "字节跳动出品，SOLO 模式", "https://trae.ai", "editor", {
    is_featured: true,
    description: "字节跳动推出的 AI 原生编程工具。提供 IDE 模式和 SOLO 模式(AI 主导开发)。",
    price_tier: "Free",
    logo_url: "https://www.trae.ai/favicon.ico",
  }),

  // === 部署上线 ===
  tool("vercel", "Vercel", "最流行前端部署平台，个人免费", "https://vercel.com", "deploy", {
    is_featured: true,
    description: "最流行的前端部署平台，个人项目完全免费，部署速度快，与 GitHub 深度集成。",
    price_tier: "Freemium",
    logo_url: "https://vercel.com/favicon.ico",
  }),
  tool("netlify", "Netlify", "支持更多框架，免费额度大", "https://netlify.com", "deploy", {
    description: "支持更多框架和静态站点生成器，有表单处理、无服务器函数功能，免费额度更大。",
    price_tier: "Freemium",
    logo_url: "https://www.netlify.com/favicon.ico",
  }),
  tool("edgeone", "EdgeOne Pages", "腾讯云出品，国内访问快", "https://cloud.tencent.com/product/teo", "deploy", {
    description: "腾讯云推出的边缘全栈开发平台，国内访问速度快，与腾讯云服务深度集成。",
    price_tier: "Freemium",
    logo_url: "https://cloud.tencent.com/favicon.ico",
  }),
  tool("github-pages", "GitHub Pages", "免费静态托管，无限流量", "https://pages.github.com", "deploy", {
    description: "GitHub 提供的免费静态网站托管，完全免费，无限流量，与 GitHub 无缝集成。",
    price_tier: "Free",
    logo_url: "https://github.com/favicon.ico",
  }),
  tool("cloudflare", "Cloudflare CDN", "免费 CDN 加速，DDoS 防护", "https://cloudflare.com", "deploy", {
    is_featured: true,
    description: "全球 CDN 加速，覆盖 200+ 城市，自动 HTTPS 证书，DDoS 防护。",
    price_tier: "Free",
    logo_url: "https://www.cloudflare.com/favicon.ico",
  }),

  // === 自动化 ===
  tool("n8n", "n8n", "开源低代码 AI 工作流自动化", "https://n8n.io", "automation", {
    is_featured: true,
    description: "开源低代码 AI 工作流自动化工具，支持超过 400 个服务整合，个人和非商业用途免费。",
    price_tier: "Freemium",
    logo_url: "https://n8n.io/favicon.ico",
  }),

  // === 支付集成 ===
  tool("stripe", "Stripe", "全球跨境支付首选", "https://stripe.com", "payment", {
    is_featured: true,
    description: "方便的跨境支付平台，可方便集成到网站中，支持多种支付方式。",
    price_tier: "Paid",
    logo_url: "https://stripe.com/favicon.ico",
  }),
];
