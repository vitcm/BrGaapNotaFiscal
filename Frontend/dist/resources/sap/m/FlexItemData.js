/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./FlexBoxStylingHelper","./library","sap/ui/core/LayoutData"],function(t,e,i){"use strict";var s=e.BackgroundDesign;var r=e.FlexAlignSelf;var a=i.extend("sap.m.FlexItemData",{metadata:{library:"sap.m",properties:{alignSelf:{type:"sap.m.FlexAlignSelf",group:"Misc",defaultValue:r.Auto},order:{type:"int",group:"Misc",defaultValue:0},growFactor:{type:"float",group:"Misc",defaultValue:0},shrinkFactor:{type:"float",group:"Misc",defaultValue:1},baseSize:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:"auto"},minHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},maxHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:""},minWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:""},styleClass:{type:"string",group:"Misc",defaultValue:""},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:s.Transparent}}}});a.prototype.setAlignSelf=function(t){var e=this.getAlignSelf();this.setProperty("alignSelf",t,true);this.$().removeClass("sapMFlexItemAlign"+e).addClass("sapMFlexItemAlign"+this.getAlignSelf());return this};a.prototype.setOrder=function(e){this.setProperty("order",e,true);t.setStyle(null,this,"order",this.getOrder());return this};a.prototype.setGrowFactor=function(e){this.setProperty("growFactor",e,true);t.setStyle(null,this,"flex-grow",this.getGrowFactor());return this};a.prototype.setShrinkFactor=function(e){this.setProperty("shrinkFactor",e,true);t.setStyle(null,this,"flex-shrink",this.getShrinkFactor());return this};a.prototype.setBaseSize=function(e){this.setProperty("baseSize",e,true);t.setStyle(null,this,"flex-basis",this.getBaseSize());return this};a.prototype.setMinHeight=function(t){this.setProperty("minHeight",t,true);this.$().css("min-height",this.getMinHeight());return this};a.prototype.setMaxHeight=function(t){this.setProperty("maxHeight",t,true);this.$().css("max-height",this.getMaxHeight());return this};a.prototype.setMinWidth=function(t){this.setProperty("minWidth",t,true);this.$().css("min-width",this.getMinWidth());return this};a.prototype.setMaxWidth=function(t){this.setProperty("maxWidth",t,true);this.$().css("max-width",this.getMaxWidth());return this};a.prototype.setBackgroundDesign=function(t){var e=this.getBackgroundDesign();this.setProperty("backgroundDesign",t,true);this.$().removeClass("sapMFlexBoxBG"+e).addClass("sapMFlexBoxBG"+this.getBackgroundDesign());return this};a.prototype.setStyleClass=function(t){var e=this.getStyleClass();this.setProperty("styleClass",t,true);this.$().removeClass(e).addClass(this.getStyleClass());return this};a.prototype.getDomRef=function(t){var e,s=i.prototype.getDomRef.call(this,t);if(s){return s}e=this.getParent();if(!e){return null}return e.getDomRef(t)};return a});
//# sourceMappingURL=FlexItemData.js.map