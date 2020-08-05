// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/Accessor ../../core/accessorSupport/decorators ./interactiveToolUtils".split(" "),function(h,k,e,c,f,b,g){return function(d){function a(a){a=d.call(this)||this;a._attached=!1;return a}e(a,d);Object.defineProperty(a.prototype,"active",{get:function(){return this.view.activeTool===this},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"isSupported",{get:function(){return!0},
enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"visible",{set:function(a){this._attached&&(a?this.show():(this.hide(),g.setActive(this,!1)));this._set("visible",a)},enumerable:!0,configurable:!0});a.prototype.attach=function(a){!this._attached&&this.isSupported&&(this._set("toolViewManager",a),this.onAttach(a),this.visible&&this.show(),this._attached=!0)};a.prototype.detach=function(){this._attached&&(this.hide(),this.onDetach(),this._set("toolViewManager",null),this._attached=
!1)};a.prototype.handleInputEvent=function(a){if(this._attached)this.onInputEvent(a,this.toolViewManager)};a.prototype.show=function(){};a.prototype.hide=function(){};a.prototype.onAttach=function(a){};a.prototype.onDetach=function(){};a.prototype.onInputEvent=function(a,b){};c([b.property({constructOnly:!0})],a.prototype,"view",void 0);c([b.property({dependsOn:["view.activeTool"],readOnly:!0})],a.prototype,"active",null);c([b.property({value:!0})],a.prototype,"visible",null);c([b.property({readOnly:!0})],
a.prototype,"toolViewManager",void 0);return a=c([b.subclass("esri.views.interactive.InteractiveToolBase")],a)}(b.declared(f))});