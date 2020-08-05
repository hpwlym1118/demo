// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper dojo/dom ../../core/Accessor ../../core/Collection ../../core/accessorSupport/decorators maquette".split(" "),function(q,r,l,e,m,n,p,d,k){return function(h){function c(){var b=null!==h&&h.apply(this,arguments)||this;b.items=new p;b._callbacks=new Map;b._projector=k.createProjector();b._hiddenProjector=k.createProjector();return b}l(c,h);Object.defineProperty(c.prototype,"needsRender",{get:function(){return 0<
this.items.length},enumerable:!0,configurable:!0});c.prototype.initialize=function(){var b=this,a=document.createElement("div");a.className="esri-overlay-surface";m.setSelectable(a,!1);this._set("surface",a);this._hiddenSurface=document.createElement("div");this._hiddenSurface.setAttribute("style","visibility: hidden;");a.appendChild(this._hiddenSurface);this._itemsChangeHandle=this.items.on("change",function(a){a.added.map(function(a){var c=function(){return a.render()};b._callbacks.set(a,c);b._projector.append(b.surface,
c)});a.removed.map(function(a){var c=b._projector.detach(b._callbacks.get(a));b.surface.removeChild(c.domNode);b._callbacks.delete(a)})})};c.prototype.addItem=function(b){this.items.add(b)};c.prototype.removeItem=function(b){this.items.remove(b)};c.prototype.destroy=function(){this.items.removeAll();this._itemsChangeHandle.remove();this._projector=this._callbacks=null};c.prototype.render=function(){this._projector.renderNow()};c.prototype.computeBoundingRect=function(b){var a=this._hiddenSurface,
c=this._hiddenProjector,d=null,e=function(){return d=b.render()};c.append(a,e);c.renderNow();var f={left:0,top:0,right:0,bottom:0};if(d&&d.domNode){var g=d.domNode.getBoundingClientRect();f.left=g.left;f.top=g.top;f.right=g.right;f.bottom=g.bottom}for(c.detach(e);a.firstChild;)a.removeChild(a.firstChild);return f};c.prototype.overlaps=function(b,a){b=this.computeBoundingRect(b);a=this.computeBoundingRect(a);return Math.max(b.left,a.left)<=Math.min(b.right,a.right)&&Math.max(b.top,a.top)<=Math.min(b.bottom,
a.bottom)};Object.defineProperty(c.prototype,"hasVisibleItems",{get:function(){return this.items.some(function(b){return b.visible})},enumerable:!0,configurable:!0});c.prototype.renderCanvas=function(b){if(this.items.some(function(a){return a.visible})){var a=b.getContext("2d");a.save();a.font="10px "+getComputedStyle(this.surface).fontFamily;this.items.forEach(function(b){a.save();b.renderCanvas(a);a.restore()});a.restore()}};e([d.property({readOnly:!0})],c.prototype,"surface",void 0);e([d.property({readOnly:!0})],
c.prototype,"items",void 0);e([d.property({readOnly:!0,dependsOn:["items.length"]})],c.prototype,"needsRender",null);return c=e([d.subclass("esri.views.overlay.ViewOverlay")],c)}(d.declared(n))});