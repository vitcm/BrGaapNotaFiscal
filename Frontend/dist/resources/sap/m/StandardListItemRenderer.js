/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/Core","sap/ui/core/Renderer","sap/ui/core/IconPool","sap/ui/Device","./library","./ListItemBaseRenderer"],function(e,t,i,n,r,s,a){"use strict";var o=e.TextDirection;var p=i.extend(a);p.apiVersion=2;p.renderLIAttributes=function(e,t){var i=t.getIcon(),r=t.getTitle();e.class("sapMSLI");if(i&&!n.isIconURI(i)){e.class("sapMSLIThumbnail")}if(!t.getIconInset()){e.class("sapMSLINoIconInset")}if(r&&t.getDescription()){e.class("sapMSLIWithDescription")}if(r&&!t.getAdaptTitleSize()){e.class("sapMSLINoTitleAdapt")}if(r&&t.getWrapping()){e.class("sapMSLIWrapping")}};p.renderLIContent=function(e,t){var i=t.getInfo(),n=t.getTitle(),r=t.getDescription(),s=t.getAdaptTitleSize(),a=!n&&i;if(t.getIcon()){e.renderControl(t._getImage())}e.openStart("div").class("sapMSLIDiv");if(!r&&s&&i||a){e.class("sapMSLIInfoMiddle")}e.openEnd();this.renderTitleWrapper(e,t);if(n&&r){this.renderDescription(e,t)}if(a&&!t.getWrapping()){this.renderInfo(e,t)}e.close("div")};p.renderTitleWrapper=function(e,t){var i=t.getTitleTextDirection(),n=t.getTitle(),r=t.getDescription(),s=t.getInfo(),a=t.getWrapping(),p=!n&&s;e.openStart("div");if(!p&&r){e.class("sapMSLITitle")}else{e.class("sapMSLITitleOnly")}if(i!==o.Inherit){e.attr("dir",i.toLowerCase())}e.openEnd();if(a){this.renderWrapping(e,t,"title");if(n&&s&&!r){this.renderInfo(e,t)}}else{this.renderTitle(e,t)}e.close("div");if(s&&!r&&!a&&!p){this.renderInfo(e,t)}};p.renderTitle=function(e,t){e.text(t.getTitle())};p.renderDescription=function(e,t){var i=t.getWrapping(),n=t.getDescription(),r=t.getInfo();e.openStart("div").class("sapMSLIDescription");if(r){e.class("sapMSLIDescriptionAndInfo")}e.openEnd();if(r){e.openStart("div").class("sapMSLIDescriptionText").openEnd();if(i){this.renderWrapping(e,t,"description");this.renderInfo(e,t)}else{e.text(n)}e.close("div");if(!i){this.renderInfo(e,t)}}else if(i){this.renderWrapping(e,t,"description")}else{e.text(n)}e.close("div")};p.renderInfo=function(e,t){var i=t.getInfoTextDirection(),n=t.getInfoStateInverted();e.openStart("div",t.getId()+"-info");if(i!==o.Inherit){e.attr("dir",i.toLowerCase())}e.class("sapMSLIInfo");e.class("sapMSLIInfo"+t.getInfoState());if(n){e.class("sapMSLIInfoStateInverted")}var r=t._measureInfoTextWidth();e.style("min-width",t._getInfoTextMinWidth(r));e.openEnd();e.text(t.getInfo());e.close("div")};p.renderExpandCollapse=function(e,i,n){var r=i.getId(),s=n=="title"?true:false,a=s?i._bTitleTextExpanded:i._bDescriptionTextExpanded,o=t.getLibraryResourceBundle("sap.m");e.openStart("span",r+"-"+n+"ThreeDots").openEnd();e.text(a?" ":" ... ");e.close("span");e.openStart("span",s?r+"-titleButton":r+"-descriptionButton").class("sapMSLIExpandCollapse");e.attr("tabindex","0").attr("role","button").attr("aria-live","polite");e.openEnd();e.text(o.getText(a?"TEXT_SHOW_LESS":"TEXT_SHOW_MORE"));e.close("span")};p.renderWrapping=function(e,t,i){var n=t.getId(),s=i=="title"?true:false,a=s?t.getTitle():t.getDescription(),o=s?t._bTitleTextExpanded:t._bDescriptionTextExpanded,p=r.system.phone?100:300;e.openStart("span",n+"-"+i+"Text").attr("aria-live","polite").openEnd();if(!o){var l=t._getCollapsedText(a);e.text(l)}else if(s){this.renderTitle(e,t)}else{e.text(t.getDescription())}e.close("span");if(a.length>p){this.renderExpandCollapse(e,t,i)}};return p},true);
//# sourceMappingURL=StandardListItemRenderer.js.map