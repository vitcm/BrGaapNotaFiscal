/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/base/Log","sap/ui/util/ActivityDetection","sap/ui/core/IntervalTrigger","sap/ui/thirdparty/jquery"],function(e,t,i,s,jQuery){"use strict";var r=t.getLogger("sap.ui.core.ResizeHandler",t.Level.ERROR);var n=null;var o=e.extend("sap.ui.core.ResizeHandler",{constructor:function(t){e.apply(this);n=t;this.aResizeListeners=[];this.aSuspendedDomRefs=[];this.bRegistered=false;this.mCallbacks=new Map;this.iIdCounter=0;this.fDestroyHandler=this.destroy.bind(this);jQuery(window).on("unload",this.fDestroyHandler);i.attachActivate(d,this)}});function a(){if(this.bRegistered){this.bRegistered=false;s.removeListener(this.checkSizes,this)}}function d(){if(!this.bRegistered&&this.aResizeListeners.length>0){this.bRegistered=true;s.addListener(this.checkSizes,this)}}o.prototype.destroy=function(e){i.detachActivate(d,this);jQuery(window).off("unload",this.fDestroyHandler);n=null;this.aResizeListeners=[];this.aSuspendedDomRefs=[];a.call(this)};o.prototype.attachListener=function(t,i){var s=e.isA(t,"sap.ui.core.Control"),n=t instanceof jQuery,o=s?t.getDomRef():t,a=o?o.offsetWidth:0,l=o?o.offsetHeight:0,f="rs-"+Date.now()+"-"+this.iIdCounter++,u;if(s){u="Control "+t.getId()}else if(t.id){u=t.id}else{u=String(t)}this.aResizeListeners.push({sId:f,oDomRef:s?null:t,oControl:s?t:null,bIsJQuery:n,fHandler:i,iWidth:a,iHeight:l,dbg:u});r.debug("registered "+u);d.call(this);return f};o.prototype.detachListener=function(e){var t=this.aResizeListeners;for(var i=0;i<t.length;i++){if(t[i].sId===e){t.splice(i,1);r.debug("deregistered "+e);break}}if(t.length===0){a.call(this)}};o.prototype.checkSizes=function(){var e=r.isLoggable();if(e){r.debug("checkSizes:")}this.aResizeListeners.forEach(function(t){if(t){var i=!!t.oControl,s=i?t.oControl.getDomRef():t.oDomRef;s=t.bIsJQuery?s[0]:s;if(s&&document.documentElement.contains(s)&&!this._isSuspended(s)){var n=t.iWidth,o=t.iHeight,a=s.offsetWidth,d=s.offsetHeight;if(n!=a||o!=d){t.iWidth=a;t.iHeight=d;var l=jQuery.Event("resize");l.target=s;l.currentTarget=s;l.size={width:a,height:d};l.oldSize={width:n,height:o};l.control=i?t.oControl:null;if(e){r.debug("resize detected for '"+t.dbg+"': "+l.oldSize.width+"x"+l.oldSize.height+" -> "+l.size.width+"x"+l.size.height)}t.fHandler(l)}}}},this);if(o._keepActive!=true&&o._keepActive!=false){o._keepActive=false}if(!i.isActive()&&!o._keepActive){a.call(this)}};o.register=function(e,t){if(!n||!n.oResizeHandler){return null}return n.oResizeHandler.attachListener(e,t)};o.deregister=function(e){if(!n||!n.oResizeHandler){return}n.oResizeHandler.detachListener(e)};o.deregisterAllForControl=function(e){if(!n||!n.oResizeHandler){return}n.oResizeHandler.aResizeListeners.filter(function(t){return t&&t.oControl&&t.oControl.getId()===e}).forEach(function(e){o.deregister(e.sId)})};o.suspend=function(e){if(!n||!n.oResizeHandler){return false}if(!document.documentElement.contains(e)){return false}var t=n.oResizeHandler;if(t.aSuspendedDomRefs.indexOf(e)===-1){t.aSuspendedDomRefs.push(e)}return true};o.resume=function(e){if(!n||!n.oResizeHandler){return false}var t=n.oResizeHandler,i=t.aSuspendedDomRefs.indexOf(e);if(i===-1){return false}t.aSuspendedDomRefs.splice(i,1);t.checkSizes();var s=t.mCallbacks.get(e);if(s){for(var r=0;r<s.length;r++){s[r]()}t.mCallbacks.delete(e)}return true};o.prototype._isSuspended=function(e){var t=this.aSuspendedDomRefs,i;for(var s=0;s<t.length;s++){i=t[s];if(i.contains(e)){return i}}return false};o.isSuspended=function(e,t){if(!n||!n.oResizeHandler){return false}var i=n.oResizeHandler;var s=i._isSuspended(e);if(t&&s){var r=i.mCallbacks.get(s);if(!r){r=[];i.mCallbacks.set(s,r)}if(r.indexOf(t)===-1){r.push(t)}}return!!s};return o});
//# sourceMappingURL=ResizeHandler.js.map