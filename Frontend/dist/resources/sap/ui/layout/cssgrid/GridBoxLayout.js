/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/layout/cssgrid/GridLayoutBase","sap/ui/layout/cssgrid/GridSettings","sap/ui/layout/cssgrid/GridBoxLayoutStyleHelper","sap/ui/Device","sap/ui/thirdparty/jquery"],function(t,e,i,a,jQuery){"use strict";var o=/^([X][L](?:[1-9]|1[0-2]))? ?([L](?:[1-9]|1[0-2]))? ?([M](?:[1-9]|1[0-2]))? ?([S](?:[1-9]|1[0-2]))?$/i;var s=o.exec("XL7 L6 M4 S2");var r={Phone:"sapUiLayoutCSSGridBoxLayoutSizeS",Tablet:"sapUiLayoutCSSGridBoxLayoutSizeM",Desktop:"sapUiLayoutCSSGridBoxLayoutSizeL",LargeDesktop:"sapUiLayoutCSSGridBoxLayoutSizeXL"};var n={XL:"sapUiLayoutCSSGridBoxLayoutSpanXL7",L:"sapUiLayoutCSSGridBoxLayoutSpanL6",M:"sapUiLayoutCSSGridBoxLayoutSpanM4",S:"sapUiLayoutCSSGridBoxLayoutSpanS2"};var p="0.5rem";var l=t.extend("sap.ui.layout.cssgrid.GridBoxLayout",{metadata:{library:"sap.ui.layout",properties:{boxMinWidth:{type:"sap.ui.core.CSSSize",defaultValue:""},boxWidth:{type:"sap.ui.core.CSSSize",defaultValue:""},boxesPerRowConfig:{type:"sap.ui.layout.BoxesPerRowConfig",group:"Behavior",defaultValue:"XL7 L6 M4 S2"}}}});l.prototype.getActiveGridSettings=function(){return new e({gridTemplateColumns:this._getTemplateColumns(),gridGap:p+" "+p})};l.prototype._applySingleGridLayout=function(e){t.prototype._applySingleGridLayout.call(this,e);var i=sap.ui.getCore().byId(e.parentElement.id);if(i&&i.isA("sap.f.GridList")&&i.isGrouped()){this._flattenHeight(i)}};l.prototype.addGridStyles=function(e){t.prototype.addGridStyles.apply(this,arguments);this._addSpanClasses(e);e.class("sapUiLayoutCSSGridBoxLayoutContainer")};l.prototype.onGridAfterRendering=function(t){t.getGridDomRefs().forEach(function(t){if(t.children){for(var e=0;e<t.children.length;e++){if(!t.children[e].classList.contains("sapMGHLI")&&!t.children[e].classList.contains("sapUiBlockLayerTabbable")){t.children[e].classList.add("sapUiLayoutCSSGridItem")}}}});if(!this._hasBoxWidth()){this._applySizeClass(t)}if(t.isA("sap.f.GridList")&&t.getGrowing()){var e=t._oGrowingDelegate._onAfterPageLoaded;t._oGrowingDelegate._onAfterPageLoaded=function(){e.call(t._oGrowingDelegate);if(t.isA("sap.f.GridList")&&t.isGrouped()){this._flattenHeight(t)}}.bind(this)}};l.prototype.isResponsive=function(){return true};l.prototype.onGridResize=function(t){if(t.control&&t.control.isA("sap.f.GridList")&&t.control.isGrouped()){this._flattenHeight(t.control)}if(t){if(!this._hasBoxWidth()){this._applySizeClass(t.control)}}};l.prototype._flattenHeight=function(t){var e=0;t.$().removeClass("sapUiLayoutCSSGridBoxLayoutFlattenHeight");this._loopOverGridItems(t,function(t){e=Math.max(jQuery(t).outerHeight(),e)});i.setItemHeight(t.getId(),e);t.$().addClass("sapUiLayoutCSSGridBoxLayoutFlattenHeight")};l.prototype._applySizeClass=function(t){var e=a.media.getCurrentRange("StdExt",t.$().width()),i=r[e.name];t.getGridDomRefs().forEach(function(t){if(!t.classList.contains(i)){Object.keys(r).map(function(e){t.classList.remove(r[e])});t.classList.add(i)}})};l.prototype._getTemplateColumns=function(){var t="";if(this.getBoxWidth()){t="repeat(auto-fit, "+this.getBoxWidth()+")"}else if(this.getBoxMinWidth()){t="repeat(auto-fit, minmax("+this.getBoxMinWidth()+", 1fr))"}return t};l.prototype._hasBoxWidth=function(){if(this.getBoxWidth()||this.getBoxMinWidth()){return true}else{return false}};l.prototype._addSpanClasses=function(t){var e,i=this.getBoxesPerRowConfig(),a,r,p,l;if(this._hasBoxWidth()){return}if(!i||!i.length===0){e=s}else{e=o.exec(i)}if(e){for(var u=1;u<e.length;u++){var d=e[u];if(!d){continue}d=d.toUpperCase();switch(d.substr(0,1)){case"X":if(d.substr(1,1)==="L"){a=this._getBoxesPerRowClass(d,2)}break;case"L":r=this._getBoxesPerRowClass(d,1);break;case"M":p=this._getBoxesPerRowClass(d,1);break;case"S":l=this._getBoxesPerRowClass(d,1);break;default:break}}}a=a||n.XL;r=r||n.L;p=p||n.M;l=l||n.S;t.class(a).class(r).class(p).class(l)};l.prototype._getBoxesPerRowClass=function(t,e){var i=parseInt(t.substr(e,t.length));if(i&&i>0&&i<13){return"sapUiLayoutCSSGridBoxLayoutSpan"+t}};l.prototype._loopOverGridItems=function(t,e){t.getGridDomRefs().forEach(function(t){if(t&&t.children){for(var i=0;i<t.children.length;i++){if(t.children[i].style.display!=="none"&&t.children[i].style.visibility!=="hidden"){e(t.children[i])}}}})};return l});
//# sourceMappingURL=GridBoxLayout.js.map