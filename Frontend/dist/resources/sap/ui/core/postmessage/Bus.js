/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/EventBus","sap/base/util/includes","sap/base/util/isPlainObject","sap/base/Log"],function(e,t,i,n){"use strict";var r;var s="______UI5______";var o=e.extend("sap.ui.core.postmessage.Bus",{constructor:function(){if(r){return r}r=this;e.apply(this,arguments);this._aAcceptedOrigins=[window.location.origin];this._aDeclinedOrigins=[];this._oPendingProcess=null;this._aEventQueue=[];this._receiver=this._receiver.bind(this);window.addEventListener("message",this._receiver)}});o.event={CONNECT:"______CONNECT______",READY:"______READY______",ACCEPTED:"______ACCEPTED______",DECLINED:"______DECLINED______"};o.prototype.destroy=function(){window.removeEventListener("message",this._receiver);this._aEventQueue=[];e.prototype.destroy.apply(this,arguments);r=undefined;this.bIsDestroyed=true};o.getInstance=function(){if(!r){r=new o}return r};o.prototype.publish=function(e){var i=e.target;var n=e.origin;var r=e.channelId;var a=e.eventId;var c=e.data;if(a===o.event.READY){if(!i){if(window.opener&&window.opener!==window){i=window.opener}else if(window.parent!==window){i=window.parent}else{return}}if(!n){n="*"}}if(typeof window==="undefined"||!(i!=null&&i===i.window)||i===window){throw TypeError("Target must be a window object and has to differ from current window")}if(typeof n!=="string"){throw TypeError("Origin must be a string")}if(typeof r!=="string"){throw TypeError("ChannelId must be a string")}if(typeof a!=="string"){throw TypeError("EventId must be a string")}if(!t([o.event.READY,o.event.ACCEPTED,o.event.DECLINED],a)&&n!=="*"&&!t(this._aAcceptedOrigins,n)){this._aAcceptedOrigins.push(n)}var d={origin:n,channelId:r,eventId:a,data:c};d[s]=true;i.postMessage(d,n)};o.prototype._callListener=function(e,t,i,n,r){e.call(t,r)};o.prototype._getText=function(e,t){return sap.ui.getCore().getLibraryResourceBundle(true).then(function(i){return i.getText(e,t)})};o.prototype._receiver=function(e){var t=e.data;if(!i(t)||!t.hasOwnProperty(s)){return}if(this._oPendingProcess){this._aEventQueue.push(e)}else{this._oPendingProcess=this._processEvent(e)}};o.prototype._processEvent=function(e){return new Promise(function(i,n){var r=e.data;var s=e.origin;if(t(this._aDeclinedOrigins,s)){i();return}switch(r.eventId){case o.event.CONNECT:{if(typeof r.data!=="string"){this.publish({target:e.source,origin:e.origin,channelId:r.channelId,eventId:o.event.DECLINED});i()}else if(t(this._aAcceptedOrigins,s)){this.publish({target:e.source,origin:e.origin,channelId:r.channelId,eventId:o.event.ACCEPTED});i()}else{sap.ui.require(["sap/ui/core/postmessage/confirmationDialog"],function(t){this._getText("PostMessage.Message",[r.data,s]).then(function(e){return t(e)}).then(function(){this.addAcceptedOrigin(s);this.publish({target:e.source,origin:e.origin,channelId:r.channelId,eventId:o.event.ACCEPTED})}.bind(this),function(){this.addDeclinedOrigin(s);this.publish({target:e.source,origin:e.origin,channelId:r.channelId,eventId:o.event.DECLINED})}.bind(this)).then(i)}.bind(this),n)}break}case o.event.ACCEPTED:case o.event.DECLINED:case o.event.READY:{e.data.data=undefined;this._emitMessage(e);i();break}default:{if(t(this._aAcceptedOrigins,s)){this._emitMessage(e)}i()}}}.bind(this)).catch(function(e){var t;var i;if(typeof e==="string"){t=e}else if(e instanceof Error){t=e.message;i=e.stack}else{t="Some unexpected error happened during post message processing"}n.error(t,i,"sap.ui.core.postmessage.Bus")}).then(function(){this._oPendingProcess=this._aEventQueue.length>0?this._processEvent(this._aEventQueue.shift()):null}.bind(this))};o.prototype._emitMessage=function(t){var i=t.data.channelId;var n=t.data.eventId;e.prototype.publish.call(this,i,n,{originalEvent:t,channelId:i,eventId:n,source:t.source,origin:t.origin,data:t.data.data})};o.prototype.getAcceptedOrigins=function(){return this._aAcceptedOrigins.slice()};o.prototype.setAcceptedOrigins=function(e){if(!Array.isArray(e)){throw new TypeError("Expected an array, but got "+typeof e)}this._aAcceptedOrigins=e.slice()};o.prototype.addAcceptedOrigin=function(e){if(typeof e!=="string"){throw new TypeError("Expected a string, but got "+typeof e)}if(!t(this._aAcceptedOrigins,e)){this._aAcceptedOrigins.push(e)}};o.prototype.resetAcceptedOrigins=function(){this.setAcceptedOrigins([])};o.prototype.getDeclinedOrigins=function(){return this._aDeclinedOrigins.slice()};o.prototype.setDeclinedOrigins=function(e){if(!Array.isArray(e)){throw new TypeError("Expected an array, but got "+typeof e)}this._aDeclinedOrigins=e.slice()};o.prototype.addDeclinedOrigin=function(e){if(typeof e!=="string"){throw new TypeError("Expected a string, but got "+typeof e)}if(!t(this._aDeclinedOrigins,e)){this._aDeclinedOrigins.push(e)}};o.prototype.resetDeclinedOrigins=function(){this.setDeclinedOrigins([])};return o});
//# sourceMappingURL=Bus.js.map