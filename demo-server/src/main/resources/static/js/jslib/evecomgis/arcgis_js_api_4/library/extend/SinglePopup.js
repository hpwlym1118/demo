define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    "dojo/dom-style",
    'dojo/dom',
    "dojo/_base/window",
    'dojo/on'
], function (declare, domConstruct, domStyle, dom, win, on) {
    return declare([], {
        _view: null,
        _mapPoint: null,
        _style: null,
        _id: null,
        _title: null,
        _content: null,
        _innerHtml: null,
        _winPopupDom: null, // 弹出框实例
        _currentScreenPoint: null, // 弹出框当前屏幕位置
        _viewDragEvent: null,
        _viewZoomChangeEvent: null,
        _viewExtentChangeEvent: null,
        _viewResizeEvent: null,
        /**
         * 构造函数
         * @param view {MapView| SceneView} 地图视图
         */
        constructor: function (view) {

            if (typeof Object.assign != 'function') {
                Object.assign = function(target) {
                    'use strict';
                    if (target == null) {
                        throw new TypeError('Cannot convert undefined or null to object');
                    }

                    target = Object(target);
                    for (var index = 1; index < arguments.length; index++) {
                        var source = arguments[index];
                        if (source != null) {
                            for (var key in source) {
                                if (Object.prototype.hasOwnProperty.call(source, key)) {
                                    target[key] = source[key];
                                }
                            }
                        }
                    }
                    return target;
                };
            }

            this._view = view;
            this.bindViewEvent();
        },

        /**
         * 地图事件绑定
         */
        bindViewEvent: function() {
            var _self = this;

            _self._viewDragEvent = _self._view.on('drag', function (evt) {
                if (_self._winPopupDom) {
                    if (evt && (evt.type === 'drag' || evt.type === 'mouse-wheel')) {
                        _self._currentScreenPoint = _self._view.toScreen(_self._mapPoint);
                        _self.updatePopPosition(_self._currentScreenPoint);
                    } else {
                        if (_self._winPopupDom) {
                            _self.destroy();
                        }
                    }
                }
            }.bind(this));

            // 地图zoom事件
            _self._viewZoomChangeEvent = _self._view.watch('zoom', function(value) {
                if (_self._winPopupDom) {
                    _self._currentScreenPoint = _self._view.toScreen(_self._mapPoint);
                    _self.updatePopPosition(_self._currentScreenPoint);
                }
            }.bind(this));

            // 地图extent事件
            _self._viewExtentChangeEvent = _self._view.watch('extent', function(value) {
                if (_self._winPopupDom) {
                    _self._currentScreenPoint = _self._view.toScreen(_self._mapPoint);
                    _self.updatePopPosition(_self._currentScreenPoint);
                }
            }.bind(this));

            // 地图容器大小变化事件
            _self._viewResizeEvent = _self._view.on('resize', function (evt) {
                if (_self._winPopupDom) {
                    _self._currentScreenPoint = _self._view.toScreen(_self._mapPoint);
                    _self.updatePopPosition(_self._currentScreenPoint);
                }
            }.bind(this));
        },

        /**
         * 创建pop dom
         */
        _createSinglePopup: function (id, title, content) {
            var _self = this;
            _self._winPopupDom = domConstruct.create("div", {
                id: id || "winPopupId",
                innerHTML: '<span id="yin" style="position: absolute; display: block; left: calc(50% - 10px); width: 20px; height: 21px;margin-top: -20px; background: url(./img/tipAngle.png) no-repeat center"></span><div style= "background-color: #3a7ad6; display: flex; justify-content: space-between; font-size: 14px; color: #fff; padding: 6px 9px;"><span id="popTitle">' + title + '</span><span id="closePop" style= "cursor: pointer;">X</span></div><div id="popContent" style="display: block;">' + content + '</div>',
            }, win.body(), "last");
            on(dom.byId('closePop'), 'click', function(){
                _self.destroy();
            });
        },
        /**
         * 显示pop
         * @description 弹出框的位置为鼠标点右下角5px
         * @param mapPoint {Point} 鼠标经过的点
         * @param id {string} 气泡div的id
         * @param title {string} 要在弹窗框中显示的内容
         * @param content {string| HTML} 要在弹窗框中显示的内容
         * @param style{CSS | style Object} 弹出框的样式，默认样式为"width": "300px", "z-index": "888", "position": "absolute"
         */
        show: function (mapPoint, title, content, style, id) {
            var _self = this;
            if (_self._winPopupDom) {
                _self.destroy();
            }
            _self._mapPoint = mapPoint;
            _self._createSinglePopup(id, title, content);
            _self._currentScreenPoint = _self._view.toScreen(mapPoint);
            _self._id = id;
            _self._title = title;
            _self._content = content;
            _self._style = Object.assign({
                // "background-color": "#fff",
                "width": "460px",
                "z-index": "50",
                "position": "absolute"
            },style? style:{});
            domStyle.set(_self._winPopupDom, _self._style);
            _self.updatePopPosition(_self._currentScreenPoint);

        },

        /**
         * 创建pop dom
         */
        _createSinglePopupWithInnerHtml: function (id, innerHtml) {
            var _self = this;
            _self._winPopupDom = domConstruct.create("div", {
                id: id || "winPopupId",
                innerHTML: innerHtml,
            }, win.body(), "last");
        },
        /**
         * 显示pop
         * @description 弹出框的位置为鼠标点右下角5px
         * @param mapPoint {Point} 鼠标经过的点
         * @param id {string} 气泡div的id
         * @param innerHtml {string| HTML} 要在弹窗框中显示的内容
         * @param style{CSS | style Object} 弹出框的样式，默认样式为"width": "300px", "z-index": "888", "position": "absolute"
         */
        showWithInnerHtml: function (mapPoint, innerHtml, style, id) {
            var _self = this;
            if (_self._winPopupDom) {
                _self.destroy();
            }
            _self._mapPoint = mapPoint;
            _self._createSinglePopupWithInnerHtml(id, innerHtml);
            _self._currentScreenPoint = _self._view.toScreen(mapPoint);
            _self._id = id;
            _self._innerHtml = innerHtml;
            _self._style = Object.assign({
                // "background-color": "#fff",
                "width": "460px",
                "z-index": "50",
                "position": "absolute"
            },style? style:{});
            domStyle.set(_self._winPopupDom, _self._style);
            _self.updatePopPosition(_self._currentScreenPoint);

        },
        updatePopPosition: function (newScreenPoint) {
            if(newScreenPoint) {
                var _self = this;
                var width = parseFloat(_self._style['width']) || 0;
                if (width == 0 && _self._winPopupDom.clientWidth) {
                    width = _self._winPopupDom.clientWidth;
                }
                var height = _self._winPopupDom.clientHeight || 0;
                domStyle.set(_self._winPopupDom, {
                    'left': newScreenPoint.x - width / 2.0 + 'px',
                    'top': newScreenPoint.y - height - 10 + 'px'
                });
            }
        },
        /**
         * 销毁pop
         */
        destroy: function () {
            if(this._viewDragEvent) {
                this._viewDragEvent.remove();
                this._viewDragEvent = null;
            }
            if(this._viewZoomChangeEvent) {
                this._viewZoomChangeEvent.remove();
                this._viewZoomChangeEvent = null;
            }
            if(this._viewExtentChangeEvent) {
                this._viewExtentChangeEvent.remove();
                this._viewExtentChangeEvent = null;
            }
            if(this._viewResizeEvent) {
                this._viewResizeEvent.remove();
                this._viewResizeEvent = null;
            }
            this._winPopupDom && domConstruct.destroy(this._winPopupDom);
        }
    })

});
