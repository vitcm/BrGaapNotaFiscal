/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device"],function(t){"use strict";var e={apiVersion:2};e.render=function(t,e){t.openStart("div",e);t.class("sapMTPClocksContainer");t.openEnd();this.renderButtons(t,e);this.renderClocks(t,e);t.close("div")};e.renderButtons=function(t,e){var n=e.getAggregation("_buttons"),r=e.getAggregation("_buttonAmPm"),o=e._getTimeSeparators(e._getDisplayFormatPattern()),a,i;if(n){if(r){n.push(r)}t.openStart("div");t.class("sapMTPCButtons");t.openEnd();for(i=0;i<n.length;i++){t.renderControl(n[i]);if(i<n.length-1){a=o.shift();if(!a){a=" "}t.openStart("span");t.attr("aria-hidden","true");t.openEnd();t.text(a);t.close("span")}}t.close("div")}};e.renderClocks=function(t,e){var n=e.getAggregation("_clocks"),r;if(n){t.openStart("div");t.class("sapMTPCClocks");t.attr("role","img");t.attr("aria-label",e._getAriaLabel());t.openEnd();for(r=0;r<n.length;r++){if(r===e._getActiveClock()){n[r].addStyleClass("sapMTPCActive")}t.renderControl(n[r])}t.close("div")}};return e},true);
//# sourceMappingURL=TimePickerClocksRenderer.js.map