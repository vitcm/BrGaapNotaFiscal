/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/semantic/SemanticButton","sap/ui/events/KeyCodes","sap/m/ToggleButton","sap/m/semantic/SemanticOverflowToolbarToggleButton"],function(e,t,s,r){"use strict";var o=e.extend("sap.m.semantic.SemanticToggleButton",{metadata:{library:"sap.m",abstract:true,properties:{pressed:{type:"boolean",group:"Data",defaultValue:false}}}});o.prototype._getClass=function(e){return e&&e.constraints==="IconOnly"?r:s};o.prototype._onPress=function(e){var t;if(this.getEnabled()){t=e.getParameter("pressed");this.setPressed(t);this.firePress({pressed:t})}};o.prototype._applyProperty=function(t,s,r){if(t==="pressed"){this._setPressed(s,r)}else{e.prototype._applyProperty.apply(this,arguments)}};o.prototype._setPressed=function(e,t){var s=this._getControl(),r=Boolean(e);if(s.getPressed()!==r){this._getControl().setPressed(r,t)}};o.prototype._createInstance=function(e){var t=new e({id:this.getId()+"-toggleButton"});t.attachEvent("press",this._onPress,this);return t};return o});
//# sourceMappingURL=SemanticToggleButton.js.map