# 主题配置文件

## 可用主题

### 1. Philosophy Theme (哲学思辨)
**适用场景**: 哲学思考、智慧分享、文化传承类内容

**配色方案**:
- 背景色: #0D0D0D (深黑色)
- 主色调: #D4AF37 (金色)
- 文字色: #FAFAFA (白色)
- 强调色: #D4AF37 (金色)

**字体**:
- 标题: Noto Serif SC (中文) / Noto Serif JP (日文)
- 正文: Noto Serif SC (中文) / Noto Serif JP (日文)

**特点**:
- 包含中国传统文化元素装饰
- 阴阳图案
- 印章风格
- 深邃典雅的视觉效果

### 2. Business Theme (商务简约)
**适用场景**: 商业汇报、企业介绍、项目展示

**配色方案**:
- 背景色: #FFFFFF (纯白色) 或 #F5F5F5 (浅灰色)
- 主色调: #2196F3 (蓝色) 或 #0D47A1 (商务蓝)
- 文字色: #333333 (深灰色)
- 强调色: #2196F3 (蓝色)

**字体**:
- 标题: Arial, Helvetica, 微软雅黑
- 正文: Arial, Helvetica, 微软雅黑

**特点**:
- 简洁现代
- 专业严谨
- 数据可视化友好
- 清晰的层次结构

### 3. Minimal Theme (极简风格)
**适用场景**: 学术报告、技术分享、代码演示

**配色方案**:
- 背景色: #FFFFFF (纯白色)
- 主色调: #000000 (黑色)
- 文字色: #000000 (黑色)
- 强调色: #666666 (深灰色)

**字体**:
- 标题: Helvetica Neue, Arial
- 正文: Helvetica Neue, Arial

**特点**:
- 极度简洁
- 突出内容
- 无多余装饰
- 高对比度

### 4. Traditional Theme (传统文化)
**适用场景**: 国学经典、诗词鉴赏、文化课程

**配色方案**:
- 背景色: #FAF8F5 (米白色)
- 主色调: #C41E3A (中国红) 或 #1A1A1A (墨黑色)
- 文字色: #1A1A1A (深黑色)
- 强调色: #C41E3A (中国红)

**字体**:
- 标题: 方正书宋, 宋体, Noto Serif SC
- 正文: 方正书宋, 宋体, Noto Serif SC

**特点**:
- 水墨风格
- 书法元素
- 古风排版
- 传统美学

### 5. Dark Theme (暗黑模式)
**适用场景**: 技术演示、夜间演讲、视觉舒适

**配色方案**:
- 背景色: #1C1C1C (深灰黑)
- 主色调: #00BCD4 (青色)
- 文字色: #E0E0E0 (浅灰色)
- 强调色: #00BCD4 (青色)

**字体**:
- 标题: Roboto, 微软雅黑
- 正文: Roboto, 微软雅黑

**特点**:
- 护眼舒适
- 科技感强
- 适合长时间观看

## 布局类型

### Title Slide (标题页)
- 居中显示标题和副标题
- 大型展示效果
- 适合章节开始
- 可选背景图案

### Content Slide (内容页)
- 左侧标题对齐
- 项目符号列表
- 支持多级嵌套
- 清晰的内容层次

### Quote Slide (引用页)
- 居中引用样式
- 斜体文字
- 适合名人名言
- 引用来源标注

### Table Slide (表格页)
- 自动生成表格
- 支持表头高亮
- 数据对齐优化
- 清晰的行列分隔

### Image Slide (图片页)
- 图片居中展示
- 可选标题和说明
- 支持图片缩放
- 保持宽高比

### Two Column Slide (双栏页)
- 左右分栏布局
- 适合对比展示
- 灵活的内容分配
- 支持图文混排

## 使用方法

### 命令行指定主题

```bash
# 使用哲学主题
python scripts/md2presentation.py -i input.md -o output -f both --theme philosophy

# 使用商务主题
python scripts/md2presentation.py -i input.md -o output -f both --theme business

# 使用极简主题
python scripts/md2presentation.py -i input.md -o output -f both --theme minimal

# 使用传统主题
python scripts/md2presentation.py -i input.md -o output -f both --theme traditional

# 使用暗黑主题
python scripts/md2presentation.py -i input.md -o output -f both --theme dark
```

### Python API 指定主题

```python
from scripts.md2presentation import convert_markdown_to_presentation

# 使用哲学主题
html_path, ppt_path = convert_markdown_to_presentation(
    markdown_file="input.md",
    output_path="output",
    output_format="both",
    theme="philosophy"
)

# 使用商务主题
html_path, ppt_path = convert_markdown_to_presentation(
    markdown_file="input.md",
    output_path="output",
    output_format="both",
    theme="business"
)
```

### 自定义主题

可以创建自定义主题配置文件：

```python
custom_theme = {
    'name': 'my-theme',
    'background_color': '#FFFFFF',
    'primary_color': '#FF5722',
    'text_color': '#212121',
    'accent_color': '#FF5722',
    'font_title': 'Arial',
    'font_body': 'Arial'
}

html_path, ppt_path = convert_markdown_to_presentation(
    markdown_file="input.md",
    output_path="output",
    output_format="both",
    custom_theme=custom_theme
)
```

## 主题对比

| 主题 | 背景 | 主色 | 适用场景 | 视觉风格 |
|------|------|------|---------|---------|
| Philosophy | 深黑 | 金色 | 哲学、文化 | 典雅深邃 |
| Business | 白色 | 蓝色 | 商务、项目 | 专业简洁 |
| Minimal | 白色 | 黑色 | 学术、技术 | 极简纯粹 |
| Traditional | 米白 | 红/黑 | 国学、诗词 | 古风雅致 |
| Dark | 深灰 | 青色 | 技术、夜间 | 科技护眼 |

## 主题预览

每个主题都包含完整的配色方案和排版样式，确保在 HTML 和 PowerPoint 两种格式中都能呈现一致的视觉效果。

详细的主题实现请参考 `scripts/themes.py` 文件。
