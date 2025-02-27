/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/sinon","sap/ui/test/autowaiter/_utils","./WaiterBase"],function(t,e,r){"use strict";var n=[];var a=r.extend("sap.ui.test.autowaiter._XHRWaiter",{hasPending:function(){var t=n.length>0;if(t){y()}return t}});var s=new a;var i=t.useFakeXMLHttpRequest;t.useFakeXMLHttpRequest=function(){var t=i.apply(this,arguments);u();return t};function u(){var t=XMLHttpRequest.restore;if(t){XMLHttpRequest.restore=function(){var e=t.apply(this,arguments);n=v();return e}}}u();var o=t.FakeXMLHttpRequest.prototype.open;t.FakeXMLHttpRequest.prototype.open=function(){return o.apply(this,f.apply(this,arguments))};var p=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(){return p.apply(this,f.apply(this,arguments))};var h=t.FakeXMLHttpRequest.prototype.send;t.FakeXMLHttpRequest.prototype.send=function(){d.call(this,true);return h.apply(this,arguments)};var c=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(){d.call(this);return c.apply(this,arguments)};function f(t,e,r){var n="XHR_WAITER_IGNORE:";this.url=e;this.method=t;this.async=r;if(t.startsWith(n)){var a=t.substring(n.length);arguments[0]=a;this.method=a;this.ignored=true}return arguments}function d(t){if(this.ignored){return}var r={url:this.url,method:this.method,async:this.async,fake:t,trace:e.resolveStackTrace()};var a=l(r);if(this.async){n.push(r);s._oLogger.trace("New pending:"+a);this.addEventListener("readystatechange",function(){if(this.readyState===4){n.splice(n.indexOf(r),1);s._oLogger.trace("Finished:"+a)}})}else{s._oLogger.trace("Finished:"+a)}}function l(t){var e=t.fake?"\nFakeXHR: ":"\nXHR: ";e+="URL: '"+t.url+"' Method: '"+t.method+"' Async: '"+t.async+"'\nStack: "+t.trace;return e}function y(){var t=v(true).length;var e="There are "+(n.length-t)+" open XHRs and "+t+" open FakeXHRs.";n.forEach(function(t){e+=l(t)});s._oHasPendingLogger.debug(e)}function v(t){return n.filter(function(e){return t?e.fake:!e.fake})}return s},true);
//# sourceMappingURL=_XHRWaiter.js.map