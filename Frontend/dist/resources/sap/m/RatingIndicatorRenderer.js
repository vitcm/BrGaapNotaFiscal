/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/IconPool","sap/ui/Device","sap/ui/core/Core"],function(e,t,i){"use strict";var n={apiVersion:2},s="px";n.render=function(e,t){var i=this;this.initSharedState(t);this.renderControlContainer(e,t,function(){i.renderSelectedItems(e,t);i.renderUnselectedItems(e,t);i.renderHoverItems(e,t);i.renderSelectorDiv(e,t)})};n.renderControlContainer=function(e,t,i){var n=t.getEnabled(),s=t.getEditable(),r=t.getDisplayOnly();e.openStart("div",t);e.style("width",this._iWidth+"px");e.style("height",this._iHeight+"px");if(n&&!r){e.attr("tabindex","0");e.class("sapMPointer");if(!s){e.class("sapMRIReadOnly")}}else{e.attr("tabindex","-1");n?e.class("sapMRIDisplayOnly"):e.class("sapMRIDisabled")}e.class("sapMRI");e.class("sapUiRatingIndicator"+t._getIconSizeLabel(this._fIconSize));this.writeTooltip(e,t);this.writeAccessibility(e,t);e.openEnd();i();e.close("div")};n.initSharedState=function(e){var i=e._roundValueToVisualMode(e.getValue()),n=e._iPxIconSize,s=e._iPxPaddingSize,r=i*n+(Math.round(i)-1)*s;if(r<0){r=0}this._bUseGradient=t.browser.chrome||t.browser.safari;this._sLabelID=e.getId()+"-ariaLabel";this._iSymbolCount=e.getMaxValue();this._iWidth=this._iSymbolCount*(n+s)-s;this._iHeight=n;this._iSelectedWidth=r;this._fIconSize=n};n.writeTooltip=function(e,t){var i=t.getTooltip_AsString();if(i){e.attr("title",i)}};n.writeAccessibility=function(e,t){var n=i.getLibraryResourceBundle("sap.m");e.accessibilityState(t,{role:"slider",orientation:"horizontal",valuemin:0,disabled:!t.getEnabled()||t.getDisplayOnly(),roledescription:n.getText("RATING_INDICATOR_ARIA_ROLEDESCRIPTION")})};n.renderSelectedItems=function(e,t){e.openStart("div",t.getId()+"-sel");e.class("sapMRISel");if(this._bUseGradient){e.class("sapMRIGrd")}e.style("width",this._iSelectedWidth+s);e.openEnd();for(var i=0;i<this._iSymbolCount;i++){this.renderIcon("SELECTED",e,t)}e.close("div")};n.renderUnselectedItems=function(e,t){e.openStart("div",t.getId()+"-unsel-wrapper");e.class("sapMRIUnselWrapper");e.style("width",this._iWidth-this._iSelectedWidth+s);e.openEnd();e.openStart("div",t.getId()+"-unsel");e.class("sapMRIUnsel");if(this._bUseGradient&&(t.getEnabled()||!t.getDisplayOnly())){e.class("sapMRIGrd")}e.openEnd();for(var i=0;i<this._iSymbolCount;i++){this.renderIcon("UNSELECTED",e,t)}e.close("div");e.close("div")};n.renderHoverItems=function(e,t){if(t.getEnabled()||!t.getDisplayOnly()){e.openStart("div",t.getId()+"-hov");e.class("sapMRIHov");e.openEnd();for(var i=0;i<this._iSymbolCount;i++){this.renderIcon("HOVERED",e,t)}e.close("div")}};n.renderSelectorDiv=function(e,t){e.openStart("div",t.getId()+"-selector");e.class("sapMRISelector");e.openEnd();e.close("div")};n.renderIcon=function(t,i,n){var r=this.getIconURI(t,n),o=this.getIconTag(r),a=e.isIconURI(r),l=this._fIconSize+s;if(o==="img"){i.voidStart(o)}else{i.openStart(o)}if(t==="UNSELECTED"&&!n.getEditable()){t="READONLY"}i.class("sapUiIcon");i.class(this.getIconClass(t));i.style("width",l);i.style("height",l);i.style("line-height",l);i.style("font-size",l);if(!a){i.attr("src",r)}if(o==="img"){i.voidEnd()}else{i.openEnd();if(a){i.text(e.getIconInfo(r).content)}i.close(o)}};n.getIconClass=function(e){switch(e){case"SELECTED":return"sapMRIIconSel";case"UNSELECTED":return"sapMRIIconUnsel";case"HOVERED":return"sapMRIIconHov";case"READONLY":return"sapMRIIconReadOnly"}};n.getIconURI=function(t,i){if(sap.ui.getCore().getConfiguration().getTheme()==="sap_hcb"){if(t==="UNSELECTED"&&(i.getEnabled()&&!i.getDisplayOnly())){return e.getIconURI("unfavorite")}return e.getIconURI("favorite")}switch(t){case"SELECTED":return i.getIconSelected()||e.getIconURI("favorite");case"UNSELECTED":if(i.getEditable()&&!i.getDisplayOnly()){return i.getIconUnselected()||e.getIconURI("unfavorite")}else{return i.getIconUnselected()||e.getIconURI("favorite")}case"HOVERED":return i.getIconHovered()||e.getIconURI("favorite")}};n.getIconTag=function(t){if(e.isIconURI(t)){return"span"}return"img"};return n},true);
//# sourceMappingURL=RatingIndicatorRenderer.js.map