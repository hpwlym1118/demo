define(["dojo/_base/declare", "dojo/_base/lang", "esri/config", "esri/layers/BaseTileLayer", "esri/request",
        "esri/geometry/SpatialReference", "esri/layers/support/TileInfo", "esri/geometry/Extent"],
    function (declare, lang, esriConfig, BaseTileLayer, esriRequest, SpatialReference, TileInfo, Extent) {
        return BaseTileLayer.createSubclass({
            constructor: function () {
                this.properties.urlTemplate = eveGisConfig.superMapService.superMapVecService_c;
                this.spatialReference = new SpatialReference({wkid: 4326});
                var lods = [
                    {level: 0, levelValue: 0, resolution: 1.25764139776733, scale: 500000000.0},
                    {level: 1, levelValue: 1, resolution: 0.628820698883665, scale: 250000000.0},
                    {level: 2, levelValue: 2, resolution: 0.251528279553466, scale: 100000000.0},
                    {level: 3, levelValue: 3, resolution: 0.125764139776733, scale: 50000000.0},
                    {level: 4, levelValue: 4, resolution: 0.0628820698883665, scale: 25000000.0},
                    {level: 5, levelValue: 5, resolution: 0.0251528279553466, scale: 10000000},
                    {level: 6, levelValue: 6, resolution: 0.0125764139776733, scale: 5000000},
                    {level: 7, levelValue: 7, resolution: 0.00628820698883665, scale: 2500000},
                    {level: 8, levelValue: 8, resolution: 0.00251528279553466, scale: 1000000},
                    {level: 9, levelValue: 9, resolution: 0.00125764139776733, scale: 500000},
                    {level: 10, levelValue: 10, resolution: 0.000628820698883665, scale: 250000},
                    {level: 11, levelValue: 11, resolution: 0.000251528279553466, scale: 100000},
                    {level: 12, levelValue: 12, resolution: 0.000125764139776733, scale: 50000},
                    {level: 13, levelValue: 13, resolution: 0.0000628820698883665, scale: 25000.0},
                    {level: 14, levelValue: 14, resolution: 0.0000251528279553466, scale: 10000},
                    {level: 15, levelValue: 15, resolution: 0.0000125764139776733, scale: 5000},
                    {level: 16, levelValue: 16, resolution: 0.00000628820698883665, scale: 2500},
                    {level: 17, levelValue: 17, resolution: 0.00000251528279553466, scale: 1000},
                    {level: 18, levelValue: 18, resolution: 0.00000125764139776733, scale: 500},
                    {level: 19, levelValue: 19, resolution: 0.000000628820698883665, scale: 250},
                    {level: 20, levelValue: 20, resolution: 0.000000251528279553466, scale: 100},
                ];
                var fullExtent = new Extent(-180.0, -90.0, 180.0, 90.0, this.spatialReference);
                var tileInfo = new TileInfo({
                    dpi: 90.71428571427429,//解析度，即像素
                    rows: 256,
                    cols: 256,
                    compressionQuality: 0,
                    origin: {
                        x: -180,
                        y: 90
                    },
                    spatialReference: this.spatialReference,
                    lods: lods
                });
                return lang.mixin(this, {
                    fullExtent: fullExtent,
                    tileInfo: tileInfo
                });
            },
            properties: {
                urlTemplate: null
            },
            getTileUrl: function (level, row, col) {
                var url = this.properties.urlTemplate;
                var lev = level;
                if (eveGisConfig.wkid == 4326) {
                    lev = level + 1;
                }
                url += "&TILEMATRIX=" + lev + "&TILEROW=" + row + "&TILECOL=" + col;
                return url;
            },
            fetchTile: function (level, row, col) {
                var url = this.getTileUrl(level, row, col);
                return esriRequest(url, {
                    responseType: "image"
                })
                    .then(function (response) {

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
