/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./View","./XMLViewRenderer","./ViewType","sap/base/util/merge","sap/ui/base/ManagedObject","sap/ui/core/XMLTemplateProcessor","sap/ui/core/Control","sap/ui/core/RenderManager","sap/ui/core/cache/CacheManager","sap/ui/model/resource/ResourceModel","sap/ui/util/XMLHelper","sap/base/strings/hash","sap/base/Log","sap/base/util/LoaderExtensions","sap/ui/performance/trace/Interaction","sap/ui/core/Core"],function(jQuery,e,t,r,n,i,o,s,a,c,u,l,p,d,f,h){"use strict";var m=a.RenderPrefixes,g="XMLViewCacheError",v={};var y=s.extend("sap.ui.core.mvc.XMLAfterRenderingNotifier",{metadata:{library:"sap.ui.core"},renderer:{apiVersion:2,render:function(e,t){e.text("")}}});var w=e.extend("sap.ui.core.mvc.XMLView",{metadata:{library:"sap.ui.core",specialSettings:{containingView:{type:"sap.ui.core.mvc.XMLView",visibility:"hidden"},xmlNode:{type:"Element",visibility:"hidden"},cache:"Object",processingMode:{type:"sap.ui.core.mvc.XMLProcessingMode",visibility:"hidden"}},designtime:"sap/ui/core/designtime/mvc/XMLView.designtime"},renderer:t});sap.ui.xmlview=function(e,t){return sap.ui.view(e,t,r.XML)};w.create=function(t){var i=n({},t);i.viewContent=i.definition;i.async=true;i.type=r.XML;return e.create(i)};w._sType=r.XML;w.asyncSupport=true;w._bUseCache=sap.ui.getCore().getConfiguration().getViewCache()&&c._isSupportedEnvironment();function C(e){if(e.parseError.errorCode!==0){var t=e.parseError;throw new Error("The following problem occurred: XML parse Error for "+t.url+" code: "+t.errorCode+" reason: "+t.reason+" src: "+t.srcText+" line: "+t.line+" linepos: "+t.linepos+" filepos: "+t.filepos)}}function P(e,t){if(!t){throw new Error("mSettings must be given")}else if(t.viewName&&t.viewContent){throw new Error("View name and view content are given. There is no point in doing this, so please decide.")}else if((t.viewName||t.viewContent)&&t.xmlNode){throw new Error("View name/content AND an XML node are given. There is no point in doing this, so please decide.")}else if(!(t.viewName||t.viewContent)&&!t.xmlNode){throw new Error("Neither view name/content nor an XML node is given. One of them is required.")}else if(t.cache&&!(t.cache.keys&&t.cache.keys.length)){throw new Error("No cache keys provided. At least one is required.")}}function M(e,t){e.mProperties["viewContent"]=t.viewContent;var r=l.parse(t.viewContent);C(r);return r.documentElement}function b(e,t){if((e._resourceBundleName||e._resourceBundleUrl)&&(!t.models||!t.models[e._resourceBundleAlias])){var r=new u({bundleName:e._resourceBundleName,bundleUrl:e._resourceBundleUrl,bundleLocale:e._resourceBundleLocale,async:t.async});var n=r.getResourceBundle();if(n instanceof Promise){return n.then(function(){e.setModel(r,e._resourceBundleAlias)})}e.setModel(r,e._resourceBundleAlias)}}function E(e){e.oAfterRenderingNotifier=new y;e.oAfterRenderingNotifier.addDelegate({onAfterRendering:function(){e.onAfterRenderingBeforeChildren()}})}function x(e){var t=sap.ui.require("sap/ui/core/Component"),r;while(e&&t){var n=t.getOwnerComponentFor(e);if(n){e=r=n}else{if(e instanceof t){r=e}e=e.getParent&&e.getParent()}}return r}function N(e,t){var r=x(e),n=r?JSON.stringify(r.getManifest()):null,i=[];i=i.concat(R(e,r),T(),L(e),t.keys);return V(e,i).then(function(e){return{key:e+"("+p(n||"")+")",componentManifest:n,additionalData:t.additionalData}})}function _(e){return e}function V(e,t){return Promise.all(t).then(function(e){e=e.filter(function(e){return e!==v});if(e.every(_)){return e.join("_")}else{var t=new Error("Provided cache keys may not be empty or undefined.");t.name=g;return Promise.reject(t)}})}function R(e,t){var r=t&&t.getMetadata().getName();return[r||window.location.host+window.location.pathname,e.getId(),sap.ui.getCore().getConfiguration().getLanguageTag()].concat(t&&t.getActiveTerminologies()||[])}function L(e){var t=e.getPreprocessors(),r=e.getPreprocessorInfo(false),n=[];function i(e){n.push(e.preprocessor.then(function(e){if(e.getCacheKey){return e.getCacheKey(r)}else{return v}}))}for(var o in t){t[o].forEach(i)}return n}function T(){return sap.ui.getVersionInfo({async:true}).then(function(e){var t="";if(!e.libraries){t=sap.ui.buildinfo.buildtime}else{e.libraries.forEach(function(e){t+=e.buildTimestamp})}return t}).catch(function(e){d.warning("sap.ui.getVersionInfo could not be retrieved","sap.ui.core.mvc.XMLView");d.debug(e);return""})}function I(e,t){var r=e.key;delete e.key;e.xml=l.serialize(t);return c.set(r,e)}function A(e){return c.get(e.key).then(function(t){if(t&&t.componentManifest==e.componentManifest){t.xml=l.parse(t.xml,"application/xml").documentElement;if(t.additionalData){n(e.additionalData,t.additionalData)}return t}})}w.prototype.initViewSettings=function(t){var r=this,i;function s(i){r._xContent=i;if(e._supportInfo){e._supportInfo({context:r._xContent,env:{caller:"view",viewinfo:n({},r),settings:n({},t||{}),type:"xmlview"}})}if(!r.isSubView()){var s={};o.parseViewAttributes(i,r,s);if(!t.async){Object.assign(t,s)}else{r.applySettings(s)}}else{delete t.controller}var a=b(r,t);if(a instanceof Promise){return a.then(function(){E(r)})}E(r)}function a(e,t){if(r.hasPreprocessor("viewxml")){return o.enrichTemplateIdsPromise(e,r,t).then(function(){return r.runPreprocessor("viewxml",e,!t)})}return e}function c(e){var t=h.notifyAsyncStep("VIEW PREPROCESSING");return r.runPreprocessor("xml",e).then(function(e){return a(e,true)}).finally(t)}function u(e){return f.loadResource(e,{async:true}).then(function(e){return e.documentElement})}function l(e,t){return u(e).then(c).then(function(e){if(t){I(t,e)}return e})}function p(e,t){return N(r,t).then(function(t){return A(t).then(function(r){if(!r){return l(e,t)}else{return r.xml}})}).catch(function(t){if(t.name===g){d.error(t.message,t.name,"sap.ui.core.mvc.XMLView");d.error("Processing the View without caching.","sap.ui.core.mvc.XMLView");return l(e)}else{return Promise.reject(t)}})}this._oContainingView=t.containingView||this;this._sProcessingMode=t.processingMode;if(this.oAsyncState){this.oAsyncState.suppressPreserve=true}P(this,t);if(t.viewName){var m=t.viewName.replace(/\./g,"/")+".view.xml";if(t.async){if(t.cache&&w._bUseCache){return p(m,t.cache).then(s)}else{return u(m).then(c).then(s)}}else{i=f.loadResource(m).documentElement}}else if(t.viewContent){if(t.viewContent.nodeType===window.Node.DOCUMENT_NODE){i=t.viewContent.documentElement}else{i=M(this,t)}}else if(t.xmlNode){i=t.xmlNode}if(t.async){return c(i).then(s)}else{i=this.runPreprocessor("xml",i,true);i=a(i,false);if(i&&typeof i.getResult==="function"){if(i.isRejected()){throw i.getResult()}i=i.getResult()}s(i)}};w.prototype.onBeforeRendering=function(){var t=this.getDomRef();if(t&&!a.isPreservedContent(t)){a.preserveContent(t,true)}e.prototype.onBeforeRendering.apply(this,arguments)};w.prototype.exit=function(){if(this.oAfterRenderingNotifier){this.oAfterRenderingNotifier.destroy()}e.prototype.exit.apply(this,arguments)};w.prototype.onControllerConnected=function(e){var t=this;function r(e){return i.runWithPreprocessors(e,{settings:t._fnSettingsPreprocessor})}if(!this.oAsyncState){this._aParsedContent=r(o.parseTemplate.bind(null,this._xContent,this))}else{var n=h.notifyAsyncStep("VIEW PROCESSING");return o.parseTemplatePromise(this._xContent,this,true,{fnRunWithPreprocessor:r}).then(function(e){t._aParsedContent=e;delete t.oAsyncState.suppressPreserve}).finally(n)}};w.prototype.getControllerName=function(){return this._controllerName};w.prototype.isSubView=function(){return this._oContainingView!=this};w.prototype.onAfterRenderingBeforeChildren=function(){if(this._$oldContent.length!==0){var e=this.getAggregation("content");if(e){for(var t=0;t<e.length;t++){var r=document.getElementById(m.Temporary+e[t].getId())||e[t].getDomRef()||document.getElementById(m.Invisible+e[t].getId());if(r){jQuery(document.getElementById(m.Dummy+e[t].getId())).replaceWith(r)}}}jQuery(document.getElementById(m.Temporary+this.getId())).replaceWith(this._$oldContent)}this._$oldContent=undefined};w.prototype._onChildRerenderedEmpty=function(e,t){jQuery(t).replaceWith('<div id="'+m.Dummy+e.getId()+'" class="sapUiHidden"></div>');return true};w.registerPreprocessor=function(t,r,n,i,o,s){var a=this.getMetadata().getClass()._sType;if(typeof n==="string"){if(n!==a){throw new TypeError("View types other than "+a+" are not supported by XMLView.registerPreprocessor,"+" check View.registerPreprocessor instead")}}else{s=o;o=i;i=n}t=t.toUpperCase();if(w.PreprocessorType[t]){e.registerPreprocessor(w.PreprocessorType[t],r,a,i,o,s)}else{d.error('Preprocessor could not be registered due to unknown sType "'+t+'"',this.getMetadata().getName())}};w.PreprocessorType={XML:"xml",VIEWXML:"viewxml",CONTROLS:"controls"};w.registerPreprocessor("xml","sap.ui.core.util.XMLPreprocessor",true,true);return w});
//# sourceMappingURL=XMLView.js.map