# Changelog

本文件记录 [@umamichi-ui/common-css](https://www.npmjs.com/package/@umamichi-ui/common-css) 的版本变更。

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
