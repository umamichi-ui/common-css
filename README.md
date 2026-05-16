# @umamichi-ui/common-css

[![npm version](https://img.shields.io/npm/v/@umamichi-ui/common-css)](https://www.npmjs.com/package/@umamichi-ui/common-css)
[![license: LGPL-3.0-or-later + MIT](https://img.shields.io/badge/license-LGPL--3.0--or--later%20%2B%20MIT-blue.svg)](./LICENSE)
[![github](https://img.shields.io/badge/GitHub-umamichi--ui%2Fcommon--css-24292f?logo=github)](https://github.com/umamichi-ui/common-css)

包链接：

- npm: https://www.npmjs.com/package/@umamichi-ui/common-css
- GitHub: https://github.com/umamichi-ui/common-css

> 以下内容为 ChatGPT 5.4 生成，但经过初步人工检查，可以作为参考

从以下项目的现有样式中抽取出的公共 CSS 层：

- C:\Users\Umamichi\Desktop\umamichi.moe
- C:\Users\Umamichi\Desktop\njmetro-railmap-creator
- C:\Users\Umamichi\Desktop\old2\old\kyuri-shmetro-line-id-block-generator
- C:\Users\Umamichi\Desktop\old2\kyuri-railroad-spline-experiment

目标不是把所有页面样式强行并表，而是稳定出一套可长期复用的共享基座，让多个项目能在一处修改 token 和基础原语后同步受益。

## 结构

- styles/core.css：最小基座（`colors.css` + `tokens.css`），单独引分层前必须先引它。
- styles/colors.css：原始色阶（`--theme-*`、`--gray-*`）。
- styles/tokens.css：浅色语义 token、圆角、间距。
- styles/tokens-dark.css：深色变量（`html.dark` 与系统 `prefers-color-scheme: dark`）；由 `core.css` 在 `tokens.css` 之后加载，勿单独引。
- styles/reset.css：基础 reset、字体继承、链接、`prefers-reduced-motion`、主题切换钩子。
- styles/layout.css：page shell、header、panel、inline links、modal 容器。
- styles/forms.css：在 `.form-scope` 内的表单控件；类名 `.text-input` / `.select-input` 可单独用于非原生控件。
- styles/primitives.css：theme toggle、button 系列、status pill、callout、预览容器。
- styles/article.css：文章排版层，按需单独引入；依赖 `core` 中的 token。
- styles/index.css：默认入口（`core` → reset → layout → forms → primitives），不含 article。

## 引入顺序与依赖

| 入口 | 包含 | 最低依赖 |
|------|------|----------|
| `@umamichi-ui/common-css` | 除 article 外全部 | 无（已按序 `@import`） |
| `@umamichi-ui/common-css/core.css` | 调色板 + 语义 token | 无 |
| `@umamichi-ui/common-css/reset.css` 等单层 | 仅该文件 | 须先引 `core.css`（或 `colors` + `tokens`） |
| `@umamichi-ui/common-css/article.css` | 文章排版 | 须先引 `core.css` 或完整包 |

不要只引 `primitives.css` / `forms.css` 而不引 token，否则 `--site-*` 未定义。

按需组合示例：

```ts
import '@umamichi-ui/common-css/core.css';
import '@umamichi-ui/common-css/reset.css';
import '@umamichi-ui/common-css/primitives.css';
```

## 主题契约

| `html` 类 | 行为 |
|-----------|------|
| （无） | 浅色 token；若系统为深色且未禁止，则跟随 `prefers-color-scheme: dark` |
| `dark` | 强制深色 |
| `light` | 强制浅色（覆盖系统深色） |

切换主题时可在 `<html>` 上短暂加上 `theme-transition-lock`，避免过渡闪烁（见 `reset.css`）。

站点可在 `:root` 或本地样式中覆盖 `--site-header-offset`（默认 `0px`），供 `.article-content` 标题 `scroll-margin` 使用。

## 表单作用域

原生 `input` / `textarea` / `select` 的统一样式仅在 **`.form-scope`** 内生效，避免污染第三方组件。迁移时在表单根节点加上该类：

```html
<form class="form-scope">…</form>
```

无 scope 时仍可用 **`.text-input`**、**`.select-input`** 显式挂在控件上。

## 原语类名（推荐 / 已废弃别名）

| 推荐 | 废弃别名（仍可用，勿在新代码使用） |
|------|-----------------------------------|
| `.content-surface` | `.content-panel` |
| `.status-pill.danger` | `.status-pill.error` |

布局：`.page-shell`、`.page-header`、`.panel`、`.form-grid`、`.controls-grid`  
表单：`.select-input`、`.text-input`  
按钮：`.primary-button`、`.secondary-button`、`.ghost-button`、`.action-button`、`.icon-button`、`.danger-button`、`.theme-toggle`  
状态：`.status-pill` + `.pending` / `.success` / `.warning` / `.danger`

## 为什么这样拆

四个项目共有的主要不是具体业务组件，而是这些层：

1. 语义 token：例如 --site-bg、--site-fg、--site-content-fg、--site-link、--site-header-bg、--site-sidebar-bg、--site-nav-active-bg、--site-border、--site-accent、--site-accent-soft；实心按钮与 [umamichi.moe](https://umamichi.moe)「GitHub 源文件」一致的 `--site-button-bg` / `--site-button-hover-bg` / `--site-button-active-bg` / `--site-button-fg`，以及主操作 `--site-button-accent-*`。
2. 结构原语：例如 .page-shell、.page-header、.page-meta-row、.eyebrow、.inline-links、.panel。
3. 交互原语：例如 .theme-toggle、.primary-button、.secondary-button、.ghost-button、.status-pill。
4. 表单原语：`.form-scope` 内 label、input、select、range、错误态与 `:focus-visible` 焦点环。
5. 主题钩子：`html.dark` / `html.light`、系统深色、`html.theme-transition-lock`。

不建议进入公共层的内容：

1. 特定业务布局，如地铁站表格、Spline 求解器指标面板、某个项目的图库或特定 SVG 预览区。
2. 单项目品牌资产，如字体检测卡片、线路色 class、网站专属 header/sidebar 细节。
3. 强依赖框架组件树的样式实现，例如 umamichi.moe 里 Chakra 组件的局部排布。

## 接入方式

Vite / React：

```ts
import '@umamichi-ui/common-css';
import '@umamichi-ui/common-css/article.css';
```

Astro：

```ts
import '@umamichi-ui/common-css';
```

如果页面包含长文内容，再追加：

```ts
import '@umamichi-ui/common-css/article.css';
```

## 迁移建议

1. 先让项目保留现有 styles.css，但把重复 token 和基础类名删除，改为直接使用本包提供的同名类和变量。
2. 在表单根节点添加 `class="form-scope"`（0.2.0 起原生控件样式不再全局生效）。
3. 对项目独有样式，保留在本地 styles.css 中，避免公共包回到“巨型杂糅样式表”。
4. 若将来出现新的重复模式，优先新增语义化原语，不要把业务类名直接塞回共享层。

## 当前抽取依据

高重复项包括：

- --site-* 颜色和边框语义变量
- html.dark / html.light、系统 `prefers-color-scheme: dark`、html.theme-transition-lock
- .page-shell / .page-header / .page-meta-row / .eyebrow / .inline-links
- .theme-toggle / .primary-button / .secondary-button / .ghost-button / .action-button / .status-pill
- .form-scope 内 label / input / select / textarea 的统一边框、圆角、:focus-visible 样式

这意味着后续如果你要统一调整边框层级、品牌 aqua、圆角或深色模式细节，优先改 styles/tokens.css，然后必要时改相应原语层即可。

## 许可证与兼容性（LGPL + MIT）

> 以下内容为 Codex 5.3 生成，未经过人工法律审查，请谨慎对待。  
> 仅供工程合规参考，不构成法律意见。

本项目整体以 `LGPL-3.0-or-later` 许可发布。  
同时，项目中包含少量来自第三方项目的代码/样式片段，这些片段保留其原始许可与版权声明。

当前已知第三方组件包括：

- GitHub Primer UI 的部分样式片段（MIT）
- 详见 `THIRD_PARTY_NOTICES.md` 及相关源文件头部声明

### 许可并存与适用范围

- 对本项目原创部分，适用 `LGPL-3.0-or-later`。
- 对第三方引入部分，继续适用其原始许可（如 MIT）。
- 分发本项目时，需同时满足：
  - LGPL 对本项目部分的要求；
  - 第三方许可（如 MIT）的署名与许可文本保留要求。

### 贡献说明（Contributing License Notice）

向本仓库提交贡献（如 PR/patch）即表示你同意：

- 你的原创贡献默认在 `LGPL-3.0-or-later` 下发布。
- 若贡献中包含第三方代码，你需明确来源并确保其许可与本仓库分发方式兼容。