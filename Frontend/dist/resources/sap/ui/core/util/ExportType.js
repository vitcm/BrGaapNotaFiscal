/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject"],function(e){"use strict";var t=e.extend("sap.ui.core.util.ExportType",{metadata:{library:"sap.ui.core",properties:{fileExtension:"string",mimeType:"string",charset:"string",byteOrderMark:{type:"boolean",defaultValue:undefined}}}});t.prototype.init=function(){this._oExport=null};t.prototype._generate=function(e){this._oExport=e;var t=this.generate();this._oExport=null;return t};t.prototype.generate=function(){return""};t.prototype.getColumnCount=function(){if(this._oExport){return this._oExport.getColumns().length}return 0};t.prototype.getRowCount=function(){if(this._oExport&&this._oExport.getBinding("rows")){return this._oExport.getBinding("rows").getLength()}return 0};t.prototype.columnGenerator=function(){var e=0,t=this._oExport.getColumns(),n=t.length;return{next:function(){if(e<n){var r=e;e++;return{value:{index:r,name:t[r].getName()},done:false}}else{return{value:undefined,done:true}}}}};t.prototype.cellGenerator=function(){var e=0,t=this._oExport.getAggregation("_template"),n=t.getCells(),r=n.length;return{next:function(){if(e<r){var t=e;e++;var o={};n[t].getCustomData().forEach(function(e){o[e.getKey()]=e.getValue()});return{value:{index:t,content:n[t].getContent(),customData:o},done:false}}else{return{value:undefined,done:true}}}}};t.prototype.rowGenerator=function(){var e=this,t=0,n=this._oExport,r=n.getBinding("rows"),o=n.getBindingInfo("rows"),i=r.getContexts(0,r.getLength()),u=i.length,a=n.getAggregation("_template");return{next:function(){if(t<u){var n=t;t++;a.setBindingContext(i[n],o.model);return{value:{index:n,cells:e.cellGenerator()},done:false}}else{return{value:undefined,done:true}}}}};return t});
//# sourceMappingURL=ExportType.js.map