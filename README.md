# AI Tools Hub

AI 工具导航站（参考 [AI工具集 ai-bot.cn](https://ai-bot.cn/) 样式）：纯前端展示，按分类浏览工具，点击卡片或「访问官网」一键跳转对应网站。

## 技术栈

- **Next.js 16** (App Router) + **TypeScript** + **TailwindCSS**
- 数据：**静态数据**（`src/data/tools.ts`、`src/data/categories.ts`），无需后端
- 部署：**Vercel**

## 本地开发

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 数据与样式

- **工具与分类**：在 `src/data/tools.ts`、`src/data/categories.ts` 中增删改即可，无需数据库。
- **样式**：参考 ai-bot.cn，白底 + 卡片网格 + 分类入口 + 蓝色主色，首页含「热门工具」「工具分类」「最新收录」。

## 部署上线（Vercel）

本项目无需数据库，部署时**不需要**配置环境变量即可运行。

### 方式一：通过 Vercel 网页（推荐）

1. **推送代码到 GitHub**  
   若尚未推送：
   ```bash
   git remote add origin https://github.com/你的用户名/AI-tools-hub.git
   git add .
   git commit -m "ready for deploy"
   git push -u origin main
   ```

2. **在 Vercel 导入项目**  
   - 打开 [vercel.com](https://vercel.com)，用 GitHub 登录。  
   - 点击 **Add New… → Project**，选择 **Import Git Repository**。  
   - 选中你的 `AI-tools-hub` 仓库，点击 **Import**。  
   - **Framework Preset** 保持 **Next.js**，**Root Directory** 留空。  
   - 直接点击 **Deploy**，无需填写环境变量。

3. **等待构建**  
   构建完成后会得到一条生产地址，例如：`https://ai-tools-hub-xxx.vercel.app`。

4. **（可选）自定义域名**  
   在 Vercel 项目 **Settings → Domains** 里添加自己的域名即可。

### 方式二：通过 Vercel CLI

1. **安装并登录**  
   ```bash
   npm i -g vercel
   vercel login
   ```  
   按提示在浏览器中完成登录。

2. **在项目根目录部署**  
   ```bash
   cd d:\personal_project\AI_miracle_myself\AI-tools-hub
   vercel
   ```  
   首次会询问 Link to existing project? 选 **N** 创建新项目，其余直接回车用默认即可。

3. **上线到生产**  
   ```bash
   vercel --prod
   ```

### 可选环境变量

- **NEXT_PUBLIC_SITE_URL**：站点完整 URL（如 `https://your-domain.vercel.app`），用于 sitemap、OG 等；不填则使用 Vercel 默认域名。

## 项目结构（概要）

- `src/app`：页面与 API 路由
- `src/components`：UI 组件（layout / tools / news）
- `src/data`：静态数据（tools、categories）
- `src/lib/data.ts`：基于静态数据的查询

## 脚本

| 命令       | 说明           |
| ---------- | -------------- |
| `npm run dev`   | 开发服务器     |
| `npm run build` | 生产构建       |
| `npm run start` | 生产模式运行   |
| `npm run lint`  | ESLint 检查    |
