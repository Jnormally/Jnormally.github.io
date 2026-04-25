# 雕塑表面积估算系统设计方案

## 功能需求
- 用户上传雕塑图片
- 输入长、宽、高尺寸
- 系统自动估算表面积
- 根据表面积计算价格

## 表面积估算算法

### 1. 几何类雕塑（规则形状）

#### 立方体/长方体
```
表面积 = 2 × (长×宽 + 长×高 + 宽×高)
```

#### 圆柱体
```
表面积 = 2πr² + 2πrh
其中 r = 直径/2, h = 高
```

#### 球体
```
表面积 = 4πr²
```

### 2. 异形类雕塑（不规则形状）

由于形状不规则，采用**体积等效法**估算：

```
等效球体半径 r = (3 × 长 × 宽 × 高 / 4π)^(1/3)
表面积 = 4πr² × 复杂度系数

复杂度系数：
- 简单异形：1.2-1.5
- 中等复杂：1.5-2.0
- 高度复杂：2.0-3.0
```

### 3. 图片辅助估算

通过图片分析形状特征：
- **几何类**：轮廓规则，可用标准公式
- **异形类**：轮廓复杂，增加复杂度系数

## 前端实现方案

### 界面布局
```
┌─────────────────────────────────────┐
│  📷 上传雕塑图片（可选）              │
│  [点击上传或拖拽]                    │
├─────────────────────────────────────┤
│  📏 尺寸输入                          │
│  长度: [____] cm                     │
│  宽度: [____] cm                     │
│  高度: [____] cm                     │
├─────────────────────────────────────┤
│  🎨 造型类型                          │
│  [几何类] [异形类]                   │
├─────────────────────────────────────┤
│  📊 估算结果                          │
│  表面积: ~2.5 平方米                 │
│  计算方式: 体积等效法                │
├─────────────────────────────────────┤
│  💰 价格: ¥3,750                    │
└─────────────────────────────────────┘
```

### 核心代码逻辑

```javascript
function calculateSurfaceArea(length, width, height, shapeType) {
    // 转换为米
    const l = length / 100;
    const w = width / 100;
    const h = height / 100;
    
    let surfaceArea = 0;
    let method = '';
    
    if (shapeType === 'geo') {
        // 几何类：使用长方体近似（保守估计）
        surfaceArea = 2 * (l*w + l*h + w*h);
        method = '几何近似法';
    } else {
        // 异形类：体积等效球体法
        const volume = l * w * h;
        const equivalentRadius = Math.pow((3 * volume) / (4 * Math.PI), 1/3);
        const complexityFactor = 1.8; // 默认中等复杂度
        surfaceArea = 4 * Math.PI * Math.pow(equivalentRadius, 2) * complexityFactor;
        method = '体积等效法';
    }
    
    return {
        area: surfaceArea.toFixed(2),  // 平方米
        method: method
    };
}
```

## 价格计算公式

```javascript
function calculatePrice(surfaceArea, shapeType, surfaceFinish, difficulty) {
    // 基础单价（元/平方米）
    const basePrices = {
        'geo-mirror': 1500,
        'geo-paint': 800,
        'irregular-mirror': 2600,
        'irregular-paint': 1700
    };
    
    const key = shapeType + '-' + surfaceFinish;
    let unitPrice = basePrices[key] || 1500;
    
    // 难度系数
    if (difficulty === 'hard') {
        unitPrice *= 1.2;
    }
    
    // 总价
    const totalPrice = surfaceArea * unitPrice;
    
    return Math.ceil(totalPrice);
}
```

## 实现步骤

1. **添加图片上传组件**
   - 支持拖拽上传
   - 图片预览
   - 可选（用于参考，不参与计算）

2. **修改尺寸输入**
   - 添加长宽高三个输入框
   - 单位：厘米

3. **添加表面积计算**
   - 实时计算并显示
   - 显示计算方式

4. **更新价格计算**
   - 使用表面积代替简单尺寸
   - 保留原有定价逻辑

## 注意事项

1. **估算精度**
   - 表面积估算存在误差（±20%）
   - 最终价格以实际测量为准

2. **用户提示**
   - 明确告知这是估算值
   - 建议上传多角度照片提高准确性

3. **特殊情况**
   - 镂空雕塑：表面积需要额外计算
   - 极薄/极厚：需要调整系数

## 界面文案建议

```
💡 智能估算：根据您提供的尺寸，我们使用专业算法估算雕塑表面积。
   注意：此价格为预估价，最终价格以实物测量为准。
```
