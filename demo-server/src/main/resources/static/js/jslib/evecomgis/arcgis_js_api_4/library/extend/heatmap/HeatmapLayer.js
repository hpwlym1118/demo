define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'esri/layers/BaseDynamicLayer',
    'esri/geometry/Point'
], function (declare, lang, BaseDynamicLayer, Point) {
    return BaseDynamicLayer.createSubclass({
        _view: null,
        _config: null,
        canvas: null,
        canvas2: null,
        context: null,
        minnum: 0,
        maxnum: 1,
        data: [],
        viewExtentEvent: null,
        viewCameraEvent: null,
        constructor: function (options) {
            options = options || {};
            this._view = options.view;
            this._config = options.config;
            this.createCanvas();
            this.startMapEventListeners();
            var _self = this;
            this.on("layerview-destroy", function(event) {
                _self.canvas.remove();
                _self.canvas2.remove();
                if(this.viewExtentEvent) {
                    this.viewExtentEvent.remove();
                }
                if(this.viewCameraEvent) {
                    this.viewCameraEvent.remove();
                }
            });
        },
        getImageUrl: function(extent, width, height, callback) {
            // 使用获得的数据创建热度图
            if(!this.data) {
                this.data = [];
            }
            this.clearCanvas();
            this.addPoint(this.data);
            return this.canvas2.toDataURL('image/png');
        },
        // 创建Canvaslayer的容器canvas，添加到map的layers下面
        createCanvas: function () {
            var canvas = document.createElement('canvas');
            canvas.width = this._view.width;
            canvas.height = this._view.height;
            canvas.setAttribute("id", "heatmap");
            canvas.style.position = "absolute";
            canvas.style.top = 0;
            canvas.style.left = 0;
            var parent = document.getElementsByClassName("esri-view-surface")[0];
            parent.appendChild(canvas);
            this.canvas = canvas;
            this.context = document.getElementById("heatmap").getContext('2d');
            var canvas2 = document.createElement('canvas');
            canvas2.width = this._view.width;
            canvas2.height = this._view.height;
            canvas2.setAttribute("id", "heatmap_empty");
            canvas2.style.position = "absolute";
            canvas2.style.top = 0;
            canvas2.style.left = 0;
            parent.appendChild(canvas2);
            this.canvas2 = canvas2;
        },
        // 转换数据
        convertHeatmapData: function (data) {
            var xField = this.config.lonName || 'x';
            var yField = this.config.latName || 'y';
            var zField = this.config.zindexName || 'z';
            var weightField = this.config.weightField || 'weight';
            var heatPluginData = [];
            for (var i = 0; i < data.length; i++) {
                if(data[i][xField] && data[i][yField]) {
                    var screenpoint = this._view.toScreen(new Point({
                        x: data[i][xField],
                        y: data[i][yField],
                        z: data[i][zField] || 551,
                    }));
                    if(screenpoint) {
                        // 判断数据是否带有权重，未带有权重属性是默认为1
                        if (data[i][weightField]) {
                            heatPluginData.push([Math.round(screenpoint.x), Math.round(screenpoint.y), data[i][weightField]]);
                        } else {
                            heatPluginData.push([Math.round(screenpoint.x), Math.round(screenpoint.y), 1]);
                        }
                        if (this.minnum > data[i][weightField]) {
                            this.minnum = data[i][weightField]
                        }
                        if (this.maxnum < data[i][weightField]) {
                            this.maxnum = data[i][weightField]
                        }
                    }
                }
            }
            return {
                points: heatPluginData,
                min: this.minnum,
                max: this.maxnum
            };
        },
        //添加点数据
        addPoint: function (data) {
            this.data = data;
            var points = this.convertHeatmapData(data);
            for (var i = 0; i < points.points.length; i++) {
                var point = points.points[i];
                this.context.beginPath();
                // var alpha = (point[2] - points.min) / (points.max - points.min);
                // this.context.globalAlpha = alpha;
                this.context.arc(point[0], point[1], this._config.radius, 0, Math.PI * 2, true);
                //绘制一个放射渐变样式的圆
                var gradient = this.context.createRadialGradient(point[0], point[1], 0, point[0], point[1], this._config.radius);
                gradient.addColorStop(0, 'rgba(0,0,0,1)');
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                this.context.fillStyle = gradient;
                this.context.closePath();
                this.context.fill();
            }
            this.MapColors();
        },
        //设置渐变色带
        getColorPaint: function () {
            var paletteCanvas = document.createElement('canvas');
            var paletteCtx = paletteCanvas.getContext('2d');
            var gradientConfig = this._config.gradient;
            paletteCanvas.width = 256;
            paletteCanvas.height = 1;
            var gradient = paletteCtx.createLinearGradient(0, 0, 256, 1);
            for (var key in gradientConfig) {
                gradient.addColorStop(key, gradientConfig[key])
            }
            paletteCtx.fillStyle = gradient;
            paletteCtx.fillRect(0, 0, 256, 1);
            return paletteCtx.getImageData(0, 0, 256, 1).data;
        },
        //映射颜色
        MapColors: function () {
            var palette = this.getColorPaint();
            var img = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            var imgData = img.data;
            for (var i = 0; i < imgData.length; i++) {
                var alpha = imgData[i];
                var offset = alpha * 4;
                if (!offset) {
                    continue
                }
                //映射颜色RGB值
                imgData[i - 3] = palette[offset];
                imgData[i - 2] = palette[offset + 1];
                imgData[i - 1] = palette[offset + 2];
            }
            return this.context.putImageData(img, 0, 0, 0, 0, this.canvas.width, this.canvas.height);
        },
        // 刷新layer
        freshenLayer: function () {
            this.clearCanvas();
            this.addPoint(this.data);
        },
        // 清除渲染效果
        clearCanvas: function () {
            this.context.clearRect(0, 0, this._view.width, this._view.height);
        },
        // 添加监听
        startMapEventListeners: function () {
            var view = this._view;
            if(this.viewExtentEvent) {
                this.viewExtentEvent.remove();
            }
            if(this.viewCameraEvent) {
                this.viewCameraEvent.remove();
            }
            this.viewExtentEvent = view.watch("extent", lang.hitch(this, function () {
                if (!this.visible) return;
                this.freshenLayer();
            }));
            this.viewCameraEvent = view.watch("camera", lang.hitch(this, function () {
                if (!this.visible) return;
                this.freshenLayer();
            }));
        }
    });
});
