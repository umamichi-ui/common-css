# 聊天记录：common-css 抽象建议、按钮变体与 0.3.0 原语

> 以下内容为 Auto（Cursor 智能体）根据 2026-05-16 对话整理，未经过人工逐字核对，仅作仓库内留档。

| 项 | 内容 |
|----|------|
| 相关仓库 | [umamichi-ui/common-css](https://github.com/umamichi-ui/common-css)、[njmetro-railmap-creator](https://github.com/Unnamed2964/njmetro-railmap-creator) |
| common-css 版本 | `0.3.0`（`outline-button` / `ghost-button`，以及本文档所列 1、2、3、4、12 项） |

---

## 对话摘要

1. 用户将站点工具栏五个按钮改为白底灰边；助手在 common-css `0.3.0` 增加 `.outline-button`，本项目改用该类并移除本地覆盖。
2. 用户问按钮 class 如何分级；助手建议 **基座（common-css）→ 变体（外观语义）→ 场景（布局钩子）** 三层，不要把描边样式绑在 `secondary-button` 上。
3. 用户问 **灰底填充次要按钮** 与 **白底描边按钮** 的用途区别；助手说明：成对决策流程用填充次要，工具栏/并列工具/与主 CTA 同屏用描边；表格行内铅笔编辑应继续用 `icon-button`。
4. 用户问 **0.3.0 之后** 本项目还有哪些适合抽象进 common-css；助手给出优先/谨慎/保留本地 三档清单。
5. 用户要求 **整合清单中的 1、2、3、4、12**，并把上述问答写入本 md 文件。

**0.3.0 已并入 common-css 的项：**

| # | 内容 | 位置 |
|---|------|------|
| 1 | `.visually-hidden` | `styles/reset.css` |
| 2 | `.confirm-dialog-backdrop` / `.confirm-dialog` / `-title` / `-body` / `-actions` | `styles/layout.css` |
| 3 | `.field-hint`、`.form-scope .field-label-checkbox` | `styles/forms.css` |
| 4 | `.dropdown-menu` 及子类（保留 `.download-format-menu-*` 废弃别名） | `styles/primitives.css` |
| 12 | `.example-gallery`、`.example-card`、`.example-modal-header` | `styles/layout.css` |

---

## 按钮 class 分级（建议）

### 第 1 层：基座（common-css，跨项目）

所有按钮共用的尺寸、圆角、`focus-visible`、`:disabled`、`:active` 位移等。当前由 `primary-button`、`secondary-button`、`outline-button` 等共享基座规则承担。

### 第 2 层：变体（外观 + 交互语义）

| 类名 | 外观 | 典型用途 |
|------|------|----------|
| `primary-button` | 主题色填充 | 保存、确认、主 CTA |
| `secondary-button` | 灰底填充 | 取消、弹窗次要、与 primary 成对 |
| `outline-button` | 表面色底 + 灰边 | 工具栏批量操作 |
| `ghost-button` | 透明底，hover 铺底 | 示例、弱文字操作 |
| `danger-button` | 危险色浅底 | 删除 |
| `icon-button` | 方形图标 | 表格行内编辑 |

同一按钮只选一个变体类。

### 第 3 层：场景 / 布局（各项目 `styles.css`）

例如 `station-reverse-list-button`、`download-format-menu-trigger`（布局钩子，不改配色体系）。避免用 `.station-section-toolbar .secondary-button` 这类父选择器改颜色。

---

## 灰底次要 vs 白底描边（语义）

| | 灰底 `secondary-button` | 描边 `outline-button` |
|---|---|---|
| 视觉重量 | 稍重，像正式按钮 | 更轻，不抢主 CTA |
| 典型场景 | 弹窗取消/确定中的「取消」 | 列表上方插入、反转等工具 |
| 心理模型 | 流程里的一步，优先级低一档 | 顺手用的工具，不是流程终点 |

表格行内编辑：**保持 `icon-button`**，不要改成 `outline-button` 或 `ghost-button`（无文字、高密度、重复出现）。

---

## common-css 抽象优先级（完整清单，供后续版本）

### 优先（0.3.0 已做：1、2、3、4、12）

见上表。

### 第二梯队（待 2+ 项目重复再抽）

- 应用壳层 `.app-layout` / `.app-topbar` / `.app-columns`
- 数据表 `.data-table`（斑马纹 + `.is-selected`）
- `.icon-button.is-subtle` 表格内弱化变体
- `.loading-overlay`
- `.section-stack` 区块分隔
- `.inline-badge` / `.tag-chip`

### 建议保留在各项目本地

- 业务字体 `@font-face`、Beta 角标
- `.station-*`、SVG 预览、RMG iframe
- `.generator-settings-grid` 等表单布局特例

### 与已有 common-css 的去重

- `.toolbar-hint` 已在 layout 定义语义色，本地仅补间距即可
- 确认框 backdrop 使用 `--site-backdrop`（0.3.0 已统一）
- `section-heading-row` 可对齐站点列表标题行

---

## 完整对话记录（摘录）

### 用户

请把之后插入-反转列表这5个按钮改为白底灰边

### 助手（要点）

在 `StationTable` 工具栏用描边样式；后在 common-css `0.3.0` 增加 `.outline-button`，移除 `.station-section-toolbar .secondary-button` 本地覆盖。

### 用户

你建议按钮的 css class 如何分级？

### 助手（要点）

基座 → 变体 → 场景；`outline-button` 不要再用 `secondary` + 父选择器覆盖。

### 用户

纯色底色的按钮和白底纯色边的按钮语义用途上一般有什么区别？

### 助手（要点）

成对决策用填充次要；并列工具与主 CTA 同屏用描边；`ghost` 更轻；表格行内仍用 `icon-button`。

### 用户

0.3.0？你建议本项目还有哪些内容考虑抽象进 common-css 以供复用呢？

### 助手（要点）

优先：visually-hidden、confirm-dialog、field-hint/checkbox、dropdown-menu、example-gallery；谨慎：app 双栏壳、data-table；本地保留：地铁业务、字体、SVG 预览等。

### 用户

你建议把表格每行的编辑按钮改为 outline-button 或 ghost-button 吗？

### 助手（要点）

不建议；继续 `icon-button`，可选 `.is-subtle` 修饰符而非换 outline/ghost。

### 用户

请整合 1、2、3、4、12，把上次问答写入 md 文件

### 助手（要点）

common-css `0.3.0` 实现上述原语；njmetro-railmap-creator 删除重复 CSS，下拉类名改为 `dropdown-menu`；留档为本文件。
