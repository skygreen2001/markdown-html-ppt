# Markdown Html PPT Skill - 目录结构

```
markdown-html-ppt/
│
├── SKILL.md                      # 主技能文档（必需）
│   ├── YAML frontmatter          # 包含 name 和 description
│   └── Markdown 指令             # 详细使用说明
│
├── README.md                     # 项目说明文档
├── USAGE.md                      # 详细使用指南
├── LICENSE                       # MIT 许可证
├── requirements.txt              # Python 依赖
├── .gitignore                    # Git 忽略文件
│
├── scripts/                      # 可执行脚本目录
│   └── md2ppt.py                # 核心转换脚本
│       ├── MarkdownToPPTConverter  # 转换器类
│       ├── convert_markdown_to_ppt # 转换函数
│       └── main()                  # 命令行入口
│
├── references/                   # 参考文档目录
│   ├── markdown-syntax.md       # 支持的 Markdown 语法说明
│   └── example.md               # 示例 Markdown 文档
│
└── assets/                       # 资源文件目录（预留）
    └── (图标、模板等资源)
```

## 文件说明

### 核心文件

#### SKILL.md
- **作用**：Skill 的主文档，定义技能的功能和使用方法
- **结构**：
  - YAML frontmatter（name, description, license）
  - 功能概述
  - 使用流程
  - 转换规则
  - 设计规范
  - 注意事项
  - 使用示例

#### scripts/md2ppt.py
- **作用**：核心转换脚本
- **功能**：
  - 解析 Markdown 结构
  - 创建 PowerPoint 幻灯片
  - 应用样式和格式
  - 保存 PPT 文件
- **使用方式**：
  - 命令行：`python md2ppt.py -i input.md -o output.pptx`
  - Python 导入：`from md2ppt import convert_markdown_to_ppt`

### 文档文件

#### README.md
- 项目概述
- 快速开始
- 功能特性
- 使用示例
- 常见问题

#### USAGE.md
- 详细安装指南
- 多种使用方式
- 自定义配置
- 高级用法
- 故障排除

#### references/markdown-syntax.md
- 支持的 Markdown 语法
- 转换规则说明
- 最佳实践
- 不支持的语法列表

#### references/example.md
- 完整的示例 Markdown 文档
- 展示各种语法的使用
- 可直接用于测试转换

### 配置文件

#### requirements.txt
- Python 依赖列表
- 版本要求

#### LICENSE
- MIT 开源许可证

#### .gitignore
- Git 版本控制忽略规则

## 设计理念

### 三层架构

1. **Metadata 层（元数据）**
   - 文件：SKILL.md frontmatter
   - 内容：name + description
   - 作用：让 Claude 识别何时使用此技能

2. **Body 层（主体）**
   - 文件：SKILL.md body
   - 内容：详细使用说明、规则、示例
   - 作用：指导 Claude 如何使用此技能

3. **Resources 层（资源）**
   - 文件：scripts/, references/, assets/
   - 内容：可执行脚本、参考文档、资源文件
   - 作用：提供实际执行能力和参考资料

### 模块化设计

- **scripts/**：可执行代码，token 高效
- **references/**：参考文档，按需加载
- **assets/**：资源文件，用于输出

## 扩展指南

### 添加新功能

1. 在 `scripts/md2ppt.py` 中添加新方法
2. 在 `SKILL.md` 中更新使用说明
3. 在 `references/` 中添加相关文档
4. 在 `README.md` 中更新功能列表

### 添加新的参考文档

1. 在 `references/` 目录创建新的 .md 文件
2. 在 `SKILL.md` 中添加链接引用
3. 更新 README.md 的文档列表

### 添加资源文件

1. 在 `assets/` 目录添加文件
2. 在相关文档中引用
3. 更新 .gitignore（如需要）

## 版本管理

### 版本号规则

遵循语义化版本（Semantic Versioning）：

- **主版本号**：不兼容的 API 修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

示例：`v1.2.3`

### 更新日志

在 SKILL.md 和 README.md 中维护更新日志：

```markdown
## 更新日志

### v1.1.0 (2026-03-01)
- 新增：支持自定义主题
- 改进：优化解析性能
- 修复：修复编码问题

### v1.0.0 (2026-02-07)
- 初始版本发布
```

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。
