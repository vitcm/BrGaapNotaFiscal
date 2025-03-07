/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/security/encodeCSS"],function(e){"use strict";var t={apiVersion:2};t.render=function(t,r){var n=r.getTooltip_AsString();var o=r._getContentType();if(o){o=e(o)}var s=e("sapMFrameType"+r.getFrameType());t.openStart("div",r);t.class("sapMTileCnt");t.class(o);t.class(s);if(n.trim()){t.attr("title",n)}t.openEnd();this._renderContent(t,r);this._renderFooter(t,r);t.close("div")};t._renderContent=function(e,t){if(!t._bRenderContent){return}var r=t.getContent();if(r){e.openStart("div",t.getId()+"-content");e.class("sapMTileCntContent");e.openEnd();if(!r.hasStyleClass("sapMTcInnerMarker")){r.addStyleClass("sapMTcInnerMarker")}e.renderControl(r);e.close("div")}};t._renderFooter=function(t,r){if(!r._bRenderFooter){return}var n="sapMTileCntFooterTextColor"+r.getFooterColor();var o=r._getFooterText(t,r);t.openStart("div",r.getId()+"-footer-text");t.class("sapMTileCntFtrTxt");t.class(e(n));t.openEnd();t.text(o);t.close("div")};return t},true);
//# sourceMappingURL=TileContentRenderer.js.map