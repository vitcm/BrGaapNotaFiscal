/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/type/Date","sap/ui/model/odata/type/ODataType","sap/ui/model/odata/type/DateTimeBase","./InputBase","sap/ui/core/LocaleData","sap/ui/core/library","sap/ui/core/format/DateFormat","./DateTimeFieldRenderer","sap/base/util/deepEqual","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/cursorPos"],function(t,e,a,r,i,s,o,n,u,l,jQuery){"use strict";var p=s.CalendarType;var h=r.extend("sap.m.DateTimeField",{metadata:{abstract:true,library:"sap.m",properties:{displayFormat:{type:"string",group:"Appearance",defaultValue:null},valueFormat:{type:"string",group:"Data",defaultValue:null},dateValue:{type:"object",group:"Data",defaultValue:null},initialFocusedDateValue:{type:"object",group:"Data",defaultValue:null}}}});h.prototype.setValue=function(t){t=this.validateProperty("value",t);var e=this.getValue();if(t===e){return this}else{this.setLastValue(t)}this.setProperty("value",t);this._bValid=true;var a;if(t){a=this._parseValue(t);if(!a||a.getTime()<this._oMinDate.getTime()||a.getTime()>this._oMaxDate.getTime()){this._bValid=false;l.warning("Value can not be converted to a valid date",this)}}this.setProperty("dateValue",a);if(this.getDomRef()){var r;if(a){r=this._formatValue(a)}else{r=t}if(this._$input.val()!==r){this._$input.val(r);this._curpos=this._$input.cursorPos()}}return this};h.prototype.setDateValue=function(t){if(!this._isValidDate(t)){throw new Error("Date must be a JavaScript date object; "+this)}if(u(this.getDateValue(),t)){return this}t=this._dateValidation(t);var e=this._formatValue(t,true);if(e!==this.getValue()){this.setLastValue(e)}this.setProperty("value",e);if(this.getDomRef()){var a=this._formatValue(t);if(this._$input.val()!==a){this._$input.val(a);this._curpos=this._$input.cursorPos()}}return this};h.prototype.setValueFormat=function(t){this.setProperty("valueFormat",t,true);var e=this.getValue();if(e){this._handleDateValidation(this._parseValue(e))}return this};h.prototype.setDisplayFormat=function(t){this.setProperty("displayFormat",t,true);this.updateDomValue(this._formatValue(this.getDateValue()));this.setPlaceholder(this._getPlaceholder());return this};h.prototype.getDisplayFormatType=function(){return null};h.prototype._dateValidation=function(t){this._bValid=true;this.setProperty("dateValue",t);return t};h.prototype._handleDateValidation=function(t){this._bValid=true;this.setProperty("dateValue",t)};h.prototype._getPlaceholder=function(){var t=this.getPlaceholder();if(!t){t=this._getDisplayFormatPattern();if(!t){t=this._getDefaultDisplayStyle()}if(this._checkStyle(t)){t=this._getLocaleBasedPattern(t)}}return t};h.prototype._getLocaleBasedPattern=function(t){return i.getInstance(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()).getDatePattern(t)};h.prototype._parseValue=function(t,e){var r=this.getBinding("value"),i=r&&r.getType&&r.getType(),s=this._getFormatter(e),o,n,u;if(i&&this._isSupportedBindingType(i)){try{u=i.parseValue(t,"string");if(typeof u==="string"&&i instanceof a){u=a.prototype.parseValue.call(i,t,"string")}o=i.oFormatOptions;if(o&&o.source&&o.source.pattern=="timestamp"){u=new Date(u)}else if(o&&o.source&&typeof o.source.pattern==="string"){u=i.oInputFormat.parse(t)}}catch(t){}if(u&&(i.oFormatOptions&&this._isFormatOptionsUTC(i.oFormatOptions)||i.oConstraints&&i.oConstraints.isDateOnly)){n=new Date(u.getUTCFullYear(),u.getUTCMonth(),u.getUTCDate(),u.getUTCHours(),u.getUTCMinutes(),u.getUTCSeconds(),u.getUTCMilliseconds());n.setFullYear(u.getUTCFullYear());u=n}return u}return s.parse(t)};h.prototype._formatValue=function(t,e){if(!t){return""}var a=this.getBinding("value"),r=a&&a.getType&&a.getType(),i,s;if(r&&this._isSupportedBindingType(r)){if(r.oFormatOptions&&r.oFormatOptions.UTC||r.oConstraints&&r.oConstraints.isDateOnly){s=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));s.setUTCFullYear(t.getFullYear());t=s}i=r.oFormatOptions;if(i&&i.source&&i.source.pattern=="timestamp"){t=t.getTime()}else if(r.oOutputFormat){return r.oOutputFormat.format(t)}return r.formatValue(t,"string")}return this._getFormatter(!e).format(t)};h.prototype._isSupportedBindingType=function(t){return t.isA(["sap.ui.model.type.Date","sap.ui.model.odata.type.DateTime","sap.ui.model.odata.type.DateTimeOffset"])};h.prototype._isFormatOptionsUTC=function(t){return t.UTC||t.source&&t.source.UTC};h.prototype._getDefaultDisplayStyle=function(){return"medium"};h.prototype._getDefaultValueStyle=function(){return"short"};h.prototype._getFormatter=function(t){var e=this._getBoundValueTypePattern(),a=false,r,i=this.getBinding("value"),s;if(i&&i.oType&&i.oType.oOutputFormat){a=!!i.oType.oOutputFormat.oFormatOptions.relative;s=i.oType.oOutputFormat.oFormatOptions.calendarType}if(!e){if(t){e=this.getDisplayFormat()||this._getDefaultDisplayStyle();s=this.getDisplayFormatType()}else{e=this.getValueFormat()||this._getDefaultValueStyle();s=p.Gregorian}}if(!s){s=sap.ui.getCore().getConfiguration().getCalendarType()}if(t){if(e===this._sUsedDisplayPattern&&s===this._sUsedDisplayCalendarType){r=this._oDisplayFormat}}else{if(e===this._sUsedValuePattern&&s===this._sUsedValueCalendarType){r=this._oValueFormat}}if(r){return r}return this._getFormatterInstance(r,e,a,s,t)};h.prototype._getFormatterInstance=function(t,e,a,r,i){if(this._checkStyle(e)){t=this._getFormatInstance({style:e,strictParsing:true,relative:a,calendarType:r},i)}else{t=this._getFormatInstance({pattern:e,strictParsing:true,relative:a,calendarType:r},i)}if(i){this._sUsedDisplayPattern=e;this._sUsedDisplayCalendarType=r;this._oDisplayFormat=t}else{this._sUsedValuePattern=e;this._sUsedValueCalendarType=r;this._oValueFormat=t}return t};h.prototype._getFormatInstance=function(t,e){return o.getInstance(t)};h.prototype._checkStyle=function(t){return t==="short"||t==="medium"||t==="long"||t==="full"};h.prototype._getDisplayFormatPattern=function(){var t=this._getBoundValueTypePattern();if(t){return t}t=this.getDisplayFormat();if(this._checkStyle(t)){t=this._getLocaleBasedPattern(t)}return t};h.prototype._getBoundValueTypePattern=function(){var a=this.getBinding("value"),r=a&&a.getType&&a.getType();if(r instanceof t){return r.getOutputPattern()}if(r instanceof e&&r.oFormat){return r.oFormat.oFormatOptions.pattern}return undefined};h.prototype._isValidDate=function(t){return!t||Object.prototype.toString.call(t)==="[object Date]"};return h});
//# sourceMappingURL=DateTimeField.js.map