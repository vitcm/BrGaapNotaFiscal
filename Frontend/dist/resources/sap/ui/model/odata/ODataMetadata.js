/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_ODataMetaModelUtils","sap/base/assert","sap/base/Log","sap/base/util/each","sap/base/util/extend","sap/base/util/isEmptyObject","sap/base/util/uid","sap/ui/base/EventProvider","sap/ui/core/cache/CacheManager","sap/ui/thirdparty/datajs"],function(t,e,i,n,a,r,s,o,p,f){"use strict";var y="sap.ui.model.odata.ODataMetadata",h="http://www.sap.com/Protocols/SAPData";var u=o.extend("sap.ui.model.odata.ODataMetadata",{constructor:function(t,e){o.apply(this,arguments);this.bLoaded=false;this.bFailed=false;this.mEntityTypes={};this.mRequestHandles={};this.sUrl=t;this.bAsync=e.async;this.sUser=e.user;this.bWithCredentials=e.withCredentials;this.sPassword=e.password;this.mHeaders=e.headers;this.sCacheKey=e.cacheKey;this.oLoadEvent=null;this.oFailedEvent=null;this.oMetadata=null;this.bMessageScopeSupported=false;this.mNamespaces=e.namespaces||{sap:"http://www.sap.com/Protocols/SAPData",m:"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata","":"http://schemas.microsoft.com/ado/2007/06/edmx"};var n=this;this.pLoadedWithReject=new Promise(function(t,e){n.fnResolve=t;n.fnReject=e});this.pLoaded=this.pLoadedWithReject.catch(function(t){return new Promise(function(t,e){n.fnResolve=t})});function a(t){p.set(n.sCacheKey,JSON.stringify({metadata:n.oMetadata,params:t}))}function r(t){i.error("[ODataMetadata] initial loading of metadata failed");if(t&&t.message){i.error("Error: "+t.message)}}if(this.sCacheKey){p.get(this.sCacheKey).then(function(t){if(t){var e=JSON.parse(t);this.oMetadata=e.metadata;this._handleLoaded(this.oMetadata,e.params,false)}else{this._loadMetadata().then(a).catch(r)}}.bind(this)).catch(r)}else{this._loadMetadata().catch(r)}},metadata:{publicMethods:["getServiceMetadata","attachFailed","detachFailed","attachLoaded","detachLoaded","refresh"]}});u._returnsCollection=function(t){if(t&&t.returnType&&t.returnType.startsWith("Collection(")){return true}return false};u.prototype._setNamespaces=function(t){this.mNamespaces=t};u.prototype._handleLoaded=function(t,e,i){var n=[];this.oMetadata=this.oMetadata?this.merge(this.oMetadata,t,n):t;this.oRequestHandle=null;e.entitySets=n;this.fnResolve(e);if(this.bAsync&&!i){this.fireLoaded(this)}else if(!this.bAsync&&!i){this.bLoaded=true;this.bFailed=false;this.oLoadEvent=setTimeout(this.fireLoaded.bind(this,e),0)}};u.prototype._loadMetadata=function(t,e){var i=this;t=t||this.sUrl;var n=this._createRequest(t);return new Promise(function(t,a){var r;function o(a,r){if(!a||!a.dataServices){var s={message:"Invalid metadata document",request:n,response:r};p(s);return}i.sMetadataBody=r.body;i.oRequestHandle=null;var o={metadataString:i.sMetadataBody};var f=r.headers["Last-Modified"];if(f){o.lastModified=f}var y=r.headers["eTag"];if(y){o.eTag=y}i._handleLoaded(a,o,e);t(o)}function p(t){var n={message:t.message,request:t.request,response:t.response};if(t.response){n.statusCode=t.response.statusCode;n.statusText=t.response.statusText;n.responseText=t.response.body}if(r&&r.bSuppressErrorHandlerCall){return}if(i.bAsync){delete i.mRequestHandles[r.id]}a(n);i.fnReject(n);if(i.bAsync&&!e){i.fireFailed(n)}else if(!i.bAsync&&!e){i.bFailed=true;i.oFailedEvent=setTimeout(i.fireFailed.bind(i,n),0)}}r=f.request(n,o,p,f.metadataHandler);if(i.bAsync){r.id=s();i.mRequestHandles[r.id]=r}})};u.prototype.refresh=function(){return this._loadMetadata()};u.prototype.getServiceMetadata=function(){return this.oMetadata};u.prototype.isLoaded=function(){return this.bLoaded};u.prototype.loaded=function(t){return t?this.pLoadedWithReject:this.pLoaded};u.prototype.isFailed=function(){return this.bFailed};u.prototype.fireLoaded=function(t){this.bLoaded=true;this.bFailed=false;this.fireEvent("loaded",t);i.debug(this+" - loaded was fired");return this};u.prototype.attachLoaded=function(t,e,i){this.attachEvent("loaded",t,e,i);return this};u.prototype.detachLoaded=function(t,e){this.detachEvent("loaded",t,e);return this};u.prototype.fireFailed=function(t){this.bFailed=true;this.fireEvent("failed",t);return this};u.prototype.attachFailed=function(t,e,i){this.attachEvent("failed",t,e,i);return this};u.prototype.detachFailed=function(t,e){this.detachEvent("failed",t,e);return this};u.prototype._getEntityAssociationEnd=function(e,i){var n;if(!this._checkMetadataLoaded()){return null}this._mGetEntityAssociationEndCache=this._mGetEntityAssociationEndCache||{};n=e.namespace+"."+e.name+"/"+i;if(this._mGetEntityAssociationEndCache[n]===undefined){var a=e?t.findObject(e.navigationProperty,i):null,r=a?t.getObject(this.oMetadata.dataServices.schema,"association",a.relationship):null,s=r?t.findObject(r.end,a.toRole,"role"):null;this._mGetEntityAssociationEndCache[n]=s}return this._mGetEntityAssociationEndCache[n]};function c(t){var e={};for(var i=0;i<t.length;i++){var n=t[i];if(n.entityContainer){for(var a=0;a<n.entityContainer.length;a++){var r=n.entityContainer[a];if(r.entitySet){for(var s=0;s<r.entitySet.length;s++){if(r.entitySet[s].name!=null){e[r.entitySet[s].name]=r.entitySet[s]}}}}}}return e}u.prototype._findEntitySetByName=function(t){if(!this.mEntitySets){this.mEntitySets=c(this.oMetadata.dataServices.schema)}return this.mEntitySets[t]};u.prototype._getEntityTypeByPath=function(t){if(!t){e(undefined,"sPath not defined!");return null}if(this.mEntityTypes[t]){return this.mEntityTypes[t]}if(!this._checkMetadataLoaded()){return null}var i=t.replace(/^\/|\/$/g,""),n=i.split("/"),a=n.length,r,s,o,p,f=this;if(n[0].indexOf("(")!=-1){n[0]=n[0].substring(0,n[0].indexOf("("))}if(a>1){r=f._getEntityTypeByPath(n[0]);for(var y=1;y<n.length;y++){if(r){if(n[y].indexOf("(")!=-1){n[y]=n[y].substring(0,n[y].indexOf("("))}p=f._getEntityTypeByNavProperty(r,n[y]);if(p){r=p}o=r}}}else{s=this._splitName(this._getEntityTypeName(n[0]));o=this._getObjectMetadata("entityType",s.name,s.namespace);if(o){o.entityType=this._getEntityTypeName(n[0])}}if(!o){var h=n[n.length-1];var u=this._getFunctionImportMetadata(h,"GET");if(!u){u=this._getFunctionImportMetadata(h,"POST")}if(u&&u.entitySet){o=Object.assign({},this._getEntityTypeByPath(u.entitySet));if(o){o.entityType=this._getEntityTypeName(u.entitySet);o.isFunction=true}}}if(o){this.mEntityTypes[t]=o}return o};u.prototype._getEntityTypeByName=function(t){var i,a=this,r,s,o;if(!t){e(undefined,"sName not defined!");return null}o=this._splitName(t);s=o.namespace;r=o.name;if(!this._checkMetadataLoaded()){return null}if(this.mEntityTypes[t]){i=this.mEntityTypes[t]}else{n(this.oMetadata.dataServices.schema,function(e,o){if(o.entityType&&(!s||o.namespace===s)){n(o.entityType,function(e,n){if(n.name===r){i=n;a.mEntityTypes[t]=i;i.namespace=o.namespace;return false}})}})}return i};u.prototype._checkMetadataLoaded=function(){if(!this.oMetadata||r(this.oMetadata)){e(undefined,"No metadata loaded!");return false}return true};u.prototype._getAnnotation=function(t){var i,n,a,r,s,o,p;n=t.split("/#");r=n[1].split("/");if(!n[0]){s=this._getEntityTypeByName(r[0]);e(s,r[0]+" is not a valid EntityType");if(!s){return}o=n[1].substr(n[1].indexOf("/")+1);p=this._getPropertyMetadata(s,o);e(p,o+" is not a valid property path");if(!p){return}a=o.substr(o.indexOf(p.name));a=a.substr(a.indexOf("/")+1)}else{s=this._getEntityTypeByPath(n[0]);e(s,n[0]+" is not a valid path");if(!s){return}t=n[0].replace(/^\/|\/$/g,"");o=t;while(!p&&o.indexOf("/")>0){o=o.substr(o.indexOf("/")+1);p=this._getPropertyMetadata(s,o)}e(p,o+" is not a valid property path");if(!p){return}a=r.join("/")}i=this._getAnnotationObject(s,p,a);return i};u.prototype._getAnnotationObject=function(t,e,i){var n,a,r,s,o;if(!e){return}s=e;a=i.split("/");if(a[0].indexOf(".")>-1){return this._getV4AnnotationObject(t,e,a)}else{if(a.length>1){s=s[a[0]];if(!s&&e.extensions){for(var p=0;p<e.extensions.length;p++){var f=e.extensions[p];if(f.name==a[0]){s=f;break}}}i=a.splice(0,1);r=this._getAnnotationObject(t,s,a.join("/"))}else{if(a[0].indexOf("@")>-1){o=a[0].substr(1);n=o.split(":");r=s[n[0]];if(!r&&s.extensions){for(var p=0;p<s.extensions.length;p++){var f=s.extensions[p];if(f.name===n[1]&&f.namespace===this.mNamespaces[n[0]]){r=f.value;break}}}}else{n=a[0].split(":");r=s[n[0]];r=s[a[0]];if(!r&&s.extensions){for(var p=0;p<s.extensions.length;p++){var f=s.extensions[p];if(f.name===n[1]&&f.namespace===this.mNamespaces[n[0]]){r=f;break}}}}}}return r};u.prototype._getV4AnnotationObject=function(t,i,a){var r,s=[];if(a.length>1){e(a.length==1,"'"+a.join("/")+"' is not a valid annotation path");return}var o=t.namespace?t.namespace+".":"";o+=t.name+"/"+i.name;n(this.oMetadata.dataServices.schema,function(t,e){if(e.annotations){n(e.annotations,function(t,e){if(e.target===o&&!e.qualifier){s.push(e.annotation);return false}})}});if(s){n(s,function(t,e){n(e,function(t,e){if(e.term===a[0]){r=e}})})}return r};u.prototype._splitName=function(t){var e={};if(t){var i=t.lastIndexOf(".");e.name=t.substr(i+1);e.namespace=t.substr(0,i)}return e};u.prototype._getEntityTypeName=function(t){var e,i;if(t){i=this._findEntitySetByName(t);if(i){e=i.entityType}}return e};u.prototype._getObjectMetadata=function(t,e,i){var a;if(e&&i){n(this.oMetadata.dataServices.schema,function(r,s){if(s[t]&&s.namespace===i){n(s[t],function(t,i){if(i.name===e){a=i;a.namespace=s.namespace;return false}});return!a}})}return a};u.prototype.getUseBatch=function(){var t=false;n(this.oMetadata.dataServices.schema,function(e,i){if(i.entityContainer){n(i.entityContainer,function(e,i){if(i.extensions){n(i.extensions,function(e,i){if(i.name==="use-batch"&&i.namespace==="http://www.sap.com/Protocols/SAPData"){t=typeof i.value==="string"?i.value.toLowerCase()==="true":!!i.value;return false}})}})}});return t};u.prototype._getFunctionImportMetadataIterate=function(t,e){var i=[];n(this.oMetadata.dataServices.schema,function(a,r){if(r["entityContainer"]){n(r["entityContainer"],function(a,r){if(r["functionImport"]){n(r["functionImport"],function(n,a){if(t(a)){i.push(a);if(e){return false}}})}return!(e&&i.length===1)})}return!(e&&i.length===1)});return i};u.prototype._getFirstMatchingFunctionImportMetadata=function(t){var e=this._getFunctionImportMetadataIterate(t,true);return e.length===1?e[0]:null};u.prototype._getFunctionImportMetadataByName=function(t){if(t.indexOf("/")>-1){t=t.substr(t.indexOf("/")+1)}return this._getFunctionImportMetadataIterate(function(e){return e.name===t})};u.prototype._getFunctionImportMetadata=function(t,e){if(t.indexOf("/")>-1){t=t.substr(t.indexOf("/")+1)}return this._getFirstMatchingFunctionImportMetadata(function(i){return i.name===t&&i.httpMethod===e})};u.prototype._getEntityTypeByNavProperty=function(t,e){if(!t.navigationProperty){return undefined}for(var i=0;i<t.navigationProperty.length;++i){var n=t.navigationProperty[i];if(n.name===e){return this._getEntityTypeByNavPropertyObject(n)}}return undefined};u.prototype._getEntityTypeByNavPropertyObject=function(t){var e;var i=this._splitName(t.relationship);var n=this._getObjectMetadata("association",i.name,i.namespace);if(n){var a=n.end[0];if(a.role!==t.toRole){a=n.end[1]}var r=this._splitName(a.type);e=this._getObjectMetadata("entityType",r.name,r.namespace);if(e){e.entityType=a.type}}return e};u.prototype._getNavigationPropertyNames=function(t){var e=[];if(t.navigationProperty){n(t.navigationProperty,function(t,i){e.push(i.name)})}return e};u.prototype._getNavPropertyRefInfo=function(t,e){var i,a,r,s,o,p,f,y,h,u,c,d=this;n(t.navigationProperty,function(n,l){r=d._splitName(l.relationship);a=d._getObjectMetadata("association",r.name,r.namespace);if(!a||!a.referentialConstraint){return}p=a.referentialConstraint.dependent;h=a.end.find(function(t){return t.role===p.role});if(h.type!==t.namespace+"."+t.name){return}f=p.propertyRef.some(function(t){return t.name===e});if(!f){return}o=a.referentialConstraint.principal;y=o.role;s=d._getAssociationSetByAssociation(l.relationship);h=s.end.find(function(t){return t.role===y});u=h.entitySet;c=o.propertyRef.map(function(t){return t.name});i={name:l.name,entitySet:u,keys:c}});return i};u.prototype._getPropertyMetadata=function(t,e){var i,a=this;if(!t){return}e=e.replace(/^\/|\/$/g,"");var r=e.split("/");n(t.property,function(t,e){if(e.name===r[0]){i=e;return false}});if(r.length>1){if(!i){while(t&&r.length>1){t=this._getEntityTypeByNavProperty(t,r[0]);r.shift()}if(t){i=a._getPropertyMetadata(t,r[0])}}else if(!i.type.toLowerCase().startsWith("edm.")){var s=this._splitName(i.type);i=this._getPropertyMetadata(this._getObjectMetadata("complexType",s.name,s.namespace),r[1])}}return i};u.prototype.destroy=function(){delete this.oMetadata;var t=this;n(this.mRequestHandles,function(e,i){i.bSuppressErrorHandlerCall=true;i.abort();delete t.mRequestHandles[e]});if(this.oLoadEvent){clearTimeout(this.oLoadEvent)}if(this.oFailedEvent){clearTimeout(this.oFailedEvent)}o.prototype.destroy.apply(this,arguments)};u.prototype._fillElementCaches=function(){var t=this;if(this._entitySetMap||!this._checkMetadataLoaded()){return}this._entitySetMap={};this.oMetadata.dataServices.schema.forEach(function(e){(e.entityContainer||[]).forEach(function(e){(e.entitySet||[]).forEach(function(e){var i=t._getEntityTypeByName(e.entityType);i.__navigationPropertiesMap={};(i.navigationProperty||[]).forEach(function(t){i.__navigationPropertiesMap[t.name]=t});e.__entityType=i;t._entitySetMap[e.entityType]=e})})})};u.prototype._createRequest=function(t){var e={"sap-cancel-on-close":true},i={"Accept-Language":sap.ui.getCore().getConfiguration().getLanguageTag()};a(e,this.mHeaders,i);var n={headers:e,requestUri:t,method:"GET",user:this.sUser,password:this.sPassword,async:this.bAsync};if(this.bAsync){n.withCredentials=this.bWithCredentials}return n};u.prototype._getEntitySetByPath=function(t){var e;this._fillElementCaches();e=this._getEntityTypeByPath(t);if(e){return this._entitySetMap[e.entityType]}};u.prototype._addUrl=function(t){var e=[].concat(t);return Promise.all(e.map(function(t){return this._loadMetadata(t,true)},this))};u.prototype.merge=function(t,e,i){var a=this;if(this.mEntitySets){delete this.mEntitySets}n(t.dataServices.schema,function(t,r){n(e.dataServices.schema,function(t,e){if(e.namespace===r.namespace){if(e.entityType){if(!a.mEntityTypeNames){a.mEntityTypeNames={};r.entityType.map(function(t){a.mEntityTypeNames[t.name]=true})}r.entityType=!r.entityType?[]:r.entityType;for(var s=0;s<e.entityType.length;s++){if(!(e.entityType[s].name in a.mEntityTypeNames)){r.entityType.push(e.entityType[s]);a.mEntityTypeNames[e.entityType[s].name]=true}}}if(r.entityContainer&&e.entityContainer){n(r.entityContainer,function(t,r){n(e.entityContainer,function(t,e){if(e.entitySet){if(e.name===r.name){if(!a.mEntitySetNames){a.mEntitySetNames={};r.entitySet.map(function(t){a.mEntitySetNames[t.name]=true})}r.entitySet=!r.entitySet?[]:r.entitySet;for(var n=0;n<e.entitySet.length;n++){if(!(e.entitySet[n].name in a.mEntitySetNames)){r.entitySet.push(e.entitySet[n]);a.mEntitySetNames[e.entitySet[n].name]=true}}e.entitySet.forEach(function(t){i.push(t)})}}})})}if(e.annotations){r.annotations=!r.annotations?[]:r.annotations;r.annotations=r.annotations.concat(e.annotations)}}})});return t};u.prototype._getEntitySetByType=function(t){var e=t.namespace+"."+t.name;var i=this.oMetadata.dataServices.schema;for(var n=0;n<i.length;++n){var a=i[n].entityContainer;if(a){for(var r=0;r<a.length;++r){var s=a[r].entitySet;if(s){for(var o=0;o<s.length;++o){if(s[o].entityType===e){return s[o]}}}}}}return null};u.prototype._calculateCanonicalPath=function(t){var e,i,n,a;if(t){i=t.lastIndexOf(")");if(i!==-1){a=t.substr(0,i+1);var r=this._getEntitySetByPath(a);if(r){if(r.__entityType.isFunction){e=t}else{n=t.split("/");if(a==="/"+n[1]){if(!(n[2]in r.__entityType.__navigationPropertiesMap)){e=t}}else{n=a.split("/");a="/"+r.name+n[n.length-1].substr(n[n.length-1].indexOf("("))+t.substr(i+1);if(a!==t){e=a}}}}}}return e};u.prototype._getAssociationSetByAssociation=function(t){var e=this.oMetadata.dataServices.schema;for(var i=0;i<e.length;++i){var n=e[i].entityContainer;if(n){for(var a=0;a<n.length;++a){var r=n[a].associationSet;if(r){for(var s=0;s<r.length;++s){if(r[s].association===t){return r[s]}}}}}}return null};u.prototype._isMessageScopeSupported=function(){var t=this.oMetadata.dataServices.schema,e,i;if(!this.bMessageScopeSupported&&t){for(var n=0;n<t.length;++n){i=t[n].entityContainer;if(i){for(var a=0;a<i.length;++a){e=i[a];if(e.extensions&&Array.isArray(e.extensions)){for(var r=0;r<e.extensions.length;++r){if(e.extensions[r].name==="message-scope-supported"&&e.extensions[r].namespace===this.mNamespaces.sap){if(e.extensions[r].value==="true"){this.bMessageScopeSupported=true;break}}}}}}}}return this.bMessageScopeSupported};u.prototype._isCollection=function(t){var e=false;var i=t.lastIndexOf("/");if(i>0){var n=t.substring(0,i);var a=this._getEntityTypeByPath(n);if(a){var r=this._getEntityAssociationEnd(a,t.substring(i+1));if(r&&r.multiplicity==="*"){e=true}}}else{e=true}return e};u.prototype._getReducedPath=function(t){var e,i,n,a,r,s,o,p=t.split("/"),f;if(p.length<4){return t}this._fillElementCaches();for(i=1;i<p.length-2;i+=1){f=this._getEntityTypeByPath(p.slice(0,i+1).join("/"));r=f&&f.__navigationPropertiesMap[p[i+1].split("(")[0]];if(!r){continue}o=p[i+2].split("(")[0];a=this._getEntityTypeByNavPropertyObject(r);s=a&&a.__navigationPropertiesMap[o];if(!s||r.relationship!==s.relationship){continue}n=p[i+2].slice(o.length);e=this._getEntityAssociationEnd(a,o);if(e.multiplicity!=="*"||n&&p[i].endsWith(n)){p.splice(i+1,2);return this._getReducedPath(p.join("/"))}}return p.join("/")};u.prototype.getKeyPropertyNamesByPath=function(t){var e,i,n=t.lastIndexOf("/");if(n>0){i=this._getEntityTypeByPath(t.slice(0,n));if(i){e=this._getEntityAssociationEnd(i,t.slice(n+1).split("(")[0]);i=e?this._getEntityTypeByName(e.type):undefined}}else{i=this._getEntityTypeByPath(t)}if(i){return i.key.propertyRef.map(function(t){return t.name})}};u.prototype._getCanonicalPathOfFunctionImport=function(t,e){var n,a,r,s,o,p,f,h=t.extensions,c=t.returnType,d="",l=false;if(h){for(s=0;s<h.length;s+=1){if(h[s].name==="action-for"){n=h[s].value;break}}}if(u._returnsCollection(t)){l=true;c=c.slice(11,-1)}if(n){r=this._getEntityTypeByName(n)}else if(t.entitySet){r=this._getEntityTypeByPath(t.entitySet)}else if(c){r=this._getEntityTypeByName(c)}if(r){a=this._getEntitySetByType(r);if(a&&r.key&&r.key.propertyRef){if(l){return"/"+a.name}f=r.key.propertyRef;if(f.length===1){p=f[0].name;if(e[p]){d=e[p]}}else{o=[];for(s=0;s<f.length;s+=1){p=f[s].name;if(e[p]){o.push(p+"="+e[p])}}d=o.join(",")}return"/"+a.name+"("+d+")"}else if(!a){i.error("Cannot determine path of the entity set for the function import '"+t.name+"'",this,y)}else{i.error("Cannot determine keys of the entity type '"+r.entityType+"' for the function import '"+t.name+"'",this,y)}}return""};u.prototype._splitByLastNavigationProperty=function(t){var e,i,n,a,r,s=t.split("/"),o="/"+s[1],p=s.length;this._fillElementCaches();e=this._getEntityTypeByPath(o);for(i=2;i<p;i+=1){r=s[i];n=r.indexOf("(");if(n!==-1){r=r.slice(0,n)}if(e&&e.__navigationPropertiesMap[r]){a=i;e=this._getEntityTypeByNavProperty(e,r)}else{break}}if(a===undefined){return{pathBeforeLastNavigationProperty:t,lastNavigationProperty:"",addressable:true,pathAfterLastNavigationProperty:""}}return{pathBeforeLastNavigationProperty:s.slice(0,a).join("/"),lastNavigationProperty:"/"+s[a],addressable:this._isAddressable(e),pathAfterLastNavigationProperty:a+1>=p?"":"/"+s.slice(a+1).join("/")}};u.prototype._isAddressable=function(t){var e;if(!t){return true}e=this._entitySetMap[t.entityType];if(!e||!e.extensions){return true}return!e.extensions.some(function(t){return t.name==="addressable"&&t.namespace===h&&t.value==="false"})};return u});
//# sourceMappingURL=ODataMetadata.js.map