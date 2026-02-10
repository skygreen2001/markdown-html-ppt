#!/bin/bash
# Markdown Html Presentation Skill 打包脚本 v2.4.0

SKILL_NAME="markdown-html-ppt"
VERSION="2.4.0"
OUTPUT_DIR="dist"
ARCHIVE_NAME="${SKILL_NAME}-v${VERSION}.zip"

echo "开始打包 ${SKILL_NAME} Skill v${VERSION}..."

# 创建输出目录
mkdir -p "${OUTPUT_DIR}"

# 删除旧的打包文件
rm -f "${OUTPUT_DIR}"/*.zip

# 打包文件
zip -r "${OUTPUT_DIR}/${ARCHIVE_NAME}" \
    SKILL.md \
    README.md \
    USAGE.md \
    STRUCTURE.md \
    CHANGELOG.md \
    HTML-TAG-FIX.md \
    LICENSE \
    requirements.txt \
    scripts/ \
    references/ \
    assets/ \
    -x "*.pyc" \
    -x "__pycache__/*" \
    -x "*.pptx" \
    -x "*.html" \
    -x ".DS_Store" \
    -x "test-*" \
    -x "DEMO.md" \
    -x "DELIVERY*.md" \
    -x "FEATURES*.md" \
    -x "THEMES*.md"

echo "打包完成！"
echo "输出文件: ${OUTPUT_DIR}/${ARCHIVE_NAME}"
echo ""
echo "版本信息:"
echo "  - 版本号: v${VERSION}"
echo "  - 修复: HTML 列表缩进 + Markdown 语法完善"
echo "  - 功能: 增强 Markdown 语法 + 智能分页 + 5个主题"
echo "  - 支持格式: HTML (reveal.js) + PowerPoint"
echo ""
echo "主要改进:"
echo "  ✅ 列表缩进正确显示"
echo "  ✅ **加粗**、*斜体*、\`代码\` 正确渲染"
echo "  ✅ > 引用、\`\`\`代码块\`\`\` 正确显示"
echo "  ✅ HTML 标签正确闭合"
echo "  ✅ 内容不溢出页面"
echo ""
echo "安装方法:"
echo "1. 解压文件到 ~/.claude/skills/ 目录"
echo "2. 重启 Claude Code"
echo "3. 安装依赖: pip install -r requirements.txt"
