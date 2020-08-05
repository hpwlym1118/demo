// 定义map和view的全局变量
var map, view, playSlides, layerIds = {
    BUILDING: "building", // 楼宇图层
    BUILDING_1: "building_1", // 楼宇图层
    RIVER: "river", // 河流图层
    BIG_ROAD: "big_road", // 道路图层
    SMALL_ROAD: "small_road", // 小路图层
    GREEN_LAND: "green_land", // 绿地图层
    DISTRICT: "district", // 市区划图层
    TOWN: "town_area", // 乡镇边界图层
    BASE_GRAPHIC: "base_graphic", // 基础图层
    SHANGQUAN: "shangquan",
    JUNMENSHEQU: "junmen_shequ",
    MONITOR_POINT: "monitor_point", // 监控图层
    UAV_LINE: 'uav_line', // 无人机轨迹图层
    JMSQ: "jmsq",
    UAV_POINT_LAYER: "uav_point_layer", // 无人机轨迹运动点图层
    CAR_POINT_LAYER: "car_point_layer", // 车辆图层
    PERSON_POINT_LAYER: "person_point_layer", // 人员位置图层
    KEYCOMPANY: "KeyCompany",
    DANGER: "danger", // 风险隐患图层
};
// 地图服务路径
var serverUrl = {
    // 公司
    layerServer: "http://192.168.200.53:6080",
    sceneServer: "http://server128.esrichina.com"
    // 外部
    // layerServer : "http://183.252.13.106:6080",
    // sceneServer : "http://183.252.13.106:6081"
};
var mapServerUri = "http://192.168.200.53:6080";
var sceneServerUri = "http://server128.esrichina.com";

var isWgs84 = false;

// 页面基础url
evecom.v.baseUrl = window.location.origin + window.location.pathname.substr(0, window.location.pathname.indexOf('/', 1));

// 是否开发环境
evecom.v.isDev = 1;
var hostname = window.location.hostname;
if (hostname == '183.252.13.106') {
    evecom.v.isDev = 0;
}

var commonFun, extendPopup, threejsExternalRenderer, orders;

var arr = [
    {
        color: 0xFFE10A,
        path: [
            [119.29002924097986, 26.088555502922123],
            [119.29151223143037, 26.088852559555292],
            [119.29626720932482, 26.089257035272986],
            [119.29895396994485, 26.08954634953034]
        ],
        index: 0
    },
    {
        color: 0xFF5500,
        path: [
            [119.29145006152889, 26.08884144603404],
            [119.29695378830552, 26.089322494100387],
            [119.29959987007199, 26.08962903371307]
        ],
        index: 0
    },
    {
        color: 0x24D900,
        path: [
            [119.297613345198, 26.08938717282852],
            [119.29231954733663, 26.08890321835306],
            [119.2912246399987, 26.088760512110923]
        ],
        index: 0
    },
    /*{
        color : 0xED1800,
        path : [
            [119.2988834105459,26.08948820204224],
            [119.29257821548968,26.08892859412364],
            [119.29115701795175,26.088777403439884]
        ],
        index : 0
    },*/
    {
        color: 0xFFCD44,
        path: [
            [119.29404010287388, 26.090531450646868],
            [119.29476304536259, 26.08693024327572]
        ],
        index: 0
    },
    /*{
        color : 0x24D900,
        path : [
            [119.29416855375825,26.089955096924992],
            [119.29473658553951,26.08718917962241]
        ],
        index : 0
    },*/
    {
        color: 0xFF5500,
        path: [
            [119.29482163040102, 26.087019775746953],
            [119.2940771117479, 26.09066567402632]
        ],
        index: 0
    }/*,
    {
        color : 0xFFE10A,
        path : [
            [119.29478776362174,26.086934226727017],
            [119.2941251723628,26.090362454368925]
        ],
        index : 0
    }*/
];

/**
 * 显示右侧弹窗
 * @author Reed Lin
 * @created 2019/5/4 1:04
 */
var showRighImagetWin = function (url, timeout, secondUrl, thridUrl) {

    var $pop = $("#indiTemplate_white_center_4");
    $pop.addClass("zoomOut");
    var $img = $('<img alt="" src="' + url + '" style="display: none;width: 100%;height: 100%;">');
    $pop.find(".tempBlk-cont").find("img").remove();
    $pop.find(".tempBlk-cont").append($img);
    $img.fadeIn();

    if (secondUrl) {
        setTimeout(function () {
            $img.fadeOut(function (e) {
                $img.remove();
            });
            var $img2 = $('<img alt="" src="' + secondUrl + '" style="display: none;width: 100%;height: 100%;">');
            $pop.find(".tempBlk-cont").find("img").remove();
            $pop.find(".tempBlk-cont").append($img2);
            $img2.fadeIn();

            if (thridUrl) {

                setTimeout(function () {
                    $img2.fadeOut(function (e) {
                        $img2.remove();
                    });
                    var $img3 = $('<img alt="" src="' + thridUrl + '" style="display: none;width: 100%;height: 100%;">');
                    $pop.find(".tempBlk-cont").find("img").remove();
                    $pop.find(".tempBlk-cont").append($img3);
                    $img3.fadeIn();
                }, timeout);
            }
        }, timeout);
    }

    $pop.find(".close").unbind().bind("click", function () {
        hideRightImageWin();
    })
};

