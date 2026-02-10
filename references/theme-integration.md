# 主题功能集成指南

## 当前状态

**v2.1.0** 版本已经包含了主题系统的基础架构：

- ✅ `scripts/themes.py` - 主题配置模块
- ✅ `references/themes.md` - 主题使用文档
- ⏳ 主题集成到转换脚本（计划在 v2.2.0）

## 已实现的主题

1. **Philosophy Theme** (哲学思辨) - 深黑金色，典雅深邃
2. **Business Theme** (商务简约) - 白蓝配色，专业简洁
3. **Minimal Theme** (极简风格) - 黑白配色，纯粹简约
4. **Traditional Theme** (传统文化) - 米白红黑，古风雅致
5. **Dark Theme** (暗黑模式) - 深灰青色，科技护眼

## 快速使用（v2.2.0+）

### 命令行方式

```bash
# 使用哲学主题
python scripts/md2presentation.py -i input.md -o output -f both --theme philosophy

# 使用商务主题
python scripts/md2presentation.py -i input.md -o output -f both --theme business
```

### Python API 方式

```python
from scripts.md2presentation import convert_markdown_to_presentation

html_path, ppt_path = convert_markdown_to_presentation(
    markdown_file="input.md",
    output_path="output",
    output_format="both",
    theme="philosophy"  # 指定主题
)
```

## 当前版本使用方法

在 v2.1.0 中，您可以通过以下方式预览主题：

```bash
# 查看所有可用主题
python scripts/themes.py
```

输出示例：
```
可用主题:

  philosophy      - Philosophy Theme (哲学思辨)
                    适用于哲学思考、智慧分享、文化传承类内容

  business        - Business Theme (商务简约)
                    适用于商业汇报、企业介绍、项目展示

  minimal         - Minimal Theme (极简风格)
                    适用于学术报告、技术分享、代码演示

  traditional     - Traditional Theme (传统文化)
                    适用于国学经典、诗词鉴赏、文化课程

  dark            - Dark Theme (暗黑模式)
                    适用于技术演示、夜间演讲、视觉舒适
```

## 集成步骤（开发者参考）

### 步骤 1：导入主题模块

在 `md2presentation.py` 中添加：

```python
from themes import get_theme, Theme
```

### 步骤 2：修改生成器类

#### RevealJSGenerator 添加主题支持

```python
class RevealJSGenerator:
    @staticmethod
    def generate(slides_data: List[dict], title: str = "演示文稿", theme: Theme = None) -> str:
        if theme is None:
            from themes import get_theme
            theme = get_theme('default')
        
        # 使用主题的 CSS
        custom_css = theme.get_reveal_css()
        
        # 在 HTML 中应用主题样式
        html = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    ...
    <style>
        {custom_css}
    </style>
</head>
...
```

#### PowerPointGenerator 添加主题支持

```python
class PowerPointGenerator:
    def __init__(self, theme: Theme = None):
        if theme is None:
            from themes import get_theme
            theme = get_theme('default')
        
        self.prs = Presentation()
        self.prs.slide_width = Inches(10)
        self.prs.slide_height = Inches(5.625)
        
        # 使用主题颜色
        self.bg_color = theme.get_bg_rgb()
        self.text_color = theme.get_text_rgb()
        self.primary_color = theme.get_primary_rgb()
```

### 步骤 3：修改主函数

```python
def convert_markdown_to_presentation(
    markdown_content: Optional[str] = None,
    markdown_file: Optional[str] = None,
    output_path: str = "presentation",
    output_format: str = "html",
    title: Optional[str] = None,
    theme: str = "default"  # 新增参数
) -> Union[str, Tuple[str, str]]:
    
    # 获取主题
    from themes import get_theme
    theme_obj = get_theme(theme)
    
    # 生成 HTML 时传入主题
    if output_format in ("html", "both"):
        html_generator = RevealJSGenerator()
        html_content = html_generator.generate(slides_data, title, theme_obj)
    
    # 生成 PowerPoint 时传入主题
    if output_format in ("ppt", "both"):
        ppt_generator = PowerPointGenerator(theme_obj)
        ...
```

### 步骤 4：添加命令行参数

```python
def main():
    parser = argparse.ArgumentParser(...)
    
    # 添加主题参数
    parser.add_argument(
        '--theme',
        choices=['philosophy', 'business', 'minimal', 'traditional', 'dark', 'default'],
        default='default',
        help="演示文稿主题"
    )
    
    args = parser.parse_args()
    
    result = convert_markdown_to_presentation(
        ...,
        theme=args.theme  # 传递主题参数
    )
```

## 自定义主题

### 创建自定义主题

```python
from scripts.themes import create_custom_theme

# 创建自定义主题
my_theme = create_custom_theme(
    name='my-awesome-theme',
    background_color='#FFFFFF',
    primary_color='#FF5722',
    text_color='#212121',
    accent_color='#FF5722',
    font_title='Georgia, serif',
    font_body='Arial, sans-serif'
)

# 使用自定义主题
html_path, ppt_path = convert_markdown_to_presentation(
    markdown_file="input.md",
    output_path="output",
    output_format="both",
    custom_theme=my_theme  # 传递自定义主题对象
)
```

### 添加新主题到配置

编辑 `scripts/themes.py`，在 `THEMES` 字典中添加：

```python
THEMES = {
    ...
    
    'my_theme': {
        'name': 'My Theme (我的主题)',
        'background_color': '#FFFFFF',
        'primary_color': '#FF5722',
        'text_color': '#212121',
        'accent_color': '#FF5722',
        'font_title': 'Georgia, serif',
        'font_body': 'Arial, sans-serif',
        'description': '我的自定义主题'
    }
}
```

## 主题预览

### 生成主题预览

```bash
# 为每个主题生成示例演示文稿
for theme in philosophy business minimal traditional dark; do
    python scripts/md2presentation.py \
        -i references/example.md \
        -o preview-$theme \
        -f both \
        --theme $theme
done
```

## 测试主题

```bash
# 测试主题模块
python scripts/themes.py

# 测试单个主题
python -c "
from scripts.themes import get_theme

theme = get_theme('philosophy')
print(f'主题: {theme.name}')
print(f'背景: {theme.background_color}')
print(f'主色: {theme.primary_color}')
print(f'文字: {theme.text_color}')
"
```

## 路线图

### v2.2.0（计划中）
- [ ] 完整集成主题系统到转换脚本
- [ ] 支持命令行 `--theme` 参数
- [ ] 支持 Python API `theme` 参数
- [ ] 生成主题预览文档

### v2.3.0（规划中）
- [ ] 支持更多预定义主题
- [ ] 主题配置文件（YAML/JSON）
- [ ] 在线主题编辑器
- [ ] 主题市场/分享平台

## 贡献主题

欢迎贡献新主题！提交主题时请包含：

1. 主题配置（颜色、字体）
2. 主题说明（适用场景）
3. 预览截图
4. 使用示例

## 相关文档

- `references/themes.md` - 主题使用文档
- `scripts/themes.py` - 主题配置模块
- `CHANGELOG.md` - 版本更新记录

---

**注意**: 主题功能将在 v2.2.0 版本中完全集成。当前版本（v2.1.0）已包含主题配置模块，可供开发者参考和扩展。
