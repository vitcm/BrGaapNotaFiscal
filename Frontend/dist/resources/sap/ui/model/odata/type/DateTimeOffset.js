/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/CalendarType","sap/ui/core/format/DateFormat","sap/ui/model/FormatException","sap/ui/model/odata/type/DateTimeBase"],function(t,e,i,r,o){"use strict";var a=o.extend("sap.ui.model.odata.type.DateTimeOffset",{constructor:function(e,i){var r;o.call(this,e,{nullable:i?i.nullable:undefined,precision:i?i.precision:undefined});this.rDateTimeOffset=undefined;this.oModelFormat=undefined;this.bV4=false;if(i){r=i.V4;if(r===true){this.bV4=true}else if(r!==undefined&&r!==false){t.warning("Illegal V4: "+r,null,this.getName())}}}});function n(t){var r="yyyy-MM-dd'T'HH:mm:ss",o;if(!t.oModelFormat){o=t.oConstraints&&t.oConstraints.precision;if(o){r+="."+"".padEnd(o,"S")}t.oModelFormat=i.getDateInstance({calendarType:e.Gregorian,pattern:r+"XXX",strictParsing:true,UTC:t.oFormatOptions&&t.oFormatOptions.UTC})}return t.oModelFormat}a.prototype._resetModelFormatter=function(){this.oModelFormat=undefined};a.prototype.formatValue=function(t,e){var i;if(t===undefined||t===null){return null}if(this.getPrimitiveType(e)==="object"){if(t instanceof Date){return new Date(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds())}return n(this).parse(t)}if(typeof t==="string"&&this.getPrimitiveType(e)==="string"){i=n(this).parse(t);if(!i){throw new r("Illegal "+this.getName()+" value: "+t)}t=i}return o.prototype.formatValue.call(this,t,e)};a.prototype.getConstraints=function(){var t=o.prototype.getConstraints.call(this);if(this.bV4){t.V4=true}return t};a.prototype.getModelFormat=function(){if(this.bV4){return n(this)}return o.prototype.getModelFormat.call(this)};a.prototype.getName=function(){return"sap.ui.model.odata.type.DateTimeOffset"};a.prototype.parseValue=function(t,e){var i=o.prototype.parseValue.call(this,t,e);return this.bV4&&i!==null?n(this).format(i):i};a.prototype.setV4=function(){this.bV4=true;return this};a.prototype.validateValue=function(t){var e;if(this.bV4){if(typeof t==="string"){if(!this.rDateTimeOffset){e=this.oConstraints&&this.oConstraints.precision;this.rDateTimeOffset=new RegExp("^"+"\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])"+"T"+"(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d"+(e?"(\\.\\d{1,"+e+"})?":"")+")?"+"(?:Z|[-+](?:0\\d|1[0-3]):[0-5]\\d|[-+]14:00)$","i")}if(this.rDateTimeOffset.test(t)){return}}else if(t){t=t.toString()}}o.prototype.validateValue.call(this,t)};return a});
//# sourceMappingURL=DateTimeOffset.js.map