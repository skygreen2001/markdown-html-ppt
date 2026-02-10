# 自动分页功能说明

## 功能概述

当幻灯片内容过多时，系统会自动将内容分页到多张幻灯片，避免单张幻灯片内容过于拥挤。

## 分页规则

### 默认限制

- **每张幻灯片最多 8 个要点**
- 超过 8 个要点时，自动创建新的幻灯片
- 新幻灯片标题自动添加 "(续)" 标记

### 可配置参数

在脚本中可以调整分页阈值：

```python
# 在 auto_paginate 函数中修改
MAX_ITEMS_PER_SLIDE = 8  # 每页最多 8 个要点
```

## 工作原理

### 1. 检测需要分页的幻灯片

系统会检查每张内容幻灯片的要点数量：

```python
if len(slide['content']) > MAX_ITEMS_PER_SLIDE:
    # 需要分页
```

### 2. 分割内容

将内容按照阈值分割成多个部分：

```python
# 第一页：前 8 个要点
# 第二页：第 9-16 个要点
# 第三页：第 17-24 个要点
# ...
```

### 3. 创建新幻灯片

为每个分割后的内容创建新幻灯片：

```python
# 第一页：原标题
# 第二页：原标题 (续)
# 第三页：原标题 (续 2)
```

## 示例

### 输入 Markdown

```markdown
## 项目特性

- 特性 1
- 特性 2
- 特性 3
- 特性 4
- 特性 5
- 特性 6
- 特性 7
- 特性 8
- 特性 9
- 特性 10
- 特性 11
- 特性 12
```

### 输出结果

**幻灯片 1：项目特性**
- 特性 1
- 特性 2
- 特性 3
- 特性 4
- 特性 5
- 特性 6
- 特性 7
- 特性 8

**幻灯片 2：项目特性 (续)**
- 特性 9
- 特性 10
- 特性 11
- 特性 12

## 自动分页的优势

### 1. 避免内容拥挤

- ✅ 每张幻灯片内容适中
- ✅ 提高可读性
- ✅ 观众更容易理解

### 2. 保持视觉一致性

- ✅ 统一的内容密度
- ✅ 专业的排版效果
- ✅ 清晰的层次结构

### 3. 自动化处理

- ✅ 无需手动分页
- ✅ 智能内容分割
- ✅ 节省时间

## 使用建议

### 1. 合理组织内容

虽然支持自动分页，但建议：

- ✅ 每个主题控制在 5-8 个要点
- ✅ 复杂内容拆分为多个小节
- ✅ 使用子标题组织内容

### 2. 避免过度依赖

自动分页是辅助功能，不应该：

- ❌ 在一个标题下堆积大量内容
- ❌ 忽略内容的逻辑组织
- ❌ 让分页影响演示逻辑

### 3. 检查分页结果

生成后应该：

- ✅ 检查分页是否合理
- ✅ 确认内容连贯性
- ✅ 必要时调整 Markdown 结构

## 配置选项

### 修改分页阈值

编辑 `scripts/md2presentation.py`：

```python
class AutoPaginator:
    """自动分页器"""
    
    @staticmethod
    def auto_paginate(slides_data: List[dict], max_items: int = 8) -> List[dict]:
        """
        自动分页
        
        Args:
            slides_data: 幻灯片数据
            max_items: 每页最多要点数（默认 8）
        """
```

### 禁用自动分页

如果不需要自动分页，可以注释掉相关代码：

```python
# 在 convert_markdown_to_presentation 函数中
# slides_data = AutoPaginator.auto_paginate(slides_data)  # 注释这行
```

## 分页统计

转换时会显示分页统计信息：

```
自动分页: 原始 10 张幻灯片 → 分页后 15 张幻灯片
```

这表示：
- 原始解析出 10 张幻灯片
- 其中一些内容过多，被分页
- 最终生成 15 张幻灯片

## HTML 和 PowerPoint 的分页

### HTML（reveal.js）

- ✅ 自动分页
- ✅ 标题添加 "(续)" 标记
- ✅ 保持导航连贯性

### PowerPoint

- ✅ 自动分页
- ✅ 标题添加 "(续)" 标记
- ✅ 保持样式一致性

## 最佳实践

### 1. 内容组织

```markdown
## 好的组织方式

### 子主题 1
- 要点 1
- 要点 2
- 要点 3

### 子主题 2
- 要点 4
- 要点 5
- 要点 6
```

这样每个子主题都是独立的幻灯片，不需要自动分页。

### 2. 避免的方式

```markdown
## 不推荐的方式

- 要点 1
- 要点 2
- 要点 3
- 要点 4
- 要点 5
- 要点 6
- 要点 7
- 要点 8
- 要点 9
- 要点 10
- 要点 11
- 要点 12
- 要点 13
- 要点 14
- 要点 15
```

虽然会自动分页，但不如拆分为多个小节清晰。

### 3. 平衡方案

```markdown
## 主题概述

- 核心要点 1
- 核心要点 2
- 核心要点 3
- 核心要点 4

## 详细说明

### 方面 1
- 详细内容 1
- 详细内容 2

### 方面 2
- 详细内容 3
- 详细内容 4
```

## 技术细节

### 分页算法

```python
def auto_paginate(slides_data, max_items=8):
    paginated_slides = []
    
    for slide in slides_data:
        if slide['type'] == 'content' and len(slide['content']) > max_items:
            # 计算需要的页数
            num_pages = (len(slide['content']) + max_items - 1) // max_items
            
            # 分割内容
            for page_num in range(num_pages):
                start_idx = page_num * max_items
                end_idx = min(start_idx + max_items, len(slide['content']))
                
                # 创建新幻灯片
                new_slide = {
                    'type': 'content',
                    'title': slide['title'] + (f" (续 {page_num})" if page_num > 0 else ""),
                    'content': slide['content'][start_idx:end_idx]
                }
                paginated_slides.append(new_slide)
        else:
            paginated_slides.append(slide)
    
    return paginated_slides
```

### 标题处理

- 第一页：原标题
- 第二页：原标题 (续)
- 第三页：原标题 (续 2)
- 第四页：原标题 (续 3)
- ...

## 常见问题

### Q: 为什么选择 8 个要点作为阈值？

A: 基于演示文稿最佳实践：
- 5-8 个要点是最佳数量
- 超过 8 个要点会显得拥挤
- 观众难以一次性消化太多信息

### Q: 可以调整阈值吗？

A: 可以，修改脚本中的 `MAX_ITEMS_PER_SLIDE` 参数。

### Q: 分页会影响 HTML 和 PowerPoint 吗？

A: 两种格式都会应用相同的分页规则，保持一致性。

### Q: 如何避免不必要的分页？

A: 在 Markdown 中合理组织内容，使用子标题拆分主题。

### Q: 分页后的标题可以自定义吗？

A: 目前自动添加 "(续)" 标记，如需自定义可以修改脚本中的标题生成逻辑。

## 总结

自动分页功能：

✅ **智能分页**：超过 8 个要点自动分页  
✅ **保持一致**：HTML 和 PowerPoint 都支持  
✅ **提高可读性**：避免内容过于拥挤  
✅ **自动化处理**：无需手动干预  
✅ **可配置**：可调整分页阈值

建议结合良好的内容组织，让自动分页成为辅助工具，而不是主要依赖。
