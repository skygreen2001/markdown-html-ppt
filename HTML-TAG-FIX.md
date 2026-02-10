# HTML 标签闭合问题修复指南

## 问题描述

生成的 HTML 文件中，`<ul>` 标签没有正确的 `</ul>` 闭合标签，导致列表嵌套错误。

## 问题原因

在 `RevealJSGenerator.generate()` 方法中，处理内容时：
- 遇到列表项时打开 `<ul>` 标签
- 但没有正确检测何时关闭 `</ul>` 标签
- 导致多个列表项共用一个未关闭的 `<ul>`

## 修复方案

### 位置

文件：`scripts/md2presentation.py`  
类：`RevealJSGenerator`  
方法：`generate()`  
大约行号：375-415

### 原始代码（有问题）

```python
if slide['content']:
    for item in slide['content']:
        item_type = item.get('type', 'list')
        
        if item_type == 'quote':
            # 块引用
            section += '''<blockquote>...</blockquote>'''
        
        elif item_type == 'code':
            # 代码块
            section += '''<pre><code>...</code></pre>'''
        
        elif item_type == 'paragraph':
            # 段落
            section += '''<p>...</p>'''
        
        else:  # list
            # 列表项（问题在这里）
            if not section.endswith('<ul style="line-height: 1.5;">'):
                section += '''<ul style="line-height: 1.5;">'''
            section += '''<li>...</li>'''
    
    # 关闭可能打开的 ul（逻辑不正确）
    if '<ul style="line-height: 1.5;">' in section and not section.endswith('</ul>'):
        section += '''</ul>'''
```

### 修复后的代码（正确）

```python
if slide['content']:
    # 添加状态跟踪
    in_list = False
    
    for i_item, item in enumerate(slide['content']):
        item_type = item.get('type', 'list')
        
        # 检查是否需要关闭列表
        if in_list and item_type != 'list':
            section += '''
                </ul>'''
            in_list = False
        
        if item_type == 'quote':
            # 块引用
            section += '''
                <blockquote style="font-style: italic; border-left: 3px solid #ccc; padding-left: 15px; margin: 10px 0;">'''
            section += RevealJSGenerator._format_inline(item.get('segments', []))
            section += '''</blockquote>'''
        
        elif item_type == 'code':
            # 代码块
            section += '''
                <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px; margin: 10px 0;"><code>'''
            section += RevealJSGenerator._escape_html(item.get('text', ''))
            section += '''</code></pre>'''
        
        elif item_type == 'paragraph':
            # 段落
            section += '''
                <p style="line-height: 1.5; margin: 10px 0;">'''
            section += RevealJSGenerator._format_inline(item.get('segments', []))
            section += '''</p>'''
        
        else:  # list
            # 列表项
            if not in_list:
                section += '''
                <ul style="line-height: 1.5;">'''
                in_list = True
            
            section += '''
                    <li>'''
            section += RevealJSGenerator._format_inline(item.get('segments', []))
            section += '''</li>'''
    
    # 关闭最后可能打开的 ul
    if in_list:
        section += '''
                </ul>'''
```

## 关键改进

1. **添加状态变量** `in_list`：跟踪当前是否在列表中
2. **在类型切换时关闭**：当从列表项切换到其他类型时，关闭 `</ul>`
3. **在内容结束时关闭**：循环结束后，如果还在列表中，关闭 `</ul>`

## 验证方法

### 1. 检查标签数量

```bash
# 统计 <ul> 和 </ul> 数量，应该相等
grep -o "<ul" output.html | wc -l
grep -o "</ul>" output.html | wc -l
```

### 2. 使用 HTML 验证器

```bash
# 使用 tidy 检查 HTML
tidy -q -e output.html
```

### 3. 浏览器开发者工具

打开生成的 HTML，按 F12 查看元素结构，确保没有嵌套错误。

## 测试用例

```markdown
# 测试

## 混合内容

段落1

- 列表1
- 列表2

段落2

> 引用

- 列表3
- 列表4
```

预期 HTML 结构：
```html
<section>
    <h2>混合内容</h2>
    <p>段落1</p>
    <ul>
        <li>列表1</li>
        <li>列表2</li>
    </ul>
    <p>段落2</p>
    <blockquote>引用</blockquote>
    <ul>
        <li>列表3</li>
        <li>列表4</li>
    </ul>
</section>
```

## 应用修复

1. 备份当前文件
2. 找到 `RevealJSGenerator.generate()` 方法
3. 定位到内容处理循环
4. 替换为修复后的代码
5. 测试生成的 HTML

---

**注意**：这个修复已经包含在 v2.3.1 版本中。
