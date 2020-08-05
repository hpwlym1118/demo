// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../../request ../../../../core/arrayUtils ../../../../core/Error ../../../../core/promiseUtils ../../../../core/typedArrayUtil ../../../../core/urlUtils ../../../../core/libs/gl-matrix-2/mat4 ../../../../core/libs/gl-matrix-2/vec4f64 ../../../../geometry/SpatialReference ../../../../geometry/support/aaBoundingBox ../../../../geometry/support/webMercatorUtils ../../../../tasks/QueryTask ../../../../tasks/support/Query ./I3SBinaryReader ../../support/projectionUtils ../../support/stack".split(" "),
function(ba,f,I,J,k,l,w,K,x,L,y,M,N,O,P,Q,z,R){function t(a){return a&&parseInt(a.substring(a.lastIndexOf("/")+1,a.length),10)}function A(a,b){var c=b[0],d=b[1],g=b[2];b=b[3];var e=0;if(c<a[0])var h=a[0]-c,e=e+h*h;d<a[1]&&(h=a[1]-d,e+=h*h);g<a[2]&&(h=a[2]-g,e+=h*h);c>a[3]&&(h=c-a[3],e+=h*h);d>a[4]&&(h=d-a[4],e+=h*h);g>a[5]&&(h=g-a[5],e+=h*h);if(e>b*b)return 0;if(0<e)return 1;e=Infinity;c-a[0]<e&&(e=c-a[0]);d-a[1]<e&&(e=d-a[1]);g-a[2]<e&&(e=g-a[2]);a[3]-c<e&&(e=a[3]-c);a[4]-d<e&&(e=a[4]-d);a[5]-g<
e&&(e=a[5]-g);return e>b?2:1}function u(a,b,c){var d=[],g=c&&c.missingFields;c=c&&c.originalFields;for(var e=0;e<a.length;e++){for(var h=a[e],f=h.toLowerCase(),m=!1,v=0,p=b;v<p.length;v++){var q=p[v];if(f===q.name.toLowerCase()){d.push(q.name);m=!0;c&&c.push(h);break}}!m&&g&&g.push(h)}return d}function S(a,b){return a.filter(function(a){return a.toLowerCase()!==b.toLowerCase()}).concat([b])}function T(a,b,c,d){b.sort(function(a,b){return a.attributes[c]-b.attributes[c]});var g=b.map(function(a){return a.attributes[c]}),
e=[],h=u(d,a.fields,{originalFields:e});return C(a,g,h).then(function(a){for(var c=0;c<b.length;c++){var d=b[c],g=a[c];d.attributes={};for(var f=0;f<e.length;f++)d.attributes[e[f]]=g[h[f]]}return b})}function U(a,b){for(var c=[],d=0;d<a.length;d++){var g=a[d];g in b.attributes||c.push(g)}return c}function C(a,b,c){if(null!=a.maxRecordCount&&b.length>a.maxRecordCount){var d=V(b,a.maxRecordCount);return l.all(d.map(function(b){return C(a,b,c)})).then(W)}d=new P({objectIds:b,outFields:c,orderByFields:[a.objectIdField]});
return(new O(a.parsedUrl.path)).execute(d).then(function(a){return a&&a.features&&a.features.length===b.length?a.features.map(function(a){return a.attributes}):l.reject(new k("scenelayer:feature-not-in-associated-layer","Feature not found in associated feature layer"))})}function X(a,b,c,d,g){for(var e=[],h=0;h<b.attributeData.length;h++){var f=b.attributeData[h],m=a[h];m&&-1!==d.indexOf(m.name)&&(f=K.makeAbsolute(f.href,b.baseUrl),e.push({url:f,storageInfo:m}))}return l.eachAlways(e.map(function(a){return I(a.url,
{responseType:"array-buffer"}).then(function(b){return Q.readBinaryAttribute(a.storageInfo,b.data)})})).then(function(a){var b=[];if(!g.ignoreUnavailableFields&&a.some(function(a){return null==a.value})){for(var b=[],d=0;d<a.length;d++)null==a[d].value&&b.push({name:e[d].storageInfo.name,error:a[d].error});return l.reject(new k("scenelayer:attribute-request-failed","Request for scene layer attributes failed",{failedAttributes:b}))}for(var h=0;h<c.length;h++){for(var f=c[h],B={},d=0;d<a.length;d++)null!=
a[d].value&&(B[e[d].storageInfo.name]=D(a[d].value,f));b.push(B)}return b})}function D(a,b){b=a[b];return w.isInt16Array(a)?b===Y?null:b:w.isInt32Array(a)?b===Z?null:b:b!==b?null:b}function V(a,b){var c=a.length;b=Math.ceil(c/b);for(var d=[],g=0;g<b;g++)d.push(a.slice(Math.floor(c*g/b),Math.floor(c*(g+1)/b)));return d}function W(a){for(var b=[],c=0;c<a.length;c++)b=b.concat(a[c]);return b}function E(a){var b=new y(t(a.store.indexCRS||a.store.geographicCRS));return b.equals(a.spatialReference)?a.spatialReference:
b}function F(a){var b=new y(t(a.store.vertexCRS||a.store.projectedCRS));return b.equals(a.spatialReference)?a.spatialReference:b}function r(a,b,c){if(!N.canProject(a,b))throw new k("layerview:spatial-reference-incompatible","The spatial reference of this scene layer is incompatible with the spatial reference of the view",{});if("local"===c&&a.isGeographic)throw new k("layerview:local-gcs-not-supported","Geographic coordinate systems are not supported in local scenes",{});}function G(a,b,c){var d=
E(a);a=F(a);r(d,b,c);r(a,b,c)}Object.defineProperty(f,"__esModule",{value:!0});f.DDS_ENCODING_STRING="image/vnd-ms.dds";f.BROWSER_SUPPORTED_IMAGE_ENCODING_STRINGS=["image/jpeg","image/png"];f.extractWkid=t;f.getAppropriateTextureEncoding=function(a,b){if(Array.isArray(a)){if(b&&(b=a.indexOf(f.DDS_ENCODING_STRING),-1<b))return b;for(b=0;b<a.length;b++)if(-1<f.BROWSER_SUPPORTED_IMAGE_ENCODING_STRINGS.indexOf(a[b]))return b;throw Error("Could not find appropriate texture encoding (among "+a.toString()+
")");}return-1};f.findIntersectingNodes=function(a,b,c,d,g,e){g.traverse(c,function(c){var g=c.mbs;b!==d&&(g=aa,z.mbsToMbs(c.mbs,d,g,b));if(0!==A(a,g))return e(c),!0})};f.filterInPlace=function(a,b,c){for(var d=0,g=0,e=0;e<b.length&&d<a.length;e++)a[d]===b[e]&&(c(e)&&(a[g]=a[d],g++),d++);a.length=g};var n=M.create();f.getClipAABB=function(a,b){var c=x.mat4.copy(R.sm4d.get(),b.objectTransformation);b=b.getGeometryRecords()[0].getShaderTransformation();x.mat4.multiply(c,c,b);if(0===c[1]&&0===c[2]&&
0===c[3]&&0===c[4]&&0===c[6]&&0===c[7]&&0===c[8]&&0===c[9]&&0===c[11]&&1===c[15])return n[0]=(a[0]-c[12])/c[0],n[1]=(a[1]-c[13])/c[5],n[2]=(a[2]-c[14])/c[10],n[3]=(a[3]-c[12])/c[0],n[4]=(a[4]-c[13])/c[5],n[5]=(a[5]-c[14])/c[10],n};var aa=L.vec4f64.create();f.intersectBoundingBoxWithMbs=A;f.findFieldsCaseInsensitive=u;f.whenGraphicAttributes=function(a,b,c,d,g,e){var h=!0===(e&&e.populateObjectId),f=e.ignoreUnavailableFields?void 0:[],m=1===d.length&&"*"===d[0];!m&&h&&(d=S(d,c));d=m?d:u(d,a.fields,
{missingFields:f});if(f&&0!==f.length)return l.reject(new k("scenelayer:unknown-fields","This scene layer does not have the requested fields",{unknownFields:f}));if(0===b.length)return l.resolve(b);var f=a.associatedLayer,n=a.attributeStorageInfo,p=m?a.fields.map(function(a){return a.name}):d;if(f)return T(f,b,c,p);var q=U(p,b[0]);return 0===q.length?l.resolve(b):n?(a=g(b))?l.all(a.map(function(a){return X(n,a.node,a.indices,q,e).then(function(b){for(var c=0;c<a.graphics.length;c++){for(var d=0,e=
p;d<e.length;d++){var g=e[d];g in b[c]||(b[c][g]=a.graphics[c].attributes[g])}a.graphics[c].attributes=b[c]}return a.graphics})})).then(J.flatten):l.reject(new k("scenelayer:features-not-loaded","Tried to query attributes for unloaded features")):l.reject(new k("scenelayer:no-attribute-source","This scene layer does not have a source for attributes available"))};var Y=-Math.pow(2,15),Z=-Math.pow(2,31);f.getCachedAttributeValue=D;f.convertFlatRangesToOffsets=function(a,b,c){void 0===c&&(c=2);b=null!=
b?b:a.length/c;for(var d=new Uint32Array(b+1),g=0;g<b;g++){var e=a[g*c];d[g]=3*e;var f=(g-1)*c+1;if(0<=f&&e-1!==a[f])throw new k("Face ranges are not continuous");}d[d.length-1]=3*(a[(b-1)*c+1]+1);return d};f.getIndexCrs=E;f.getVertexCrs=F;f.getCacheKeySuffix=function(a,b){return b===z.SphericalECEFSpatialReference?"@ECEF":a.equals(b)?"":null!=b.wkid?"@"+b.wkid:null};f.checkSpatialReference=r;f.checkSpatialReferences=G;f.checkSceneLayerValid=function(a){var b;(b=null==a.store||null==a.store.defaultGeometrySchema)||
(a=a.store.defaultGeometrySchema,b=!!(null!=a.geometryType&&"triangles"!==a.geometryType||null!=a.topology&&"PerAttributeArray"!==a.topology||null==a.vertexAttributes||null==a.vertexAttributes.position));if(b)throw new k("scenelayer:unsupported-geometry-schema","The geometry schema of this scene layer is not supported.",{});};f.checkSceneLayerCompatibleWithView=function(a,b){G(a,b.spatialReference,b.viewingMode)};f.checkPointCloudLayerValid=function(a){var b;(b=null==a.store||null==a.store.defaultGeometrySchema)||
(a=a.store.defaultGeometrySchema,b=!!(null==a.geometryType||"points"!==a.geometryType||null!=a.topology&&"PerAttributeArray"!==a.topology||null!=a.encoding&&""!==a.encoding&&"lepcc-xyz"!==a.encoding||null==a.vertexAttributes||null==a.vertexAttributes.position));if(b)throw new k("pointcloud:unsupported-geometry-schema","The geometry schema of this point cloud scene layer is not supported.",{});};f.checkPointCloudLayerCompatibleWithView=function(a,b){r(a.spatialReference,b.spatialReference,b.viewingMode)};
f.rendererNeedsTextures=function(a){if(null==a||"simple"!==a.type&&"class-breaks"!==a.type&&"unique-value"!==a.type||("unique-value"===a.type||"class-breaks"===a.type)&&null==a.defaultSymbol)return!0;a=a.getSymbols();if(0===a.length)return!0;for(var b=0;b<a.length;b++){var c=a[b];if("mesh-3d"!==c.type||0===c.symbolLayers.length)return!0;for(var d=0,c=c.symbolLayers.items;d<c.length;d++){var g=c[d];if("fill"!==g.type||null==g.material||"replace"!==g.material.colorMixMode)return!0}}return!1};var H=
function(){return function(){this.material=this.edges=null;this.castShadows=!0}}();f.SymbolInfo=H;f.getSymbolInfo=function(a){var b=new H,c=!1,d=!1,g=0;for(a=a.symbolLayers.items;g<a.length;g++){var e=a[g];if("fill"===e.type&&e.enabled){var f=e.material,k=e.edges;f&&!c&&(c=f.color,b.material={color:c?[c.r/255,c.g/255,c.b/255]:null,alpha:c?c.a:null,colorMixMode:f.colorMixMode},b.castShadows=e.castShadows,c=!0);k&&!d&&(b.edges=e.edges,d=!0)}}return b}});