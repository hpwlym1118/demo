
define([
    "dojo/_base/declare"
],function (declare) {
    var clazz = declare(null, {

        popups : [],

        constructor : function(){

            view.on('drag', function (e) {
                this.relocatePopup();
            }.bind(this));

            //滚轮事件
            view.on('mouse-wheel', function (e) {
                this.relocatePopup();
            }.bind(this));

            setInterval($.proxy(function () {
                this.relocatePopup();
            },this), 100);
        },

        /**
         * 创建气泡
         * @param options
         */
        create : function(options){
            var $pop = $(options.content);
            $pop.prop("id", options.id);
            $pop.addClass("popdiv");
            // $pop.append(options.content);
            var screenPoint = this.getScreenPoint(options.x, options.y, options.z);
            var x = screenPoint.x ;
            var y = screenPoint.y - options.height;
            if (options.limited == false) {
                $pop.css({position : "absolute", top : y + "px", left : x + "px"});
            }else {
                $pop.css({position : "absolute", top : y + "px", left : x + "px", width : options.width + "px",height : options.height + "px","z-index":"10"});
            }
            var pop = {
                id : options.id,
                x : options.x,
                y : options.y,
                z : options.z,
                width : options.width,
                height : options.height,
                html : $pop
            };
            $("body").append($pop);
            this.popups.push(pop);
            function setZindexUp(evt){
                $(evt.currentTarget).css("z-index",50);
            }
            function setZindexDown(evt){
                $(evt.currentTarget).css("z-index",10);
            }
            $('.popdiv').unbind('mouseover',setZindexUp).mouseover(setZindexUp);
            $('.popdiv').unbind('mouseout',setZindexDown).mouseout(setZindexDown);
        },

        destroyAll : function(){
            this.popups.forEach(function (value) {
                $("#"+value.id).remove();
            });
            this.popups = [];
        },

        /**
         * 移动popup位置
         */
        relocatePopup: function () {
            for (var i = 0; i < this.popups.length; i++) {
                var popup = this.popups[i];

                var screenPoint = this.getScreenPoint(popup.x, popup.y, popup.z);

                var x = screenPoint.x;
                var y = screenPoint.y;
                //重新设置popup的div的位置
                popup.html.css({top : (y-popup.height) + "px", left : (x) + "px"});
            }
        },

        /**
         * 获取屏幕坐标
         * @param x
         * @param y
         * @param z
         * @returns {*}
         */
        getScreenPoint : function (x, y, z) {
            var point = {
                type : 'point',
                x: x,
                y: y,
                z: z,
                spatialReference:view.spatialReference
            };
            var screenPoint = view.toScreen(point);
            return screenPoint;
        }

    });
    return clazz;
});