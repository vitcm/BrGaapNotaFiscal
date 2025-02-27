/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBase","./library","sap/ui/core/IconPool","sap/ui/core/library","./MenuListItemRenderer"],function(e,t,i,r,a){"use strict";var s=r.TextDirection;var o=t.ListType;var n=e.extend("sap.m.MenuListItem",{metadata:{library:"sap.m",properties:{enabled:{type:"boolean",group:"Misc",defaultValue:true},title:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},titleTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:s.Inherit},startsSection:{type:"boolean",group:"Behavior",defaultValue:false}},associations:{menuItem:{type:"sap.m.MenuItem",multiple:false}}}});n.prototype.exit=function(){if(this._image){this._image.destroy()}if(this._imageRightArrow){this._imageRightArrow.destroy()}e.prototype.exit.apply(this,arguments)};n.prototype._getImage=function(e,t,r,a){var s=this._image;if(s){s.setSrc(r);if(s instanceof sap.m.Image){s.setDensityAware(a)}}else{s=i.createControlByURI({id:e,src:r,densityAware:a,useIconTooltip:false},sap.m.Image).setParent(this,null,true)}if(s instanceof sap.m.Image){s.addStyleClass(t,true)}else{s.addStyleClass(t+"Icon",true)}this._image=s;return this._image};n.prototype._getIconArrowRight=function(){if(!this._imageRightArrow){this._imageRightArrow=i.createControlByURI({id:this.getId()+"-arrowRight",src:"sap-icon://slim-arrow-right",useIconTooltip:false},sap.m.Image).setParent(this,null,true);this._imageRightArrow.addStyleClass("sapMMenuLIArrowRightIcon",true)}return this._imageRightArrow};n.prototype._hasSubItems=function(){return!!(this.getMenuItem()&&sap.ui.getCore().byId(this.getMenuItem()).getItems().length)};n.prototype.setProperty=function(t,i){e.prototype.setProperty.apply(this,arguments);this.fireEvent("propertyChanged",{propertyKey:t,propertyValue:i});if(t==="enabled"){this.setType(i?o.Active:o.Inactive)}};return n});
//# sourceMappingURL=MenuListItem.js.map