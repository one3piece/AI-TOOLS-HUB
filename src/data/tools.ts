import type { ToolWithRelations } from "@/types";
import { categories } from "./categories";

function tool(
  slug: string,
  name: string,
  short_description: string,
  website_url: string,
  categorySlug: "model" | "nocode" | "agent" | "editor" | "deploy",
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
  tool("claude", "Claude", "Anthropic 推出的 AI 模型，编程能力公认最强", "https://claude.ai", "model", {
    is_featured: true,
    description:
      "Claude 4.5 是 Anthropic 在 2025 年推出的最新版本，在 SWE-bench 等权威编程基准测试中超过 GPT-5 和 Gemini 3 Pro，稳坐编程领域 SOTA。主要有 Opus 4.5（顶配、编程最强、速度较慢）和 Sonnet 4.5（平衡版、性价比高）。\n\n优势：代码理解、重构、调试表现突出；上下文记忆好、不易失忆。适合需要高质量代码的开发者、复杂项目、对代码质量要求高的场景。",
    pros: ["编程能力最强", "代码理解与重构出色", "上下文记忆好", "支持 Opus / Sonnet 多版本"],
    cons: ["顶配价格较高", "生成速度相对较慢"],
    price_note: "Claude Pro 约 $20/月；Cursor Pro $20/月含 Claude 额度；API 按 Token 计费",
  }),
  tool("chatgpt", "ChatGPT", "OpenAI 的 AI 聊天机器人，速度快、生态好", "https://chat.openai.com", "model", {
    is_featured: true,
    description:
      "在纯编程能力上略逊于 Claude，但有独特优势：生成代码速度更快，适合快速迭代；知识更新及时，对最新技术和框架了解更快；生态更好，插件和工具支持更丰富；中文理解和生成能力也更强。\n\n适合快速原型开发、对速度要求高、或需要各种插件和工具的场景。",
    pros: ["响应速度快", "知识更新及时", "插件生态丰富", "中文能力强"],
    cons: ["顶尖编程任务略逊 Claude"],
  }),
  tool("gemini", "Gemini", "Google 大模型，超长上下文与 UI 构建能力强", "https://gemini.google.com", "model", {
    is_featured: true,
    description:
      "Google 推出的 AI 模型。Gemini 3 Pro 支持 1M Token（约 100 万字）输入上下文，可一口气读完整个大型项目代码，记忆超长对话。Gemini 3 Flash 速度极快、价格便宜。\n\n在 UI 构建方面表现特别出色，前端 UI 设计、3D 模型构建能力强，某些场景下超过 Claude 和 GPT-5。适合处理大型项目、分析大量代码、做 UI/前端开发、或预算有限但需要强能力的场景。",
    pros: ["1M Token 超长上下文", "UI/前端与 3D 能力强", "Flash 版本速度快、便宜"],
    cons: ["复杂编程任务略逊 Claude Opus"],
  }),
  tool("kimi", "Kimi智能助手", "月之暗面 AI 助手，超长上下文可处理 500 个文件", "https://kimi.moonshot.cn", "model", {
    is_featured: true,
    description:
      "月之暗面推出的 AI 智能助手，很早即支持超长上下文（200 万字），在国产模型中独树一帜。特别适合处理大型项目代码，可一次性处理约 500 个文件，不易失忆。",
    pros: ["超长上下文", "适合大项目与多文件", "中文场景优化"],
  }),
  tool("doubao", "豆包", "智能对话助手，办公创作全能", "https://www.doubao.com", "model", { is_featured: true }),
  tool("zhipu-qingyan", "智谱清言", "智谱 GLM 系列，多语言编程与 200K 上下文", "https://chatglm.cn", "model", {
    description:
      "智谱 GLM-4.7 是清华团队出品，多语言编程能力强，专门针对中文开发场景优化。支持 200K Token 长上下文，在复杂任务执行和创意写作方面表现不错。生成速度也有优势。",
    pros: ["200K 上下文", "中文开发优化", "多语言编程", "生成速度快"],
  }),
  tool("deepseek", "DeepSeek", "开源免费，编程能力强、API 价格极低", "https://www.deepseek.com", "model", {
    is_featured: true,
    description:
      "DeepSeek-V3 是开源模型，完全免费使用，编程能力在国产模型中数一数二，API 价格极低，特别适合需要大量调用的场景。适合学习阶段、大量测试和调用、预算有限的开发者。",
    pros: ["完全免费", "编程能力强", "API 极便宜", "适合大量调用"],
  }),
  tool("tongyi-qianwen", "通义千问", "阿里大模型，LiveCodeBench 超 GPT-5，中文理解极强", "https://tongyi.aliyun.com", "model", {
    description:
      "阿里通义千问 Qwen 在 LiveCodeBench 测评中表现甚至超过 GPT-5，中文理解能力极强，用中文提需求特别准。有免费额度，适合学习和个人项目。",
    pros: ["中文理解强", "编程测评表现优异", "有免费额度", "API 便宜"],
  }),
  tool("wenxin", "文心一言", "百度大模型，免费额度与秒哒等生态集成", "https://yiyan.baidu.com", "model", {
    description:
      "百度文心一言有免费额度，和百度生态（如百度秒哒平台）深度集成，适合创意类小项目需要快速商业化的场景。",
    pros: ["免费额度", "与百度生态集成", "适合国内商业化"],
  }),
  // === AI零代码平台 ===
  tool("bolt-new", "Bolt.new", "StackBlitz 零代码平台，从想法到效果约 1 分钟", "https://bolt.new", "nocode", {
    is_featured: true,
    description:
      "目前最火的零代码平台之一，由 StackBlitz 推出。最大特点就是快，从想法到看到效果可能只需 1 分钟。\n\n核心优势：速度极快、实时预览边改边看、一键部署到 Netlify 等、AI 自动检测和修复错误。学习门槛低，完全不需要懂代码；生成的代码可见，想学习可研究；部署简单，点一下就能上线并得到分享链接。\n\n局限：特别复杂的项目（复杂后端、数据库等）效果可能不如手写；细节定制不如直接写代码灵活；必须在网页上使用，编辑体验一般。",
    pros: ["速度极快", "实时预览", "一键部署", "自动修复错误", "零代码门槛"],
    cons: ["复杂项目受限", "细节定制不如写代码"],
  }),
  tool("lovable", "Lovable", "全栈零代码平台，前端+后端+数据库+用户认证", "https://lovable.dev", "nocode", {
    description:
      "强大的零代码平台，不仅能做前端，还能做全栈应用：前端、后端、数据库、甚至用户认证。直接集成 Supabase，可轻松处理数据存储、用户认证等。生成的代码组织清晰，便于导出后自己维护。\n\n因为功能更强大，相对更复杂，新手可能需要时间适应；生成更多代码（前端+后端），速度可能比 Bolt.new 慢一些。",
    pros: ["全栈能力", "内置 Supabase", "用户认证", "代码质量高、易维护"],
    cons: ["上手稍复杂", "生成速度相对较慢"],
  }),
  tool("miaoda", "百度秒哒", "百度无代码应用搭建，内置支付、可直接商业化", "https://miaoda.baidu.com", "nocode", {
    is_featured: true,
    description:
      "百度推出的 AI 无代码应用搭建平台，国内最成功的零代码平台之一。最大特点是不仅能生成应用，还能直接商业化：内置支付功能（含微信小程序支付），可直接接入使用，无需额外开发。界面完全中文，对国内用户友好。",
    pros: ["内置支付与商业化", "全中文界面", "与文心/百度生态集成"],
  }),
  tool("v0", "V0", "Vercel AI 协作助手，设计+开发全栈 Web 应用", "https://v0.dev", "nocode", {
    description:
      "Vercel 推出的 AI 协作助手，可设计、开发和扩展全栈 Web 应用。特点：UI 质量高、可生成完整应用、基于 shadcn/ui、支持设计模式手动调整、可连接数据库和 API、一键部署到 Vercel、模板库丰富。适合需要漂亮界面、快速搭建全栈应用、对设计要求高的场景。",
    pros: ["UI 质量高", "shadcn/ui", "一键部署 Vercel", "模板丰富"],
  }),
  tool("replit-agent", "Replit Agent", "在线开发环境，多语言、内置数据库与部署", "https://replit.com", "nocode", {
    description:
      "不仅是零代码平台，还是完整的在线开发环境。Replit Agent 可根据描述自动构建应用，支持多种编程语言。特点：多语言、完全在浏览器运行、内置数据库和部署、可在线协作、支持移动设备、有免费版本。适合需要后端、想学多语言、团队协作、或想在手机上编程的项目。",
    pros: ["多语言", "浏览器即可", "内置 DB 与部署", "协作与免费版"],
  }),
  tool("firebase-studio", "Firebase Studio", "Google 协作工作空间，Gemini + Firebase 开发", "https://firebase.google.com", "nocode", {
    description:
      "Google 推出的协作工作空间，统一了 Project IDX 和 Gemini in Firebase，提供 AI 辅助的应用开发体验。完全基于浏览器、集成 Firebase 后端、使用 Gemini AI 辅助、支持 React 等框架，可编码、调试、测试、重构。适合使用 Google 生态、需要 Firebase、想要 AI 辅助开发的项目。",
    pros: ["Gemini 集成", "Firebase 后端", "浏览器即可", "编码/调试/测试"],
  }),
  // === AI智能体平台 ===
  tool("flowith", "Flowith", "无限执行的 AI 智能体，可连续运行数小时甚至数天", "https://flowith.com", "agent", {
    description:
      "无限执行能力的 AI 智能体，可持续运行几小时甚至几天，完成超级复杂的任务。AI 规划和自我修正能力强，能根据情况调整计划；支持并行执行，可同时调用多个 AI 模型或工具。支持云端部署，生成的网站可直接在线访问。\n\n局限：执行效率较低（同任务 Cursor 可能 10 分钟，Flowith 可能 1–2 小时）；费用不太可控；精确控制每一步的能力一般。更适合「我不管过程，只要结果」的场景。建议与 Cursor 配合：用 Flowith 生成基础框架，导出到 Cursor 精修。",
    pros: ["无限执行时长", "自主规划与修正", "并行执行", "云端部署"],
    cons: ["执行较慢", "费用难控", "细节控制弱"],
  }),
  tool("manus", "Manus", "通用 AI 智能体，多模型协同与强工具调用", "https://manus.ai", "agent", {
    description:
      "采用多模型协同机制，具备强大的工具调用能力，能在多个领域自动生成和执行任务。自主规划能力强，能够独立思考和规划，确保任务执行。适合生成基础内容后再用 Cursor 等工具精修。",
    pros: ["多模型协同", "强工具调用", "自主规划"],
  }),
  tool("coze", "扣子", "免费全能 AI 办公智能体", "https://www.coze.cn", "agent", { is_featured: true }),
  // === AI代码编辑器 ===
  tool("cursor", "Cursor", "功能最全面的 AI 代码编辑器，多模型切换", "https://cursor.com", "editor", {
    is_featured: true,
    description:
      "目前功能最全面的 AI 代码编辑器，多种 AI 模式覆盖从代码补全到智能体的所有场景。基于 VS Code，所有插件、主题、快捷键都能用。\n\n可在 Claude、GPT、Gemini 等主流模型之间自由切换，支持自己的大模型和 API Key。用户量大，教程和解决方案多。缺点是高级套餐价格较贵，每套餐有用量限制，超出后可按需加量或升级档位。",
    pros: ["多种 AI 模式（补全 / Chat / Agent）", "基于 VS Code 生态", "多模型自由切换", "社区与教程丰富"],
    cons: ["价格较高", "用量有限制"],
    price_note: "Pro 约 $20/月，含模型额度；超出按 API 计费",
  }),
  tool("trae", "TRAE编程", "字节跳动 AI 原生编程工具，SOLO 模式 AI 主导开发", "https://trae.cn", "editor", {
    is_featured: true,
    description:
      "字节跳动推出的 AI 原生编程工具，有两种模式：IDE 模式类似 Cursor，保留传统开发流程；SOLO 模式是最大亮点——让 AI 主导任务并自动执行开发。只需一个想法，AI 能自动生成产品需求文档、技术架构文档，然后自主编写代码、安装依赖、测试验证，直到项目可运行。\n\n支持集成第三方服务（Supabase、Stripe、OpenRouter 等），可快速开发包含完整前后端的商业级产品。",
    pros: ["SOLO 模式 AI 全自动开发", "一键 PRD + 架构 + 代码", "集成 Supabase/Stripe 等", "适合全栈商业产品"],
  }),
  tool("windsurf", "Windsurf", "Codeium 出品，完全免费，含 Cascade 智能体模式", "https://codeium.com/windsurf", "editor", {
    description:
      "Codeium 公司推出的 AI 代码编辑器，最大优势是完全免费。用完额度后仍可免费使用，特别适合学生和预算有限的开发者。提供 Cascade 智能体模式（类似 Cursor 的 Agent），用自然语言描述需求，AI 会自动创建和修改多个文件。",
    pros: ["完全免费", "Cascade 智能体模式", "适合学习与个人项目"],
  }),
  tool("kiro", "Kiro", "Amazon AI IDE，规范驱动开发，深度集成 AWS", "https://aws.amazon.com/kiro", "editor", {
    description:
      "Amazon 推出的 AI IDE，强调「规范驱动开发」：先写需求规范，再让 AI 实现。与 AWS 深度集成，可直接部署到 AWS。适合使用 AWS 的开发者、需要规范化开发流程的团队、企业级应用场景。",
    pros: ["规范驱动开发", "AWS 深度集成", "适合企业级"],
  }),
  tool("antigravity", "Antigravity", "Google 智能体开发平台，Agent 优先、1M 上下文", "https://antigravity.google", "editor", {
    description:
      "Google 推出的智能体开发平台，界面类似 VS Code，采用 Agent 优先设计，AI 可自主规划、执行和验证复杂任务。集成 Gemini 等大模型，支持 1M Token 上下文。适合想尝试 Google AI 生态、需要超长上下文大型项目的开发者。",
    pros: ["Agent 优先", "1M Token 上下文", "Gemini 集成"],
  }),
  tool("github-copilot", "GitHub Copilot", "GitHub 推出的 AI 编程助手", "https://github.com/features/copilot", "editor"),
  tool("tongyi-lingma", "通义灵码", "阿里免费 AI 编程工具，基于通义大模型", "https://lingma.aliyun.com", "editor"),
  // === 部署上线 ===
  tool("vercel", "Vercel", "最流行的前端部署平台，适合 React / Next.js / Vue", "https://vercel.com", "deploy", {
    description:
      "目前最流行的前端部署平台，特别适合 React、Next.js、Vue、静态网站等。个人项目完全免费，部署速度极快（一般 1–2 分钟），自动配置 HTTPS 和 CDN；与 GitHub 深度集成，推送代码后自动部署。使用简单：注册并绑定 GitHub 仓库，点击 Deploy 即可；成功后自动分配域名（如 your-project.vercel.app），也可绑定自定义域名。",
    pros: ["个人免费", "1–2 分钟部署", "GitHub 自动部署", "HTTPS + CDN"],
  }),
  tool("netlify", "Netlify", "全功能静态与无服务器部署，表单与 A/B 测试", "https://netlify.com", "deploy", {
    description:
      "与 Vercel 类似，但功能更全面。支持更多框架和静态站点生成器，有表单处理、无服务器函数等，免费额度更大，还支持 A/B 测试和分析。使用方式与 Vercel 类似。",
    pros: ["表单与 Serverless", "免费额度大", "A/B 测试"],
  }),
  tool("edgeone-pages", "EdgeOne Pages", "腾讯云边缘全栈部署，国内访问快", "https://cloud.tencent.com/product/teo", "deploy", {
    description:
      "腾讯云推出的边缘全栈开发平台，基于 EdgeOne（网络加速+安全防护）。国内访问速度快，与腾讯云服务深度集成，支持边缘函数，有免费额度。更适合国内开发者。",
    pros: ["国内速度快", "腾讯云集成", "边缘函数", "免费额度"],
  }),
  tool("github-pages", "GitHub Pages", "GitHub 免费静态网站托管，无限流量", "https://pages.github.com", "deploy", {
    description:
      "GitHub 提供的免费静态网站托管服务。完全免费、无限流量、与 GitHub 无缝集成。在仓库设置中启用 GitHub Pages 后，即可通过 username.github.io/repo-name 访问。适合个人主页、项目文档、简单静态站。",
    pros: ["完全免费", "无限流量", "与 GitHub 集成"],
  }),
  tool("cloudflare", "Cloudflare", "免费 CDN 与 Pages，全球加速与防护", "https://cloudflare.com", "deploy", {
    description:
      "提供免费 CDN 与 Pages 部署。CDN 将内容缓存到全球节点，访问时自动选最近服务器。优势：完全免费（个人）、全球 200+ 城市加速、自动 HTTPS、DDoS 防护与 Web 防火墙、免费 DNS。可只做 CDN，或用 Cloudflare Pages 直接部署代码并白嫖免费域名。",
    pros: ["免费 CDN", "全球加速", "HTTPS + 防护", "Pages 部署"],
  }),
];
