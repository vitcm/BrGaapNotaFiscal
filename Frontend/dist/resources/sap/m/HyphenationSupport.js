/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","./library","sap/ui/core/hyphenation/Hyphenation","sap/base/Log"],function(e,n,t,i){"use strict";var a=n.WrappingType;function r(e){if(!e.isA("sap.m.IHyphenation")){i.error("[UI5 Hyphenation] The given control does not implement interface sap.m.IHyphenation and can not use HyphenationSupport mixin.");return false}return true}function o(e,n){var t=e.getTextsToBeHyphenated();if(typeof t!=="object"){i.error("[UI5 Hyphenation] The result of getTextsToBeHyphenated method is not a map object.",e.getId());return false}if(Object.keys(t).indexOf(n)<0){i.error("[UI5 Hyphenation] The key "+n+" is not found in the result of getTextsToBeHyphenated method.",e.getId());return false}return true}function p(e,n){n=n||"";var t=e.childNodes;if(t.length===1&&t[0].nodeType===window.Node.TEXT_NODE){t[0].nodeValue=n}else{e.textContent=n}}function h(e,n){var t=[];Object.keys(e).forEach(function(i){if(!(i in n&&e[i]===n[i])){t.push(i)}});return t}function s(){var n=e.getConfiguration().getHyphenation(),i=t.getInstance();if(n==="native"||n==="disable"){return false}if(n==="thirdparty"){return true}return i.isLanguageSupported()&&!i.canUseNativeHyphenation()&&i.canUseThirdPartyHyphenation()}function f(n){var t=e.getConfiguration().getHyphenation();if(t==="disable"){return false}if(n.getWrapping&&!n.getWrapping()&&n.getWrappingType()===a.Hyphenated){i.warning("[UI5 Hyphenation] The property wrappingType=Hyphenated will not take effect unless wrapping=true.",n.getId())}return(!n.getWrapping||n.getWrapping())&&n.getWrappingType()===a.Hyphenated}function u(e){if(!f(e)||!s()){e._mHyphenatedTexts={};e._mUnhyphenatedTexts={};return}var n=e.getTextsToBeHyphenated(),i=h(n,e._mUnhyphenatedTexts);if(i.length>0){e._mUnhyphenatedTexts=n;i.forEach(function(n){delete e._mHyphenatedTexts[n]});var a=t.getInstance();if(!a.isLanguageInitialized()){a.initialize().then(function(){var t=e.isActive()?e.getDomRefsForHyphenatedTexts():null,r=false;i.forEach(function(i){e._mHyphenatedTexts[i]=a.hyphenate(n[i]);if(t&&i in t){p(t[i],e._mHyphenatedTexts[i])}else{r=true}});if(r){e.invalidate()}})}else{i.forEach(function(t){e._mHyphenatedTexts[t]=a.hyphenate(n[t])})}}}var y={};y.mixInto=function(e){if(!r(e)){return}var n=e.init;e.init=function(e){var t=n.apply(this,arguments);this._mHyphenatedTexts={};this._mUnhyphenatedTexts={};return t};var t=e.onBeforeRendering;e.onBeforeRendering=function(){var e=t.apply(this,arguments);u(this);return e}};y.writeHyphenationClass=function(e,n){if(!r(n)){return}if(f(n)&&!s()){e.class("sapUiHyphenation")}};y.getTextForRender=function(e,n){if(!r(e)){return null}if(!o(e,n)){return null}var t=e.getTextsToBeHyphenated();if(f(e)&&s()){if(t[n]!==e._mUnhyphenatedTexts[n]){u(e)}if(n in e._mHyphenatedTexts){return e._mHyphenatedTexts[n]}}return t[n]};return y});
//# sourceMappingURL=HyphenationSupport.js.map