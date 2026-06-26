# Changelog

本文件记录 [@umamichi-ui/common-css](https://www.npmjs.com/package/@umamichi-ui/common-css) 的版本变更。

> 以下部分内容为 LLM 总结，但是经过人工检查，可以信任

## 0.13.0 - 2026-06-26

### Changed

- `article.css`：与 umamichi.moe 正文排版对齐（`h1` `2.5em`；`h1`/`h2` 字重 300，`h3`–`h6` 400，`b`/`strong` 600）；新增 `--article-weight-*`、`--article-pre-radius`、`--article-heading-scroll-margin` token；`line-height` 默认 `1.65`；补充 `picture`、`img height: auto`、更细的 `blockquote` 内边距。

### Added

- `article-interactive.css`：`.article-heading-anchor-copy` 标题锚点复制按钮样式（可选引入，依赖 `article.css`）。

## 0.12.0 - 2026-06-15

### Changed

- `--font-ui`：移除显式 CJK 字体族（Microsoft YaHei UI、Noto Sans SC、PingFang SC 等）；中文等字符改由 `sans-serif` 与系统回退处理。消费方若需固定 CJK 栈，请在本地覆盖 `--font-ui`。

## 0.11.0 - 2026-06-15

### Changed

- `--font-ui`：在保留 CJK 回退（Microsoft YaHei UI、Noto Sans SC、PingFang SC 等）的前提下，扩展拉丁与跨平台系统 UI 栈——`Segoe UI Variable` / `Segoe UI Variable Text` / `Segoe UI`、`-apple-system` / `BlinkMacSystemFont`、`Helvetica Neue` / `Helvetica` / `Arial`。

## 0.10.3 - 2026-06-12

### Added

- 可选 `--theme-*` 预置色板：`styles/palettes/yukari.css`（上海地铁 10 号线标识色 `#C6AFD4`，Harmonizer hue=312）。在 `<html>` 设置 `data-palette="yukari"` 后覆盖默认 Umamichi aqua；名 Yukari 取自結月ゆかり（Yuzuki Yukari）或东方 Project 角色八雲紫（Yakumo Yukari）。

## 0.10.2 - 2026-06-11

### Added

- `palettes.json` 的 `default` 与 `palettes[]` 各项新增 `swatch`：构建时从 `styles/colors.css`（默认）或各 palette 源文件的 `--theme-500` 解析，供菜单预览等 UI 使用。

## 0.10.1 - 2026-06-11

### Added

- 构建脚本 `scripts/generate-palettes.mjs`：根据 `styles/palettes/*.css` 生成 `styles/palettes/index.css`（聚合 `@import`）与 `dist/palettes.json`（`default` + `palettes[]`，每项 `id` / `label` / `intro`，无 `hue`）。
- 包导出：`@umamichi-ui/common-css/palettes`（`index.css`）、`@umamichi-ui/common-css/palettes.json`；`./palettes/*` 通配替代逐文件列出。
- 各 palette 源文件 `/* @palette` 元数据块（`label:`、`intro:`）；默认 aqua 文案在 `scripts/palette-default.json`。

### Changed

- README：可选调色板改为推荐 `import '@umamichi-ui/common-css/palettes'` 与 `palettes.json`；说明构建生成约定。

## 0.10.0 - 2026-06-11

### Added

- 可选 `--theme-*` 预置色板：`styles/palettes/satori.css`（南京地铁 S3 标识色 `#ba84ac`，Harmonizer hue=336）、`styles/palettes/kyuri.css`（若叶睦标识色 `#779977`，Harmonizer hue=145）。在 `<html>` 设置 `data-palette="satori"` 或 `data-palette="kyuri"` 后覆盖默认 Umamichi aqua；`--gray-*` 与 `--site-*` 语义映射不变。
- 包导出：`@umamichi-ui/common-css/palettes/satori.css`、`@umamichi-ui/common-css/palettes/kyuri.css`（构建产物在 `dist/palettes/`）。

### Changed

- README：新增「可选调色板」说明与预置列表；`colors.css` 描述为默认调色板。

## 0.9.0 - 2026-06-11

### Changed

- **破坏性**：npm 包发布 `dist/`（PostCSS 构建产物），不再直接发布 `styles/` 源码。`exports` 路径不变，但磁盘路径由 `styles/` 改为 `dist/`；若曾 deep-import `node_modules/@umamichi-ui/common-css/styles/...`，请改走包 `exports`。
- `styles/colors.css` 中 `--theme-100`～`--theme-900` 改为 `oklch()` 源码；`npm run build` 经 `@csstools/postcss-oklab-function` 生成 sRGB / Display P3 / OKLCH 层，`dist/colors.css` 含旧浏览器可用的 `rgb()` 回退。
- 新增 `prepare` / `prepublishOnly` 构建脚本；本地开发或 `file:` 链接后需已执行 `npm install`（触发 `prepare`）或手动 `npm run build`。

## 0.8.0

- 弹窗遮罩（`.modal-backdrop`、`.example-modal-backdrop`、`.site-overlay-backdrop`、`.confirm-dialog-backdrop`）合并为同一套全视口规则：`fixed` + `100vw` / `100dvh`；默认 `z-index: 1000`。移除 `.site-overlay-backdrop` 的 `z-index: auto`。`.confirm-dialog-backdrop` 为 `1020`，便于叠在其它浮层之上。
- `.form-scope` 内 `checkbox`、`radio`、`range`、`progress`、`meter`、`select` 及 `.select-input` 使用 `accent-color: var(--site-accent)`。
- `.article-content` 任务列表 checkbox 的 `accent-color` 改为 `var(--site-accent)`（原 `theme-500`）。
- 全局滚动条：`scrollbar-color` 与 WebKit `::-webkit-scrollbar*` 使用 `--site-accent` 与 `--site-surface-muted`（`scrollbar-width: thin`）。

## 0.7.11

- 浅色主题强调色上移：`--site-accent` 为 `theme-500`（原 `theme-700`）；`--site-accent-hover` 与 `--site-accent-strong` 为 `theme-400`（原 `theme-800`）。链接与焦点环等派生自 `--site-accent` 的样式同步变亮。

## 0.7.10

- 浅色主题和深色主题 `--site-button-accent-fg` 由 `theme-800` 改为 `theme-900`，与 `--site-header-fg` 一致。

## 0.7.9

- 深色主题灰色背景与侧栏边框上移一档：`--site-surface-muted` 为 `gray-800`（原 `gray-900`），`--site-sidebar-border` 为 `gray-700`（原 `gray-800`）；`html.dark` 与 `prefers-color-scheme: dark` 已同步。
- `prefers-color-scheme: dark` 下 `--site-header-fg` 与 `html.dark` 对齐为 `theme-900`。

## 0.7.8

- `--site-header-fg` 由 `theme-800` 改为 `theme-900`（浅色与深色已同步），水色顶栏前景对比度提高。

## 0.7.7

- 深色主题 `--site-surface` 改为 `var(--site-bg)`，与页面背景一致；`html.dark` 与 `prefers-color-scheme: dark` 块已同步。
- 深色主题色实心按钮：`--site-button-accent-bg` 为 `theme-400`，悬停 `theme-300`、按下 `theme-200`（较默认更亮）；前景 `--site-button-accent-fg` 为 `theme-800`。
- 新增 `--site-header-fg`（浅色与深色均为 `theme-800`），供水色顶栏前景使用。

## 0.7.6

- 回退 0.7.5：深色主题 `--site-bg`、`--site-surface` 恢复为 `#0d1117` / `#161b22`；`html.dark` 与 `prefers-color-scheme: dark` 块已同步。

## 0.7.5

- 深色主题 `--site-bg`、`--site-surface` 改为 `#000000`（原为 `#0d1117` / `#161b22`）；`html.dark` 与 `prefers-color-scheme: dark` 块已同步。

## 0.7.4

- 深色主题 `--site-header-bg` 由 `theme-600` 改为 `theme-400`，与浅色顶栏水色条带更接近；`html.dark` 与 `prefers-color-scheme: dark` 块已同步。

## 0.7.3

- `.article-content img`：设为 `display: block` 并 `margin-inline: auto`，在栏宽内水平居中。
- `.article-content table`：增加 `margin-inline: auto`；在 `width: max-content` 且未撑满栏宽时整体居中。

## 0.7.2

- `.confirm-dialog` 边框由 `--site-border` 改为 `--site-border-strong`，与 `.modal-card`、`.example-modal` 一致，浅色主题下确认框与编辑弹窗对比度对齐。

## 0.7.1

- 实心按钮默认背景对齐 palette **-200 / -800** 档：浅色 `--site-button-bg` 为 `gray-200`、主操作为 `theme-200`；深色次要按钮仍为 `gray-800`，主操作默认 `theme-800`（悬停/按下依次为 `700` / `600`）。
- 连带调整 `--site-button-hover-bg`、`--site-button-active-bg` 与 `--site-button-accent-*` 悬停/按下档，保持逐级加深（浅色）或提亮（深色主题色）。

## 0.7.0

- 新增 `--transition-overlay`（默认 `200ms ease`），用于弹层遮罩、面板与下拉菜单。
- 弹层：`.modal-backdrop`、`.example-modal-backdrop`、`.confirm-dialog-backdrop`、`.site-overlay-backdrop` 在挂载后加 `.is-open` 时淡入；子面板（`.modal-card`、`.confirm-dialog`、`.example-modal`、`.site-overlay-panel`）轻微上移淡入。
- 下拉：`.dropdown-menu-panel` / `.download-format-menu-panel` 在 `.is-open` 时淡入并下移归位。
- 全局链接（`reset` 内 `a`）：`color` 使用 `--transition-fast`。
- 消费方关闭弹层时应先去掉 `.is-open`、等待 `--transition-overlay` 时长后再卸载 DOM（可用 `prefers-reduced-motion` 已缩短过渡）。

## 0.6.0

- 对齐 Umamichi UI conventions 第 3 条：弹窗遮罩改为浅色半透明白 / 深色半透明黑毛玻璃（`backdrop-filter` + `--site-frosted-overlay`），不再以纯色 `--site-backdrop` 作为默认遮罩外观。
- 新增语义 token：`--site-frosted-blur`（默认 `12px`）、`--site-frosted-overlay`（浅色 `color-mix` 自 `--site-surface`，深色自 `--site-bg`）。
- `--site-backdrop` 保留为**回退**：不支持 `backdrop-filter`、或用户开启「减少透明度」时，`.modal-backdrop`、`.example-modal-backdrop`、`.confirm-dialog-backdrop` 仍使用该变量。
- 消费方若曾在本地为上述类重复实现毛玻璃，可在升级后删除重复覆盖，仅保留项目特例（如全屏预览、局部 loading 层）；自定义遮罩可复用 `--site-frosted-*` token。

## 0.5.0

- **破坏性**：`--theme-100`～`--theme-900` 全部换用 [Evil Martians Harmonizer](https://harmonizer.evilmartians.com/)（hue=213）生成色值；凡直接引用这些变量的界面（链接、强调色、页眉、accent 按钮等）色相与对比度会与 0.4.x 不同。
- **破坏性**：从 `colors.css` 移除 `--theme-950`、`--gray-950`。若项目直接引用，请改为 `900` 档或改用语义 token。
- `--gray-100`～`--gray-900` 色值未改。

## 0.4.0

- **破坏性**：从 `colors.css` 移除 palette 变量 `--theme-25`、`--theme-50`、`--theme-975`、`--gray-25`、`--gray-50`、`--gray-975`。若项目直接引用这些变量，请改为 `100` 档或改用语义 token（如 `--site-surface-muted`、`--site-accent-soft`）。
- 浅色 `--site-surface-muted` 改为 `var(--gray-100)`（原为 `var(--gray-50)`）。
- 浅色 `--site-accent-soft` 改为 `var(--theme-100)`（原为 `var(--theme-50)`）。

## 0.3.1

- 浅色 `--site-header-bg` 改为 `var(--theme-200)`（原为 `var(--theme-100)`）。
- 浅色 `--site-accent` / `--site-accent-hover` 改为 `var(--theme-700)` / `var(--theme-800)`，与 [umamichi.moe](https://umamichi.moe) 文章区链接色一致（原为 `theme-600` / `theme-700`）；`--site-link` 随 `--site-accent` 更新。
- 下拉菜单 chevron（`.dropdown-menu-chevron`、`.download-format-menu-chevron`）：改为 `inline-block` 并收紧行高，改善 SVG 与文字对齐。

## 0.3.0

- 新增 `.outline-button`、`.ghost-button`、`.danger-button` 及跨项目原语（确认框、下拉菜单、示例图库等）。详见 `docs/chat-2026-05-16-abstraction-and-button-variants.md`。

## 0.2.0

- 表单样式收拢至 `.form-scope`；新增 `core.css` / `tokens-dark.css` 与主题契约。详见 `docs/chat-2026-05-16-css-review-and-0.2.0.md`。
