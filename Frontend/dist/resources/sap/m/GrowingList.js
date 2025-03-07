/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./List","./library","./GrowingListRenderer"],function(t,e,o){"use strict";var r=t.extend("sap.m.GrowingList",{metadata:{deprecated:true,library:"sap.m",properties:{threshold:{type:"int",group:"Misc",defaultValue:20},triggerText:{type:"string",group:"Appearance",defaultValue:null},scrollToLoad:{type:"boolean",group:"Behavior",defaultValue:false}}}});r.prototype._isIncompatible=function(){return sap.ui.getCore().getConfiguration().getCompatibilityVersion("sapMGrowingList").compareTo("1.16")>=0};r.prototype.init=function(){t.prototype.init.call(this);if(!this._isIncompatible()){this.setGrowing()}};r.prototype.setGrowing=function(){return t.prototype.setGrowing.call(this,true)};!function(t,e){["Threshold","TriggerText","ScrollToLoad"].forEach(function(o){t["set"+o]=e["setGrowing"+o];t["get"+o]=e["getGrowing"+o]})}(r.prototype,t.prototype);return r});
//# sourceMappingURL=GrowingList.js.map