# Markdown Html Presentation Skill - 主题功能说明

## 📦 v2.1.0 新增：主题系统

我已经为 Skill 添加了主题系统的基础架构，包含 5 个精心设计的预定义主题。

### ✨ 可用主题

#### 1. Philosophy Theme (哲学思辨)
**适用场景**: 哲学思考、智慧分享、文化传承

- 🎨 **配色**: 深黑 + 金色
- 📝 **字体**: Noto Serif SC/JP (衬线体)
- ✨ **特点**: 典雅深邃，包含中国传统文化元素

#### 2. Business Theme (商务简约)
**适用场景**: 商业汇报、企业介绍、项目展示

- 🎨 **配色**: 白色 + 蓝色
- 📝 **字体**: Arial, Helvetica
- ✨ **特点**: 专业简洁，数据可视化友好

#### 3. Minimal Theme (极简风格)
**适用场景**: 学术报告、技术分享、代码演示

- 🎨 **配色**: 纯白 + 黑色
- 📝 **字体**: Helvetica Neue
- ✨ **特点**: 极度简洁，突出内容

#### 4. Traditional Theme (传统文化)
**适用场景**: 国学经典、诗词鉴赏、文化课程

- 🎨 **配色**: 米白 + 中国红/墨黑
- 📝 **字体**: 方正书宋, 宋体
- ✨ **特点**: 水墨风格，古风雅致

#### 5. Dark Theme (暗黑模式)
**适用场景**: 技术演示、夜间演讲

- 🎨 **配色**: 深灰 + 青色
- 📝 **字体**: Roboto
- ✨ **特点**: 护眼舒适，科技感强

### 📁 已添加的文件

```
markdown-html-ppt/
├── scripts/
│   └── themes.py              ✅ 主题配置模块
└── references/
    ├── themes.md              ✅ 主题使用文档
    └── theme-integration.md   ✅ 主题集成指南
```

### 🔍 查看可用主题

```bash
cd /Users/skygreen/Documents/markdown-html-ppt
python3 scripts/themes.py
```

输出：
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

### 🚀 使用方法（v2.2.0+）

主题功能将在 **v2.2.0** 版本中完全集成到转换脚本。

**命令行方式**:
```bash
python scripts/md2presentation.py -i input.md -o output -f both --theme philosophy
```

**Python API 方式**:
```python
from scripts.md2presentation import convert_markdown_to_presentation

html_path, ppt_path = convert_markdown_to_presentation(
    markdown_file="input.md",
    output_path="output",
    output_format="both",
    theme="philosophy"
)
```

### 🎨 自定义主题

```python
from scripts.themes import create_custom_theme

my_theme = create_custom_theme(
    name='my-theme',
    background_color='#FFFFFF',
    primary_color='#FF5722',
    text_color='#212121',
    font_title='Georgia, serif',
    font_body='Arial, sans-serif'
)
```

### 📊 主题对比

| 主题 | 背景 | 主色 | 适用场景 | 视觉风格 |
|------|------|------|---------|---------|
| Philosophy | 深黑 #0D0D0D | 金色 #D4AF37 | 哲学、文化 | 典雅深邃 |
| Business | 白色 #FFFFFF | 蓝色 #2196F3 | 商务、项目 | 专业简洁 |
| Minimal | 白色 #FFFFFF | 黑色 #000000 | 学术、技术 | 极简纯粹 |
| Traditional | 米白 #FAF8F5 | 红/黑 #C41E3A | 国学、诗词 | 古风雅致 |
| Dark | 深灰 #1C1C1C | 青色 #00BCD4 | 技术、夜间 | 科技护眼 |

### 🛠️ 当前状态

**v2.1.0** (当前版本):
- ✅ 主题配置模块已完成
- ✅ 5 个预定义主题已实现
- ✅ 主题文档已完善
- ⏳ 主题集成到转换脚本（计划在 v2.2.0）

### 📅 开发路线图

**v2.2.0** (计划中):
- [ ] 完整集成主题系统
- [ ] 支持 `--theme` 命令行参数
- [ ] 支持 Python API `theme` 参数
- [ ] 生成主题预览文档

**v2.3.0** (规划中):
- [ ] 更多预定义主题
- [ ] 主题配置文件（YAML/JSON）
- [ ] 在线主题编辑器
- [ ] 主题市场/分享

### 📚 相关文档

- **references/themes.md** - 主题使用文档
- **references/theme-integration.md** - 主题集成指南（开发者参考）
- **scripts/themes.py** - 主题配置模块

### 💡 使用建议

1. **选择合适的主题**: 根据演示内容和场景选择主题
2. **保持一致性**: 同一系列演示使用相同主题
3. **自定义调整**: 可根据需要创建自定义主题
4. **预览效果**: 生成前先预览主题效果

### 🎯 总结

主题系统为演示文稿提供了：

✅ **多样化选择**: 5 个精心设计的主题  
✅ **专业配色**: 每个主题都有完整的配色方案  
✅ **灵活定制**: 支持自定义主题  
✅ **易于使用**: 简单的 API 和命令行接口  
✅ **一致性**: HTML 和 PowerPoint 保持一致的视觉效果

---

**当前版本**: v2.1.0  
**主题状态**: 基础架构已完成，完整集成计划在 v2.2.0  
**更新日期**: 2026-02-08
