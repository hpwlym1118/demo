// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define(["../../Component","dojo/date/locale","dojo/i18n!../../GroupCards/GroupCheckCard/nls/resources","../../Buttons/Ago2018Checkbox"],function(g,h,k,l){return function(e){function b(a){if(c[a])return c[a].exports;var d=c[a]={i:a,l:!1,exports:{}};return e[a].call(d.exports,d,d.exports,b),d.l=!0,d.exports}var c={};return b.m=e,b.c=c,b.d=function(a,d,c){b.o(a,d)||Object.defineProperty(a,d,{enumerable:!0,get:c})},b.r=function(a){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,
Symbol.toStringTag,{value:"Module"});Object.defineProperty(a,"__esModule",{value:!0})},b.t=function(a,d){if((1&d&&(a=b(a)),8&d)||4&d&&"object"==typeof a&&a&&a.__esModule)return a;var c=Object.create(null);if(b.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:a}),2&d&&"string"!=typeof a)for(var e in a)b.d(c,e,function(d){return a[d]}.bind(null,e));return c},b.n=function(a){var d=a&&a.__esModule?function(){return a.default}:function(){return a};return b.d(d,"a",d),d},b.o=function(a,d){return Object.prototype.hasOwnProperty.call(a,
d)},b.p="",b(b.s=386)}({0:function(e,b,c){function a(a,b){function c(){this.constructor=a}d(a,b);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}c.d(b,"b",function(){return a});c.d(b,"a",function(){return f});var d=function(a,b){return(d=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d])})(a,b)},f=function(){return(f=Object.assign||function(a){for(var b,d=1,c=arguments.length;d<c;d++)for(var e in b=
arguments[d])Object.prototype.hasOwnProperty.call(b,e)&&(a[e]=b[e]);return a}).apply(this,arguments)}},154:function(e,b){e.exports=k},215:function(e,b){e.exports=l},216:function(e,b,c){b.a=function(a,b){a=a.group;return a.thumbURI?b("img",{src:a.thumbURI,class:"gcard-thumbnail__container",alt:a.title}):b("div",{class:"gcard-thumbnail__container gcard-thumbnail__svg-container"},b("svg",null,b("path",{fill:"#"+a.id.substr(a.id.length-6),d:"M0 0h65v65H0z"}),b("path",{fill:"#ccc",d:"M0 0h65v65H0z","fill-opacity":"0.8"}),
b("text",{x:"50%",y:/(MSIE |Trident\/|Edge\/)/.test(navigator.userAgent)?"70%":"50%",fill:"white","dominant-baseline":"central","text-anchor":"middle"},a.title.slice(0,1).toUpperCase())))}},24:function(e,b){e.exports=h},386:function(e,b,c){c.r(b);var a=c(0),d=c(154),f=c(24);e=c(4);var g=c(216),h=c(215),k=c.n(h);c=function(b){function c(a){a=b.call(this,a)||this;return a.handleCheckClick=a.handleCheckClick.bind(a),a}return a.b(c,b),c.prototype.render=function(a){var b=this.props.group,c=b.created,
b=b.modified,b=d.modified+": "+f.format(new Date(0<b?b:c),{selector:"date",formatLength:"medium"});return this.props.sortField&&"created"===this.props.sortField&&(b=d.created+": "+f.format(new Date(c),{selector:"date",formatLength:"medium"})),a("div",{classes:{"gcard-gcc__container":!0,"gcard-gcc__container--active":this.props.checked},key:this.props.key},a(k.a,{key:"gcard-gcc__checkbox-"+this.props.group.id,checked:this.props.checked,onChange:this.handleCheckClick,title:this.props.group.title}),
a(g.a,{group:this.props.group}),a("div",{class:"gcard-gcc__flex"},a("div",{class:"gcard-gcc__title-owner"},a("span",{class:"gcard-gcc__title"},this.props.group.title),a("a",{href:this.props.portal.baseUrl+"/home/user.html?user\x3d"+this.props.group.owner,class:"gcard-gcc__owner",target:"_blank"},this.props.group.owner),a("span",{class:"gcard-gcc__small-info"},b)),a("div",{class:"gcard-gcc__info"},a("span",null,b))))},c.prototype.handleCheckClick=function(){this.props.checked&&this.props.onUncheckGroup?
this.props.onUncheckGroup(this.props.group):!this.props.checked&&this.props.onCheckGroup&&this.props.onCheckGroup(this.props.group)},c}(e.Component);b.default=c},4:function(e,b){e.exports=g}})});