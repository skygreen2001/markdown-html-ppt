# Markdown 渲染问题诊断指南

## 问题描述

你提到：示例中的 Markdown 语法正确渲染，但通过 Skills 渲染出来有问题。

## 可能的原因

### 1. 文件编码问题

**症状**：特殊字符显示为乱码或被当作普通字符

**检查方法**：
```bash
# 检查文件编码
file -I your-file.md

# 应该显示：charset=utf-8
```

**解决方案**：
```bash
# 转换为 UTF-8
iconv -f GBK -t UTF-8 input.md > output.md
```

### 2. Markdown 语法格式问题

**症状**：`**加粗**` 显示为普通文本

**常见错误**：

❌ **错误写法**：
```markdown
**加粗 **  # 星号后有空格
** 加粗**  # 星号前有空格
**加粗**。  # 中文标点紧贴
```

✅ **正确写法**：
```markdown
**加粗**
这是**加粗**文本
**加粗**。（中文标点要有空格）
```

### 3. 转义字符问题

**症状**：看到 `\*\*加粗\*\*` 而不是 **加粗**

**原因**：Markdown 中的特殊字符被转义了

**检查**：
```bash
# 查看原始文件内容
cat -A your-file.md

# 检查是否有 \*\* 而不是 **
```

### 4. 代码块格式问题

**症状**：代码块不显示或显示为普通文本

**常见错误**：

❌ **错误写法**：
````markdown
``` python  # 语言标识符前有空格
code
```

\`\`\`python  # 使用了转义的反引号
code
\`\`\`
````

✅ **正确写法**：
````markdown
```python
code
```
````

### 5. 引用格式问题

**症状**：`> 引用` 显示为普通文本

**常见错误**：

❌ **错误写法**：
```markdown
>引用  # 没有空格
> 引用
继续引用  # 第二行没有 >
```

✅ **正确写法**：
```markdown
> 引用
> 继续引用
```

### 6. 列表格式问题

**症状**：列表不显示或显示为普通文本

**常见错误**：

❌ **错误写法**：
```markdown
-列表  # 没有空格
- 列表
-列表2  # 第二项没有空格
```

✅ **正确写法**：
```markdown
- 列表1
- 列表2
- 列表3
```

## 诊断步骤

### 步骤 1：验证文件编码

```bash
cd /Users/skygreen/Documents/markdown-html-ppt
file -I your-file.md
```

### 步骤 2：检查原始内容

```bash
# 查看文件前 20 行
head -20 your-file.md

# 查看特殊字符
cat -A your-file.md | head -20
```

### 步骤 3：测试简单示例

创建测试文件 `test-simple.md`：
```markdown
# 测试

## 格式测试

**加粗**

*斜体*

`代码`

> 引用

- 列表
```

然后转换：
```bash
python scripts/md2presentation.py -i test-simple.md -o test-simple-output -f html --theme business
```

### 步骤 4：对比 HTML 输出

```bash
# 检查生成的 HTML
grep "加粗" test-simple-output.html

# 应该看到：<strong>加粗</strong>
# 如果看到：**加粗**，说明解析失败
```

### 步骤 5：检查浏览器渲染

```bash
open test-simple-output.html
```

按 F12 打开开发者工具，检查：
- Elements 标签：查看 HTML 结构
- Console 标签：查看是否有错误

## 常见问题解决方案

### 问题 1：所有格式都不生效

**可能原因**：文件编码不是 UTF-8

**解决方案**：
```bash
# 转换编码
iconv -f GBK -t UTF-8 input.md > output.md

# 或者用文本编辑器另存为 UTF-8
```

### 问题 2：部分格式不生效

**可能原因**：Markdown 语法格式不正确

**解决方案**：
1. 检查星号、反引号等符号前后是否有空格
2. 检查是否使用了全角符号（中文输入法）
3. 确保代码块的反引号是三个连续的

### 问题 3：HTML 中看到转义字符

**可能原因**：Markdown 中使用了反斜杠转义

**解决方案**：
```bash
# 查找转义字符
grep '\\*\\*' your-file.md

# 如果有，需要删除反斜杠
```

### 问题 4：浏览器显示不正确

**可能原因**：CSS 样式问题或 HTML 结构错误

**解决方案**：
1. 检查 HTML 标签是否正确闭合
2. 检查 CSS 样式是否加载
3. 尝试不同的浏览器

## 测试清单

请按以下清单逐项测试：

- [ ] 文件编码是 UTF-8
- [ ] Markdown 语法格式正确（星号、反引号等）
- [ ] 没有使用转义字符（反斜杠）
- [ ] 没有使用全角符号
- [ ] 生成的 HTML 包含正确的标签（`<strong>`, `<em>`, `<code>`）
- [ ] HTML 标签正确闭合
- [ ] 浏览器能正确显示

## 提供诊断信息

如果问题仍然存在，请提供以下信息：

1. **原始 Markdown 文件的前 20 行**：
```bash
head -20 your-file.md
```

2. **文件编码**：
```bash
file -I your-file.md
```

3. **生成的 HTML 片段**：
```bash
grep -A 5 "你的标题" output.html
```

4. **浏览器控制台错误**：
   - 打开 HTML 文件
   - 按 F12
   - 查看 Console 标签的错误信息

5. **具体哪些格式不生效**：
   - [ ] **加粗**
   - [ ] *斜体*
   - [ ] `代码`
   - [ ] > 引用
   - [ ] ```代码块```
   - [ ] 列表

## 快速测试脚本

创建 `diagnose.sh`：

```bash
#!/bin/bash

echo "=== 文件编码检查 ==="
file -I "$1"

echo -e "\n=== 文件前 10 行 ==="
head -10 "$1"

echo -e "\n=== 检查特殊字符 ==="
grep -n '\*\*' "$1" | head -5
grep -n '\`' "$1" | head -5
grep -n '^>' "$1" | head -5

echo -e "\n=== 生成测试 HTML ==="
python scripts/md2presentation.py -i "$1" -o test-diagnose -f html --theme business

echo -e "\n=== HTML 格式检查 ==="
grep '<strong>' test-diagnose.html | head -3
grep '<em>' test-diagnose.html | head -3
grep '<code' test-diagnose.html | head -3
grep '<blockquote' test-diagnose.html | head -3

echo -e "\n=== 完成 ==="
echo "请打开 test-diagnose.html 查看效果"
```

使用方法：
```bash
chmod +x diagnose.sh
./diagnose.sh your-file.md
```

---

## 联系支持

如果以上方法都无法解决问题，请提供：
1. 原始 Markdown 文件（或片段）
2. 生成的 HTML 文件（或片段）
3. 浏览器截图
4. 诊断脚本的输出

这样我们可以更准确地定位问题。
