// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../Graphic ../../core/Collection ../../core/Handles ../../core/screenUtils ../../core/accessorSupport/decorators ../../geometry/geometryEngine ../../geometry/Point ../../geometry/Polygon ../../geometry/Polyline ../../geometry/projection ../../geometry/SpatialReference ../../geometry/support/geodesicUtils ../../layers/GraphicsLayer ../../views/2d/draw/Draw ../../views/interactive/InteractiveToolBase ../../views/interactive/interactiveToolUtils".split(" "),
function(E,F,x,g,q,h,y,u,f,k,z,A,v,l,r,p,B,C,D,t){return function(w){function c(a){a=w.call(this,a)||this;a._drawActive=!1;a._handles=new y;a._sketchLayer=new B({listMode:"hide"});a._vertices=null;a._vertexDrag=null;a._vertexHoverIndex=-1;return a}x(c,w);c.prototype.initialize=function(){var a=this;this._draw=new C({view:this.view});var d=this.view;d.map.add(this._sketchLayer);d.focus();this._handles.add(this.watch(["viewModel.unit","viewModel.mode"],function(){a._updateMeasurements()}));this.projectionEngineRequired&&
this.projectionEngineSupported&&(l.isLoaded()||l.load())};c.prototype.destroy=function(){this.detach();this._handles.removeAll();this._sketchLayer.removeAll();this.viewModel.view.map.remove(this._sketchLayer);this.viewModel.measurement=null;this._draw&&(this._draw.destroy(),this._draw=null);this._handles&&(this._handles.destroy(),this._handles=null);this._sketchLayer&&(this._sketchLayer.destroy(),this._sketchLayer=null)};Object.defineProperty(c.prototype,"editable",{set:function(a){this._set("editable",
a);a||this._draw.reset();this._updateMeasurements()},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"projectionEngineRequired",{get:function(){if(!this.view||!this.view.spatialReference)return!1;var a=this.view.spatialReference;return!a.isWebMercator&&!a.isWGS84&&!p.isSupported(a)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"projectionEngineSupported",{get:function(){return l.isSupported()},enumerable:!0,configurable:!0});c.prototype.show=function(){this._sketchLayer.visible=
!0};c.prototype.hide=function(){this._sketchLayer.visible=!1};c.prototype.reset=function(){this._vertexDrag=this._vertices=null;this._vertexHoverIndex=-1;this._sketchLayer.removeAll();this.viewModel.measurement=null};c.prototype.newMeasurement=function(){this.reset();t.setActive(this,!0);this._startSketch()};c.prototype.clearMeasurement=function(){this.reset();this._drawActive&&this._startSketch()};c.prototype.onInputEvent=function(a){var d=this,b=this.view;switch(a.type){case "pointer-move":this._updateCursor(u.createScreenPointFromEvent(a));
break;case "drag":switch(a.action){case "start":b.hitTest(u.createScreenPointFromEvent(a)).then(function(b){b=new h(b.results);if(0!==b.length&&(b=b.find(function(a){return a.graphic.layer===d._sketchLayer&&"point"===a.graphic.geometry.type}))){var c=b.graphic.geometry;b=(new h(d._vertices)).findIndex(function(a){return a[0]===c.x&&a[1]===c.y});d._vertexDrag={index:b,origin:c};t.setActive(d,!0);a.stopPropagation()}});break;case "update":if(this._vertexDrag){var c=b.toMap(u.createScreenPoint(a.origin.x,
a.origin.y)),b=b.toMap(a);this._vertices[this._vertexDrag.index]=[this._vertexDrag.origin.x+b.x-c.x,this._vertexDrag.origin.y+b.y-c.y];this._updateMeasurements();a.stopPropagation()}break;case "end":this._vertexDrag=null,t.setActive(this,!1)}}};c.prototype._startSketch=function(){var a=this;this._drawActive=!0;var d=this._draw.create("polyline",{mode:"click"});d.on("vertex-add",function(b){return a._updateSketch(b.vertices)});d.on("vertex-update",function(b){return a._updateSketch(b.vertices)});d.on("vertex-remove",
function(b){return a._updateSketch(b.vertices)});d.on("cursor-update",function(b){return a._updateSketch(b.vertices)});d.on("undo",function(b){return a._updateSketch(b.vertices)});d.on("redo",function(b){return a._updateSketch(b.vertices)});d.on("draw-complete",function(){return a._stopSketch()})};c.prototype._stopSketch=function(){t.setActive(this,!1);this._drawActive=!1};c.prototype._updateSketch=function(a){this._vertices=a;this._updateMeasurements()};c.prototype._updateCursor=function(a){var d=
this,b=this.viewModel.view;this._vertexDrag?this.cursor="grabbing":this._drawActive?this.cursor="crosshair":b.hitTest(a).then(function(a){var b=-1;if(0!==a.results.length&&(a=(new h(a.results)).map(function(a){return a.graphic}).find(function(a){return a&&a.layer===d._sketchLayer&&"point"===a.geometry.type})))var c=a.geometry,b=(new h(d._vertices)).findIndex(function(a){return a[0]===c.x&&a[1]===c.y});b!==d._vertexHoverIndex&&(d._vertexHoverIndex=b,d.cursor=-1===d._vertexHoverIndex?null:"pointer",
d._updateMeasurements())})};c.prototype._updateMeasurements=function(){var a=this;if(!(!this._vertices||this.projectionEngineRequired&&!l.isLoaded()||(this._sketchLayer.removeAll(),2>this._vertices.length))){var d=this._vertices.slice(),b=this.viewModel,c=b.palette,f=b.view.spatialReference,g=[],m=p.isSupported(f),h=!m&&!f.isWebMercator&&!f.isWGS84;if(2===d.length){var e=new v({paths:[d],spatialReference:f});h&&(e=l.project(e,r.WGS84));if(m||h)e=p.geodesicDensify(e,1E5);else if(m=k.geodesicLength(e,
"meters"),"geodesic"===b.mode||"auto"===b.mode&&m>=b.geodesicDistanceThreshold)e=k.geodesicDensify(e,1E5,"meters");g.push(new q({geometry:e,symbol:{type:"simple-line",color:c.pathColor,width:c.pathWidth}}))}else{d.push(d[0]);var e=new A({rings:[d],spatialReference:f}),d=new v({paths:[d],spatialReference:f}),n=e.clone(),e=k.simplify(e);h&&(e=l.project(e,r.WGS84),n=l.project(n,r.WGS84),d=l.project(d,r.WGS84));m||h?(b.measurement={geometry:e,area:p.geodesicAreas([e],"square-meters")[0],perimeter:p.geodesicLengths([e],
"meters")[0]},n=p.geodesicDensify(n,1E5),d=p.geodesicDensify(d,1E5)):(m=k.planarLength(e,"meters"),"geodesic"===b.mode||"auto"===b.mode&&m>=b.geodesicDistanceThreshold?(b.measurement={geometry:e,area:k.geodesicArea(e,"square-meters"),perimeter:k.geodesicLength(e,"meters")},n=k.geodesicDensify(n,1E5,"meters"),d=k.geodesicDensify(d,1E5,"meters")):b.measurement={geometry:e,area:k.planarArea(e,"square-meters"),perimeter:m});g.push(new q({geometry:n,symbol:{type:"simple-fill",style:"solid",color:c.fillColor,
outline:{type:"simple-line",width:0}}}),new q({geometry:d,symbol:{type:"simple-line",style:"solid",color:c.pathColor,width:c.pathWidth}}));g.push(new q({geometry:n.centroid,symbol:{type:"text",color:[255,255,255,1],haloColor:[0,0,0,.5],haloSize:2,text:b.measurementLabel.area,font:{size:14,family:"sans-serif"}}}))}this.editable&&this._vertices.forEach(function(b,d){d=a._vertexHoverIndex===d?1.5:1;g.push(new q({geometry:new z({x:b[0],y:b[1],spatialReference:f}),symbol:{type:"simple-marker",style:"circle",
color:c.handleColor,size:c.handleWidth*d,outline:{type:"simple-line",width:0}}}))});this._sketchLayer.addMany(g)}};g([f.property({constructOnly:!0})],c.prototype,"viewModel",void 0);g([f.property()],c.prototype,"cursor",void 0);g([f.property({value:!0})],c.prototype,"editable",null);g([f.property({dependsOn:["view.spatialReference"],readOnly:!0})],c.prototype,"projectionEngineRequired",null);g([f.property({readOnly:!0})],c.prototype,"projectionEngineSupported",null);return c=g([f.subclass("esri.widgets.AreaMeasurement2D.AreaMeasurement2DTool")],
c)}(f.declared(D))});