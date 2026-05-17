# Changelog

本文件记录 [@umamichi-ui/common-css](https://www.npmjs.com/package/@umamichi-ui/common-css) 的版本变更。

## 0.3.1

- 浅色 `--site-header-bg` 改为 `var(--theme-200)`（原为 `var(--theme-100)`）。
- 浅色 `--site-accent` / `--site-accent-hover` 改为 `var(--theme-700)` / `var(--theme-800)`，与 [umamichi.moe](https://umamichi.moe) 文章区链接色一致（原为 `theme-600` / `theme-700`）；`--site-link` 随 `--site-accent` 更新。
- 下拉菜单 chevron（`.dropdown-menu-chevron`、`.download-format-menu-chevron`）：改为 `inline-block` 并收紧行高，改善 SVG 与文字对齐。

## 0.3.0

- 新增 `.outline-button`、`.ghost-button`、`.danger-button` 及跨项目原语（确认框、下拉菜单、示例图库等）。详见 `docs/chat-2026-05-16-abstraction-and-button-variants.md`。

## 0.2.0

- 表单样式收拢至 `.form-scope`；新增 `core.css` / `tokens-dark.css` 与主题契约。详见 `docs/chat-2026-05-16-css-review-and-0.2.0.md`。
