/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./ExportRow","./File","sap/base/Log","./ExportColumn","./ExportType"],function(e,t,r,n){"use strict";function i(e,t){if(e){return function(){return e.apply(t,arguments)}}else{return e}}function o(e){n.warning("Usage of deprecated jQuery Promise method: '"+e+"'. "+"Please use the standard Promise methods 'then' / 'catch' instead!","","sap.ui.core.util.Export")}function s(e,t){var r=new Promise(e);t=t||r;var n=false,s=false;r.then(function(e){n=true;return e},function(e){s=true;throw e});var a={then:r.then,catch:r["catch"]};function l(e){e.then=function(r,n){var o=[i(r,t),i(n,t)];return l(a.then.apply(e,o),t)};e["catch"]=function(r){var n=[i(r,t)];return l(a["catch"].apply(e,n),t)};[{jq:"done",es6:"then"},{jq:"fail",es6:"catch"},{jq:"always",es6:"then"}].forEach(function(r){e[r.jq]=function(){o(r.jq);var n=null;Array.prototype.concat.apply([],arguments).forEach(function(o){var s=i(o,t);var l=function(e){s.apply(this,arguments);return e};var p=[l];if(r.jq==="always"){p.push(l)}if(!n){n=a[r.es6].apply(e,p)}else{n=n[r.es6].apply(n,p)}});return l(n,t)}});e.pipe=function(t,r){o("pipe");return e.then(t,r)};e.state=function(){o("state");if(n){return"resolved"}else if(s){return"rejected"}else{return"pending"}};return e}return l(r)}var a=e.extend("sap.ui.core.util.Export",{metadata:{publicMethods:["generate","saveFile"],library:"sap.ui.core",aggregations:{exportType:{type:"sap.ui.core.util.ExportType",multiple:false},columns:{type:"sap.ui.core.util.ExportColumn",multiple:true,bindable:"bindable"},rows:{type:"sap.ui.core.util.ExportRow",multiple:true,bindable:"bindable"},_template:{type:"sap.ui.core.util.ExportRow",multiple:false,visibility:"hidden"}}},renderer:null});a.getMetadata().getAggregation("rows")._doesNotRequireFactory=true;a.prototype.init=function(){this._oPromise=null;this._fnResolvePromise=null;this._oRowBindingArgs=null};a.prototype.exit=function(){delete this._oPromise;delete this._fnResolvePromise;delete this._oRowBindingArgs};a.prototype._createRowTemplate=function(){var e=new t(this.getId()+"-row"),r=this.getColumns();for(var n=0,i=r.length;n<i;n++){var o=r[n].getTemplate();if(o){e.addCell(o.clone("col"+n))}}return e};a.prototype.bindAggregation=function(t,r){if(t==="rows"){this._oRowBindingArgs=arguments;return this}return e.prototype.bindAggregation.apply(this,arguments)};a.prototype.updateRows=function(e){if(e==="change"&&this._fnResolvePromise){var t=this.getExportType()._generate(this);this.destroyAggregation("_template");this.unbindAggregation("rows");this._fnResolvePromise(t);this._oPromise=null;this._fnResolvePromise=null}};a.prototype.generate=function(){var t=this;if(!this._oPromise){this._oPromise=s(function(r,n){t._fnResolvePromise=r;if(!t.hasModel()){n("Generate is not possible beause no model was set.")}else{var i=t._createRowTemplate();t.setAggregation("_template",i,true);e.prototype.bindAggregation.apply(t,t._oRowBindingArgs);if(t.getBinding("rows")){t.getBinding("rows").getContexts(0,t.getBinding("rows").getLength())}}},this)}return this._oPromise};a.prototype.saveFile=function(e){return this.generate().then(function(t){var n=this.getExportType();r.save(t,e||"data",n.getFileExtension(),n.getMimeType(),n.getCharset(),n.getByteOrderMark())})};return a});
//# sourceMappingURL=Export.js.map