/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./P13nConditionPanel","./P13nPanel","./library","sap/m/Panel","./P13nFilterItem","./P13nOperationsHelper","sap/m/P13nFilterPanelRenderer"],function(e,t,i,n,a,r,o){"use strict";var s=i.P13nPanelType;var l=i.P13nConditionOperation;var d=t.extend("sap.m.P13nFilterPanel",{metadata:{library:"sap.m",properties:{maxIncludes:{type:"string",group:"Misc",defaultValue:"-1"},maxExcludes:{type:"string",group:"Misc",defaultValue:"-1"},containerQuery:{type:"boolean",group:"Misc",defaultValue:false},layoutMode:{type:"string",group:"Misc",defaultValue:null},enableEmptyOperations:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",visibility:"hidden"},filterItems:{type:"sap.m.P13nFilterItem",multiple:true,singularName:"filterItem",bindable:"bindable"},messageStrip:{type:"sap.m.MessageStrip",multiple:false}},events:{addFilterItem:{},removeFilterItem:{},updateFilterItem:{},filterItemChanged:{parameters:{reason:{type:"string"},key:{type:"string"},index:{type:"int"},itemData:{type:"object"}}}}},renderer:o.renderer});d.prototype.setConditions=function(e){var t=[];var i=[];if(e.length){for(var n=0;n<e.length;n++){var a=e[n];if(!a.exclude){t.push(a)}else{i.push(a)}}}this._oIncludeFilterPanel.setConditions(t);this._oExcludeFilterPanel.setConditions(i);if(i.length>0){this._oExcludePanel.setExpanded(true)}return this};d.prototype.getConditions=function(){var e=this._oIncludeFilterPanel.getConditions();var t=this._oExcludeFilterPanel.getConditions();return e.concat(t)};d.prototype.setContainerQuery=function(e){this.setProperty("containerQuery",e);this._oIncludeFilterPanel.setContainerQuery(e);this._oExcludeFilterPanel.setContainerQuery(e);return this};d.prototype.setLayoutMode=function(e){this.setProperty("layoutMode",e);this._oIncludeFilterPanel.setLayoutMode(e);this._oExcludeFilterPanel.setLayoutMode(e);return this};d.prototype.validateConditions=function(){return this._oIncludeFilterPanel.validateConditions()&&this._oExcludeFilterPanel.validateConditions()};d.prototype.removeInvalidConditions=function(){this._oIncludeFilterPanel.removeInvalidConditions();this._oExcludeFilterPanel.removeInvalidConditions()};d.prototype.removeValidationErrors=function(){this._oIncludeFilterPanel.removeValidationErrors();this._oExcludeFilterPanel.removeValidationErrors()};d.prototype.onBeforeNavigationFrom=function(){return this.validateConditions()};d.prototype.onAfterNavigationFrom=function(){return this.removeInvalidConditions()};d.prototype.setIncludeOperations=function(e,t){t=t||"default";this._aIncludeOperations[t]=e;if(this._oIncludeFilterPanel){this._oIncludeFilterPanel.setOperations(this._aIncludeOperations[t],t)}};d.prototype.getIncludeOperations=function(e){if(this._oIncludeFilterPanel){return this._oIncludeFilterPanel.getOperations(e)}};d.prototype.setExcludeOperations=function(e,t){t=t||"default";this._aExcludeOperations[t]=e;if(this._oExcludeFilterPanel){this._oExcludeFilterPanel.setOperations(this._aExcludeOperations[t],t)}};d.prototype.getExcludeOperations=function(e){if(this._oExcludeFilterPanel){return this._oExcludeFilterPanel.getOperations(e)}};d.prototype.setKeyFields=function(e,t){this._aKeyFields=e;if(this._oIncludeFilterPanel){e.some(function(e){if(e.isDefault){this._oIncludeFilterPanel.setAutoAddNewRow(true)}}.bind(this));this._oIncludeFilterPanel.setKeyFields(e)}if(this._oExcludeFilterPanel){this._oExcludeFilterPanel.setKeyFields(Array.isArray(t)&&t.length>0?t:e)}};d.prototype.getKeyFields=function(){return this._aKeyFields};d.prototype.setMaxIncludes=function(e){this.setProperty("maxIncludes",e);if(this._oIncludeFilterPanel){this._oIncludeFilterPanel.setMaxConditions(e)}this._updatePanel();return this};d.prototype.setMaxExcludes=function(e){this.setProperty("maxExcludes",e);if(this._oExcludeFilterPanel){this._oExcludeFilterPanel.setMaxConditions(e)}this._updatePanel();return this};d.prototype._updatePanel=function(){var e=this.getMaxIncludes()==="-1"?1e3:parseInt(this.getMaxIncludes());var t=this.getMaxExcludes()==="-1"?1e3:parseInt(this.getMaxExcludes());if(e>0){if(t<=0){this._oIncludePanel.setHeaderText(null);this._oIncludePanel.setExpandable(false);this._oIncludePanel.addStyleClass("panelTopMargin");this._oIncludePanel.addStyleClass("panelNoHeader")}}if(t===0){this._oExcludePanel.setHeaderText(null);this._oExcludePanel.setExpandable(false);this._oExcludePanel.addStyleClass("panelNoHeader")}};d.prototype.init=function(){this.setType(s.filter);this.setTitle(sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("FILTERPANEL_TITLE"));sap.ui.getCore().loadLibrary("sap.ui.layout");this._aKeyFields=[];this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._aIncludeOperations={};this._aExcludeOperations={};this._oIncludePanel=new n({expanded:true,expandable:true,headerText:this._oRb.getText("FILTERPANEL_INCLUDES"),width:"auto"}).addStyleClass("sapMFilterPadding");this._oIncludeFilterPanel=new e({maxConditions:this.getMaxIncludes(),alwaysShowAddIcon:false,layoutMode:this.getLayoutMode(),dataChange:this._handleDataChange()});this._oIncludeFilterPanel._sAddRemoveIconTooltipKey="FILTER";this._oIncludePanel.addContent(this._oIncludeFilterPanel);this.addAggregation("content",this._oIncludePanel);this._oExcludePanel=new n({expanded:false,expandable:true,headerText:this._oRb.getText("FILTERPANEL_EXCLUDES"),width:"auto"}).addStyleClass("sapMFilterPadding");this._oExcludeFilterPanel=new e({exclude:true,maxConditions:this.getMaxExcludes(),alwaysShowAddIcon:false,layoutMode:this.getLayoutMode(),dataChange:this._handleDataChange()});this._oExcludeFilterPanel._sAddRemoveIconTooltipKey="FILTER";if(!this._oOperationsHelper){this._oOperationsHelper=new r}this._updateOperations();var t;for(t in this._aExcludeOperations){this._oExcludeFilterPanel.setOperations(this._aExcludeOperations[t],t)}for(t in this._aIncludeOperations){this._oIncludeFilterPanel.setOperations(this._aIncludeOperations[t],t)}this._oExcludePanel.addContent(this._oExcludeFilterPanel);this.addAggregation("content",this._oExcludePanel);this._updatePanel()};d.prototype.exit=function(){var e=function(e){if(e&&e.destroy){e.destroy()}return null};this._oOperationsHelper=e(this._oOperationsHelper);this._aKeyFields=e(this._aKeyFields);this._aIncludeOperations=e(this._aIncludeOperations);this._aExcludeOperations=e(this._aExcludeOperations);this._oRb=e(this._oRb)};d.prototype.onBeforeRendering=function(){var e=[],t,i,n=this.getEnableEmptyOperations();if(this._bUpdateRequired){this._bUpdateRequired=false;var a=this.getMessageStrip();if(a){a.addStyleClass("sapUiResponsiveMargin");this.insertAggregation("content",a,0)}t=[];i=(this.getBindingInfo("items")||{}).model;var r=function(e,t,i){var n=i.getBinding(e),a;if(n&&t){return t.getObject()[n.getPath()]}a=i.getMetadata();return a.hasProperty(e)?a.getProperty(e).get(i):a.getAggregation(e).get(i)};this.getItems().forEach(function(a){var o=a.getBindingContext(i),s,l,d;if(a.getBinding("key")){o.getObject()[a.getBinding("key").getPath()]=a.getKey()}t.push(s={key:a.getColumnKey(),text:r("text",o,a),tooltip:r("tooltip",o,a),maxLength:r("maxLength",o,a),type:r("type",o,a),typeInstance:r("typeInstance",o,a),formatSettings:r("formatSettings",o,a),precision:r("precision",o,a),scale:r("scale",o,a),isDefault:r("isDefault",o,a),values:r("values",o,a)});if(n){l=a.getNullable();d={};Object.keys(s).forEach(function(e){d[e]=s[e]});e.push(d);this._enhanceFieldOperationsWithEmpty(d,l,true);this._enhanceFieldOperationsWithEmpty(s,l);this._modifyFieldOperationsBasedOnMaxLength(d)}this._modifyFieldOperationsBasedOnMaxLength(s)},this);this.setKeyFields(t,e);var o=[];i=(this.getBindingInfo("filterItems")||{}).model;this.getFilterItems().forEach(function(e){var t=e.getBindingContext(i);if(e.getBinding("key")&&t){t.getObject()[e.getBinding("key").getPath()]=e.getKey()}o.push({key:e.getKey(),keyField:r("columnKey",t,e),operation:r("operation",t,e),value1:r("value1",t,e),value2:r("value2",t,e),exclude:r("exclude",t,e)})});this.setConditions(o)}};d.prototype._updateOperations=function(){this._oOperationsHelper.getIncludeTypes().forEach(function(e){this.setIncludeOperations(this._oOperationsHelper.getIncludeOperationsByType(e),e)}.bind(this));this._oOperationsHelper.getExcludeTypes().forEach(function(e){this.setExcludeOperations(this._oOperationsHelper.getExcludeOperationsByType(e),e)}.bind(this))};d.prototype._enableEnhancedExcludeOperations=function(){if(this._oOperationsHelper){this._oOperationsHelper.setUseExcludeOperationsExtended()}this._updateOperations()};d.prototype._modifyFieldOperationsBasedOnMaxLength=function(e){var t;if(e.maxLength===1||e.maxLength==="1"){t=e.operations?e.operations:this._oIncludeFilterPanel.getOperations(e.type);e.operations=[];t.forEach(function(t){if([l.Contains,l.StartsWith,l.EndsWith].indexOf(t)===-1){e.operations.push(t)}},this)}};d.prototype._enhanceFieldOperationsWithEmpty=function(e,t,i){var n,a;if(["string","stringdate"].indexOf(e.type)>-1||["date","datetime"].indexOf(e.type)>-1&&t){n=this[i?"_oExcludeFilterPanel":"_oIncludeFilterPanel"];a=n.getOperations(e.type);if(!a){a=n.getOperations()}if(!Array.isArray(e.operations)){e.operations=[]}a.forEach(function(t){e.operations.push(t)});if(e.operations.indexOf(l.Empty)===-1){e.operations.push(l.Empty)}}};d.prototype.addItem=function(e){t.prototype.addItem.apply(this,arguments);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};d.prototype.removeItem=function(e){var i=t.prototype.removeItem.apply(this,arguments);this._bUpdateRequired=true;return i};d.prototype.destroyItems=function(){this.destroyAggregation("items");if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};d.prototype.addFilterItem=function(e){this.addAggregation("filterItems",e,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};d.prototype.insertFilterItem=function(e,t){this.insertAggregation("filterItems",e,t,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};d.prototype.updateFilterItems=function(e){this.updateAggregation("filterItems");if(e==="change"&&!this._bIgnoreBindCalls){this._bUpdateRequired=true;this.invalidate()}};d.prototype.setMessageStrip=function(e){this.setAggregation("messageStrip",e,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};d.prototype.updateMessageStrip=function(e){this.updateAggregation("messageStrip");if(e==="change"&&!this._bIgnoreBindCalls){this._bUpdateRequired=true}};d.prototype.removeFilterItem=function(e){e=this.removeAggregation("filterItems",e,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return e};d.prototype.removeAllFilterItems=function(){var e=this.removeAllAggregation("filterItems",true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return e};d.prototype.destroyFilterItems=function(){this.destroyAggregation("filterItems");if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};d.prototype._handleDataChange=function(){var e=this;return function(t){var i=t.getParameter("newData");var n=t.getParameter("operation");var r=t.getParameter("key");var o=t.getParameter("index");var s;var l=-1;var d=t.getSource()===e._oExcludeFilterPanel;e.getFilterItems().some(function(e,t){if(!e.getExclude()&&!d||e.getExclude()&&d){o--}l=t;return o<0},this);switch(n){case"update":s=e.getFilterItems()[l];if(s){s.setExclude(i.exclude);s.setColumnKey(i.keyField);s.setOperation(i.operation);s.setValue1(i.value1);s.setValue2(i.value2)}e.fireUpdateFilterItem({key:r,index:l,filterItemData:s});e.fireFilterItemChanged({reason:"updated",key:r,index:l,itemData:{columnKey:i.keyField,operation:i.operation,exclude:i.exclude,value1:i.value1,value2:i.value2}});break;case"add":if(o>=0){l++}s=new a({columnKey:i.keyField,exclude:i.exclude,operation:i.operation});s.setValue1(i.value1);s.setValue2(i.value2);e._bIgnoreBindCalls=true;e.fireAddFilterItem({key:r,index:l,filterItemData:s});e.fireFilterItemChanged({reason:"added",key:r,index:l,itemData:{columnKey:i.keyField,operation:i.operation,exclude:i.exclude,value1:i.value1,value2:i.value2}});e._bIgnoreBindCalls=false;break;case"remove":e._bIgnoreBindCalls=true;e.fireRemoveFilterItem({key:r,index:l});e.fireFilterItemChanged({reason:"removed",key:r,index:l});e._bIgnoreBindCalls=false;break;default:throw"Operation'"+n+"' is not supported yet"}e._notifyChange()}};d.prototype._notifyChange=function(){var e=this.getChangeNotifier();if(e){e(this)}};return d});
//# sourceMappingURL=P13nFilterPanel.js.map