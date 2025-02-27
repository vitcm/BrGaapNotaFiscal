/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/events/ControlEvents","sap/ui/events/PseudoEvents","sap/ui/events/checkMouseEnterOrLeave","sap/ui/events/isSpecialKey","sap/ui/events/isMouseEventDelayed","sap/ui/events/F6Navigation","sap/ui/events/jquery/EventSimulation","sap/ui/events/KeyCodes","sap/base/util/defineCoupledProperty","sap/ui/events/jquery/EventExtension"],function(jQuery,e,n,s,a,t,u,i,o,r){"use strict";jQuery.sap.PseudoEvents=n.events;jQuery.sap.ControlEvents=e.events;jQuery.sap.disableTouchToMouseHandling=i.disableTouchToMouseHandling;r(jQuery.sap,"touchEventMode",i,"touchEventMode");jQuery.sap.bindAnyEvent=e.bindAnyEvent;jQuery.sap.unbindAnyEvent=e.unbindAnyEvent;jQuery.sap.checkMouseEnterOrLeave=s;jQuery.sap.isSpecialKey=function(e){if(e.key){return a(e)}function n(e){var n=e.which;return n===o.SHIFT||n===o.CONTROL||n===o.ALT||n===o.CAPS_LOCK||n===o.NUM_LOCK}function s(e){var n=e.which,s=n>=37&&n<=40;switch(e.type){case"keydown":case"keyup":return s;case"keypress":return n===0;default:return false}}var t=e.which,u=n(e)||s(e)||t>=33&&t<=36||t>=44&&t<=46||t>=112&&t<=123||t===o.BREAK||t===o.BACKSPACE||t===o.TAB||t===o.ENTER||t===o.ESCAPE||t===o.SCROLL_LOCK;switch(e.type){case"keydown":case"keyup":return u;case"keypress":return t===0||t===o.BACKSPACE||t===o.ESCAPE||t===o.ENTER||false;default:return false}};jQuery.sap.handleF6GroupNavigation=function(e,n){if(!e.key&&e.keyCode===o.F6){e.key="F6"}return u.handleF6GroupNavigation(e,n)};jQuery.sap._FASTNAVIGATIONKEY=u.fastNavigationKey;jQuery.sap._refreshMouseEventDelayedFlag=function(e){jQuery.sap.isMouseEventDelayed=t.apply(this,arguments)};jQuery.sap._refreshMouseEventDelayedFlag(navigator);return jQuery});
//# sourceMappingURL=jquery.sap.events.js.map