/**
 * 隐藏右侧弹窗
 * @author Reed Lin
 * @created 2019/5/4 1:05
 */
var hideRightImageWin = function () {
    var $pop = $("#indiTemplate_white_center_4");
    $pop.removeClass("zoomOut");
    $pop.find(".tempBlk-cont").find("img").remove();
};

require([
        "bigScreen",
        "esri/Map",
        "esri/Graphic",
        "esri/layers/SceneLayer",
        "esri/layers/BaseElevationLayer",
        "esri/layers/ElevationLayer",
        "esri/layers/FeatureLayer",
        "esri/tasks/support/Query",
        "esri/views/SceneView",
        "esri/views/3d/externalRenderers",
        "esri/geometry/Polygon",
        "esri/geometry/SpatialReference",
        "esri/layers/MapImageLayer",
        "esri/layers/BaseTileLayer",
        "esri/layers/TileLayer",
        "esri/layers/ImageryLayer",
        "esri/Basemap",
        "esri/request",
        "esri/core/urlUtils",
        "esri/layers/GraphicsLayer",
        "evecom/indexsmartfz/playSlides",
        "evecom/indexsmartfz/commonFun",
        "extend/extendPopup",
        "gisCommon/MapTool",
        'extend/TiandituVectorLayer',
        'extend/TiandituVectorAnnoLayer',
        'extend/SuperMapVectorLayer',
    ],
    function (
        BigScreen,
        Map,
        Graphic,
        SceneLayer,
        BaseElevationLayer,
        ElevationLayer,
        FeatureLayer,
        Query,
        SceneView,
        externalRenderers,
        Polygon,
        SpatialReference,
        MapImageLayer, BaseTileLayer, TileLayer, ImageryLayer, Basemap,
        esriRequest,
        urlUtils,
        GraphicsLayer,
        PlaySlides,
        CommonFun,
        ExtendPopup,
        MapTool,
        TiandituVectorLayer,
        TiandituVectorAnnoLayer,
        SuperMapVectorLayer
    ) {

        // 判断是否是开发环境，0为生产环境，1为开发环境
        if (evecom.v.isDev == 0) {
            serverUrl = {
                layerServer: "http://183.252.13.106:6080",
                sceneServer: "http://183.252.13.106:6081"
            };
            mapServerUri = "http://183.252.13.106:6080";
            sceneServerUri = "http://183.252.13.106:6081";
        }

        // 添加跨域访问规则
        urlUtils.addProxyRule({
            urlPrefix: 'http://t0.tianditu.com',
            proxyUrl: evecom.v.baseUrl + '/proxy.jsp'
        });
        urlUtils.addProxyRule({
            urlPrefix: 'http://tm.amap.com',
            proxyUrl: evecom.v.baseUrl + '/proxy.jsp'
        });
        urlUtils.addProxyRule({
            urlPrefix: 'http://its.map.baidu.com:8002',
            proxyUrl: evecom.v.baseUrl + '/proxy.jsp'
        });

        var MyCustomTileLayer = new TileLayer({
            url: serverUrl.layerServer + '/arcgis/rest/services/szzg/image/MapServer',
            visible: false,
            id: 'm_img'
        });

        // 天地图矢量
        var baseVectorLayer = new TiandituVectorLayer({
            id: 't_vec_w',
            visible: false
        });
        // 天地图矢量文字标注
        var baseVectorAnnoLayer = new TiandituVectorAnnoLayer({
            id: 't_vec_w_anno',
            visible: false
        });
        var customBasemap = new Basemap({
            baseLayers: [MyCustomTileLayer, baseVectorLayer, baseVectorAnnoLayer],
            title: "Custom Basemap",
            id: 'myBasemap'
        });
        // Create a map
        //////////////////////////////////////////////////////////////////////////////////////
        // 地形
        var ExaggeratedElevationLayer = BaseElevationLayer.createSubclass({
            properties: {
                exaggeration: 0.95
            },
            load: function () {
                this._elevation = new ElevationLayer({
                    url: serverUrl.layerServer + "/arcgis/rest/services/MZ/mzdem12/ImageServer"
                });
                this.addResolvingPromise(this._elevation.load());
            },
            // Fetches the tile(s) visible in the view
            fetchTile: function (level, row, col) {
                // calls fetchTile() on the elevationlayer for the tiles
                // visible in the view
                return this._elevation.fetchTile(level, row, col)
                    .then(function (data) {
                        var exaggeration = this.exaggeration;
                        for (var i = 0; i < data.values.length; i++) {
                            data.values[i] = data.values[i] * exaggeration;
                        }
                        return data;
                    }.bind(this));
            }
        });
        // Add the exaggerated elevation layer to the map's ground
        // in place of the default world elevation service
        map = new Map({
            //basemap: "satellite",
            //basemap: "streets-navigation-vector",
            basemap: customBasemap,
            // ground: "world-elevation",
            /*ground: {
                layers: [
                    new ExaggeratedElevationLayer(),
                ]
            }*/
        });

        // Create a SceneView
        view = new SceneView({
            container: "viewDiv",
            map: map,
            viewingMode: "global",
            zoom: 13.735976304576834,
            highlightOptions: {
                color: [39, 246, 255, 1],
                haloOpacity: 0.9,
                fillOpacity: 0
            },
            camera: {
                position: [119.26637506378452, 25.97137253983256, 9746.48154564295],
                heading: 11.932438477631285,
                tilt: 54.489648962513485
            }
        });

        // map.ground.navigationConstraint = {
        //     type: "none"
        // };
        map.ground.surfaceColor = "#010743";
        //to see through the ground, set the ground opacity to 0.4
        map.ground.opacity = 1;

        // Disable lighting based on the current camera position.
        // We want to display the lighting according to the current time of day.
        // view.environment.lighting.cameraTrackingEnabled = false;
        var cdate = new Date();
        cdate.setHours(13, 00, 1);
        view.environment.lighting.date = cdate;

        var graphicsLayer = new GraphicsLayer({id: layerIds.BASE_GRAPHIC});
        map.add(graphicsLayer);

        view.when(function (view) {
            initBaseLayer();
            initController();

            // playSlides.autoSwitchMenu();
            // commonFun.drawTownGrid();

            // 测试
            // playSlides.play("OverallSituation");

            $("body").trigger("mapLoadSuccess");

            view.on("click", function (evt) {
                console.log(evt.mapPoint.longitude + ", " + evt.mapPoint.latitude);
                view.hitTest(evt).then(function (response) {
                    console.log(response.results[0].graphic.attributes.OID);
                });
            });

            // TODO LSHY 20191013
            eve3D.bindViewEvent(view);
        });

        // TODO LSHY 20191013
        eve3D.mapview = view;
        eve3D.map = map;

        // 初始化基础图层
        function initBaseLayer() {
            // 服务过期，先注释 - hpw
            // 楼宇图层
            /*var buildingLayer = new SceneLayer({
                // URL to the service
                url: serverUrl.sceneServer + "/server/rest/services/Hosted/fuzhou_building_614/SceneServer",
                popupEnabled : false,
                opacity : 1,
                // visible : false,
                id: layerIds.BUILDING
            });*/
            // map.add(buildingLayer);
            // 河流图层
            var riverLayers = new FeatureLayer({
                url: serverUrl.layerServer + "/arcgis/rest/services/fujian/fujianwater/MapServer/0",
                id: layerIds.RIVER,
                outFields: ['*'],
                popupEnabled: false
            });
            map.add(riverLayers);
            // 服务过期，先注释 - hpw
            // 绿地图层
            /* var layerg= new SceneLayer({
                 // URL to the service
                 // url: serverUrl.sceneServer + "/server/rest/services/Hosted/mengz_green_523/SceneServer",
                 // url: serverUrl.sceneServer + "/server/rest/services/Hosted/mengz_green_529/SceneServer",
                 url: serverUrl.sceneServer + "/server/rest/services/Hosted/green_420/SceneServer",
                 //renderer: renderer2, // Set the renderer to
                 id: layerIds.GREEN_LAND,

             });
             map.add(layerg);*/
            // 市区划图层
            /*var landLayer = new FeatureLayer({
                // url: serverUrl.layerServer + "/arcgis/rest/services/MZ/mzbasemap/MapServer/4",
                url: serverUrl.layerServer + "/arcgis/rest/services/fujian/fujianbounder/MapServer/0",
                id: layerIds.DISTRICT,
                outFields: ["*"],
            });
            map.add(landLayer);
            var landLayer2 = new FeatureLayer({
                url: serverUrl.layerServer + "/arcgis/rest/services/fujian/fujianbounder/MapServer/1",
                id: layerIds.DISTRICT+'_2',
                outFields: ["*"],
                labelingInfo: [
                    {
                        labelExpressionInfo: {
                            value: "{DNAME}"
                        },
                        symbol: {
                            type: "label-3d",
                            symbolLayers: [
                                {
                                    type: "text",
                                    material: {
                                        color: "black"
                                    },
                                    halo: {
                                        size: 2,
                                        color: [255, 255, 255]
                                    },
                                    size: 16
                                }
                            ]
                        }
                    }
                ]
            });
            map.add(landLayer2);*/
            loadArea('350100');
        }

        // 初始化界面操作控制类
        function initController() {
            // 场景切换控制类
            playSlides = new PlaySlides();

            extendPopup = new ExtendPopup();

            eve3D.mapTool = new MapTool();
            eve3D.mapTool.init({top: 85, left: 465, toolCtr: ['search', 'basemap'/*, 'route', 'realTimeTraffic'*/]});

            // 创建公用方法类
            commonFun = new CommonFun();

            // Create our custom external renderer
            //////////////////////////////////////////////////////////////////////////////////////
            var bigScreen = new BigScreen();
            bigScreen.init();

            // 默认加载首页
            $(".topNav.topNav1").click();

            var slides = {};

            var menu = bigScreen.menu;

            orders = {};

            for (var key in menu) {
                var item = menu[key];
                if (item.slides) {
                    item.slides.forEach(function (sd) {
                        orders[sd.code] = sd.url;
                    });
                }
                if (item.children && item.children.length > 0) {
                    item.children.forEach(function (child) {
                        if (child.slides && child.slides.length > 0) {
                            child.slides.forEach(function (ssd) {
                                orders[ssd.code] = ssd.url;
                            });
                        }
                    });
                }
            }
        }

        // 加载网格面板（只出现界限 不填充）
        function loadArea(areaCode) {
            if (!areaCode) {
                return;
            }
            $.ajax({
                type: "POST",
                url: evecom.v.contextPath + '/jfs/ecssp/gis/gisCtr/queryCityByAreaCode',
                data: {areaCode: areaCode},
                dataType: "json",
                success: $.proxy(function (data) {
                    var xm = 0;
                    var pt = 0;
                    if (data) {
                        var cclayer = eve3D.map.findLayerById("area_polyline");
                        if (cclayer == null) {
                            cclayer = new GraphicsLayer({
                                id: "area_polyline"
                            });
                            eve3D.map.add(cclayer);
                        }
                        for (var i = 0; i < data.length; i++) {
                            var arr = [];
                            var coordinate = data[i].coordinate;
                            if (data[i].name == '福建') {
                                continue;
                            }
                            if (coordinate) {
                                var coordinateArr = coordinate.split(" ");
                                for (var j = 0; j < coordinateArr.length; j++) {
                                    var gisArr = coordinateArr[j].split(",");
                                    gisArr.push(500);
                                    arr.push(gisArr);
                                }

                                var paths = arr;
                                var polyline = {
                                    type: "polyline", // autocasts as new Polyline()
                                    paths: paths
                                };
                                var lineSymbol = {
                                    type: "simple-line",  // autocasts as new SimpleLineSymbol()
                                    color: '#00d2ff',
                                    width: "2"
                                };
                                var polylineGraphic = new Graphic({
                                    geometry: polyline,
                                    symbol: lineSymbol,
                                    attributes: data[i]
                                });
                                cclayer.add(polylineGraphic);
                                var textName = data[i].name;
                                if (data[i].name == "厦门市") {
                                    if (xm > 0) {
                                        textName = '';
                                    }
                                    xm++;
                                }
                                if (data[i].name == "平潭县") {
                                    if (pt > 0) {
                                        textName = '';
                                    }
                                    pt++;
                                }

                                var textSymbol = {
                                    type: "text",  // autocasts as new TextSymbol()
                                    color: '#0d316c',
                                    haloSize: "2px",
                                    haloColor: "#fff",
                                    text: textName,
                                    font: {  // autocasts as new Font()
                                        size: 11,
                                        weight: "bold",
                                    }
                                };
                                var polygon = new Polygon({
                                    hasZ: true,
                                    hasM: false,
                                    rings: paths,
                                    spatialReference: {wkid: 4326}
                                });
                                var extent = polygon.extent;
                                var fontGraphic = new Graphic({
                                    geometry: extent.center,
                                    symbol: textSymbol,
                                    attributes: data[i]

                                });
                                if (data[i].seq == "1") {
                                    cclayer.add(fontGraphic);
                                }
                            }
                        }
                    }
                }, this)
            });
        }

        threejsExternalRenderer = {
            renderer: null, // three.js renderer
            camera: null, // three.js camera
            scene: null, // three.js scene

            ambient: null, // three.js ambient light source
            sun: null, // three.js sun light source

            iss: null, // ISS model
            issScale: 1, // scale for the iss model
            issMaterial: new THREE.MeshLambertMaterial({color: 0xe03110}), // material for the ISS model

            cameraPositionInitialized: false, // we focus the view on the ISS once we receive our first data point
            positionHistory: [], // all ISS positions received so far

            markerMaterial: null, // material for the markers left by the ISS
            markerGeometry: null, // geometry for the markers left by the ISS
            showLight: true,// 显示场景灯光

            /**
             * Setup function, called once by the ArcGIS JS API.
             */
            setup: function (context) {

                var thiz = this;
                // initialize the three.js renderer
                //////////////////////////////////////////////////////////////////////////////////////
                this.renderer = new THREE.WebGLRenderer({
                    context: context.gl,
                    premultipliedAlpha: false
                });
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setViewport(0, 0, view.width, view.height);

                // prevent three.js from clearing the buffers provided by the ArcGIS JS API.
                this.renderer.autoClearDepth = false;
                this.renderer.autoClearStencil = false;
                this.renderer.autoClearColor = false;

                // The ArcGIS JS API renders to custom offscreen buffers, and not to the default framebuffers.
                // We have to inject this bit of code into the three.js runtime in order for it to bind those
                // buffers instead of the default ones.
                var originalSetRenderTarget = this.renderer.setRenderTarget.bind(
                    this.renderer
                );
                this.renderer.setRenderTarget = function (target) {
                    originalSetRenderTarget(target);
                    if (target == null) {
                        context.bindRenderTarget();
                    }
                };

                // setup the three.js scene
                ///////////////////////////////////////////////////////////////////////////////////////

                this.scene = new THREE.Scene();

                // setup the camera
                this.camera = new THREE.PerspectiveCamera();

                // setup scene lighting
                this.ambient = new THREE.AmbientLight(0xffffff, 0.7);
                this.scene.add(this.ambient);
                this.sun = new THREE.DirectionalLight(0xffffff, 0.5);
                this.scene.add(this.sun);

                this.spotLight = new THREE.SpotLight(0x588BE6, 5, 3000, 1, 2);
                this.spotLight.angle = Math.PI;
                this.scene.add(this.spotLight);

                this.spotLight2 = new THREE.SpotLight(0x588BE6, 5, 600, 1, 2);
                this.spotLight2.angle = 1;
                this.spotLight2.visible = false;
                this.scene.add(this.spotLight2);

                var groundGeometry = new THREE.PlaneBufferGeometry(16, 16);
                var groundMaterial = new THREE.MeshStandardMaterial({roughness: 0.8, metalness: 0.4});
                var groundw = new THREE.Mesh(groundGeometry, groundMaterial);
                var transform4 = new THREE.Matrix4();
                transform4.fromArray(externalRenderers.renderCoordinateTransformAt(view, [103.39893864825797, 23.37623674525804, 500], SpatialReference.WGS84, new Array(16)));
                transform4.decompose(groundw.position, groundw.quaternion, groundw.scale);


                this.pointLight = new THREE.PointLight(0x00FBFC, 10, 1000, 1, 2);
                this.pointLight.position.set(groundw.position.x, groundw.position.y, groundw.position.z);
                this.pointLight.visible = false;
                this.scene.add(this.pointLight);


                this.spotLight2.position.x = groundw.position.x;
                this.spotLight2.position.y = groundw.position.y;
                this.spotLight2.position.z = groundw.position.z;

                // setup markers
                this.markerGeometry = new THREE.SphereBufferGeometry(
                    12 * 1000,
                    16,
                    16
                );
                this.markerMaterial = new THREE.MeshBasicMaterial({
                    color: 0xe03110,
                    transparent: true,
                    opacity: 0.75
                });

                this.buildingModel = [];
                var mtlLoader = new THREE.MTLLoader();
                mtlLoader.load(evecom.v.contextPath + '/evecom/ecapp/incident/menu3d/obj/gulou_all_421_9.mtl', function (materials) {
                    materials.baseUrl = evecom.v.baseUrl + '/evecom/ecapp/incident/menu3d/obj/images/';
                    materials.preload();
                    var loader = new THREE.OBJLoader();
                    loader.setMaterials(materials);
                    loader.load(evecom.v.contextPath + '/evecom/ecapp/incident/menu3d/obj/gulou_all_421_9.obj', function (object) {
                        thiz.iss = object;
                        object.traverse(function (child) {
                            if (child instanceof THREE.Mesh) {
                                // var materials= new THREE.MeshPhongMaterial( { color: 0x007EFF, specular: 0x66CD00, emissive: 0x191970,  opacity: 1, transparent: true } );
                                // child.material=materials;
                            }
                        });

                        // Halu
                        var posEst4 = [119.27896606522772, 26.09529250167467, 0];

                        var transform4 = new THREE.Matrix4();
                        transform4.fromArray(externalRenderers.renderCoordinateTransformAt(view, posEst4, SpatialReference.WGS84, new Array(16)));
                        transform4.decompose(object.position, object.quaternion, object.scale);
                        var issScale = 0.00898;
                        object.scale.set(issScale, issScale + 0.001, issScale);
                        object.rotateX(Math.PI / 2);
                        thiz.scene.add(object);
                        thiz.buildingModel.push(object);
                    });
                });

                // 获取自发光材质
                function getBeamMaterials(texture, emissive) {
                    var material = new THREE.MeshLambertMaterial({
                        color: emissive,
                        // specular: 0x66CD00,
                        emissive: emissive,
                        // opacity: 0.5,
                        transparent: true,
                        emissiveIntensity: 1
                    });
                    if (texture) {
                        material.alphaMap = texture;
                    }
                    //重点，没有该句会导致PNG无法正确显示透明效果
                    material.transparent = true;
                    return material;
                }

                //坐标转换并加到地图上
                function transform(obj, scale, position, opacity) {
                    var transform4 = new THREE.Matrix4();
                    transform4.fromArray(externalRenderers.renderCoordinateTransformAt(view, position, SpatialReference.WGS84, new Array(16)));
                    transform4.decompose(obj.position, obj.quaternion, obj.scale);
                    obj.scale.set(scale, scale, scale);
                    // obj.rotateX(Math.PI/2);
                    obj.opacity = opacity;
                }

                this.emergencyModel = [];
                var mtlLoaderyy = new THREE.MTLLoader();
                mtlLoaderyy.load(evecom.v.contextPath + '/evecom/ecapp/incident/menu3d/obj/yingji_616_6.mtl', function (materials) {
                    if (!evecom.v.baseUrl) {
                        evecom.v.baseUrl = window.location.origin + window.location.pathname.substr(0, window.location.pathname.indexOf('/', 1));
                    }
                    materials.baseUrl = evecom.v.baseUrl + '/evecom/ecapp/incident/menu3d/obj/images/';
                    materials.preload();
                    var loader = new THREE.OBJLoader();
                    loader.setMaterials(materials);
                    loader.load(evecom.v.contextPath + '/evecom/ecapp/incident/menu3d/obj/yingji_616_6_0.obj', function (object) {
                        thiz.yingjiObj = object;
                        object.traverse(function (child) {
                            if (child instanceof THREE.Mesh) {
                                // var materials= new THREE.MeshPhongMaterial( { color: 0x007EFF, specular: 0x66CD00, emissive: 0x191970,  opacity: 1, transparent: true } );
                                // child.material=materials;
                            }
                        });

                        // Halu
                        var posEst4 = [119.27981213589496, 26.086697226728045, 0];
                        var transform4 = new THREE.Matrix4();
                        transform4.fromArray(externalRenderers.renderCoordinateTransformAt(view, posEst4, SpatialReference.WGS84, new Array(16)));
                        transform4.decompose(object.position, object.quaternion, object.scale);
                        var issScale = 0.9;
                        object.scale.set(issScale, issScale, issScale);
                        object.rotateX(Math.PI / 2);
                        object.visible = false;
                        thiz.scene.add(object);
                        thiz.emergencyModel.push(object);
                    });
                });

                this.buildingNames = [];

                function loadBuildingName() {
                    var loader = new THREE.OBJLoader();
                    /*var coord = [
                        {point : [119.30234850412666,26.099626626545447,0],scale : 2},
                        {point : [119.29421828378575,26.08787647824535,0],scale : 2},
                        {point : [119.30118115370017,26.098372834813084,0],scale : 2},
                        {point : [119.29742964638133,26.096361805260127,0],scale : 2},
                        {point : [119.30099948616116,26.099646829386643,0],scale : 2},
                        {point : [119.30620419768093,26.0768709552723,0],scale : 2},
                        {point : [119.2977319324073,26.09664854105187,0],scale : 1.5},
                        {point : [119.29245165366659,26.09119108834507,0],scale : 2},
                        {point : [119.30536475858865,26.09758241179922,0],scale : 1.5},
                        {point : [119.3021253126113,26.100735974284742,0],scale : 2},
                        {point : [119.3022588065042,26.097645512261824,0],scale : 1.5},
                        {point : [119.2753178813012,26.07342850740654,0],scale : 2},
                        {point : [119.30236198750478,26.100245741503297,0],scale : 1.5}
                    ];*/

                    STATIC_DATA.yyly.forEach(function (item, index) {
                        var name = (index < 9) ? ('0' + (index + 1)) : (index + 1);
                        loader.load(evecom.v.contextPath + '/evecom/ecapp/monitor/index/bigScreen/obj/buildingName/' + name + '.obj', function (obj) {
                                transform(obj, item.scale, item.point, 1);
                                obj.rotateZ(Math.PI / 2);
                                obj.visible = false;
                                thiz.buildingNames.push(obj);
                                thiz.scene.add(obj);
                            }
                        );
                    });

                    /*coord.forEach(function (item, index) {
                        var name = (index < 10) ? ('0' + (index+1)) : (index+1)
                        loader.load('evecom/ecapp/monitor/index/bigScreen/obj/buildingName/'+name+'.obj',function(obj) {
                                transform(obj, item.scale, item.point, 1);
                                obj.rotateZ(Math.PI/2);
                                obj.visible = false;
                                thiz.buildingNames.push(obj);
                                thiz.scene.add(obj);
                            }
                        );
                    });*/
                }

                loadBuildingName();

                thiz.beams = [];

                //加载图片
                var imgLoader = new THREE.ImageLoader();
                imgLoader.load(evecom.v.contextPath + '/evecom/ecapp/monitor/index/bigScreen/obj/images/alpha.jpg', function (img) {
                    var texture = new THREE.Texture();
                    //将图片值赋于纹理
                    texture.image = img;
                    texture.needsUpdate = true;

                    //加载模型
                    var loader = new THREE.OBJLoader();
                    loader.load(evecom.v.contextPath + '/evecom/ecapp/monitor/index/bigScreen/obj/guangzhu_4.obj', function (obj) {
                            // thiz.beams.push(createBeam(obj.clone(true),texture,0xFF0000,2,[119.30234850412666,26.099626626545447,0]));
                            // thiz.beams.push(createBeam(obj.clone(true),texture,0x00FF00,2,[119.29421828378575,26.08787647824535,0]));
                            // thiz.beams.push(createBeam(obj.clone(true),texture,0x007EFF,2,[119.30118115370017,26.098372834813084,0]));
                            // thiz.beams.push(createBeam(obj.clone(true),texture,0xFF0000,2,[119.29742964638133,26.096361805260127,0]));
                            // thiz.beams.push(createBeam(obj.clone(true),texture,0xFF8400,2,[119.30099948616116,26.099646829386643,0]));
                            // thiz.beams.push(createBeam(obj.clone(true),texture,0x007EFF,2,[119.30620419768093,26.0768709552723,0]));
                            // thiz.beams.push(createBeam(obj.clone(true),texture,0x007EFF,1.5,[119.2977319324073,26.09664854105187,0]));
                            // thiz.beams.push(createBeam(obj.clone(true),texture,0x00FF00,2,[119.29245165366659,26.09119108834507,0]));
                            // thiz.beams.push(createBeam(obj.clone(true),texture,0x007EFF,1.5,[119.30536475858865,26.09758241179922,0]));
                            // thiz.beams.push(createBeam(obj.clone(true),texture,0x007EFF,2,[119.3021253126113,26.100735974284742,0]));
                            // thiz.beams.push(createBeam(obj.clone(true),texture,0x00FF00,1.5,[119.3022588065042,26.097645512261824,0]));
                            // thiz.beams.push(createBeam(obj.clone(true),texture,0x00FFEA,2,[119.2753178813012,26.07342850740654,0]));
                            // thiz.beams.push(createBeam(obj.clone(true),texture,0xFF9000,1.5,[119.30236198750478,26.100245741503297,0]));

                            STATIC_DATA.yyly.forEach(function (value) {
                                thiz.beams.push(createBeam(obj.clone(true), texture, value.color, value.scale, value.point));
                            });

                            STATIC_DATA.qwyly.forEach(function (value) {
                                thiz.beams.push(createBeam(obj.clone(true), texture, value.color, value.scale, value.point));
                            });
                            /*STATIC_DATA.building.forEach(function (value) {
                                thiz.beams.push(createBeam(obj.clone(true),texture,value.color,value.scale,value.point));
                            });*/
                        }
                    );
                });

                // 创建光柱
                function createBeam(obj, texture, emissive, scale, position) {
                    obj.traverse(function (child) {
                        if (child instanceof THREE.Mesh) {
                            child.material = getBeamMaterials(texture, emissive);
                        }
                    });
                    // obj.visible = false;
                    transform(obj, scale, position);
                    obj.visible = false;
                    thiz.scene.add(obj);
                    return obj;
                }

                thiz.showBeams = function () {
                    thiz.beams.forEach(function (value) {
                        v.visible = true;
                    });
                };
                thiz.hideBeams = function () {
                    thiz.beams.forEach(function (value) {
                        v.visible = false;
                    });
                };
                // 显示模型
                thiz.showModel = function () {
                    thiz.buildingModel.forEach(function (obj) {
                        obj.visible = true;
                    });
                    thiz.emergencyModel.forEach(function (obj) {
                        obj.visible = true;
                    });
                };
                // 隐藏模型
                thiz.hideModel = function () {
                    thiz.buildingModel.forEach(function (obj) {
                        obj.visible = false;
                    });
                    thiz.emergencyModel.forEach(function (obj) {
                        obj.visible = false;
                    });
                };


                // create the horizon model
                /*var mat = new THREE.MeshBasicMaterial({color: 0x2194ce});
                mat.transparent = true;
                mat.opacity = 0.5;
                this.region = new THREE.Mesh(
                    new THREE.TorusBufferGeometry(2294 * 1000, 100 * 1000, 16, 64),
                    mat
                );
                this.scene.add(this.region);*/

                /*arr.forEach(function (value) {
                    var sphere = new THREE.SphereBufferGeometry( 1, 1, 1 );
                    var point = new THREE.PointLight( value.color, 1, 200, 1 );
                    value.point = point;
                    point.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: value.color } ) ) );
                    thiz.scene.add( point );
                });*/


                /*$("#switchBuildingLayer").change(function (e) {
                    var checked = $(this).prop("checked");
                    if (checked){//隐藏threejs模型，显示arcgis图层
                        thiz.iss.visible = false;
                        map.findLayerById(layerIds.BUILDING).visible = true;
                    } else {//隐藏arcgis图层，显示threejs模型
                        thiz.iss.visible = true;
                        map.findLayerById(layerIds.BUILDING).visible = false;
                    }
                });*/

                // cleanup after ourselfs
                context.resetWebGLState();
            },

            render: function (context) {
                // update camera parameters
                ///////////////////////////////////////////////////////////////////////////////////
                var cam = context.camera;

                this.camera.position.set(cam.eye[0], cam.eye[1], cam.eye[2]);
                this.camera.up.set(cam.up[0], cam.up[1], cam.up[2]);
                this.camera.lookAt(
                    new THREE.Vector3(cam.center[0], cam.center[1], cam.center[2])
                );

                // Projection matrix can be copied directly
                this.camera.projectionMatrix.fromArray(cam.projectionMatrix);

                // Halu
                var posEst = [119.27896606522772, 26.09529250167467, 0];

                var renderPos = [0, 0, 0];
                externalRenderers.toRenderCoordinates(
                    view,
                    posEst,
                    0,
                    SpatialReference.WGS84,
                    renderPos,
                    0,
                    1
                );
                if (this.iss) {
                    this.iss.position.set(renderPos[0], renderPos[1], renderPos[2]);
                }

                if (this.showLight) { // 停止灯光
                    var timer = Date.now() * 0.0002;
                    var groundGeometry = new THREE.PlaneBufferGeometry(16, 16);
                    var groundMaterial = new THREE.MeshStandardMaterial({roughness: 0.8, metalness: 0.4});
                    var groundw = new THREE.Mesh(groundGeometry, groundMaterial);

                    var initLon = 119.27542690687862, initLat = 26.102938050155963;

                    var s = Math.sin(timer);

                    var posEst4 = [initLon + s * 0.1, initLat + s * 0.01, 1000];
                    var transform4 = new THREE.Matrix4();
                    transform4.fromArray(externalRenderers.renderCoordinateTransformAt(view, posEst4, SpatialReference.WGS84, new Array(16)));
                    transform4.decompose(groundw.position, groundw.quaternion, groundw.scale);

                    this.spotLight.position.x = groundw.position.x;
                    this.spotLight.position.y = groundw.position.y;
                    this.spotLight.position.z = groundw.position.z;
                    this.spotLight.angle = Math.PI;
                } else {
                    this.scene.remove(this.spotLight);
                }

                /*arr.forEach(function (v) {

                    // 如果跑完重新开始
                    if (v.index >= v.path.length-1) {
                        v.index = 0;
                        v.x = 0;
                        v.y = 0;
                    }
                    var point = v.point;
                    var speed = 0.00002;

                    var x = v.x || v.path[0][0];
                    var y = v.y || v.path[0][1];

                    var next = false;

                    if (x > v.path[v.index+1][0]) {
                        x -= speed;
                        if (x < v.path[v.index+1][0]){
                            next = true;
                            x = v.path[v.index+1][0];
                            v.index = v.index + 1;
                        }
                    }else {
                        x += speed;
                        if (x > v.path[v.index+1][0]){
                            next = true;
                            x = v.path[v.index+1][0];
                            v.index = v.index + 1;
                        }
                    }

                    if (next){
                        y = v.path[v.index][1];
                    }else {
                        if (x > v.path[v.index+1][0]) {
                            y -= (v.path[v.index + 1][1] - v.path[v.index][1])/(v.path[v.index + 1][0] - v.path[v.index][0]) * speed;
                        }else{
                            y += (v.path[v.index + 1][1] - v.path[v.index][1])/(v.path[v.index + 1][0] - v.path[v.index][0]) * speed;
                        }
                    }

                    v.x = x;
                    v.y = y;

                    var p = transform(externalRenderers, [x, y, 5]);

                    point.position.x = p.position.x;
                    point.position.y = p.position.y;
                    point.position.z = p.position.z;
                });

                function transform(externalRenderers, posEst4) {
                    var groundGeometry = new THREE.PlaneBufferGeometry( 16, 16 );
                    var groundMaterial = new THREE.MeshStandardMaterial( { roughness: 0.8, metalness: 0.4 } );
                    var groundw = new THREE.Mesh( groundGeometry, groundMaterial );

                    var transform4 = new THREE.Matrix4();
                    transform4.fromArray(externalRenderers.renderCoordinateTransformAt(view, posEst4, SpatialReference.WGS84, new Array(16)));
                    transform4.decompose(groundw.position,groundw.quaternion,groundw.scale);
                    return groundw;
                }*/

                // draw the scene
                /////////////////////////////////////////////////////////////////////////////////////////////////////
                this.renderer.resetGLState();
                this.renderer.render(this.scene, this.camera);

                // as we want to smoothly animate the ISS movement, immediately request a re-render
                externalRenderers.requestRender(view);

                // cleanup
                context.resetWebGLState();
            }
        }

        // externalRenderers.add(view, threejsExternalRenderer);
    });

