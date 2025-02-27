/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ValueStateSupport","sap/ui/core/IndicationColorSupport","sap/ui/core/InvisibleText","sap/ui/core/library","./library","sap/ui/core/Core"],function(t,e,s,a,n,i){"use strict";var o=a.TextDirection;var r=n.EmptyIndicatorMode;var p=i.getLibraryResourceBundle("sap.m");var c={apiVersion:2};c.render=function(t,e){t.openStart("div",e);if(e._isEmpty()&&e.getEmptyIndicatorMode()===r.Off){t.style("display","none");t.openEnd()}else{var s=e.getState(),a=e._getStateText(s),n=e.getInverted(),i=e.getTextDirection(),p=sap.ui.getCore(),c=p.getConfiguration().getRTL(),l={roledescription:p.getLibraryResourceBundle("sap.m").getText("OBJECT_STATUS")},d=e.getTooltip_AsString();if(i===o.Inherit){i=c?o.RTL:o.LTR}if(d){t.attr("title",d)}t.class("sapMObjStatus");t.class("sapMObjStatus"+s);if(n){t.class("sapMObjStatusInverted")}if(e._isActive()){t.class("sapMObjStatusActive");t.attr("tabindex","0");l.role="button"}else{l.role="group"}var u=d&&e.getAriaDescribedBy().length,g;if(u){g=e.getId()+"-tooltip";l["describedby"]={value:g,append:true}}t.accessibilityState(e,l);t.openEnd();if(u){t.openStart("span",g);t.class("sapUiInvisibleText");t.openEnd();t.text(d);t.close("span")}if(e.getTitle()){t.openStart("span",e.getId()+"-title");t.class("sapMObjStatusTitle");if(i){t.attr("dir",i.toLowerCase())}t.openEnd();t.text(e.getTitle()+":");t.close("span")}if(e._isActive()){t.openStart("span",e.getId()+"-link");t.class("sapMObjStatusLink");t.openEnd()}if(e.getIcon()){t.openStart("span",e.getId()+"-statusIcon");t.class("sapMObjStatusIcon");if(!e.getText()){t.class("sapMObjStatusIconOnly")}t.openEnd();t.renderControl(e._getImageControl());t.close("span")}if(e.getText()){t.openStart("span",e.getId()+"-text");t.class("sapMObjStatusText");if(i){t.attr("dir",i.toLowerCase())}t.openEnd();t.text(e.getText());t.close("span")}else if(e.getEmptyIndicatorMode()!==r.Off&&!e.getText()){this.renderEmptyIndicator(t,e)}if(e._isActive()){t.close("span")}if(a){t.openStart("span",e.getId()+"-state");t.class("sapUiPseudoInvisibleText");t.openEnd();t.text(a);t.close("span")}}t.close("div")};c.renderEmptyIndicator=function(t,e){t.openStart("span");t.class("sapMEmptyIndicator");if(e.getEmptyIndicatorMode()===r.Auto){t.class("sapMEmptyIndicatorAuto")}t.openEnd();t.openStart("span");t.attr("aria-hidden",true);t.openEnd();t.text(p.getText("EMPTY_INDICATOR"));t.close("span");t.openStart("span");t.class("sapUiPseudoInvisibleText");t.openEnd();t.text(p.getText("EMPTY_INDICATOR_TEXT"));t.close("span");t.close("span")};return c},true);
//# sourceMappingURL=ObjectStatusRenderer.js.map