// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(l,f){function h(b,a,d,c){if(null!=d&&null!=c&&d===c)return function(c){return d>=c.attributes[b]&&d<=c.attributes[a]};if(null!=d&&null!=c)return function(e){return!(e.attributes[b]>c||e.attributes[a]<d)};if(null!=d)return function(c){return!(c.attributes[a]<d)};if(null!=c)return function(d){return!(d.attributes[b]>c)}}function k(b,a,d){if(null!=a&&null!=d&&a===d)return function(c){return c.attributes[b]===a};if(null!=a&&null!=d)return function(c){return c.attributes[b]>=
a&&c.attributes[b]<=d};if(null!=a)return function(c){return c.attributes[b]>=a};if(null!=d)return function(c){return c.attributes[b]<=d}}Object.defineProperty(f,"__esModule",{value:!0});f.getTimeExtent=function(b,a){if(!b)return null;var d=b.startTimeField,c=b.endTimeField,e=Number.POSITIVE_INFINITY,g=Number.NEGATIVE_INFINITY;if(d&&c)a.forEach(function(b){var a=b.attributes;b=a[d];a=a[c];null==b||isNaN(b)||(e=Math.min(e,b));null==a||isNaN(a)||(g=Math.max(g,a))});else{var f=d||c;a.forEach(function(a){a=
a.attributes[f];null==a||isNaN(a)||(e=Math.min(e,a),g=Math.max(g,a))})}return{start:e,end:g}};f.getTimeOperator=function(b,a){if(!a||!b)return null;var d=b.startTimeField;b=b.endTimeField;if(!d&&!b)return null;var c=a.start;a=a.end;return null==c&&null==a?null:d&&b?h(d,b,c,a):k(d||b,c,a)}});