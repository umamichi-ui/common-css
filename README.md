# @umamichi-ui/common-css

[![npm version](https://img.shields.io/npm/v/@umamichi-ui/common-css)](https://www.npmjs.com/package/@umamichi-ui/common-css)
[![license: LGPL-3.0-or-later](https://img.shields.io/badge/license-LGPL--3.0--or--later-blue.svg)](./LICENSE)
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

- styles/tokens.css：主题 token、链接 / header / sidebar / nav / content 语义变量、颜色、圆角、间距、深浅色变量。
- styles/reset.css：基础 reset、字体继承、链接和 theme-switching 钩子。
- styles/layout.css：page shell、header、panel、inline links、modal 容器。
- styles/forms.css：label、field、input、select、textarea、slider。
- styles/primitives.css：theme toggle、button 系列、status pill、callout、预览容器。
- styles/article.css：文章和说明文档类内容的排版层，按需单独引入。
- styles/index.css：默认入口，包含除 article 外的通用层。

## 为什么这样拆

四个项目共有的主要不是具体业务组件，而是这些层：

1. 语义 token：例如 --site-bg、--site-fg、--site-content-fg、--site-link、--site-header-bg、--site-sidebar-bg、--site-nav-active-bg、--site-border、--site-accent、--site-accent-soft。
2. 结构原语：例如 .page-shell、.page-header、.page-meta-row、.eyebrow、.inline-links、.panel。
3. 交互原语：例如 .theme-toggle、.primary-button、.secondary-button、.ghost-button、.status-pill。
4. 表单原语：统一的 label、text input、select、range、错误态和 focus ring。
5. 主题钩子：html.dark、html.theme-transition-lock。

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
2. 对项目独有样式，保留在本地 styles.css 中，避免公共包回到“巨型杂糅样式表”。
3. 若将来出现新的重复模式，优先新增语义化原语，不要把业务类名直接塞回共享层。

## 当前抽取依据

高重复项包括：

- --site-* 颜色和边框语义变量
- html.dark 深色主题切换
- html.theme-transition-lock 在切换期间禁用过渡与动画
- .page-shell / .page-header / .page-meta-row / .eyebrow / .inline-links
- .theme-toggle / .primary-button / .secondary-button / .ghost-button / .action-button / .status-pill
- label / input / select / textarea 的统一边框、圆角、focus 样式

这意味着后续如果你要统一调整边框层级、品牌 aqua、圆角或深色模式细节，优先改 styles/tokens.css，然后必要时改相应原语层即可。