/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/extend","sap/ui/core/format/NumberFormat","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/model/odata/type/ODataType"],function(t,e,n,r,a,i,o){"use strict";var u=/^[-+]?(\d+)$/,s={minimum:"-9223372036854775808",maximum:"9223372036854775807"},l={minimum:"-9007199254740991",maximum:"9007199254740991"};function m(t,e,n){var r,a,i;a=u.exec(e);if(a){i=e.charAt(0)==="-";r=i?n.minimum.slice(1):n.maximum;if(a[1].length<r.length){return undefined}if(a[1].length>r.length||a[1]>r){if(i){return p("EnterNumberMin",[t.formatValue(n.minimum,"string")])}else{return p("EnterNumberMax",[t.formatValue(n.maximum,"string")])}}return undefined}return p("EnterInt")}function f(t){var r;if(!t.oFormat){r=e({groupingEnabled:true},t.oFormatOptions);r.parseAsString=true;t.oFormat=n.getIntegerInstance(r)}return t.oFormat}function p(t,e){return sap.ui.getCore().getLibraryResourceBundle().getText(t,e)}function c(t){return!t.oConstraints||t.oConstraints.nullable!==false}function g(e,n){var r;e.oConstraints=undefined;if(n){r=n.nullable;if(r===false||r==="false"){e.oConstraints={nullable:false}}else if(r!==undefined&&r!==true&&r!=="true"){t.warning("Illegal nullable: "+r,null,e.getName())}}e._handleLocalizationChange()}var d=o.extend("sap.ui.model.odata.type.Int64",{constructor:function(t,e){o.apply(this,arguments);this.oFormatOptions=t;g(this,e)}});d.prototype.formatValue=function(t,e){var n;if(t===null||t===undefined){return null}switch(this.getPrimitiveType(e)){case"any":return t;case"float":case"int":n=m(this,t,l);if(n){throw new r(n)}return parseInt(t);case"string":return f(this).format(t);default:throw new r("Don't know how to format "+this.getName()+" to "+e)}};d.prototype.getName=function(){return"sap.ui.model.odata.type.Int64"};d.prototype._handleLocalizationChange=function(){this.oFormat=null};d.prototype.parseValue=function(t,e){var r;if(t===null||t===""){return null}switch(this.getPrimitiveType(e)){case"string":r=f(this).parse(t);if(!r){throw new a(p("EnterInt"))}break;case"int":case"float":r=n.getIntegerInstance({maxIntegerDigits:Infinity,groupingEnabled:false}).format(t);break;default:throw new a("Don't know how to parse "+this.getName()+" from "+e)}return r};d.prototype.validateValue=function(t){var e;if(t===null&&c(this)){return}if(typeof t==="string"){e=m(this,t,s);if(e){throw new i(e)}return}throw new i(p("EnterInt"))};return d});
//# sourceMappingURL=Int64.js.map