/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device"],function(e){"use strict";var t={apiVersion:2};t.render=function(t,i){var n=i._getAllButtons(),r=i.getAggregation("_invisibleAriaTexts"),o=sap.ui.getCore().getLibraryResourceBundle("sap.m"),s=n.length,g=sap.ui.getCore().getConfiguration().getAccessibility(),a=n.filter(function(e){return e.getVisible()}).length,l,u,c,f,d=1,p=function(e){return r.filter(function(t){return t.getId().indexOf(e.getId())>-1})[0]};for(u=0;u<s;u++){f=n[u];if(f.getIcon()&&f.getVisible()){c=true}}t.openStart("div",i);t.class("sapMActionSheet");if(c){t.class("sapMActionSheetMixedButtons")}var C=i.getTooltip_AsString();if(C){t.attr("title",C)}g&&t.attr("role","presentation");t.openEnd();for(u=0;u<s;u++){f=n[u];t.renderControl(n[u]);if(g&&f.getVisible()){l=p(f);if(l){l.setText(o.getText("ACTIONSHEET_BUTTON_INDEX",[d,a]));t.renderControl(l)}d++}}if(e.system.phone&&i.getShowCancelButton()){t.renderControl(i._getCancelButton())}t.close("div")};return t},true);
//# sourceMappingURL=ActionSheetRenderer.js.map