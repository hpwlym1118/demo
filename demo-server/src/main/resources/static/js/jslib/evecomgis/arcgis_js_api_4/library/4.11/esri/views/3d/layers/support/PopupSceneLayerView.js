// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/declareExtendsHelper ../../../../core/tsSupport/decorateHelper ../../../../core/tsSupport/generatorHelper ../../../../core/tsSupport/awaiterHelper ../../../../core/Error ../../../../core/maybe ../../../../core/promiseUtils ../../../../core/accessorSupport/decorators ../../../../layers/support/fieldUtils ../LayerView3D ../../../layers/support/popupUtils".split(" "),function(a,d,t,u,v,w,e,x,m,f,q,y,n){Object.defineProperty(d,"__esModule",{value:!0});
a=function(a){function b(){return null!==a&&a.apply(this,arguments)||this}t(b,a);b.prototype._validateFetchPopupFeatures=function(a){var c=this.layer;if(!c.popupEnabled)return new e("scenelayerview3d:fetchPopupFeatures","Popups are disabled",{layer:c});if(!n.getFetchPopupTemplate(c,a))return new e("scenelayerview3d:fetchPopupFeatures","Layer does not define a popup template",{layer:c})};b.prototype.fetchPopupFeatures=function(a,c){return w(this,void 0,void 0,function(){var a,b,h,g,d,e,f,k,p,l;return v(this,
function(r){switch(r.label){case 0:if(a=this._validateFetchPopupFeatures(c))return[2,m.reject(a)];b=x.isSome(c)?c.clientGraphics:null;if(!b||0===b.length)return[2,m.resolve([])];h=[];g=[];e=q.unpackFieldNames;f=[this.layer.fields];return[4,n.getRequiredFields(this.layer,n.getFetchPopupTemplate(this.layer,c))];case 1:d=e.apply(void 0,f.concat([r.sent()]));k=0;for(p=b;k<p.length;k++)l=p[k],q.featureHasFields(d,l)?h.push(l):g.push(l);return 0===g.length?[2,m.resolve(h)]:[2,this.whenGraphicAttributes(g,
d).catch(function(){return g}).then(function(a){return h.concat(a)})]}})})};return b=u([f.subclass("esri.views.3d.layers.support.PopupSceneLayerView")],b)}(f.declared(y));d.PopupSceneLayerView=a;d.default=a});