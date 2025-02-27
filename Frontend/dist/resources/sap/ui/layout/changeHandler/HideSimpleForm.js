/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/JsControlTreeModifier","sap/base/Log"],function(e,t){"use strict";var r={};var n=function(e,t){var r=t.getControlType(e);return r==="sap.ui.core.Title"||r==="sap.m.Title"||r==="sap.m.Toolbar"||r==="sap.m.OverflowToolbar"};var o=function(e,t){var r;for(r=0;r<e.length;++r){if(n(e[r],t)){return e[r]}}};r.applyChange=function(e,r,i){try{var a=i.modifier;var l=i.view;var g=i.appComponent;var s=e.getDefinition();var f=a.bySelector(s.content.elementSelector||s.content.sHideId,g,l);var m=a.getAggregation(r,"content");var c=-1;var v=this._getState(r,a,g);e.setRevertData(v);a.removeAllAggregation(r,"content");for(var u=0;u<m.length;++u){a.insertAggregation(r,"content",m[u],u,l)}if(s.changeType==="hideSimpleFormField"){m.some(function(e,t){if(e===f){c=t;a.setVisible(e,false)}if(c>=0&&t>c){if(a.getControlType(e)==="sap.m.Label"||a.getControlType(e)==="sap.ui.comp.smartfield.SmartLabel"||n(e,a)){return true}else{a.setVisible(e,false)}}})}else if(s.changeType==="removeSimpleFormGroup"){var p=o(m,a);var d=p&&!f;m.some(function(e,t){if(!p){a.setVisible(e,false)}else if(d){c=0;a.setVisible(e,false);d=false}else{if(e===f){c=t}if(c>=0&&t>c){if(n(e,a)){if(c===0){a.removeAggregation(r,"content",e,l);a.insertAggregation(r,"content",e,0,l)}return true}else{a.setVisible(e,false)}}}});if(f){a.removeAggregation(r,"content",f,l);a.insertAggregation(r,"dependents",f,0,l)}}return true}catch(r){e.resetRevertData();t.error(r.message||r.name)}};r._getStableElement=function(e){if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"){return e.getTitle()||e.getToolbar()}else if(e.getMetadata().getName()==="sap.ui.layout.form.FormElement"){return e.getLabel()}else{return e}};r.completeChangeContent=function(t,r,n){var o=t.getDefinition();if(r.removedElement&&r.removedElement.id){var i=this._getStableElement(sap.ui.getCore().byId(r.removedElement.id));o.content.elementSelector=e.getSelector(i,n.appComponent);t.addDependentControl(i,"elementSelector",n)}else{throw new Error("oSpecificChangeInfo.removedElement.id attribute required")}};r._getState=function(e,t,r){var n=t.getAggregation(e,"content");return{content:n.map(function(e){return{elementSelector:t.getSelector(t.getId(e),r),visible:e.getVisible?e.getVisible():undefined,index:n.indexOf(e)}})}};r.revertChange=function(e,t,r){var n=e.getRevertData();var o=r.appComponent;var i=r.modifier;i.removeAllAggregation(t,"content");n.content.forEach(function(e){var n=i.bySelector(e.elementSelector,o,r.view);var a=i.getAggregation(t,"dependents");a.some(function(e){if(i.getProperty(e,"id")===i.getProperty(n,"id")){i.removeAggregation(t,"dependents",e,r.view);return true}});i.insertAggregation(t,"content",n,e.index,r.view);i.setProperty(n,"visible",e.visible)});e.resetRevertData();return true};r.getChangeVisualizationInfo=function(t,r){var n=t.getDefinition().content.elementSelector;var o=e.bySelector(n,r);var i=t.getChangeType()==="removeSimpleFormGroup"?o.getParent().getId():o.getParent().getParent().getId();return{affectedControls:[n],displayControls:[i]}};return r},true);
//# sourceMappingURL=HideSimpleForm.js.map