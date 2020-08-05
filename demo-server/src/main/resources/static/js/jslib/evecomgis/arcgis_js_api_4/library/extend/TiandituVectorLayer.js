define(["dojo/_base/declare", "dojo/_base/lang","esri/config","esri/layers/BaseTileLayer","esri/request",
        "esri/geometry/SpatialReference","esri/layers/support/TileInfo","esri/geometry/Extent"],
    function (declare,lang,esriConfig,BaseTileLayer,esriRequest, SpatialReference, TileInfo, Extent) {
        return BaseTileLayer.createSubclass({
            constructor: function() {
                if(eveGisConfig.wkid == 4326) {
                    this.properties.urlTemplate = eveGisConfig.tiandituService.vecService_c;
                    if(eveGisConfig.webEnv == 2 || eveGisConfig.webEnv == 3) {
                        this.properties.urlTemplate = eveGisConfig.egisConfig.mapServices.vecService_c;
                    }
                    if(eveGisConfig.webEnv == 5) {
                        this.properties.urlTemplate = eveGisConfig.zwService.vecService_c;
                    }
                    this.spatialReference = new SpatialReference({ wkid: 4326 });
                    var lods = [
                        {level : 0,levelValue: 0, resolution : 0.703125, scale : 2.9582935545E8},
                        {level : 1,levelValue: 1, resolution : 0.3515625, scale : 1.47914677725E8},
                        {level : 2,levelValue: 2, resolution : 0.17578125, scale : 7.39573388625E7},
                        {level : 3,levelValue: 3, resolution : 0.087890625, scale : 3.697866943125E7},
                        {level : 4,levelValue: 4,resolution : 0.0439453125, scale : 1.8489334715625E7},
                        {level : 5,levelValue: 5, resolution : 0.02197265625, scale : 9244667.3578125},
                        {level : 6,levelValue: 6, resolution : 0.010986328125, scale : 4622333.67890625},
                        {level : 7,levelValue: 7, resolution : 0.0054931640625, scale : 2311166.839453125},
                        {level : 8,levelValue: 8, resolution : 0.00274658203125, scale : 1155583.4197265625},
                        {level : 9,levelValue: 9, resolution : 0.001373291015625, scale : 577791.7098632812},
                        {level : 10,levelValue: 10, resolution : 6.866455078125E-4, scale : 288895.8549316406},
                        {level : 11,levelValue: 11, resolution : 3.4332275390625E-4, scale : 144447.9274658203},
                        {level : 12,levelValue: 12, resolution : 1.71661376953125E-4, scale : 72223.96373291015},
                        {level : 13,levelValue: 13, resolution : 8.58306884765625E-5, scale : 36111.98186645508},
                        {level : 14,levelValue: 14, resolution : 4.291534423828125E-5, scale : 18055.99093322754},
                        {level : 15,levelValue: 15, resolution : 2.1457672119140625E-5, scale : 9027.99546661377},
                        {level : 16,levelValue: 16, resolution : 1.0728836059570312E-5, scale : 4513.997733306885},
                        {level : 17,levelValue: 17, resolution : 5.364418029785156E-6, scale : 2256.9988666534423}
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
                } else {
                    this.properties.urlTemplate = eveGisConfig.tiandituService.vecService_w;
                    /*if(eveGisConfig.webEnv == 2 || eveGisConfig.webEnv == 3) {
                        this.properties.urlTemplate = eveGisConfig.egisConfig.mapServices.vecService_c;
                    }
                    if(eveGisConfig.webEnv == 5) {
                        this.properties.urlTemplate = eveGisConfig.zwService.vecService_c;
                    }*/
                }
            },
            properties: {
                urlTemplate: null
            },
            getTileUrl: function(level, row, col) {
                var url = this.properties.urlTemplate;
                var lev = level;
                if(eveGisConfig.wkid == 4326) {
                    lev = level + 1;
                }
                url += "&TILEMATRIX=" + lev + "&TILEROW=" + row + "&TILECOL=" + col;
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
