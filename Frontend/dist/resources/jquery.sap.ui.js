/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/base/util/ObjectPath","sap/ui/dom/jquery/control"],function(jQuery,t){"use strict";function e(t){return t.getUIArea().getInterface()}function i(){return sap.ui.getCore().getUIArea(this.id)!=null}function r(){return sap.ui.getCore().getUIArea(this.id)}jQuery.fn.root=function(t){if(t){sap.ui.getCore().setRoot(this.get(0),t);return this}var i=this.control();if(i.length>0){return i.map(e)}var r=this.uiarea();if(r.length>0){return r}this.each(function(){sap.ui.getCore().createUIArea(this)});return this};jQuery.fn.uiarea=function(t){var e=this.slice("[id]").filter(i).map(r).get();return typeof t==="number"?e[t]:e};jQuery.fn.sapui=function(e,i,r){return this.each(function(){var n=null;if(this){if(e.indexOf(".")==-1){e="sap.ui.commons."+e}var u=t.get(e);if(u){if(typeof r=="object"&&typeof r.press=="function"){r.press=jQuery.proxy(r.press,this)}n=new u(i,r);n.placeAt(this)}}})};return jQuery});
//# sourceMappingURL=jquery.sap.ui.js.map