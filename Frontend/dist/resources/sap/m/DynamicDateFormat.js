/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/format/DateFormat","sap/ui/core/format/NumberFormat","sap/ui/core/Locale","sap/ui/core/LocaleData","./StandardDynamicDateRangeKeys","sap/base/Log","sap/base/util/deepExtend","sap/base/util/isEmptyObject","sap/ui/core/date/UniversalDateUtils"],function(t,e,a,r,n,o,i,s,u){"use strict";var c=function(){throw new Error};var m=sap.ui.getCore().getLibraryResourceBundle("sap.m");var p={};var f={};var l={DATE:["date"],DATERANGE:["date","date"],LASTDAYS:["int"],LASTWEEKS:["int"],LASTMONTHS:["int"],LASTQUARTERS:["int"],LASTYEARS:["int"],NEXTDAYS:["int"],NEXTWEEKS:["int"],NEXTMONTHS:["int"],NEXTQUARTERS:["int"],NEXTYEARS:["int"],FROM:["date"],TO:["date"],SPECIFICMONTH:["month"],TODAYFROMTO:["int","int"]};for(var v=0;v<n.length;v++){var d=n[v];var F=m.getText("DYNAMIC_DATE_"+d.toUpperCase()+"_FORMAT");var O=F.split("{").map(function(t){var e=t.indexOf("}");if(e!==-1){return t.slice(e+1)}return t});p[d]=O;var T=[];var g=F.indexOf("{");var h=-1;var D=-1;while(g!==-1){h=F.indexOf("}");D=parseInt(F.slice(g+1,h-h-1));T.push(D);F=F.slice(h+1);g=F.indexOf("{")}f[d]=T}c.getInstance=function(t,e){return this.createInstance(t,e)};c.oDefaultDynamicDateFormat={date:{},month:{pattern:"MMMM"},int:{}};c.createInstance=function(n,o){var s=Object.create(this.prototype);if(n instanceof a){o=n;n=undefined}if(!o){o=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()}s.oLocale=o;s.oLocaleData=r.getInstance(o);s.oOriginalFormatOptions=i({},c.oDefaultDynamicDateFormat,n);s._dateFormatter=t.getInstance(s.oOriginalFormatOptions["date"]);[s._dateFormatter].concat(s._dateFormatter.aFallbackFormats).forEach(function(t){t.parseRelative=function(){return null}});s._monthFormatter=t.getInstance(s.oOriginalFormatOptions["month"]);s._numberFormatter=e.getInstance(s.oOriginalFormatOptions["int"]);s._resourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");return s};c.prototype.format=function(t){var e=t.operator;var a=t.values.slice(0);if(e==="SPECIFICMONTH"){var r=new Date;r.setMonth(a[0]);a[0]=this._monthFormatter.format(r)}var n=a.map(function(t){if(t instanceof Date){return this._dateFormatter.format(t)}if(typeof t==="number"){return this._numberFormatter.format(t)}else{return t.toString()}},this);return this._resourceBundle.getText("DYNAMIC_DATE_"+e.toUpperCase()+"_FORMAT",n)};c.prototype.parse=function(t,e){var a;var r=p[e];var n="^"+r.join("(.*)")+"$";if(e==="TODAYFROMTO"){n=n.replace("+","\\+")}var o=new RegExp(n,"i");var i=t.match(o);if(i){a={};a.values=[];for(var s=0;s<f[e].length;s++){var u=f[e][s];var c=l[e][u];var m;var v=i[s+1];switch(c){case"date":m=this._dateFormatter.parse(v);break;case"month":var d=[0,1,2,3,4,5,6,7,8,9,10,11].map(function(t){var e=new Date;e.setMonth(t);return this._monthFormatter.format(e)},this);var F=d.indexOf(v);m=F!==-1?F:null;break;case"int":m=this._numberFormatter.parse(v);break;case"string":m=v;break;default:break}if(!m){a=null;break}a.values[u]=m}if(a){a.operator=e;return a}}};return c});
//# sourceMappingURL=DynamicDateFormat.js.map