# Markdown Html Presentation Skill

将 Markdown 文档或文本快速转换为专业的演示文稿，支持 HTML（reveal.js）和 PowerPoint 两种输出格式，提供 5 个精美主题。

## 功能特性

✅ **双格式输出**：HTML（reveal.js）+ PowerPoint（.pptx）  
✅ **5 个精美主题**：Philosophy, Business, Minimal, Traditional, Dark  
✅ **智能解析**：自动识别 Markdown 结构（标题、列表、段落）  
✅ **自动分页**：内容超过 8 个要点时自动分页，避免拥挤  
✅ **专业设计**：每个主题都有完整的配色方案和字体设置  
✅ **灵活输入**：支持文件路径或直接文本输入  
✅ **即时生成**：快速输出可用的演示文稿

## 转换流程

```
Markdown 文档 → 解析结构 → reveal.js HTML → (可选) PowerPoint
```

## 输出格式对比

| 特性 | HTML (reveal.js) | PowerPoint |
|------|------------------|-----------|
| 打开方式 | 浏览器 | PowerPoint/WPS |
| 文件大小 | 小（~10-50KB） | 中（~50-200KB） |
| 可编辑性 | 需编辑代码 | 图形界面 |
| 交互性 | 高（键盘导航） | 中 |
| 适用场景 | 在线演示、快速分享 | 传统演示、需要编辑 |

详细对比请参考 [references/format-comparison.md](references/format-comparison.md)

## 快速开始

### 安装依赖

```bash
pip install python-pptx
```

### 基础使用

**方式 1：生成 HTML 演示文稿（使用默认主题）**

```python
from scripts.md2presentation import convert_markdown_to_presentation

html_path = convert_markdown_to_presentation(
    markdown_file="/path/to/document.md",
    output_path="/path/to/output.html",
    output_format="html"
)
```

**方式 2：生成 PowerPoint 文件（使用哲学主题）**

```python
ppt_path = convert_markdown_to_presentation(
    markdown_file="/path/to/document.md",
    output_path="/path/to/output.pptx",
    output_format="ppt",
    theme="philosophy"  # 指定主题
)
```

**方式 3：同时生成两种格式（使用商务主题）**

```python
html_path, ppt_path = convert_markdown_to_presentation(
    markdown_file="/path/to/document.md",
    output_path="/path/to/output",
    output_format="both",
    theme="business"  # 指定主题
)
```

**方式 4：命令行使用**

```bash
# 使用哲学主题生成 HTML
python scripts/md2presentation.py -i input.md -o output.html -f html --theme philosophy

# 使用商务主题生成 PowerPoint
python scripts/md2presentation.py -i input.md -o output.pptx -f ppt --theme business

# 使用极简主题同时生成两种格式
python scripts/md2presentation.py -i input.md -o output -f both --theme minimal

# 列出所有可用主题
python scripts/md2presentation.py --list-themes
```

## 文件结构

```
markdown-html-ppt/
├── SKILL.md                    # 技能主文档
├── README.md                   # 本文件
├── scripts/
│   └── md2presentation.py     # 核心转换脚本
├── references/
│   ├── markdown-syntax.md     # 支持的语法说明
│   ├── example.md             # 示例 Markdown 文档
│   └── format-comparison.md   # 格式对比说明
└── assets/
    └── (预留资源文件目录)
```

## 支持的 Markdown 语法

| 语法 | 说明 | 转换结果 |
|------|------|---------|
| `# 标题` | 一级标题 | 标题幻灯片 |
| `## 标题` | 二级标题 | 内容幻灯片标题 |
| `### 标题` | 三级标题 | 内容幻灯片标题 |
| `- 列表项` | 无序列表 | 幻灯片要点 |
| `1. 列表项` | 有序列表 | 幻灯片要点 |
| 段落文本 | 普通段落 | 幻灯片内容 |

详细语法说明请参考 [references/markdown-syntax.md](references/markdown-syntax.md)

## 可用主题

### 主题列表

