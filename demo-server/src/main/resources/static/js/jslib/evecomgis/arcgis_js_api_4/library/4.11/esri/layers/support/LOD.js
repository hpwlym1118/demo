// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/JSONSupport ../../core/accessorSupport/decorators ../../core/accessorSupport/ensureType".split(" "),function(k,l,f,c,g,b,h){return function(e){function a(a){a=e.call(this,a)||this;a.level=0;a.levelValue=null;a.resolution=0;a.scale=0;return a}f(a,e);d=a;a.prototype.clone=function(){return new d({level:this.level,levelValue:this.levelValue,resolution:this.resolution,scale:this.scale})};var d;
c([b.property({type:h.Integer,json:{write:!0}})],a.prototype,"level",void 0);c([b.property({type:String,json:{write:!0}})],a.prototype,"levelValue",void 0);c([b.property({type:Number,json:{write:!0}})],a.prototype,"resolution",void 0);c([b.property({type:Number,json:{write:!0}})],a.prototype,"scale",void 0);return a=d=c([b.subclass("esri.layers.support.LOD")],a)}(b.declared(g))});