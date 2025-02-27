/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./TabStripItem","sap/ui/Device","sap/ui/core/InvisibleText","sap/ui/core/Element"],function(e,t,n,r){"use strict";var o={apiVersion:2};o.LEFT_OVERRFLOW_BTN_CLASS_NAME="sapMTSLeftOverflowButtons";o.RIGHT_OVERRFLOW_BTN_CLASS_NAME="sapMTSRightOverflowButtons";o.render=function(e,n){if(!n.getVisible()){return}this.beginTabStrip(e,n);if(!t.system.phone){e.openStart("div",n.getId()+"-leftOverflowButtons");e.class(this.LEFT_OVERRFLOW_BTN_CLASS_NAME);e.openEnd();if(n.getAggregation("_leftArrowButton")){this.renderLeftOverflowButtons(e,n,false)}e.close("div")}this.beginTabsContainer(e,n);this.renderItems(e,n);this.endTabsContainer(e);if(!t.system.phone){e.openStart("div",n.getId()+"-rightOverflowButtons");e.class(this.RIGHT_OVERRFLOW_BTN_CLASS_NAME);e.openEnd();if(n.getAggregation("_rightArrowButton")){this.renderRightOverflowButtons(e,n,false)}e.close("div")}this.renderTouchArea(e,n);this.endTabStrip(e)};o.renderItems=function(e,n){var o=n.getItems(),s=n.getSelectedItem(),i,a;if(t.system.phone){a=r.registry.get(s);a&&this.renderItem(e,n,a,true)}else{o.forEach(function(t){i=s&&s===t.getId();this.renderItem(e,n,t,i)},this)}};o.renderItem=function(t,n,r,o){var a=r.getTooltip(),d=s(r),l=r.getModified();t.openStart("div",r);t.class(e.CSS_CLASS);if(l){t.class(e.CSS_CLASS_MODIFIED)}if(o){t.class(e.CSS_CLASS_SELECTED)}if(a){t.attr("title",a)}t.accessibilityState(r,i(r,n,sap.ui.getCore().byId(n.getSelectedItem())));t.openEnd();if(r.getIcon()){t.renderControl(r._getImage())}t.openStart("div");t.class("sapMTSTexts");t.openEnd();t.openStart("div",d+"-addText");t.class(e.CSS_CLASS_TEXT);t.openEnd();this.renderItemText(t,r.getAdditionalText());t.close("div");t.openStart("div",d+"-text");t.class(e.CSS_CLASS_LABEL);t.openEnd();this.renderItemText(t,r.getText());if(l){t.openStart("span",d+"-symbol");t.class(e.CSS_CLASS_MODIFIED_SYMBOL);t.attr("role","presentation");t.attr("aria-hidden","true");t.openEnd();t.close("span")}t.close("div");t.close("div");this.renderItemCloseButton(t,r);t.close("div")};o.renderItemText=function(t,n){if(n.length>e.DISPLAY_TEXT_MAX_LENGTH){t.text(n.slice(0,e.DISPLAY_TEXT_MAX_LENGTH));t.text("...")}else{t.text(n)}};o.renderItemCloseButton=function(e,t){e.openStart("div");e.class("sapMTSItemCloseBtnCnt");e.openEnd();e.renderControl(t.getAggregation("_closeButton"));e.close("div")};o.beginTabStrip=function(e,t){e.openStart("div");e.class("sapMTabStripContainer");e.openEnd();e.openStart("div",t);e.class("sapMTabStrip");e.class("sapContrastPlus");e.openEnd()};o.endTabStrip=function(e){e.close("div");e.close("div")};o.beginTabsContainer=function(e,t){e.openStart("div",t.getId()+"-tabsContainer");e.class("sapMTSTabsContainer");e.openEnd();e.openStart("div",t.getId()+"-tabs");e.class("sapMTSTabs");e.accessibilityState(t,{role:"tablist"});e.openEnd()};o.endTabsContainer=function(e){e.close("div");e.close("div")};o.renderLeftOverflowButtons=function(e,t,n){e.renderControl(t.getAggregation("_leftArrowButton"));if(n){e.flush(t.$("leftOverflowButtons")[0])}};o.renderRightOverflowButtons=function(e,t,n){e.renderControl(t.getAggregation("_rightArrowButton"));if(n){e.flush(t.$("rightOverflowButtons")[0])}};o.renderTouchArea=function(e,t){e.openStart("div",t.getId()+"-touchArea");e.class("sapMTSTouchArea");e.openEnd();e.renderControl(t.getAggregation("_select"));e.renderControl(t.getAddButton());e.close("div")};function s(e){return e.getId()+"-label"}function i(e,t,r){var o=t.getItems(),i=o.indexOf(e),a=t.getParent(),d={role:"tab"},l=n.getStaticId("sap.m","TABSTRIP_ITEM_CLOSABLE")+" ";l+=n.getStaticId("sap.m",e.getModified()?"TABSTRIP_ITEM_MODIFIED":"TABSTRIP_ITEM_NOT_MODIFIED");d["describedby"]=l;d["posinset"]=i+1;d["setsize"]=o.length;d["labelledby"]=s(e)+"-addText "+s(e)+"-text";if(a&&a.getRenderer&&a.getRenderer().getContentDomId){d["controls"]=a.getRenderer().getContentDomId(a)}if(r&&r.getId()===e.getId()){d["selected"]="true"}else{d["selected"]="false"}return d}return o},true);
//# sourceMappingURL=TabStripRenderer.js.map