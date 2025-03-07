/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Interface","./Metadata","sap/base/Log"],function(t,e,n){"use strict";var a=e.createClass("sap.ui.base.Object",{constructor:function(){if(!(this instanceof a)){throw Error('Cannot instantiate object: "new" is missing!')}}});a.prototype.destroy=function(){};a.prototype.getInterface=function(){var e=new t(this,this.getMetadata().getAllPublicMethods());this.getInterface=function(){return e};return e};a.defineClass=function(t,a,r){var s=new(r||e)(t,a);var i=s.getClass();i.getMetadata=i.prototype.getMetadata=function(){return s};if(!s.isFinal()){i.extend=function(t,n,a){return e.createClass(i,t,n,a||r)}}n.debug("defined class '"+t+"'"+(s.getParent()?" as subclass of "+s.getParent().getName():""));return s};a.prototype.isA=function(t){return this.getMetadata().isA(t)};a.isA=function(t,e){return t instanceof a&&t.isA(e)};return a},true);
//# sourceMappingURL=Object.js.map