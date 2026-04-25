# 案例预览方案 - 推荐方案

## 方案1: 转换为PDF预览（最简单）

把PPT文件另存为PDF，浏览器可以直接预览。

### 步骤：

1. **将PPT转为PDF**
   - 在PowerPoint中：文件 → 另存为 → PDF
   - 或在线转换： https://www.ilovepdf.com/zh-cn/powerpoint_to_pdf

2. **放入文件夹**
```
cases/
├── 城市雕塑/
│   ├── 城市雕塑-01.pdf     ← 放入PDF文件
│   └── 城市雕塑-02.pdf
```

3. **修改代码预览PDF**

在 `index.html` 中找到 `openCase()` 函数，修改为：

```javascript
function openCase(category) {
    const folderMap = {
        '城市雕塑': 'cases/城市雕塑/',
        '人物雕塑': 'cases/人物雕塑/',
        '园林景观': 'cases/园林景观/',
        '抽象艺术': 'cases/抽象艺术/',
        '浮雕壁画': 'cases/浮雕壁画/',
        '校园文化': 'cases/校园文化/'
    };
    
    const folder = folderMap[category];
    
    // 显示弹窗，内嵌PDF
    document.getElementById('modalTitle').textContent = category;
    document.getElementById('modalBody').innerHTML = 
        '<iframe src="' + folder + '" style="width:100%;height:500px;border:none;"></iframe>';
    document.getElementById('previewModal').classList.add('active');
}
```

## 方案2: 图片预览（最简单）

把PPT导出为图片，直接在网页中展示。

### 步骤：

1. **PPT导出为图片**
   - PowerPoint：文件 → 另存为 → JPEG/PNG
   - 或在线工具

2. **放入文件夹**
```
cases/
├── 城市雕塑/
│   ├── 城市雕塑-01.jpg
│   ├── 城市雕塑-02.jpg
│   └── 城市雕塑-03.jpg
```

3. **修改代码显示图片**

```javascript
function openCase(category) {
    const images = [
        'cases/城市雕塑/城市雕塑-01.jpg',
        'cases/城市雕塑/城市雕塑-02.jpg'
    ];
    
    let html = '<div style="padding:20px;">';
    images.forEach(img => {
        html += '<img src="' + img + '" style="width:100%;margin-bottom:20px;border-radius:12px;">';
    });
    html += '</div>';
    
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('previewModal').classList.add('active');
}
```

## 方案3: 使用腾讯文档（无需修改代码）

1. 把PPT上传到腾讯文档
2. 获取分享链接
3. 把链接放入文件夹中的 `link.txt` 文件

## 推荐方案

| 方案 | 难度 | 效果 | 推荐度 |
|------|------|------|--------|
| PDF预览 | ⭐ 简单 | ⭐⭐⭐ 好 | ✅ 推荐 |
| 图片预览 | ⭐ 简单 | ⭐⭐ 一般 | ✅ 推荐 |
| 腾讯文档 | ⭐⭐ 中等 | ⭐⭐⭐⭐ 很好 | 需要网络 |
| Google Docs | ⭐⭐⭐ 复杂 | ⭐⭐⭐⭐ 很好 | 需翻墙 |

---

## 快速测试

1. 把 `城市雕塑-01.pptx` 另存为 `城市雕塑-01.pdf`
2. 放入 `cases/城市雕塑/` 文件夹
3. 刷新网页点击案例
4. 现在弹窗会显示PDF预览选项

如需直接预览PDF，告诉我，我可以修改代码实现！
