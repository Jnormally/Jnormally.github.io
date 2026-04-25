# 📁 案例文件夹使用说明

## 文件夹结构

```
sculpture-h5/
├── index.html              # 网站主文件
├── cases/                  # 案例文件夹
│   ├── 城市雕塑/           # 城市地标类雕塑
│   ├── 人物雕塑/           # 人物雕像
│   ├── 园林景观/           # 园林装饰雕塑
│   ├── 抽象艺术/           # 抽象造型雕塑
│   ├── 浮雕壁画/           # 墙面浮雕作品
│   ├── 校园文化/           # 校园主题雕塑
│   └── README.md           # 本说明文件
└── wechat-qrcode.png       # 微信二维码（需手动放入）
```

---

## 如何添加案例

### 方法1: 使用 PPT/PDF 在线预览（推荐）

1. 将案例整理成 **PPT** 或 **PDF** 文件
2. 放入对应分类文件夹
3. 命名格式：`分类名-序号.扩展名`

**示例：**
```
cases/
├── 城市雕塑/
│   ├── 城市雕塑-01.pptx      ← 城市地标项目
│   ├── 城市雕塑-02.pdf
│   └── 城市雕塑-03.pptx
├── 人物雕塑/
│   ├── 人物雕塑-01.pptx
│   └── 人物雕塑-02.pdf
└── ...
```

### 方法2: 使用图片展示

1. 将案例图片放入对应文件夹
2. 支持的格式：`.jpg` `.jpeg` `.png` `.webp`

**示例：**
```
cases/
├── 城市雕塑/
│   ├── 城市雕塑-01.jpg
│   └── 城市雕塑-02.jpg
```

---

## 在线预览配置

### 情况1: 本地调试预览

当前点击案例会弹窗显示提示：
- 如果文件夹中有PPT/PDF文件，会显示文件名
- 提供两种在线预览方案的说明

### 情况2: 部署后实现在线预览

需要将PPT/PDF文件放到可公开访问的URL，然后修改代码。

#### 方案A: Google Docs 在线预览

1. 将 PPT/PDF 上传到 Google Drive
2. 设置为"任何拥有链接的人可查看"
3. 获取分享链接（格式：https://drive.google.com/file/d/xxx/view?usp=sharing）
4. 将链接转为可下载的格式：https://drive.google.com/uc?export=download&id=你的文件ID
5. 修改 `index.html` 中的 `openCase()` 函数

**Google Docs 预览 URL 格式：**
```
https://docs.google.com/viewer?url=你的文件URL&embedded=true
```

#### 方案B: Office 365 在线预览

```
https://view.officeapps.live.com/op/embed.aspx?src=你的文件URL
```

#### 方案C: 自建文件服务器

将文件上传到阿里云 OSS、腾讯云 COS 等对象存储，获取直链后嵌入预览。

---

## 微信二维码

1. 生成你的微信二维码图片
2. 重命名为 `wechat-qrcode.png`
3. 放到 `sculpture-h5/` 根目录
4. 网页会自动加载显示

---

## 注意事项

- 文件大小建议：PPT < 10MB，图片 < 2MB
- 图片建议尺寸：1200×800px 以上
- 命名规范：避免中文文件名，使用拼音或英文

---

## 更新后刷新网页

修改文件后，强制刷新网页查看效果：
- **Windows**: `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`
- **手机**: 清除浏览器缓存后重新打开
