/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/Core","sap/ui/core/library","sap/ui/core/ValueStateSupport","sap/ui/core/LabelEnablement","sap/ui/Device"],function(e,t,n,a,i,r){"use strict";var s=n.TextDirection;var l=n.ValueState;var d={apiVersion:2};d.render=function(t,n){var a=n.getValueState(),i=n.getTextDirection(),d=e.getTextAlign(n.getTextAlign(),i),o=sap.ui.getCore().getConfiguration().getAccessibility(),u=n.getAggregation("_beginIcon")||[],c=n.getAggregation("_endIcon")||[],g,p;t.openStart("div",n);this.addOuterStyles(t,n);this.addControlWidth(t,n);t.class("sapMInputBase");this.addPaddingClass(t,n);this.addCursorClass(t,n);this.addOuterClasses(t,n);if(!n.getEnabled()){t.class("sapMInputBaseDisabled")}if(!n.getEditable()){t.class("sapMInputBaseReadonly")}if(a!==l.None&&n.getEditable()&&n.getEnabled()){t.class("sapMInputBaseState")}if(u.length){g=u.filter(function(e){return e.getVisible()});g.length&&t.class("sapMInputBaseHasBeginIcons")}if(c.length){p=c.filter(function(e){return e.getVisible()});p.length&&t.class("sapMInputBaseHasEndIcons")}this.writeOuterAttributes(t,n);var f=n.getTooltip_AsString();if(f){t.attr("title",f)}t.openEnd();t.openStart("div",n.getId()+"-content");t.class("sapMInputBaseContentWrapper");if(!n.getEnabled()){t.class("sapMInputBaseDisabledWrapper")}else if(!n.getEditable()){t.class("sapMInputBaseReadonlyWrapper")}if(a!==l.None&&n.getEditable()&&n.getEnabled()){this.addValueStateClasses(t,n)}this.addWrapperStyles(t,n);t.openEnd();if(u.length){this.writeIcons(t,u)}this.prependInnerContent(t,n);this.openInputTag(t,n);if(n.getName()){t.attr("name",n.getName())}if(!n.bShowLabelAsPlaceholder&&n._getPlaceholder()){t.attr("placeholder",n._getPlaceholder())}if(n.getMaxLength&&n.getMaxLength()>0){t.attr("maxlength",n.getMaxLength())}if(!n.getEnabled()){t.attr("disabled","disabled")}else if(!n.getEditable()){t.attr("readonly","readonly")}if(i!=s.Inherit){t.attr("dir",i.toLowerCase())}this.writeInnerValue(t,n);if(o){this.writeAccessibilityState(t,n)}if(r.browser.mozilla){if(f){t.attr("x-moz-errormessage",f)}else{t.attr("x-moz-errormessage"," ")}}this.writeInnerAttributes(t,n);t.class("sapMInputBaseInner");this.addInnerClasses(t,n);t.style("text-align",d);this.addInnerStyles(t,n);this.endInputTag(t,n);this.writeInnerContent(t,n);this.closeInputTag(t,n);if(c.length){this.writeIcons(t,c)}t.close("div");this.writeDecorations(t,n);if(o){this.renderAriaLabelledBy(t,n);this.renderAriaDescribedBy(t,n);this.renderValueStateAccDom(t,n)}t.close("div")};d.getAriaRole=function(e){return"textbox"};d.getAriaLabelledBy=function(e){if(this.getLabelledByAnnouncement(e)){return e.getId()+"-labelledby"}};d.getLabelledByAnnouncement=function(e){return""};d.renderAriaLabelledBy=function(e,t){var n=this.getLabelledByAnnouncement(t);if(n){e.openStart("span",t.getId()+"-labelledby").attr("aria-hidden","true").class("sapUiInvisibleText").openEnd().text(n.trim()).close("span")}};d.getAriaDescribedBy=function(e){if(this.getDescribedByAnnouncement(e)){return e.getId()+"-describedby"}};d.getDescribedByAnnouncement=function(e){return""};d.renderAriaDescribedBy=function(e,t){var n=this.getDescribedByAnnouncement(t);if(n){e.openStart("span",t.getId()+"-describedby").attr("aria-hidden","true").class("sapUiInvisibleText").openEnd().text(n.trim()).close("span")}};d.renderValueStateAccDom=function(e,n){var i=n.getValueState();if(i===l.None||!n.getEditable()||!n.getEnabled()){return}var r=document.activeElement!==n.getFocusDomRef()||i===l.Error;var s=n.getValueStateMessageId()+"-sr";var d=n.getAggregation("_invisibleFormattedValueStateText");var o=t.getLibraryResourceBundle("sap.m").getText("INPUTBASE_VALUE_STATE_"+i.toUpperCase());e.openStart("div",s).class("sapUiPseudoInvisibleText");if(r){e.attr("aria-live","assertive")}e.attr("aria-atomic","true").openEnd().text(o).text(" ");if(d){e.renderControl(d)}else{e.text(n.getValueStateText()||a.getAdditionalText(n))}e.close("div")};d.getAccessibilityState=function(e){var t=this.getAriaLabelledBy(e),n=this.getAriaDescribedBy(e),a=this.getAriaRole(e),i=e.getValueStateMessageId()+"-sr",r={};if(a){r.role=a}if(e.getValueState()===l.Error&&e.getEditable()&&e.getEnabled()){r.invalid=true;r.errormessage=i}else if(e.getValueState()!==l.None&&e.getEditable()&&e.getEnabled()){n=n?i+" "+n:i}if(t){r.labelledby={value:t.trim(),append:true}}if(n){r.describedby={value:n.trim(),append:true}}r.disabled=null;r.readonly=null;return r};d.writeAccessibilityState=function(e,t){e.accessibilityState(t,this.getAccessibilityState(t))};d.openInputTag=function(e,t){e.voidStart("input",t.getId()+"-"+this.getInnerSuffix())};d.endInputTag=function(e,t){e.voidEnd()};d.writeInnerValue=function(e,t){e.attr("value",t.getValue())};d.addCursorClass=function(e,t){};d.addPaddingClass=function(e,t){e.class("sapMInputBaseHeightMargin")};d.addOuterStyles=function(e,t){};d.addControlWidth=function(e,t){if(!t.getProperty("width")){e.class("sapMInputBaseNoWidth")}e.style("width",t.getWidth())};d.addOuterClasses=function(e,t){};d.writeOuterAttributes=function(e,t){};d.addInnerStyles=function(e,t){};d.addWrapperStyles=function(e,t){e.style("width","100%")};d.addInnerClasses=function(e,t){};d.writeInnerAttributes=function(e,t){};d.prependInnerContent=function(e,t){};d.writeInnerContent=function(e,t){};d.writeIcons=function(e,t){e.openStart("div").attr("tabindex","-1").class("sapMInputBaseIconContainer").openEnd();t.forEach(e.renderControl,e);e.close("div")};d.writeDecorations=function(e,t){};d.closeInputTag=function(e,t){};d.addPlaceholderStyles=function(e,t){};d.addPlaceholderClasses=function(e,t){};d.addValueStateClasses=function(e,t){e.class("sapMInputBaseContentWrapperState");e.class("sapMInputBaseContentWrapper"+t.getValueState())};d.getInnerSuffix=function(){return"inner"};return d},true);
//# sourceMappingURL=InputBaseRenderer.js.map