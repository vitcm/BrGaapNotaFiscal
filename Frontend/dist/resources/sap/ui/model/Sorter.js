/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/base/Log"],function(t,r){"use strict";var n=t.extend("sap.ui.model.Sorter",{constructor:function(t,n,e,o){if(typeof t==="object"){var i=t;t=i.path;n=i.descending;e=i.group;o=i.comparator}this.sPath=t;var s=this.sPath.indexOf(">");if(s>0){r.error('Model names are not allowed in sorter-paths: "'+this.sPath+'"');this.sPath=this.sPath.substr(s+1)}this.bDescending=n;this.vGroup=e;if(typeof e=="boolean"&&e){this.fnGroup=function(t){return t.getProperty(this.sPath)}}if(typeof e=="function"){this.fnGroup=e}this.fnCompare=o},getGroup:function(t){var r=this.fnGroup(t);if(typeof r==="string"||typeof r==="number"||typeof r==="boolean"||r==null){r={key:r}}return r},getGroupFunction:function(){return this.fnGroup&&this.fnGroup.bind(this)}});n.defaultComparator=function(t,r){if(t==r){return 0}if(r==null){return-1}if(t==null){return 1}if(typeof t=="string"&&typeof r=="string"){return t.localeCompare(r)}if(t<r){return-1}if(t>r){return 1}return 0};return n});
//# sourceMappingURL=Sorter.js.map