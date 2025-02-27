/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./QuickViewBase","./NavContainer","./Page","./ScrollContainer","./QuickViewCardRenderer"],function(e,t,i,a,n,r){"use strict";var o=t.extend("sap.m.QuickViewCard",{metadata:{library:"sap.m",properties:{showVerticalScrollBar:{type:"boolean",group:"Behavior",defaultValue:true}},designtime:"sap/m/designtime/QuickViewCard.designtime"}});o.prototype.init=function(){var e={pages:[new a],navigate:this._navigate.bind(this),afterNavigate:this._afterNavigate.bind(this)};this._oNavContainer=new i(e)};o.prototype.onBeforeRendering=function(){this._initPages()};o.prototype.onAfterRendering=function(){this._setLinkWidth()};o.prototype.exit=function(){if(this._oNavContainer){this._oNavContainer.destroy()}};o.prototype.onkeydown=function(e){this._processKeyboard(e)};o.prototype._createPage=function(e){var t=e._createPageContent();e._mPageContent=null;var i=new n(this.getId()+"-"+e.getPageId(),{horizontal:false,vertical:false});if(t.header){i.addContent(t.header)}i.addContent(t.form);i.addStyleClass("sapMQuickViewPage");return i};o.prototype._setLinkWidth=function(){this.$().find(".sapMLnk").css("width","auto")};return o});
//# sourceMappingURL=QuickViewCard.js.map