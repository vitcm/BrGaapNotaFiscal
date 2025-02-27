/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./AnalyticalBinding","sap/base/assert","sap/base/Log","sap/base/util/each","sap/ui/model/ChangeReason","sap/ui/model/TreeAutoExpandMode","sap/ui/model/TreeBinding","sap/ui/model/TreeBindingAdapter","sap/ui/model/odata/ODataTreeBindingAdapter"],function(e,t,o,n,i,a,r,s,d){"use strict";var u=function(){if(!(this instanceof r)||this._bIsAdapted){return}d.apply(this);for(var e in u.prototype){if(u.prototype.hasOwnProperty(e)){this[e]=u.prototype[e]}}this.setAutoExpandMode(this.mParameters.autoExpandMode||a.Bundled)},l="sap.ui.model.analytics.AnalyticalTreeBindingAdapter";u.prototype.getGrandTotalContext=function(){if(this._oRootNode){return this._oRootNode.context}};u.prototype.getGrandTotalNode=function(){if(this._oRootNode){return this._oRootNode}};u.prototype.getGrandTotalContextInfo=function(){return this._oRootNode};u.prototype.getLength=function(){if(!this._oRootNode){return 0}if(this._oRootNode&&this._oWatermark&&this._isRunningInAutoExpand(a.Bundled)){if(this._oWatermark.groupID===this._oRootNode.groupID){return this._oRootNode.magnitude+this._oRootNode.numberOfTotals}return this._oWatermark.absoluteNodeIndex+this._oRootNode.numberOfTotals+1}return this._oRootNode.magnitude+this._oRootNode.numberOfTotals};u.prototype.getContextByIndex=function(e){if(this._oRootNode&&e===this.getLength()-1&&this.providesGrandTotal()&&this.hasTotaledMeasures()){return this._oRootNode.context}var t=this.findNode(e);if(!t||!t.context){t={context:this.getContexts(e,1,0)[0]}}return t?t.context:undefined};u.prototype.getNodeByIndex=function(e){if(e===this.getLength()-1&&this.providesGrandTotal()&&this.hasTotaledMeasures()){return this._oRootNode}if(e>=this.getLength()){return undefined}return this.findNode(e)};u.prototype._isNodeSelectable=function(e){if(!e){return false}return e.isLeaf&&!e.isArtificial};u.prototype._getContextsOrNodes=function(e,t,o,i){if(!this.isResolved()){return[]}if(!o){o=this.oModel.iSizeLimit}if(!i){i=0}this._iPageSize=o;this._iThreshold=Math.max(this._iThreshold,i);this._aRowIndexMap=[];this._buildTree(t,o);var r=[];if(this._oRootNode){r=this._retrieveNodeSection(this._oRootNode,t,o)}this._updateRowIndexMap(r,t);var s=[];var d;for(var u=0;u<r.length;u++){var l=r[u];if(this._isRunningInAutoExpand(a.Bundled)&&this._oWatermark){if(l.groupID===this._oWatermark.groupID||this._oWatermark.groupID===this._oRootNode.groupID&&t+u+1==this.getLength()-1){this._autoExpandPaging()}}if(!l.context){d=d||{};var h=l.parent;d[h.groupID]=h;this._updateNodeSections(h.groupID,{startIndex:l.positionInParent,length:1})}s.push(l.context)}if(d){var p=this;n(d,function(e,t){t.magnitude=0;t.numberOfTotals=0;p._loadChildContexts(t,{absoluteNodeIndex:t.absoluteNodeIndex})});s=[];for(var f=0;f<r.length;f++){var l=r[f];s.push(l.context)}}if(e){return r}else{return s}};u.prototype._autoExpandPaging=function(){t(this._oWatermark,"No watermark was set!");t(this._isRunningInAutoExpand(a.Bundled),"Optimised AutoExpand Paging can only be used with TreeAutoExpandMode.Bundled!");var e=this.getNodeContexts(this._oWatermark.context,{startIndex:this._oWatermark.startIndex,length:this._iPageSize,threshold:this._iThreshold,level:this._oWatermark.level,numberOfExpandedLevels:this._oWatermark.autoExpand});return e};u.prototype._afterMatchHook=function(e,t,o,n,i,a){if(e.sumNode&&e!==this._oRootNode){if(t.length===o){return true}var r=n.call(this,e.sumNode,e.sumNode.positionInParent,a);if(r){t.push(e.sumNode)}}};u.prototype._afterMapHook=function(e,t){if(e.sumNode&&e!==this._oRootNode){t.call(this,e.sumNode)}};u.prototype._createSumNode=function(e){var t;if(this.bProvideGrandTotals&&!this.mParameters.sumOnTop&&this.hasTotaledMeasures()&&e.children.length>1){t=this._createNode({parent:e.parent,positionInParent:e.children.length,context:e.context,level:e.level});t.nodeState=this._createNodeState({groupID:t.groupID,sum:true,expanded:false})}return t};u.prototype._buildTree=function(e,t){this._oRootNode=undefined;this._oWatermark=undefined;var n=this.mParameters&&this.getNumberOfExpandedLevels();var i=this.getRootContexts({startIndex:0,length:this._iPageSize,threshold:this._iThreshold,numberOfExpandedLevels:this._autoExpandMode===a.Bundled?n:undefined});var r;if(i==null){o.warning("AnalyticalTreeBindingAdapter: No Dimensions given. An artificial rootContext has be created. Please check your Table/Service definition for dimension columns!")}else{r=i[0]}if(!r){return}var s=this._getNodeState("/");if(!s){s=this._updateTreeState({groupID:"/",expanded:true,sum:true});this._updateNodeSections("/",{startIndex:0,length:t})}this._oRootNode=this._createNode({context:r,parent:null,level:0,nodeState:s,isLeaf:false,autoExpand:n,absoluteNodeIndex:-1});this._oRootNode.isArtificial=true;this._loadChildContexts(this._oRootNode,{absoluteNodeIndex:-1})};u.prototype._loadChildContexts=function(e,t){var n=e.nodeState;var i=this.getGroupSize(e.context,e.level);if(i>=0){if(!e.children[i-1]){e.children[i-1]=undefined}if(e.level===this.aAggregationLevel.length){n.leafCount=i}e.sumNode=this._createSumNode(e)}for(var r=0;r<n.sections.length;r++){var s=n.sections[r];if(s.startIndex>e.children.length){continue}var d;if(i===-1){d=s.length}else{d=Math.min(s.length,i-s.startIndex)}var u=false;if(e.autoExpand>=0&&this._isRunningInAutoExpand(a.Bundled)){u=true;d=Math.max(0,i)}var l=this.getNodeContexts(e.context,{startIndex:s.startIndex,length:d,threshold:u?0:this._iThreshold,level:e.level,supressRequest:u});for(var h=0;h<l.length;h++){var p=l[h];var f=h+s.startIndex;var g=e.children[f];var c={context:l[h],parent:e,level:e.level+1,positionInParent:f,autoExpand:Math.max(e.autoExpand-1,-1),absoluteNodeIndex:++t.absoluteNodeIndex};if(g){g.context=c.context;g.parent=c.parent;g.level=c.level;g.positionInParent=c.positionInParent;g.magnitude=0;g.numberOfTotals=0;g.totalNumberOfLeafs=0;g.autoExpand=c.autoExpand;g.absoluteNodeIndex=c.absoluteNodeIndex;var x;if(p){x=this._calculateGroupID(g)}g.groupID=x}else{g=this._createNode(c)}g.nodeState=this._getNodeState(g.groupID);if(!g.nodeState){g.nodeState=this._createNodeState({groupID:g.groupID,expanded:false})}g.nodeState.parentGroupID=e.groupID;g.isLeaf=!this.nodeHasChildren(g);e.children[f]=g;if(g.isLeaf){e.numberOfLeafs+=1}if(g.parent.nodeState.selectAllMode&&!this._mTreeState.deselected[g.groupID]&&g.isLeaf){this.setNodeSelection(g.nodeState,true)}if((g.autoExpand>=0||g.nodeState.expanded)&&this.isGrouped()){if(!this._mTreeState.collapsed[g.groupID]){if(g.autoExpand>=0&&g.parent.nodeState.selectAllMode&&!this._mTreeState.deselected[g.groupID]){if(g.nodeState.selectAllMode===undefined){g.nodeState.selectAllMode=true}}this._updateTreeState({groupID:g.nodeState.groupID,fallbackNodeState:g.nodeState,expanded:true});this._loadChildContexts(g,t)}e.magnitude+=g.magnitude;e.numberOfTotals+=g.numberOfTotals;e.numberOfLeafs+=g.numberOfLeafs}if(g&&g.isLeaf){e.totalNumberOfLeafs=i}else{e.totalNumberOfLeafs+=g.totalNumberOfLeafs}}}i=this._isRunningInAutoExpand(a.Bundled)?e.children.length:i;e.magnitude+=Math.max(i||0,0);if(!i&&!this._isRunningInAutoExpand(a.Bundled)){o.warning("AnalyticalTreeBindingAdapter: iMaxGroupSize("+i+") is undefined for node '"+e.groupID+"'!")}if(e.sumNode||e===this._oRootNode&&this.providesGrandTotal()&&this.hasTotaledMeasures()){e.numberOfTotals+=1}if(this._isRunningInAutoExpand(a.Bundled)&&e.autoExpand!=-1){if(!this._oWatermark&&!e.isLeaf&&!this.mFinalLength[e.groupID]){this._oWatermark={groupID:e.groupID,context:e.context,absoluteNodeIndex:e.absoluteNodeIndex,startIndex:e.children.length,level:e.level,autoExpand:e.autoExpand}}}};u.prototype._calculateGroupID=function(e){var o;var n=this.aAggregationLevel.length;if(!this.isGrouped()&&e&&e.positionInParent){o="/"+e.positionInParent+"/"}else{if(e.level>n){o=this._getGroupIdFromContext(e.context,n);t(e.positionInParent!=undefined,"If the node level is greater than the number of grouped columns, the position of the node to its parent must be defined!");o+=e.positionInParent+"/"}else{o=this._getGroupIdFromContext(e.context,e.level)}}return o};u.prototype.collapse=function(e){var o,r;if(typeof e==="object"){o=e}else if(typeof e==="number"){r=this.findNode(e);t(r&&r.nodeState,"AnalyticalTreeBindingAdapter.collapse("+e+"): No node found!");if(!r){return}o=r.nodeState}this._updateTreeState({groupID:o.groupID,expanded:false});o.selectAllMode=false;var s=false;if(this.bCollapseRecursive||this._isRunningInAutoExpand(a.Bundled)){var d=o.groupID;if(this._isRunningInAutoExpand(a.Bundled)&&this._oWatermark&&(typeof d=="string"&&d.length>0&&this._oWatermark.groupID.startsWith(d))){if(r&&r.parent){this._oWatermark={groupID:r.parent.groupID,context:r.parent.context,absoluteNodeIndex:r.parent.absoluteNodeIndex,startIndex:r.positionInParent+1,level:r.parent.level,autoExpand:r.parent.autoExpand}}this._autoExpandPaging();s=true}var u=this;n(this._mTreeState.expanded,function(e,t){if(typeof d=="string"&&d.length>0&&e.startsWith(d)){u._updateTreeState({groupID:e,expanded:false})}});var l=[];n(this._mTreeState.selected,function(e,t){if(typeof d=="string"&&d.length>0&&e.startsWith(d)){t.selectAllMode=false;u.setNodeSelection(t,false);l.push(e)}});if(l.length){var h={rowIndices:[]};var p=0;this._map(this._oRootNode,function(e){if(!e||!e.isArtificial){p++}if(e&&l.indexOf(e.groupID)!==-1){if(e.groupID===this._sLeadSelectionGroupID){h.oldIndex=p;h.leadIndex=-1}h.rowIndices.push(p)}});this._publishSelectionChanges(h)}}if(!s){this._fireChange({reason:i.Collapse})}};u.prototype.collapseToLevel=function(e){this.setNumberOfExpandedLevels(e,true);s.prototype.collapseToLevel.call(this,e)};u.prototype.nodeHasChildren=function(o){t(o,"AnalyticalTreeBindingAdapter.nodeHasChildren: No node given!");if(!o||!o.parent||o.nodeState.sum){return false}else if(o.isArtificial){return true}else{return e.prototype.hasChildren.call(this,o.context,{level:o.level})}};u.prototype.resetData=function(t,o){var n=e.prototype.resetData.call(this,t,o);this._aRowIndexMap=[];this._oRootNode=undefined;this._oWatermark=undefined;this._iPageSize=0;this._iThreshold=0;if(!o||o.reason!==i.Sort){this.clearSelection();this._createTreeState(true)}return n};u.prototype.hasTotaledMeasures=function(){var e=false;n(this.getMeasureDetails()||[],function(t,o){if(o.analyticalInfo.total){e=true;return false}});return e};u.prototype.isGrouped=function(){return this.aAggregationLevel.length>0};u.prototype._isRunningInAutoExpand=function(e){if(this.getNumberOfExpandedLevels()>0&&this._autoExpandMode===e){return true}else{return false}};u.prototype.setNumberOfExpandedLevels=function(e,t){var n;e=e||0;if(e<0){o.warning("Number of expanded levels was set to 0. Negative values are prohibited",this,l);e=0}n=this.aAggregationLevel.length;if(e>n){o.warning("Number of expanded levels was reduced from "+e+" to "+n+" which is the number of grouped dimensions",this,l);e=n}if(!t){this.resetData()}this.mParameters.numberOfExpandedLevels=e};u.prototype.getNumberOfExpandedLevels=function(){return this.mParameters.numberOfExpandedLevels};u.prototype._getSelectableNodesCount=function(e){if(e){return e.totalNumberOfLeafs}else{return 0}};return u},true);
//# sourceMappingURL=AnalyticalTreeBindingAdapter.js.map