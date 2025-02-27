/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/ResizeHandler","sap/ui/core/delegate/ScrollEnablement","sap/ui/layout/library","./FixFlexRenderer"],function(e,i,t,l){"use strict";var r=e.extend("sap.ui.layout.FixFlex",{metadata:{library:"sap.ui.layout",properties:{vertical:{type:"boolean",group:"Appearance",defaultValue:true},fixFirst:{type:"boolean",group:"Misc",defaultValue:true},fixContentSize:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},minFlexSize:{type:"int",defaultValue:0}},aggregations:{fixContent:{type:"sap.ui.core.Control",multiple:true,singularName:"fixContent"},flexContent:{type:"sap.ui.core.Control",multiple:false}},designtime:"sap/ui/layout/designtime/FixFlex.designtime",dnd:{draggable:false,droppable:true}}});i.call(r.prototype);r.prototype.init=function(){this._scroller=new l(this,null,{scrollContainerId:this.getId()});this._innerScroller=new l(this,this.getId()+"-FlexibleContainer",{scrollContainerId:this.getId()+"-Flexible"})};r.prototype.exit=function(){this._deregisterControl();if(this._scroller){this._scroller.destroy();this._scroller=null}if(this._innerScroller){this._innerScroller.destroy();this._innerScroller=null}};r.prototype.onBeforeRendering=function(){this._deregisterControl();this._scroller.setVertical(false);this._scroller.setHorizontal(false);var e=this.getMinFlexSize()!==0;this._innerScroller.setVertical(e);this._innerScroller.setHorizontal(e)};r.prototype.onAfterRendering=function(){if(this.getMinFlexSize()!==0){this.sResizeListenerFixFlexScroll=t.register(this.getDomRef(),this._changeScrolling.bind(this));this.sResizeListenerFixFlexScrollFlexPart=t.register(this.getDomRef("Fixed"),this._changeScrolling.bind(this));var e=this.getDomRef("FlexibleContainer").firstChild;if(e){this.sResizeListenerFixFlexContainerScroll=t.register(e,this._changeFlexibleContainerScroll.bind(this))}this._changeScrolling()}};r.prototype.getScrollDelegate=function(){return this._innerScroller};r.prototype._deregisterControl=function(){if(this.sResizeListenerFixFlexScroll){t.deregister(this.sResizeListenerFixFlexScroll);this.sResizeListenerFixFlexScroll=null}if(this.sResizeListenerFixFlexScrollFlexPart){t.deregister(this.sResizeListenerFixFlexScrollFlexPart);this.sResizeListenerFixFlexScrollFlexPart=null}if(this.sResizeListenerFixFlexContainerScroll){t.deregister(this.sResizeListenerFixFlexContainerScroll);this.sResizeListenerFixFlexContainerScroll=null}};r.prototype._changeScrolling=function(){var e,i,t=this.$(),l=this.getMinFlexSize(),r=this.getVertical();if(r){e=this.$().height()-this.$("Fixed").height();i="height"}else{e=this.$().width()-this.$("Fixed").width();i="width"}if(e<=parseInt(this.getMinFlexSize())){t.addClass("sapUiFixFlexScrolling");t.removeClass("sapUiFixFlexInnerScrolling");if(r){this._scroller.setVertical(true);this._innerScroller.setVertical(false)}else{this._scroller.setHorizontal(true);this._innerScroller.setHorizontal(false)}if(this.$("FlexibleContainer").children().height()>l){this.$("Flexible").attr("style","min-"+i+":"+l+"px")}else{this.$("Flexible").attr("style",i+":"+l+"px")}}else{t.addClass("sapUiFixFlexInnerScrolling");t.removeClass("sapUiFixFlexScrolling");if(r){this._scroller.setVertical(false);this._innerScroller.setVertical(true)}else{this._scroller.setHorizontal(false);this._innerScroller.setHorizontal(true)}this._changeFlexibleContainerScroll();this.$("Flexible").removeAttr("style")}};r.prototype._changeFlexibleContainerScroll=function(){var e=this.$("FlexibleContainer"),i=e.height(),t=e.children().height();if(i==t){return}if(i>t){e.removeClass("sapUiFixFlexFlexibleContainerGrowing")}else{e.addClass("sapUiFixFlexFlexibleContainerGrowing")}};return r});
//# sourceMappingURL=FixFlex.js.map