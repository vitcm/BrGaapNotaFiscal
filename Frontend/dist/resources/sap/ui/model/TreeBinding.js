/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Binding","./Filter","./Sorter"],function(t,e,i){"use strict";var r=t.extend("sap.ui.model.TreeBinding",{constructor:function(r,o,s,l,a,u){t.call(this,r,o,s,a);this.aFilters=[];this.aSorters=n(u,i);this.aApplicationFilters=n(l,e);this.oCombinedFilter=null;this.bDisplayRootNode=a&&a.displayRootNode===true},metadata:{abstract:true,publicMethods:["getRootContexts","getNodeContexts","hasChildren","filter"]}});function n(t,e){if(Array.isArray(t)){return t}return t instanceof e?[t]:[]}r.prototype.getChildCount=function(t){if(!t){return this.getRootContexts().length}return this.getNodeContexts(t).length};r.prototype.attachFilter=function(t,e){this.attachEvent("_filter",t,e)};r.prototype.detachFilter=function(t,e){this.detachEvent("_filter",t,e)};r.prototype._fireFilter=function(t){this.fireEvent("_filter",t)};r.prototype.getFilterInfo=function(t){if(this.oCombinedFilter){return this.oCombinedFilter.getAST(t)}return null};return r});
//# sourceMappingURL=TreeBinding.js.map