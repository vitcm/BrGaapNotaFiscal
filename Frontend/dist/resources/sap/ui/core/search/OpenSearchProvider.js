/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./SearchProvider","sap/base/Log","sap/base/security/encodeURL","sap/ui/thirdparty/jquery","sap/ui/core/library"],function(e,r,s,jQuery){"use strict";var t=e.extend("sap.ui.core.search.OpenSearchProvider",{metadata:{library:"sap.ui.core",properties:{suggestUrl:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},suggestType:{type:"string",group:"Misc",defaultValue:"json"}}}});t.prototype.suggest=function(e,t){var a=this.getSuggestUrl();if(!a){return}a=a.replace("{searchTerms}",s(e));var u=this.getSuggestType();var i;if(u&&u.toLowerCase()==="xml"){u="xml";i=function(r){var s=jQuery(r);var a=s.find("Text");var u=[];a.each(function(){u.push(jQuery(this).text())});t(e,u)}}else{u="json";i=function(r){t(e,r[1])}}jQuery.ajax({url:a,dataType:u,success:i,error:function(e,s,t){r.fatal("The following problem occurred: "+s,e.responseText+","+e.status)}})};return t});
//# sourceMappingURL=OpenSearchProvider.js.map