//切换页面时初始化要加载的Iframe
/*var $_initIframe = function (urls, ids) {
	var div = $("#indiTemplate_white_center_4 .tempBlk-cont");
	div.empty();
	
	if(urls == null || urls.length == 0 || ids == null || ids.length == 0) {
		return;
	}
	
	for(var i=0; i<urls.length; i++) {
		var html = '<iframe src="' + urls[i] + '" id="' + ids[i] + '" style="display:none;"></iframe>';
		div.append(html);
	}
}*/

//显示弹窗的Iframe
/*var $_showIframeWin = function (id) {
	$("#indiTemplate_white_center_4 iframe").hide();
	$("#"+id).show();
	$("#indiTemplate_white_center_4").addClass("zoomOut");
}*/

var $_showIframeWin = function (url, img) {
    $("#rightIframe").attr("src", url);
    $("#snapshot").attr("src", img);
    $("#snapshot").show();
    $("#indiTemplate_white_center_4").addClass("zoomOut");

    var iframe = $("#rightIframe")[0];
    iframe.onload = function () {
        $("#snapshot").hide();
    };

}

//隐藏iframe窗口
/*var $_hideIframeWin = function () {
	$("#indiTemplate_white_center_4").removeClass("zoomOut");
	$("#indiTemplate_white_center_4 iframe").hide();
}*/

var $_hideIframeWin = function () {
    $("#indiTemplate_white_center_4").removeClass("zoomOut");
    $("#rightIframe").attr("src", "");
}
