define(["dojo/_base/declare", "dojo/_base/lang","esri/config","esri/layers/BaseTileLayer","esri/request"],
    function (declare,lang,esriConfig,BaseTileLayer,esriRequest) {
        return BaseTileLayer.createSubclass({
            properties: {
                urlTemplate: null
            },
            getTileUrl: function(level, row, col) {
                // var url = "http://t"+col % 8 +".tianditu.gov.cn/DataServer?T=cva_w&tk=50ad86523d1aa1207677de072684431a&x="+col+"&y="+row+"&l="+level;
                var url = "http://t0.tianditu.com/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&serviceMode=KVP&TILEMATRIX=" + level + "&TILEROW=" + row + "&TILECOL=" + col + "&FORMAT=tiles&tk=50ad86523d1aa1207677de072684431a";
                return url;
            },
            fetchTile: function(level, row, col) {
                var url = this.getTileUrl(level, row, col);
                return esriRequest(url, {
                    responseType: "image"
                })
                    .then(function(response) {

                        var image = response.data;
                        var width = this.tileInfo.size[0];
                        var height = this.tileInfo.size[0];

                        var canvas = document.createElement("canvas");
                        var context = canvas.getContext("2d");
                        canvas.width = width;
                        canvas.height = height;

                        context.drawImage(image, 0, 0, width, height);

                        return canvas;
                    }.bind(this));
            }
        });
    }
);