| 主题 | 配色 | 适用场景 | 视觉风格 |
|------|------|---------|---------|
| **Philosophy** | 深黑 + 金色 | 哲学、文化 | 典雅深邃 |
| **Business** | 白色 + 蓝色 | 商务、项目 | 专业简洁 |
| **Minimal** | 白色 + 黑色 | 学术、技术 | 极简纯粹 |
| **Traditional** | 米白 + 红/黑 | 国学、诗词 | 古风雅致 |
| **Dark** | 深灰 + 青色 | 技术、夜间 | 科技护眼 |

### 主题详情

#### 1. Philosophy Theme (哲学思辨)
- **配色**: 深黑 (#0D0D0D) + 金色 (#D4AF37)
- **字体**: Noto Serif SC/JP (衬线体)
- **适用**: 哲学思考、智慧分享、文化传承
- **特点**: 包含中国传统文化元素，典雅深邃

#### 2. Business Theme (商务简约)
- **配色**: 白色 (#FFFFFF) + 蓝色 (#2196F3)
- **字体**: Arial, Helvetica
- **适用**: 商业汇报、企业介绍、项目展示
- **特点**: 简洁现代，专业严谨，数据可视化友好

#### 3. Minimal Theme (极简风格)
- **配色**: 纯白 (#FFFFFF) + 黑色 (#000000)
- **字体**: Helvetica Neue
- **适用**: 学术报告、技术分享、代码演示
- **特点**: 极度简洁，突出内容，无多余装饰

#### 4. Traditional Theme (传统文化)
- **配色**: 米白 (#FAF8F5) + 中国红 (#C41E3A)
- **字体**: 方正书宋, 宋体
- **适用**: 国学经典、诗词鉴赏、文化课程
- **特点**: 水墨风格，书法元素，古风排版

#### 5. Dark Theme (暗黑模式)
- **配色**: 深灰 (#1C1C1C) + 青色 (#00BCD4)
- **字体**: Roboto
- **适用**: 技术演示、夜间演讲
- **特点**: 护眼舒适，科技感强

### 查看所有主题

```bash
python scripts/md2presentation.py --list-themes
```

详细主题说明请参考 [references/themes.md](references/themes.md)

## 使用示例

### 示例 1：在线演示（HTML）

```markdown
# 周会总结

## 本周进展
- 完成功能 A 开发
- 修复 5 个 Bug
- 更新项目文档

## 下周计划
- 开始功能 B 开发
- 进行性能测试
```

生成 HTML 后，在浏览器中打开，使用方向键或空格键翻页。

### 示例 2：传统演示（PowerPoint）

```markdown
# 项目进度汇报

## 项目概况
- 项目名称：XXX 系统
- 开始时间：2026-01-01
- 当前进度：60%

## 已完成工作
- 需求分析
- 架构设计
- 核心功能开发
```

生成 PowerPoint 后，可使用 PowerPoint/WPS 打开编辑。

### 示例 3：同时生成两种格式

```bash
python scripts/md2presentation.py -i meeting-notes.md -o presentation -f both
```

得到：
- `presentation.html` - 用于在线演示
- `presentation.pptx` - 用于编辑和传统演示

## HTML 演示文稿特性

### reveal.js 功能

- **键盘导航**：方向键、空格键翻页
- **全屏模式**：按 `F` 键
- **概览模式**：按 `ESC` 键
- **幻灯片编号**：自动显示
- **过渡效果**：平滑的幻灯片切换

### CDN 配置

使用国内可访问的 BootCDN：
- `https://cdn.bootcdn.net/ajax/libs/reveal.js/4.5.0/`

### 自定义配置

编辑生成的 HTML 文件中的 JavaScript 部分：

```javascript
Reveal.initialize({
    hash: true,
    slideNumber: true,
    transition: 'slide',  // 可选: none/fade/slide/convex/concave/zoom
    center: false,
    width: 1280,
    height: 720
});
```

## PowerPoint 演示文稿特性

### 设计规范

- **幻灯片尺寸**：16:9（10 x 5.625 英寸）
- **背景色**：深灰色 RGB(28, 28, 28)
- **文字色**：白色 RGB(255, 255, 255)
- **标题字体**：28-44pt，加粗
- **正文字体**：14-16pt，常规

### 编辑功能

- ✅ 使用 PowerPoint/WPS 打开
- ✅ 可自由编辑内容和样式
- ✅ 可添加图片、视频、动画
- ✅ 可导出为 PDF
- ✅ 可打印为纸质版

## 配置选项

### 自定义 PowerPoint 颜色

编辑 `scripts/md2presentation.py`：

```python
ppt_generator = PowerPointGenerator(
    bg_color=(0, 51, 102),      # 深蓝色背景
    text_color=(255, 255, 255)  # 白色文字
)
```

### 自定义字体大小

在 `PowerPointGenerator` 类中修改：

```python
# 标题幻灯片
title_para.font.size = Pt(44)

# 内容幻灯片标题
title_para.font.size = Pt(28)

# 内容文本
p.font.size = Pt(14)
```

## 常见问题

### Q: 应该选择哪种输出格式？

A: 
- **在线演示、快速分享** → 选择 HTML
- **传统演示、需要编辑** → 选择 PowerPoint
- **不确定** → 选择同时生成两种格式

### Q: HTML 演示文稿需要网络吗？

A: 默认需要加载 CDN 资源，但可以下载 reveal.js 资源实现完全离线使用。

### Q: 生成的 PowerPoint 可以编辑吗？

A: 是的，生成的是标准 .pptx 文件，可以用 PowerPoint、WPS 等软件编辑。

### Q: 支持哪些 Markdown 语法？

A: 目前支持标题（#, ##, ###）、列表（-, *, 1.）和段落。不支持图片、链接、代码块等复杂语法。

### Q: 如何在 HTML 演示文稿中翻页？

A: 使用方向键、空格键翻页，按 `F` 键全屏，按 `ESC` 键查看概览。

### Q: 文件编码有要求吗？

A: Markdown 文件必须使用 UTF-8 编码。

## 最佳实践

1. **结构清晰**：使用明确的标题层级
2. **内容精简**：每张幻灯片 5-8 个要点
3. **标题简洁**：避免过长的标题
4. **列表优先**：优先使用列表格式
5. **逻辑连贯**：确保内容逻辑清晰
6. **格式选择**：根据使用场景选择合适的输出格式
7. **两者兼顾**：重要演示可同时生成两种格式

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 更新日志

### v2.4.0 (2026-02-08) - 当前版本 ⭐

- 修复：HTML 列表添加缩进（padding-left: 20px）
- 修复：列表项样式优化（list-style-position: inside）
- 修复：完善 Markdown 语法解析，所有格式正确显示
- 改进：优化内容高度计算，更精确防止溢出
- 改进：更新 SKILL.md 完整版本日志
- 验证：所有 Markdown 语法（**加粗**、*斜体*、`代码`、> 引用）正确渲染

### v2.3.1 (2026-02-08)

- 修复：HTML 标签正确闭合（`<ul>` 和 `</ul>` 配对）
- 修复：列表嵌套错误
- 改进：HTML 结构更清晰

### v2.3.0 (2026-02-08)

- 新增：行内格式支持（加粗、斜体、代码）
- 新增：块引用和代码块支持
- 新增：HTML 特殊字符自动转义
- 改进：行间距优化为 1.5 倍
- 改进：智能分页算法，根据内容高度动态调整
- 已知问题：HTML 标签闭合（已在 v2.3.1 修复）

### v2.2.0 (2026-02-08)

- 新增：完整集成主题系统，5 个精美主题
- 新增：`--theme` 命令行参数
- 新增：`--list-themes` 列出所有主题
- 新增：Python API `theme` 参数
- 改进：HTML 和 PowerPoint 主题一致性

### v2.1.0 (2026-02-08)

- 新增：自动分页功能，内容超过 8 个要点时自动分页
- 改进：提高演示文稿可读性
- 文档：新增自动分页说明文档

### v2.0.0 (2026-02-07)

- 新增：支持 HTML (reveal.js) 和 PowerPoint 双格式输出
- 新增：reveal.js 集成，交互式 Web 演示
- 改进：优化转换流程（Markdown → HTML → PPT）
- 改进：使用国内可访问的 CDN

### v1.0.0 (2026-02-07)

- 初始版本发布
- 支持基础 Markdown 语法
- 实现自动分页和样式设置

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件

---

**Made with ❤️ for efficient presentation creation**

**支持双格式输出，适应各种演示场景！**
