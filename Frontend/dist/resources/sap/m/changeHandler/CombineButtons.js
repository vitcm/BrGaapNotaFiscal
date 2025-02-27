/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/uid","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Component","sap/ui/fl/util/ManagedObjectModel"],function(e,t,n){"use strict";var r={};r.applyChange=function(e,t,n){if(n.modifier.targets!=="jsControlTree"){throw new Error("Combine buttons change can't be applied on XML tree")}var r=e.getDefinition();var o=n.modifier;var a=n.view;var i=n.appComponent;var c=o.bySelector(r.content.combineButtonSelectors[0],i,a);var g=o.getParent(c);var s;var u;var l;var d=sap.ui.getCore().getConfiguration().getRTL();var p;var m;var v=[];var b="";var f="";var C="";var I={parentAggregation:"",insertIndexes:[]};var y=[];l=r.content.combineButtonSelectors.map(function(e){return o.bySelector(e,i,a)});u=o.getParentAggregationName(l[0],g);I.parentAggregation=u;s=o.findIndexInParentAggregation(c);p=o.createControl("sap.m.Menu",i,a,r.content.menuIdSelector);l.forEach(function(e,t){var n;var c;var s=r.content.buttonsIdForSave[t];var l=o.getProperty(e,"text");c=o.createControl("sap.m.MenuItem",i,a,s);I.insertIndexes[t]=o.findIndexInParentAggregation(e);o.attachEvent(c,"press","sap.m.changeHandler.CombineButtons.pressHandler",{selector:o.getSelector(e,i),appComponentId:i.getId()});var m="$sap.m.flexibility.CombineButtonsModel";var S=o.createControl("sap.ui.fl.util.ManagedObjectModel",i,a,Object.assign({},s,{id:s.id+"-managedObjectModel"}),{object:e,name:m});o.insertAggregation(c,"dependents",S,0,a);o.bindProperty(c,"text",m+">/text");o.bindProperty(c,"icon",m+">/icon");o.bindProperty(c,"enabled",m+">/enabled");o.bindProperty(c,"visible",m+">/visible");o.bindAggregation(c,"customData",{path:m+">/customData",template:o.createControl("sap.ui.core.CustomData",i,a,Object.assign({},s,{id:s.id+"-customData"}),{key:"{ path: '"+m+">key' }",value:"{ path: '"+m+">value' }"}),templateShareable:false},a);if(l){d?v.unshift(l):v.push(l)}s.id=s.id+"-originalButtonId";n=o.createControl("sap.ui.core.CustomData",i,a,s);o.setProperty(n,"key","originalButtonId");o.setProperty(n,"value",o.getId(e));o.removeAggregation(g,u,e);o.insertAggregation(g,"dependents",e,0,a);o.insertAggregation(e,"customData",n,0,a);o.insertAggregation(p,"items",c,t,a);var m="$sap.m.flexibility.MenuButtonModel"+t;y[t]=o.createControl("sap.ui.fl.util.ManagedObjectModel",i,a,Object.assign({},s,{id:s.id+"-managedObjectModelMenuItem"}),{object:c,name:m});b=b+C+"${"+m+">/enabled}";f=f+C+"${"+m+">/visible}";C=" || "});m=o.createControl("sap.m.MenuButton",i,a,r.content.menuButtonIdSelector,{visible:"{= "+f+"}",enabled:"{= "+b+"}"});y.forEach(function(e){o.insertAggregation(m,"dependents",e,0,a)});o.setProperty(m,"text",v.join("/"));o.insertAggregation(m,"menu",p,0,a);o.insertAggregation(g,u,m,s,a);e.setRevertData(I);return true};r.revertChange=function(e,t,n){var r=n.modifier;var o=n.view;var a=e.getRevertData();var i=e.getDefinition();var c=a.parentAggregation;var g=r.bySelector(i.content.menuButtonIdSelector,n.appComponent,o);var s=r.getParent(g);var u=i.content.combineButtonSelectors.slice().reverse();var l;r.removeAggregation(s,c,g);r.destroy(g);for(var d=0,p=u.length;d<p;d++){l=r.bySelector(u[d],n.appComponent,o);r.getAggregation(l,"customData").some(function(e){if(r.getProperty(e,"key")==="originalButtonId"){r.destroy(e);return true}});r.insertAggregation(s,c,l,a.insertIndexes[p-d-1],o)}e.resetRevertData();return true};r.completeChangeContent=function(t,n,r){var o=r.modifier;var a=r.appComponent;var i=t.getDefinition();var c=n.combineElementIds;if(c&&c.length>1){t.addDependentControl(c,"combinedButtons",r);i.content.combineButtonSelectors=c.map(function(e){return o.getSelector(e,a)});i.content.menuButtonIdSelector=o.getSelector(a.createId(e()),a);i.content.menuIdSelector=o.getSelector(a.createId(e()),a);i.content.buttonsIdForSave=c.map(function(){return o.getSelector(a.createId(e()),a)})}else{throw new Error("Combine buttons action cannot be completed: oSpecificChangeInfo.combineElementIds attribute required")}};r.pressHandler=function(e,r){var o=t.bySelector(r.selector,n.get(r.appComponentId));o.firePress()};return r},true);
//# sourceMappingURL=CombineButtons.js.map