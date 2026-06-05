# 项目上下文文档

## 概述

这是一个基于 **Vite + Tailwind CSS v4** 的个人静态网站，采用学术风格侧边栏布局。包含主页（关于、作品集轮播、联系）和博客系统（多篇文章）。

**GitHub 仓库**：`huoxin-t/huoxin-t.github.io`  
**线上地址**：`https://huoxin-t.github.io`  
**所有者**：Huoxin（GitHub: huoxin-t，邮箱: a1739896218@gmail.com）

## 技术栈

| 层面 | 选型 | 说明 |
|------|------|------|
| 构建工具 | Vite 8.x | 极速 HMR，多页面构建 |
| CSS 框架 | Tailwind CSS 4.3 | v4 CSS-first 配置，无需 PostCSS |
| 字体 | Inter（Google Fonts） | 通过 `<link>` 加载 |
| 部署 | GitHub Pages | GitHub Actions 自动构建部署 |
| 运行时 | 纯静态 HTML | 无框架，零运行时开销 |

## 目录结构

```
huoxin_protflio/
├── index.html                        # 主页：侧边栏 + 关于 + 作品集轮播 + 联系
├── blog/
│   ├── index.html                    # 博客列表页
│   └── posts/
│       ├── hello-world.html          # 文章1：Vite+Tailwind搭建个人网站
│       ├── markdown-to-html.html     # 文章2：静态站点渲染Markdown方案对比
│       └── tailwind-v4-migration.html# 文章3：Tailwind v4迁移指南
├── src/
│   ├── style.css                     # Tailwind导入 + @theme主题 + 自定义组件CSS
│   └── main.js                       # 轮播组件JS（自动生成圆点、触摸滑动、自动播放）
├── public/
│   ├── favicon.svg                   # 网站图标
│   └── images/                       # 项目截图（占位SVG，替换为实际PNG/JPG）
├── .github/workflows/deploy.yml      # GitHub Actions 自动部署
├── vite.config.js                    # Vite配置：Tailwind插件 + 多页面入口 + base路径
├── tailwind.config.js                # 编辑器IntelliSense兼容（v4实际用CSS @theme）
├── package.json                      # 依赖：vite, tailwindcss, @tailwindcss/vite
└── PROJECT_CONTEXT.md                # 本文档
```

## 设计系统

### 色彩

所有颜色通过 CSS 自定义属性定义（`src/style.css` 的 `@theme` 块），支持自动暗色模式：

```
--color-accent: #2563eb          # 主色调（链接、标签、hover）
--color-bg: #f8fafc              # 页面背景
--color-surface: #ffffff         # 卡片/侧边栏背景
--color-text: #1e293b            # 正文
--color-muted: #64748b           # 辅助文字
--color-faint: #94a3b8           # 弱化文字
--color-border: #e2e8f0          # 边框
```

暗色模式通过 `@media (prefers-color-scheme: dark)` 自动切换。

### 排版

- 正文字号 16px，行高 relaxed
- 标题使用 `tracking-tight` 紧凑字距
- 代码使用 JetBrains Mono / Cascadia Code
- 启用 Inter 字体特性 `cv02/cv03/cv04/cv11`

### 布局

```
┌──────────┬─────────────────────────────────┐
│ 侧边栏   │  主内容区                        │
│ (280px)  │  (flex-1, max-w-prose)          │
│          │                                 │
│  头像    │  # 关于                         │
│  姓名    │  个人简介 + 技能标签            │
│  导航    │  ─────────────                  │
│  社交    │  # 作品集                       │
│          │  项目卡片（含图片轮播）          │
│          │  ─────────────                  │
│          │  # 联系                         │
└──────────┴─────────────────────────────────┘
```

移动端（<768px）：侧边栏变为顶部居中布局，内容区单栏。

## 关键配置说明

### vite.config.js

```js
const base = '/'  // 用户站点(huoxin-t.github.io)用 '/'，项目站点用 '/仓库名/'
```

- 自动扫描 `blog/posts/*.html` 加入多页面构建
- `@tailwindcss/vite` 插件处理 CSS（替代 PostCSS）

### 部署流程

1. 推送 `main` 分支到 GitHub
2. GitHub Actions 自动运行 `.github/workflows/deploy.yml`
3. 构建产物部署到 GitHub Pages
4. 站点上线 → `https://huoxin-t.github.io`

### 轮播组件

纯 JS 实现，无第三方依赖（`src/main.js`）：

- 根据 `.carousel-slide` 数量自动生成底部圆点
- 5 秒自动播放，悬停暂停
- 左右箭头 + 触摸滑动
- 只有 1 张图时自动隐藏箭头和圆点

## 制作模板时需要做的事

将本项目提炼为可复用的 GitHub 模板，建议改动：

1. **抽取可配置项** — 将姓名、邮箱、GitHub 链接、技能标签等集中到一个配置文件或页面顶部变量
2. **替换示例内容** — 关于文字、项目描述、博客文章改为占位 Lorem ipsum
3. **清空 images/** — 删除占位 SVG，放一张示例截图 + 说明文档
4. **完善 README** — 写清楚如何克隆、修改、部署
5. **去掉个人邮箱** — 用 `you@example.com` 替代
6. **base 路径说明** — README 中解释 `/` vs `/仓库名/` 的区别
7. **GitHub 模板标记** — 在仓库 Settings 中勾选 "Template repository"

## 当前状态

- [x] 主页搭建完成（侧边栏 + 关于 + 作品集 + 联系）
- [x] 文章轮播组件完成
- [x] 博客系统完成（列表页 + 3篇文章）
- [x] GitHub Pages 部署成功
- [x] 暗色模式支持
- [x] 移动端响应式
- [ ] 作品集图片替换为实际截图
- [ ] 提炼为 GitHub 模板
