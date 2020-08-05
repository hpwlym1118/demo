// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/assignHelper ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper dojo/dom-class dojo/dom-construct dojo/dom-style ../../core/Accessor ../../core/domUtils ../../core/Evented ../../core/Handles ../../core/watchUtils ../../core/accessorSupport/decorators ./Component ../../widgets/support/widgetUtils".split(" "),function(C,D,q,u,h,v,k,n,w,x,y,z,r,g,m,A){function p(e){return"object"!==typeof e||e&&e.isInstanceOf&&e.isInstanceOf(m)||
!("component"in e||"index"in e||"position"in e)?null:e}var B={left:0,top:0,bottom:0,right:0},t={bottom:30,top:15,right:15,left:15};return function(e){function b(a){a=e.call(this)||this;a._cornerNameToContainerLookup={};a._positionNameToContainerLookup={};a._components=[];a._handles=new z;a._componentToKey=new Map;a.view=null;a._initContainers();return a}u(b,e);b.prototype.initialize=function(){this._handles.add([r.init(this,"view.padding, container",this._applyViewPadding.bind(this)),r.init(this,
"padding",this._applyUIPadding.bind(this))])};b.prototype.destroy=function(){this.container=null;this._components.forEach(function(a){a.destroy()});this._components.length=0;this._handles.destroy();this._componentToKey.clear();this._componentToKey=null};Object.defineProperty(b.prototype,"container",{set:function(a){var c=this._get("container");a!==c&&(a&&(a.classList.add("esri-ui"),this._attachContainers(a)),c&&(c.classList.remove("esri-ui"),n.set(c,{top:"",bottom:"",left:"",right:""}),x.empty(c)),
this._set("container",a))},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"height",{get:function(){var a=this.get("view.height")||0;if(0===a)return a;var c=this._getViewPadding();return Math.max(a-(c.top+c.bottom),0)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"padding",{get:function(){return this._get("padding")},set:function(a){a?this._override("padding",a):this._clearOverride("padding")},enumerable:!0,configurable:!0});b.prototype.castPadding=function(a){return"number"===
typeof a?{bottom:a,top:a,right:a,left:a}:q({},t,a)};Object.defineProperty(b.prototype,"width",{get:function(){var a=this.get("view.width")||0;if(0===a)return a;var c=this._getViewPadding();return Math.max(a-(c.left+c.right),0)},enumerable:!0,configurable:!0});b.prototype.add=function(a,c){var b=this,d,f;if(Array.isArray(a))a.forEach(function(a){return b.add(a,c)});else{var l=p(a);l&&(d=l.index,c=l.position,a=l.component,f=l.key);c&&"object"===typeof c&&(d=c.index,f=c.key,c=c.position);!a||c&&!this._isValidPosition(c)||
(a&&a.isInstanceOf&&a.isInstanceOf(m)||(a=new m({node:a})),this._place({component:a,position:c,index:d}),this._components.push(a),f&&this._componentToKey.set(a,f))}};b.prototype.remove=function(a,c){var b=this;if(a){if(Array.isArray(a))return a.map(function(a){return b.remove(a,c)});var d=this.find(a);if(d){var f=this._componentToKey;if(!f.has(a)||f.get(a)===c)return f=this._components.indexOf(d),d.node.parentNode&&d.node.parentNode.removeChild(d.node),this._componentToKey.delete(a),this._components.splice(f,
1)[0]}}};b.prototype.empty=function(a){var c=this;if(Array.isArray(a))return a.map(function(a){return c.empty(a)}).reduce(function(a,c){return a.concat(c)});a=a||"manual";if("manual"===a)return Array.prototype.slice.call(this._manualContainer.children).filter(function(a){return!v.contains(a,"esri-ui-corner")}).map(function(a){return c.remove(a)});if(this._isValidPosition(a))return Array.prototype.slice.call(this._cornerNameToContainerLookup[a].children).map(this.remove,this)};b.prototype.move=function(a,
c){var b=this;Array.isArray(a)&&a.forEach(function(a){return b.move(a,c)});if(a){var d,f=p(a)||p(c);f&&(d=f.index,c=f.position,a=f.component||a);(!c||this._isValidPosition(c))&&(a=this.remove(a))&&this.add(a,{position:c,index:d})}};b.prototype.find=function(a){return a?a&&a.isInstanceOf&&a.isInstanceOf(m)?this._findByComponent(a):"string"===typeof a?this._findById(a):this._findByNode(a.domNode||a):null};b.prototype._getViewPadding=function(){return this.get("view.padding")||B};b.prototype._attachContainers=
function(a){a.appendChild(this._manualContainer);a.appendChild(this._innerContainer)};b.prototype._initContainers=function(){var a=k.create("div",{className:"esri-ui-inner-container esri-ui-corner-container"}),c=k.create("div",{className:"esri-ui-inner-container esri-ui-manual-container"}),b=k.create("div",{className:"esri-ui-top-left esri-ui-corner"},a),d=k.create("div",{className:"esri-ui-top-right esri-ui-corner"},a),f=k.create("div",{className:"esri-ui-bottom-left esri-ui-corner"},a),e=k.create("div",
{className:"esri-ui-bottom-right esri-ui-corner"},a);this._innerContainer=a;this._manualContainer=c;a=A.isRTL();this._cornerNameToContainerLookup={"top-left":b,"top-right":d,"bottom-left":f,"bottom-right":e,"top-leading":a?d:b,"top-trailing":a?b:d,"bottom-leading":a?e:f,"bottom-trailing":a?f:e};this._positionNameToContainerLookup=q({manual:c},this._cornerNameToContainerLookup)};b.prototype._isValidPosition=function(a){return!!this._positionNameToContainerLookup[a]};b.prototype._place=function(a){var c=
a.component,b=a.index;a=this._positionNameToContainerLookup[a.position||"manual"];var d;-1<b?(d=Array.prototype.slice.call(a.children),0===b?this._placeComponent(c,a,"first"):b>=d.length?this._placeComponent(c,a,"last"):this._placeComponent(c,d[b],"before")):this._placeComponent(c,a,"last")};b.prototype._placeComponent=function(a,c,b){var d=a.widget;d&&!d._started&&"function"===typeof d.postMixInProperties&&"function"===typeof d.buildRendering&&"function"===typeof d.postCreate&&"function"===typeof d.startup&&
a.widget.startup();k.place(a.node,c,b)};b.prototype._applyViewPadding=function(){var a=this.container;a&&n.set(a,this._toPxPosition(this._getViewPadding()))};b.prototype._applyUIPadding=function(){this._innerContainer&&n.set(this._innerContainer,this._toPxPosition(this.padding))};b.prototype._toPxPosition=function(a){return{top:this._toPxUnit(a.top),left:this._toPxUnit(a.left),right:this._toPxUnit(a.right),bottom:this._toPxUnit(a.bottom)}};b.prototype._toPxUnit=function(a){return 0===a?0:a+"px"};
b.prototype._findByComponent=function(a){var c=null,b;this._components.some(function(d){(b=d===a)&&(c=d);return b});return c};b.prototype._findById=function(a){var c=null,b;this._components.some(function(d){(b=d.id===a)&&(c=d);return b});return c};b.prototype._findByNode=function(a){var b=null,e;this._components.some(function(c){(e=c.node===a)&&(b=c);return e});return b};h([g.property()],b.prototype,"container",null);h([g.property({dependsOn:["view.height"]})],b.prototype,"height",null);h([g.property({value:t})],
b.prototype,"padding",null);h([g.cast("padding")],b.prototype,"castPadding",null);h([g.property()],b.prototype,"view",void 0);h([g.property({dependsOn:["view.width"]})],b.prototype,"width",null);return b=h([g.subclass("esri.views.ui.UI")],b)}(g.declared(w,y))});