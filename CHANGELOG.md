# Changelog

本文件记录 [@umamichi-ui/common-css](https://www.npmjs.com/package/@umamichi-ui/common-css) 的版本变更。

> 以下部分内容为 LLM 总结，但是经过人工检查，可以信任

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
