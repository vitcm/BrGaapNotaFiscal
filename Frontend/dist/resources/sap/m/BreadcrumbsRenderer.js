/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Text"],function(e){"use strict";var t={apiVersion:2};var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");t.render=function(t,r){var n=r._getControlsForBreadcrumbTrail(),s=r._getSelect(),a=r._sSeparatorSymbol,o=r._getInvisibleText().getId(),l=r.getAriaLabelledBy().slice();t.openStart("nav",r);t.class("sapMBreadcrumbs");l.push(o);t.accessibilityState(null,{labelledby:{value:l.join(" "),append:true}});t.openEnd();t.openStart("ol");t.openEnd();if(s.getVisible()){this._renderControlInListItem(t,s,a,false,"sapMBreadcrumbsSelectItem")}n.forEach(function(r){this._renderControlInListItem(t,r,a,r instanceof e)},this);t.close("ol");t.close("nav")};t._renderControlInListItem=function(e,t,r,n,s){e.openStart("li");e.class("sapMBreadcrumbsItem");e.class(s);e.openEnd();e.renderControl(t);if(!n){e.openStart("span").class("sapMBreadcrumbsSeparator").openEnd().text(r).close("span")}e.close("li")};t._getResourceBundleText=function(e){return r.getText(e)};return t},true);
//# sourceMappingURL=BreadcrumbsRenderer.js.map