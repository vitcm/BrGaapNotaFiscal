/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(t){"use strict";return{display:function(t){var e;if(this._oParent){e=this._oParent.display(t)}return this._place(e,t)},suspend:function(){return this},_place:function(e,o){var i=this._oOptions;e=e||{};var r,n=e.oTargetControl,a=e.oTargetParent;if(!this._isValid(e,true)){return undefined}if(!a&&i.rootView){a=sap.ui.getCore().byId(i.rootView);if(!a){t.error("Did not find the root view with the id "+i.rootView,this);return undefined}}if(i.controlId){if(a){n=a.byId(i.controlId)}if(!n){n=sap.ui.getCore().byId(i.controlId)}if(!n){t.error("Control with ID "+i.controlId+" could not be found",this);return undefined}}var d=n.getMetadata().getJSONKeys()[i.controlAggregation];if(!d){t.error("Control "+i.controlId+" does not have an aggregation called "+i.controlAggregation,this);return undefined}var s=this._getEffectiveObjectName(i.viewName);var g={name:s,type:i.viewType,id:i.viewId};r=this._oCache._get(g,"View",this._bUseRawViewId);this._beforePlacingViewIntoContainer({container:n,view:r,data:o});this._bindTitleInTitleProvider(r);this._addTitleProviderAsDependent(r);if(i.clearControlAggregation===true){n[d._sRemoveAllMutator]()}t.info("Did place the view '"+s+"' with the id '"+r.getId()+"' into the aggregation '"+i.controlAggregation+"' of a control with the id '"+n.getId()+"'",this);n[d._sMutator](r);this.fireDisplay({view:r,control:n,config:this._oOptions,data:o});return{oTargetParent:r,oTargetControl:n}},_isValid:function(e,o){var i=this._oOptions,r=e&&e.oTargetControl,n=r||i.controlId,a=true,d="";if(!n){d="The target "+i._name+" has no controlId set and no parent so the target cannot be displayed.";a=false}if(!i.controlAggregation){d="The target "+i._name+" has a control id or a parent but no 'controlAggregation' was set, so the target could not be displayed.";a=false}if(!i.viewName){d="The target "+i._name+" no viewName defined.";a=false}if(o&&d){t.error(d,this)}return a}}});
//# sourceMappingURL=Target.js.map