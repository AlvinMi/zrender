/**
 * zrender : shape基类
 *
 * desc:    zrender是一个轻量级的Canvas类库，MVC封装，数据驱动，提供类Dom事件模型。
 * author:  Kener (@Kener-林峰, linzhifeng@baidu.com)
 *          errorrik (errorrik@gmail.com)
 *
 * 可配图形属性：
   {
       // 基础属性，详见各shape
       shape  : {string},       // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见

       // 变换
       position : {array},        // 默认为[0, 0], shape的坐标
       rotation : {number|array}, // 默认为[0, 0, 0]，shape绕自身旋转的角度，不被translate 影响
                                  // 后两个值为旋转的origin
       scale : {array},           // 默认为[1, 1, 0, 0], shape纵横缩放比例，不被translate影响
                                  // 后两个值为缩放的origin

       // 样式属性，详见各shape，默认状态样式属性
       style  : {Object},

       // 样式属性，详见各shape，高亮样式属性，当不存在highlightStyle时使用默认样式扩展显示
       highlightStyle : {Object},

       // 交互属性，zrender支持，非图形类实现
       hoverable : {boolean},   // 默认为true，可悬浮响应，默认悬浮响应为高亮显示
                                // 可在onbrush中捕获并阻塞高亮绘画
       clickable : {boolean},   // 默认为false，可点击响应，影响鼠标hover时图标是否为可点击样式
                                // 为false则阻断点击事件抛出，为true可在onclick中捕获
       draggable : {boolean},   // 默认为false，可拖拽响应，默认拖拽响应改变图形位置，
                                // 可在ondrift中捕获并阻塞默认拖拽行为

       // 事件属性
       onbrush : {Function}, // 默认为null，当前图形被刷画时回调，可用于实现自定义绘画
                 // 回传参数为：
                 // @param {2D Context} context 当前canvas context
                 // @param {Object} shape 当前shape
                 // @param {boolean} isHighlight 是否高亮
                 // @return {boolean} 回调返回true则不执行默认绘画
       ondrift : {Function}, // 默认为null，当前图形被拖拽改变位置时回调，可用于限制拖拽范围
                 // 回传参数为：
                 // @param {Object} shape 当前shape
                 // @param {number} dx x方向变化
                 // @param {number} dy y方向变化
       onclick : {Function}, // 默认为null，当前图形点击响应，回传参数为：
                 // @param {Object} eventPacket 对象内容如下：
                 // @param {string} eventPacket.type 事件类型，EVENT.CLICK
                 // @param {event} eventPacket.event 原始dom事件对象
                 // @param {Object} eventPacket.target 当前图形shape对象
                 // @return {boolean} 回调返回true则阻止抛出全局事件

       onmousewheel : {Function}, // 默认为null，当前图形上鼠标滚轮触发，回传参数格式同onclick，其中：
                      // 事件类型为confit.EVENT.MOUSEWHEEL
                      // @return {boolean} 回调返回true则阻止抛出全局事件

       onmousemove : {Function}, // 默认为null，当前图上形鼠标（或手指）移动触发，回传参数格式同onclick，其中：
                     // 事件类型为confit.EVENT.MOUSEMOVE
                     // @return {boolean} 回调返回true则阻止抛出全局事件

       onmouseover : {Function}, // 默认为null，鼠标（或手指）移动到当前图形上触发，回传参数格式同onclick：
                     // 事件类型为confit.EVENT.MOUSEOVER
                     // @return {boolean} 回调返回true则阻止抛出全局事件

       onmouseout : {Function}, // 默认为null，鼠标（或手指）从当前图形移开，回传参数格式同onclick，其中：
                    // 事件类型为confit.EVENT.MOUSEOUT
                    // @return {boolean} 回调返回true则阻止抛出全局事件

       onmousedown : {Function}, // 默认为null，鼠标按钮（或手指）按下，回传参数格式同onclick，其中：
                     // 事件类型为confit.EVENT.MOUSEDOWN
                     // @return {boolean} 回调返回true则阻止抛出全局事件

       onmouseup : {Function}, // 默认为null，鼠标按钮（或手指）松开，回传参数格式同onclick，其中：
                   // 事件类型为confit.EVENT.MOUSEUP
                   // @return {boolean} 回调返回true则阻止抛出全局事件

       ondragstart : {Function}, // 默认为null，开始拖拽时触发，回传参数格式同onclick，其中：
                     // 事件类型为confit.EVENT.DRAGSTART
                     // @return {boolean} 回调返回true则阻止抛出全局事件

       ondragend : {Function}, // 默认为null，拖拽完毕时触发，回传参数格式同onclick，其中：
                   // 事件类型为confit.EVENT.DRAGEND
                   // @return {boolean} 回调返回true则阻止抛出全局事件

       ondragenter : {Function}, // 默认为null，拖拽图形元素进入目标图形元素时触发
                     // 回传参数格式同onclick，其中：
                     // @param {string} eventPacket.type 事件类型，EVENT.DRAGENTER
                     // @param {Object} eventPacket.target 目标图形元素shape对象
                     // @param {Object} eventPacket.dragged 拖拽图形元素shape对象
                     // @return {boolean} 回调返回true则阻止抛出全局事件

       ondragover : {Function}, // 默认为null，拖拽图形元素在目标图形元素上移动时触发，
                    // 回传参数格式同onclick，其中：
                    // @param {string} eventPacket.type 事件类型，EVENT.DRAGOVER
                    // @param {Object} eventPacket.target 目标图形元素shape对象
                    // @param {Object} eventPacket.dragged 拖拽图形元素shape对象
                    // @return {boolean} 回调返回true则阻止抛出全局事件

       ondragleave : {Function}, // 默认为null，拖拽图形元素离开目标图形元素时触发，
                     // 回传参数格式同onclick，其中：
                     // @param {string} eventPacket.type 事件类型，EVENT.DRAGLEAVE
                     // @param {Object} eventPacket.target 目标图形元素shape对象
                     // @param {Object} eventPacket.dragged 拖拽图形元素shape对象
                     // @return {boolean} 回调返回true则阻止抛出全局事件

       ondrop : {Function}, // 默认为null，拖拽图形元素放在目标图形元素内时触发，
                // 回传参数格式同onclick，其中：
                // @param {string} eventPacket.type 事件类型，EVENT.DRAG
                // @param {Object} eventPacket.target 目标图形元素shape对象
                // @param {Object} eventPacket.dragged 拖拽图形元素shape对象
                // @return {boolean} 回调返回true则阻止抛出全局事件
   }
 */
