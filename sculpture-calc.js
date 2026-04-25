// 不锈钢雕塑价格计算（基于表面积，含20%隐藏利润）
function updateSculptureCalc() {
    const shape = document.querySelector('input[name="shape"]:checked');
    const surface = document.querySelector('input[name="surface"]:checked');
    const difficulty = document.querySelector('input[name="difficulty"]:checked');
    const lengthEl = document.getElementById('sculptureLength');
    const widthEl = document.getElementById('sculptureWidth');
    const heightEl = document.getElementById('sculptureHeight');
    
    if(!shape || !surface || !difficulty || !lengthEl || !widthEl || !heightEl) return;
    
    // 获取尺寸（米）
    const length = parseFloat(lengthEl.value) || 0;
    const width = parseFloat(widthEl.value) || 0;
    const height = parseFloat(heightEl.value) || 0;
    
    // 如果尺寸未输入，显示提示
    if (length === 0 || width === 0 || height === 0) {
        updateSculptureDisplay(length, width, height, 0, 0, '', 0);
        return;
    }
    
    // 计算表面积
    let surfaceArea = 0;
    let calcMethod = '';
    
    if (shape.value === 'geo') {
        // 几何类：长方体近似
        surfaceArea = 2 * (length*width + length*height + width*height);
        calcMethod = '几何近似法';
    } else {
        // 异形类：体积等效球体法
        const volume = length * width * height;
        const equivalentRadius = Math.pow((3 * volume) / (4 * Math.PI), 1/3);
        const complexityFactor = difficulty.value === 'hard' ? 2.2 : 1.8;
        surfaceArea = 4 * Math.PI * Math.pow(equivalentRadius, 2) * complexityFactor;
        calcMethod = '体积等效法';
    }
    
    // 确定单价
    let unitPrice = 0;
    if (shape.value === 'geo' && surface.value === 'mirror') {
        unitPrice = difficulty.value === 'hard' ? 1800 : 1500;
    } else if (shape.value === 'geo' && surface.value === 'paint') {
        unitPrice = difficulty.value === 'hard' ? 1250 : 800;
    } else if (shape.value === 'irregular' && surface.value === 'mirror') {
        unitPrice = difficulty.value === 'hard' ? 3300 : 2600;
    } else if (shape.value === 'irregular' && surface.value === 'paint') {
        unitPrice = difficulty.value === 'hard' ? 2100 : 1700;
    }
    
    // 计算价格（含20%隐藏利润）
    const basePrice = surfaceArea * unitPrice;
    const finalPrice = Math.ceil(basePrice * 1.20);
    
    // 更新显示
    updateSculptureDisplay(length, width, height, surfaceArea, unitPrice, calcMethod, finalPrice);
}

// 更新雕塑核算显示
function updateSculptureDisplay(length, width, height, surfaceArea, unitPrice, calcMethod, finalPrice) {
    const sizeDetailEl = document.getElementById('sizeDetail');
    const surfaceAreaEl = document.getElementById('surfaceArea');
    const unitPriceEl = document.getElementById('unitPrice');
    const calcMethodEl = document.getElementById('calcMethod');
    const sculpturePriceEl = document.getElementById('sculpturePrice');
    
    if(sizeDetailEl) {
        if (length === 0 || width === 0 || height === 0) {
            sizeDetailEl.textContent = '请输入尺寸';
        } else {
            sizeDetailEl.textContent = length.toFixed(2) + '×' + width.toFixed(2) + '×' + height.toFixed(2) + ' m';
        }
    }
    
    if(surfaceAreaEl) {
        if (surfaceArea === 0) {
            surfaceAreaEl.textContent = '- ㎡';
        } else {
            surfaceAreaEl.textContent = '~' + surfaceArea.toFixed(2) + ' ㎡';
        }
    }
    
    if(unitPriceEl) {
        if (unitPrice === 0) {
            unitPriceEl.textContent = '¥-/㎡';
        } else {
            unitPriceEl.textContent = '¥' + unitPrice.toLocaleString() + '/㎡';
        }
    }
    
    if(calcMethodEl) calcMethodEl.textContent = calcMethod || '-';
    
    if(sculpturePriceEl) {
        if (finalPrice === 0) {
            sculpturePriceEl.textContent = '0';
        } else {
            sculpturePriceEl.textContent = finalPrice.toLocaleString();
        }
    }
}