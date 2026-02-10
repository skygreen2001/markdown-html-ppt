# Markdown Html PPT Skill 使用指南

## 安装 Skill

### 方法 1：手动安装

1. 下载整个 `markdown-html-ppt` 文件夹
2. 将文件夹放置到 Skills 目录：
   - macOS/Linux: `~/.claude/skills/markdown-html-ppt`
   - Windows: `%USERPROFILE%\.claude\skills\markdown-html-ppt`
3. 重启 Claude Code 以加载 Skill

### 方法 2：从 GitHub 安装（如果已发布）

```bash
# 在 Claude Code 中执行
/plugin install markdown-html-ppt
```

## 使用方式

### 在 Claude 对话中使用

**示例 1：转换文件**

```
用户：请将 /Users/john/Documents/meeting-notes.md 转换为 PPT

Claude：好的，我来为您转换这个 Markdown 文件...
[调用 markdown-html-ppt skill]
[生成 PPT 文件]
[返回文件路径]
```

**示例 2：转换文本**

```
用户：请将以下内容转换为 PPT：

# 项目汇报
## 进展
- 完成需求分析
- 开始开发工作

Claude：好的，我来为您生成演示文稿...
[调用 markdown-html-ppt skill]
[生成 PPT 文件]
[返回文件路径]
```

### 直接调用脚本

```bash
# 基础用法
python scripts/md2ppt.py -i input.md -o output.pptx

# 添加标题
python scripts/md2ppt.py -i input.md -o output.pptx -t "我的演示"

# 查看帮助
python scripts/md2ppt.py --help
```

### 在 Python 代码中使用

```python
from scripts.md2ppt import convert_markdown_to_ppt

# 从文件转换
output = convert_markdown_to_ppt(
    markdown_file="notes.md",
    output_path="presentation.pptx"
)

# 从文本转换
markdown_text = """
# 标题
## 内容
- 要点1
- 要点2
"""

output = convert_markdown_to_ppt(
    markdown_content=markdown_text,
    output_path="output.pptx",
    title="自定义标题"
)

print(f"生成的文件: {output}")
```

## 工作流程

```
┌─────────────────┐
│ 用户输入        │
│ (文件/文本)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 读取 Markdown   │
│ 内容            │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 解析结构        │
│ (标题/列表/段落)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 创建幻灯片      │
│ (应用样式)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 保存 PPT 文件   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 返回文件路径    │
└─────────────────┘
```

## 自定义配置

### 修改颜色主题

编辑 `scripts/md2ppt.py`：

```python
# 找到 MarkdownToPPTConverter 类的初始化
converter = MarkdownToPPTConverter(
    bg_color=(28, 28, 28),      # 深灰色背景
    text_color=(255, 255, 255)  # 白色文字
)

# 修改为其他颜色，例如：
converter = MarkdownToPPTConverter(
    bg_color=(0, 51, 102),      # 深蓝色背景
    text_color=(255, 255, 255)  # 白色文字
)
```

### 调整字体大小

在 `MarkdownToPPTConverter` 类中修改：

```python
# 标题幻灯片
title_para.font.size = Pt(44)  # 修改为你想要的大小

# 副标题
subtitle_para.font.size = Pt(20)

# 内容幻灯片标题
title_para.font.size = Pt(28)

# 内容文本
p.font.size = Pt(14)
```

### 调整幻灯片尺寸

```python
# 在 __init__ 方法中修改
self.prs.slide_width = Inches(10)      # 宽度
self.prs.slide_height = Inches(5.625)  # 高度（16:9）

# 4:3 比例
self.prs.slide_width = Inches(10)
self.prs.slide_height = Inches(7.5)
```

## 高级用法

### 批量转换

创建批量转换脚本：

```python
import os
from pathlib import Path
from scripts.md2ppt import convert_markdown_to_ppt

input_dir = "/path/to/markdown/files"
output_dir = "/path/to/output"

for md_file in Path(input_dir).glob("*.md"):
    output_file = Path(output_dir) / f"{md_file.stem}.pptx"
    convert_markdown_to_ppt(
        markdown_file=str(md_file),
        output_path=str(output_file)
    )
    print(f"已转换: {md_file.name}")
```

### 自定义解析规则

如果需要自定义 Markdown 解析逻辑，修改 `parse_markdown` 方法：

```python
def parse_markdown(self, content: str) -> List[dict]:
    # 添加自定义解析规则
    # 例如：识别特殊标记、处理自定义格式等
    pass
```

## 故障排除

### 问题 1：导入错误

```
ModuleNotFoundError: No module named 'pptx'
```

**解决方案：**
```bash
pip install python-pptx
```

### 问题 2：文件编码错误

```
UnicodeDecodeError: 'utf-8' codec can't decode...
```

**解决方案：**
将 Markdown 文件转换为 UTF-8 编码

### 问题 3：权限错误

```
PermissionError: [Errno 13] Permission denied
```

**解决方案：**
- 检查输出目录是否有写入权限
- 更改输出路径到有权限的目录

### 问题 4：生成的 PPT 为空

**可能原因：**
- Markdown 内容格式不正确
- 没有识别到有效的标题

**解决方案：**
- 确保 Markdown 文件包含标题（#, ##, ###）
- 检查文件内容是否为空

## 性能优化

### 大文件处理

对于超过 100 张幻灯片的大文件：

1. 考虑拆分为多个文件
2. 使用批量转换功能
3. 优化内容结构，减少冗余

### 内存使用

转换大量文件时：

```python
# 每次转换后清理
import gc

for file in files:
    convert_markdown_to_ppt(file, output)
    gc.collect()  # 强制垃圾回收
```

## 最佳实践总结

1. ✅ **使用清晰的标题层级**
2. ✅ **每张幻灯片 5-8 个要点**
3. ✅ **标题简洁明了**
4. ✅ **优先使用列表格式**
5. ✅ **保持逻辑连贯**
6. ✅ **文件使用 UTF-8 编码**
7. ✅ **定期备份重要文件**

## 获取帮助

- 查看 [SKILL.md](SKILL.md) 了解详细功能
- 查看 [references/markdown-syntax.md](references/markdown-syntax.md) 了解支持的语法
- 查看 [references/example.md](references/example.md) 查看示例

## 反馈与贡献

欢迎提交问题和改进建议！