define(
    function(require) {
        var area = require('../tool/area');
        var matrix = require('../tool/matrix');

        var idStart = 0x114;
        function guid() {
            return 'zrendershape' + idStart++;
        }
        
        function Base( options ) {
            this.id = options.id || guid();
            this.zlevel = 0;
            this.draggable = false;
            this.clickable = false;
            this.hoverable = true;
            this.position = [0, 0];
            this.rotation = [0, 0, 0];
            this.scale = [1, 1, 0, 0];

            for ( var key in options ) {
                this[ key ] = options[ key ];
            }
        }

        /**
         * 画刷
         * 
         * @param ctx       画布句柄
         * @param isHighlight   是否为高亮状态
         * @param updateCallback 需要异步加载资源的shape可以通过这个callback(e)
         *                       让painter更新视图，base.brush没用，需要的话重载brush
         */
        Base.prototype.brush = function (ctx, isHighlight) {
            var style = this.style || {};

            if (this.brushTypeOnly) {
                style.brushType = this.brushTypeOnly;
            }

            if (isHighlight) {
                // 根据style扩展默认高亮样式
                style = this.getHighlightStyle(
                    style,
                    this.highlightStyle || {},
                    this.brushTypeOnly
                );
            }

            if (this.brushTypeOnly == 'stroke') {
                style.strokeColor = style.strokeColor || style.color;
            }

            ctx.save();
            this.setContext(ctx, style);

            // 设置transform
            if (this.__needTransform) {
                ctx.transform.apply(ctx,this.updateTransform(this));
            }

            ctx.beginPath();
            this.buildPath(ctx, style);
            if (this.brushTypeOnly != 'stroke') {
                ctx.closePath();
            }

            switch (style.brushType) {
                case 'both':
                    ctx.fill();
                case 'stroke':
                    style.lineWidth > 0 && ctx.stroke();
                    break;
                default:
                    ctx.fill();
            }

            if (style.text) {
                this.drawText(ctx, style, this.style);
            }

            ctx.restore();
        };

        var STYLE_CTX_MAP = [
            ['color', 'fillStyle'],
            ['strokeColor', 'strokeStyle'],
            ['opacity', 'globalAlpha'],
            ['lineCap'],
            ['lineJoin'],
            ['miterLimit'],
            ['lineWidth'],
            ['shadowBlur'],
            ['shadowColor'],
            ['shadowOffsetX'],
            ['shadowOffsetY']
        ];

        /**
         * 画布通用设置
         * 
         * @param ctx       画布句柄
         * @param style     通用样式
         */
        Base.prototype.setContext = function (ctx, style) {
            for (var i = 0, len = STYLE_CTX_MAP.length; i < len; i++) {
                var styleProp = STYLE_CTX_MAP[i][0];
                var styleValue = style[styleProp];
                var ctxProp = STYLE_CTX_MAP[i][1] || styleProp;

                if (typeof styleValue != 'undefined') {
                    ctx[ctxProp] = styleValue;
                }
            }
        };

        /**
         * 附加文本
         * 
         * @param {Context2D} ctx Canvas 2D上下文
         * @param {Object} style 样式
         * @param {Object} normalStyle 默认样式，用于定位文字显示
         */
        Base.prototype.drawText = function (ctx, style, normalStyle) {
            // 字体颜色策略
            style.textColor = style.textColor
                                || style.color
                                || style.strokeColor;
            ctx.fillStyle = style.textColor;

            if (style.textPosition == 'inside') {
                ctx.shadowColor = 'rgba(0,0,0,0)';   // 内部文字不带shadowColor
            }

            // 文本与图形间空白间隙
            var dd = 10;
            var al;         // 文本水平对齐
            var bl;         // 文本垂直对齐
            var tx;         // 文本横坐标
            var ty;         // 文本纵坐标

            var textPosition = style.textPosition       // 用户定义
                               || this.textPosition     // shape默认
                               || 'top';                // 全局默认

            if ((textPosition == 'inside'
                || textPosition == 'top'
                || textPosition == 'bottom'
                || textPosition == 'left'
                || textPosition == 'right')
                && this.getRect // 矩形定位文字的图形必须提供getRect方法
            ) {
                var rect = (normalStyle || style).__rect
                           || this.getRect(normalStyle || style);

                switch (textPosition) {
                    case 'inside':
                        tx = rect.x + rect.width / 2;
                        ty = rect.y + rect.height / 2;
                        al = 'center';
                        bl = 'middle';
                        if (style.brushType != 'stroke'
                            && style.textColor == style.color
                        ) {
                            ctx.fillStyle = '#fff';
                        }
                        break;
                    case 'left':
                        tx = rect.x - dd;
                        ty = rect.y + rect.height / 2;
                        al = 'end';
                        bl = 'middle';
                        break;
                    case 'right':
                        tx = rect.x + rect.width + dd;
                        ty = rect.y + rect.height / 2;
                        al = 'start';
                        bl = 'middle';
                        break;
                    case 'top':
                        tx = rect.x + rect.width / 2;
                        ty = rect.y - dd;
                        al = 'center';
                        bl = 'bottom';
                        break;
                    case 'bottom':
                        tx = rect.x + rect.width / 2;
                        ty = rect.y + rect.height + dd;
                        al = 'center';
                        bl = 'top';
                        break;
                }
            }
            else if (textPosition == 'start' || textPosition == 'end') {
                var xStart;
                var xEnd;
                var yStart;
                var yEnd;
                if (typeof style.pointList != 'undefined') {
                    var pointList = style.pointList;
                    if (pointList.length < 2) {
                        // 少于2个点就不画了~
                        return;
                    }
                    var length = pointList.length;
                    switch (textPosition) {
                        case 'start':
                            xStart = pointList[0][0];
                            xEnd = pointList[1][0];
                            yStart = pointList[0][1];
                            yEnd = pointList[1][1];
                            break;
                        case 'end':
                            xStart = pointList[length - 2][0];
                            xEnd = pointList[length - 1][0];
                            yStart = pointList[length - 2][1];
                            yEnd = pointList[length - 1][1];
                            break;
                    }
                }
                else {
                    xStart = style.xStart || 0;
                    xEnd = style.xEnd || 0;
                    yStart = style.yStart || 0;
                    yEnd = style.yEnd || 0;
                }

                switch (textPosition) {
                    case 'start':
                        al = xStart < xEnd ? 'end' : 'start';
                        bl = yStart < yEnd ? 'bottom' : 'top';
                        tx = xStart;
                        ty = yStart;
                        break;
                    case 'end':
                        al = xStart < xEnd ? 'start' : 'end';
                        bl = yStart < yEnd ? 'top' : 'bottom';
                        tx = xEnd;
                        ty = yEnd;
                        break;
                }
                dd -= 4;
                if (xStart != xEnd) {
                    tx -= (al == 'end' ? dd : -dd);
                } else {
                    al = 'center';
                }
                if (yStart != yEnd) {
                    ty -= (bl == 'bottom' ? dd : -dd);
                } else {
                    bl = 'middle';
                }
            }
            else if (textPosition == 'specific') {
                tx = style.textX || 0;
                ty = style.textY || 0;
                al = 'start';
                bl = 'middle';
            }

            if (tx != null && ty != null) {
                _fillText(
                    ctx,
                    style.text, 
                    tx, ty, 
                    style.textFont,
                    style.textAlign || al,
                    style.textBaseline || bl
                );
            }
        }
        
        function _fillText(ctx, text, x, y, textFont, textAlign, textBaseline) {
            if (textFont) {
                ctx.font = textFont;
            }
            ctx.textAlign = textAlign;
            ctx.textBaseline = textBaseline;
            var rect = _getTextRect(
                text, x, y, textFont, textAlign, textBaseline
            );
            
            text = (text + '').split('\n');
            var lineHeight = area.getTextHeight('国', textFont);
            
            switch (textBaseline) {
                case 'top':
                    y = rect.y;
                    break;
                case 'bottom':
                    y = rect.y + lineHeight;
                    break;
                default:
                    y = rect.y + lineHeight / 2;
            }
            
            for (var i = 0, l = text.length; i < l; i++) {
                ctx.fillText(text[i], x, y);
                y += lineHeight;
            }
        }

        /**
         * 返回矩形区域，用于局部刷新和文字定位
         * 
         * @inner
         * @param {Object} style
         */
        function _getTextRect(text, x, y, textFont, textAlign, textBaseline) {
            var width = area.getTextWidth(text, textFont);
            var lineHeight = area.getTextHeight('国', textFont);
            
            text = (text + '').split('\n');
            
            switch (textAlign) {
                case 'end':
                case 'right':
                    x -= width;
                    break;
                case 'center':
                    x -= (width / 2);
                    break;
            }

            switch (textBaseline) {
                case 'top':
                    break;
                case 'bottom':
                    y -= lineHeight * text.length;
                    break;
                default:
                    y -= lineHeight * text.length / 2;
            }

            return {
                x : x,
                y : y,
                width : width,
                height : lineHeight * text.length
            };
        }
    
        /**
         * 根据默认样式扩展高亮样式
         * 
         * @param ctx Canvas 2D上下文
         * @param {Object} style 默认样式
         * @param {Object} highlightStyle 高亮样式
         */
        Base.prototype.getHighlightStyle = function (style, highlightStyle, brushTypeOnly) {
            var newStyle = {};
            for (var k in style) {
                newStyle[k] = style[k];
            }

            var color = require('../tool/color');
            var highlightColor = color.getHighlightColor();
            // 根据highlightStyle扩展
            if (style.brushType != 'stroke') {
                // 带填充则用高亮色加粗边线
                newStyle.strokeColor = highlightColor;
                newStyle.lineWidth = (style.lineWidth || 1)
                                      + this.getHighlightZoom();
                newStyle.brushType = 'both';
            }
            else {
                if (brushTypeOnly != 'stroke') {
                    // 描边型的则用原色加工高亮
                    newStyle.strokeColor = highlightColor;
                    newStyle.lineWidth = (style.lineWidth || 1)
                                          + this.getHighlightZoom();
                } else {
                    // 线型的则用原色加工高亮
                    newStyle.strokeColor = highlightStyle.strokeColor
                                           || color.mix(
                                                 style.strokeColor,
                                                 color.toRGB(highlightColor)
                                              );
                }
            }

            // 可自定义覆盖默认值
            for (var k in highlightStyle) {
                if (typeof highlightStyle[k] != 'undefined') {
                    newStyle[k] = highlightStyle[k];
                }
            }

            return newStyle;
        };

        /**
         * 高亮放大效果参数
         * 当前统一设置为6，如有需要差异设置，通过this.type判断实例类型
         */
        Base.prototype.getHighlightZoom = function () {
            return this.type != 'text' ? 6 : 2;
        };

        /**
         * 默认漂移
         * 
         * @param dx 横坐标变化
         * @param dy 纵坐标变化
         */
        Base.prototype.drift = function (dx, dy) {
            this.position[0] += dx;
            this.position[1] += dy;
        };

        /**
         * 默认区域包含判断
         * 
         * @param x 横坐标
         * @param y 纵坐标
         */
        Base.prototype.isCover = function (x, y) {
            // 对鼠标的坐标也做相同的变换
            if (this.__needTransform && this._transform) {
                var inverseMatrix = [];
                matrix.invert(inverseMatrix, this._transform);

                var originPos = [x, y];
                matrix.mulVector(originPos, inverseMatrix, [x, y, 1]);

                if (x == originPos[0] && y == originPos[1]) {
                    // 避免外部修改导致的__needTransform不准确
                    this.__needTransform = 
                        Math.abs(this.rotation[0]) > 0.0001
                        || Math.abs(this.position[0]) > 0.0001
                        || Math.abs(this.position[1]) > 0.0001
                        || Math.abs(this.scale[0] - 1) > 0.0001
                        || Math.abs(this.scale[1] - 1) > 0.0001;
                }

                x = originPos[0];
                y = originPos[1];
            }

            // 快速预判并保留判断矩形
            var rect = this.style.__rect;
            if (!rect) {
                rect = this.style.__rect = this.getRect(this.style);
            }

            if (x >= rect.x
                && x <= (rect.x + rect.width)
                && y >= rect.y
                && y <= (rect.y + rect.height)
            ) {
                // 矩形内
                return area.isInside(this, this.style, x, y);
            }
            
            return false;
        };

        Base.prototype.updateTransform = function (e) {
            var _transform = e._transform || matrix.create();
            matrix.identity(_transform);
            if (e.scale && (e.scale[0] !== 1 || e.scale[1] !== 1)) {
                var originX = e.scale[2] || 0;
                var originY = e.scale[3] || 0;
                if (originX || originY ) {
                    matrix.translate(
                        _transform, _transform, [-originX, -originY]
                    );
                }
                matrix.scale(_transform, _transform, e.scale);
                if ( originX || originY ) {
                    matrix.translate(
                        _transform, _transform, [originX, originY]
                    );
                }
            }

            if (e.rotation) {
                if (e.rotation instanceof Array) {
                    if (e.rotation[0] !== 0) {
                        var originX = e.rotation[1] || 0;
                        var originY = e.rotation[2] || 0;
                        if (originX || originY) {
                            matrix.translate(
                                _transform, _transform, [-originX, -originY]
                            );
                        }
                        matrix.rotate(_transform, _transform, e.rotation[0]);
                        if (originX || originY) {
                            matrix.translate(
                                _transform, _transform, [originX, originY]
                            );
                        }
                    }
                }
                else {
                    if (e.rotation !== 0) {
                        matrix.rotate(_transform, _transform, e.rotation);
                    }
                }
            }

            if (e.position && (e.position[0] !==0 || e.position[1] !== 0)) {
                matrix.translate(_transform, _transform, e.position);
            }

            // 保存这个变换矩阵
            e._transform = _transform;
            return _transform;
        };

        /**
         * 派生实现通用功能
         * 
         * @static
         * @param {Object} clazz 图形子类
         */
        Base.derive = function (clazz) {
            var clazzPrototype = clazz.prototype;
            function F() {}
            F.prototype = Base.prototype;
            clazz.prototype = new F();

            for (var prop in clazzPrototype) {
                clazz.prototype[prop] = clazzPrototype[prop];
            }
            clazz.constructor = clazz;
        };

        return Base;
    }
);
