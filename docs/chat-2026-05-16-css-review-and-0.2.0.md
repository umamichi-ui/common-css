# 聊天记录：common-css 评审与 0.2.0 重构

> 以下内容为 Auto（Cursor 智能体）根据 2026-05-16 对话整理，未经过人工逐字核对，仅作仓库内留档。  

| 项 | 内容 |
|----|------|
| 仓库 | [umamichi-ui/common-css](https://github.com/umamichi-ui/common-css) |
| 相关提交 | `34a095a` — `feat!: scope forms, add core entry, and refine theming by vibe coding` |
| 版本 | `0.1.13` → `0.2.0` |

---

## 对话摘要

1. 用户请从软件工程与前端最佳实践角度评价本包 CSS。
2. 助手给出结构化评价（优点 6 类、短板 10 条、对照表）。
3. 用户要求先落实评价中的第 **1、2、4、5、6、7、8、10** 条改进。
4. 助手实现：`form-scope`、重命名布局/表单类、`core.css` / `tokens-dark.css`、主题契约、`prefers-reduced-motion`、焦点环统一、`--site-header-offset`、README 文档等，并 bump `0.2.0`。
5. 用户要求删除从 solver 应用误提取的 `.solver-*` 类。
6. 助手从 `layout.css`、`forms.css`、README 中移除 `.solver-controls-grid`、`.solver-select`。
7. 用户要求提交；助手创建含 `primary prompts` 的破坏性变更提交。
8. 用户要求将聊天记录写入 `docs/` 下且不打入 npm 包（本文件）。

---

## 完整对话记录

### 用户

从软件工程和前端最佳实践的角度评价该css

### 助手（要点）

**总体判断：** 意图清晰、可维护性较好的共享样式基座；定位是「约定式 class + CSS 变量」，不是完整 UI 框架。

**做得好的地方：**

- 模块化与 `package.json` 子路径导出、`sideEffects` 声明
- `colors` / `--site-*` token 分层，`html.dark`，`color-mix`
- `@layer umamichi-*` 级联控制
- `article.css` 按需引入
- `:focus-visible`、`aria-invalid`、`aria-current`、`theme-transition-lock`
- 与 Umamichi UI 约定一致（分隔线、backdrop、紧凑控件）

**需改进（原编号）：**

| # | 问题 | 建议方向 |
|---|------|----------|
| 1 | 全局 `input`/`textarea`/`select` 影响面大 | `.form-scope` opt-in |
| 2 | `.solver-controls-grid`、`.solver-select` 等业务泄漏 | 通用命名或迁出 |
| 3 | 断点未 token 化 | （本次未要求改） |
| 4 | 表单 `:focus` 与按钮焦点策略不一致 | 统一 `:focus-visible` + outline |
| 5 | 无 `prefers-reduced-motion` | reset / primitives 补充 |
| 6 | 仅 `html.dark`，无系统跟随 | 文档 + 可选 `prefers-color-scheme` |
| 7 | `--site-header-offset` 未在 token 定义 | 默认值 + 文档 |
| 8 | 类名别名多、缺清单 | README 原语表 |
| 9 | 无 Stylelint / 视觉回归 | （本次未要求改） |
| 10 | 单层 import 易缺 token | `core.css` + 依赖说明 |

---

### 用户

请先修改1、2、4、5、6、7、8、10

### 助手（已落地的代码与文档变更）

**1 — 表单作用域**

- `forms.css`：原生控件与 `.field-block`、`.slider-*` 等仅在 `.form-scope` 内生效。
- `.text-input`、`.select-input` 仍可在任意处显式使用。

**2 — 业务类名（当时保留别名，见后文删除）**

- `.solver-controls-grid` → `.controls-grid`
- `.solver-select` → `.select-input`

**4 — 焦点**

- 表单改为 `:focus-visible` + `outline: 2px solid var(--site-focus-ring)`，与按钮一致。

**5 — 减少动效**

- `reset.css`：`prefers-reduced-motion: reduce` 下缩短 transition/animation。
- `primitives.css`：减少动效时取消按钮 active 的 `translateY`。

**6 — 主题**

- 新增 `styles/tokens-dark.css`（`html.dark` + `prefers-color-scheme: dark` 且 `html:not(.light):not(.dark)`）。
- `html.light` 强制浅色。
- README「主题契约」表。

**7 — 变量**

- `:root` 增加 `--site-header-offset: 0px`。

**8 — 原语文档**

- README：原语推荐名、废弃别名（`.content-panel`、`.status-pill.error`）。
- CSS 内注释标注废弃别名。

**10 — 依赖与入口**

- 新增 `styles/core.css`（`colors` + `tokens`），`package.json` 导出 `./core.css`。
- `index.css` 改为 `@import './core.css'` 再引各层。
- 各 CSS 文件头注释依赖；README「引入顺序与依赖」表。

**版本：** `package.json` → `0.2.0`。

---

### 用户

请删除原称 .solver-* 的几个 css 类，这是从某个称为 solver 的应用由 llm 提取的，似乎只适用于那一项目

### 助手

- 从 `layout.css` 删除 `.solver-controls-grid`（保留 `.controls-grid`）。
- 从 `forms.css` 删除全部 `.solver-select` 规则（保留 `.select-input`）。
- 从 README 原语表与迁移说明中移除 solver 相关条目。

---

### 用户

请提交

### 助手

创建提交 `34a095a`：

```
feat!: scope forms, add core entry, and refine theming by vibe coding

BREAKING CHANGE: native form controls require .form-scope; use
.select-input and .controls-grid instead of removed .solver-* classes.
```

含 `primary prompts` 四条（评价、改 1/2/4/5/6/7/8/10、删 solver、提交）。

---

### 用户

请把聊天记录写在一个不打包进 npm 包的 docs/ 下的一个 md 文件中

### 助手

撰写本文件。`package.json` 的 `"files"` 仅含 `styles`、`README.md`、`THIRD_PARTY_NOTICES.md`，故 `docs/` 不会发布到 npm。

---

## 迁移备忘（给下游项目）

| 变更 | 操作 |
|------|------|
| 0.2.0 表单 | 在表单根节点加 `class="form-scope"` |
| 已删除类名 | `.solver-controls-grid` → `.controls-grid`；`.solver-select` → `.select-input` |
| 推荐入口 | `import '@umamichi-ui/common-css'` 或先 `core.css` 再按需引层 |
| 主题 | `html.dark` / `html.light` / 无类名（可跟系统深色） |

---

## 相关文件一览（0.2.0）

| 文件 | 说明 |
|------|------|
| `styles/core.css` | 最小 token 基座 |
| `styles/tokens-dark.css` | 深色变量（勿单独依赖，经 `tokens.css` 引入） |
| `styles/forms.css` | `.form-scope` 表单 |
| `styles/index.css` | 默认 bundle（不含 article） |
| `README.md` | 结构、依赖、主题、原语表 |

---

## 许可说明

本聊天记录文档为仓库内说明性文字；若对外转载，默认倾向 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)，与 Umamichi 文本类内容惯例一致。代码变更本身仍以仓库根目录 `LICENSE` 为准。
