/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/ObjectPath","sap/base/assert","sap/base/Log","sap/base/util/array/uniqueSort"],function(t,e,a,s){"use strict";var r=function(a,s){e(typeof a==="string"&&a,"Metadata: sClassName must be a non-empty string");e(typeof s==="object","Metadata: oClassInfo must be empty or an object");if(!s||typeof s.metadata!=="object"){s={metadata:s||{},constructor:t.get(a)};s.metadata.__version=1}s.metadata.__version=s.metadata.__version||2;if(typeof s.constructor!=="function"){throw Error("constructor for class "+a+" must have been declared before creating metadata for it")}this._sClassName=a;this._oClass=s.constructor;this.extend(s)};r.prototype.extend=function(t){this.applySettings(t);this.afterApplySettings()};r.prototype.applySettings=function(s){var n=this,o=s.metadata,i;if(o.baseType){var p=t.get(o.baseType);if(typeof p!=="function"){a.fatal("base class '"+o.baseType+"' does not exist")}if(p.getMetadata){this._oParent=p.getMetadata();e(p===p.getMetadata().getClass(),"Metadata: oParentClass must match the class in the parent metadata")}else{this._oParent=new r(o.baseType,{})}}else{this._oParent=undefined}this._bAbstract=!!o["abstract"];this._bFinal=!!o["final"];this._sStereotype=o.stereotype||(this._oParent?this._oParent._sStereotype:"object");this._bDeprecated=!!o["deprecated"];this._aInterfaces=o.interfaces||[];this._aPublicMethods=o.publicMethods||[];this._bInterfacesUnique=false;i=this._oClass.prototype;for(var c in s){if(c!=="metadata"&&c!=="constructor"){i[c]=s[c];if(!c.match(/^_|^on|^init$|^exit$/)){n._aPublicMethods.push(c)}}}};r.prototype.afterApplySettings=function(){if(this._oParent){this._aAllPublicMethods=this._oParent._aAllPublicMethods.concat(this._aPublicMethods);this._bInterfacesUnique=false}else{this._aAllPublicMethods=this._aPublicMethods}};r.prototype.getStereotype=function(){return this._sStereotype};r.prototype.getName=function(){return this._sClassName};r.prototype.getClass=function(){return this._oClass};r.prototype.getParent=function(){return this._oParent};r.prototype._dedupInterfaces=function(){if(!this._bInterfacesUnique){s(this._aInterfaces);s(this._aPublicMethods);s(this._aAllPublicMethods);this._bInterfacesUnique=true}};r.prototype.getPublicMethods=function(){this._dedupInterfaces();return this._aPublicMethods};r.prototype.getAllPublicMethods=function(){this._dedupInterfaces();return this._aAllPublicMethods};r.prototype.getInterfaces=function(){this._dedupInterfaces();return this._aInterfaces};r.prototype.isInstanceOf=function(t){if(this._oParent){if(this._oParent.isInstanceOf(t)){return true}}var e=this._aInterfaces;for(var a=0,s=e.length;a<s;a++){if(e[a]===t){return true}}return false};Object.defineProperty(r.prototype,"_mImplementedTypes",{get:function(){if(this===r.prototype){throw new Error("sap.ui.base.Metadata: The '_mImplementedTypes' property must not be accessed on the prototype")}var t=Object.create(this._oParent?this._oParent._mImplementedTypes:null);t[this._sClassName]=true;var e=this._aInterfaces,a=e.length;while(a-- >0){if(!t[e[a]]){t[e[a]]=true}}Object.defineProperty(this,"_mImplementedTypes",{value:Object.freeze(t),writable:false,configurable:false});return t},configurable:true});r.prototype.isA=function(t){var e=this._mImplementedTypes;if(Array.isArray(t)){for(var a=0;a<t.length;a++){if(t[a]in e){return true}}return false}return t in e};r.prototype.isAbstract=function(){return this._bAbstract};r.prototype.isFinal=function(){return this._bFinal};r.prototype.isDeprecated=function(){return this._bDeprecated};r.prototype.addPublicMethods=function(t){var e=t instanceof Array?t:arguments;Array.prototype.push.apply(this._aPublicMethods,e);Array.prototype.push.apply(this._aAllPublicMethods,e);this._bInterfacesUnique=false};r.createClass=function(s,n,o,i){if(typeof s==="string"){i=o;o=n;n=s;s=null}e(!s||typeof s==="function");e(typeof n==="string"&&!!n);e(!o||typeof o==="object");e(!i||typeof i==="function");i=i||r;if(typeof i.preprocessClassInfo==="function"){o=i.preprocessClassInfo(o)}o=o||{};o.metadata=o.metadata||{};if(!o.hasOwnProperty("constructor")){o.constructor=undefined}var p=o.constructor;e(!p||typeof p==="function");if(s){if(!p){if(o.metadata.deprecated){p=function(){a.warning("Usage of deprecated class: "+n);s.apply(this,arguments)}}else{p=function(){s.apply(this,arguments)}}}p.prototype=Object.create(s.prototype);p.prototype.constructor=p;o.metadata.baseType=s.getMetadata().getName()}else{p=p||function(){};delete o.metadata.baseType}o.constructor=p;t.set(n,p);var c=new i(n,o);p.getMetadata=p.prototype.getMetadata=function(){return c};if(!p.getMetadata().isFinal()){p.extend=function(t,e,a){return r.createClass(p,t,e,a||i)}}return p};return r},true);
//# sourceMappingURL=Metadata.js.map