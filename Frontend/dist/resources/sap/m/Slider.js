/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/InvisibleText","sap/ui/core/library","sap/ui/core/ResizeHandler","sap/base/Log","./library","./SliderTooltipContainer","./SliderTooltip","./SliderUtilities","./SliderRenderer","./ResponsiveScale","sap/ui/thirdparty/jquery","sap/ui/events/KeyCodes"],function(t,e,i,o,s,a,n,r,l,p,u,h,jQuery,g){"use strict";var f=n.touch;var d=t.extend("sap.m.Slider",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},enabled:{type:"boolean",group:"Behavior",defaultValue:true},name:{type:"string",group:"Misc",defaultValue:""},min:{type:"float",group:"Data",defaultValue:0},max:{type:"float",group:"Data",defaultValue:100},step:{type:"float",group:"Data",defaultValue:1},progress:{type:"boolean",group:"Misc",defaultValue:true},value:{type:"float",group:"Data",defaultValue:0},showHandleTooltip:{type:"boolean",group:"Appearance",defaultValue:true},showAdvancedTooltip:{type:"boolean",group:"Appearance",defaultValue:false},inputsAsTooltips:{type:"boolean",group:"Appearance",defaultValue:false},enableTickmarks:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"scale",aggregations:{_tooltipContainer:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},scale:{type:"sap.m.IScale",multiple:false,singularName:"scale"},_defaultScale:{type:"sap.m.ResponsiveScale",multiple:false,visibility:"hidden"},_defaultTooltips:{type:"sap.m.SliderTooltipBase",multiple:true,visibility:"hidden"},customTooltips:{type:"sap.m.SliderTooltipBase",multiple:true},_handlesLabels:{type:"sap.ui.core.InvisibleText",multiple:true,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{value:{type:"float"}}},liveChange:{parameters:{value:{type:"float"}}}},designtime:"sap/m/designtime/Slider.designtime"}});e.apply(d.prototype,[true]);d.prototype._getUsedScale=function(){if(!this.getEnableTickmarks()){return}return this.getAggregation("scale")||this.getAggregation("_defaultScale")};d.prototype._syncScaleUsage=function(){var t=this.getEnableTickmarks(),e=this.getAggregation("scale"),i=this.getAggregation("_defaultScale");if(i&&!t||e&&i){this.destroyAggregation("_defaultScale",true)}if(t&&!e&&!i){this.setAggregation("_defaultScale",new h,true)}};d.prototype._showTooltipsIfNeeded=function(){if(this.getShowAdvancedTooltip()){this.getAggregation("_tooltipContainer").show(this);this.updateAdvancedTooltipDom(this.getValue())}};d.prototype._convertValueToRtlMode=function(t){return this.getMax()-t+this.getMin()};d.prototype._recalculateStyles=function(){var t=this.$();this._fSliderWidth=t.width();this._fSliderPaddingLeft=parseFloat(t.css("padding-left"));this._fSliderOffsetLeft=t.offset().left;this._fHandleWidth=this.$("handle").width()};d.prototype._validateProperties=function(){var t=this.getMin(),e=this.getMax(),i=this.getStep(),o=false,s=false;if(t>=e){o=true;s=true;a.warning("Warning: "+"Property wrong min: "+t+" >= max: "+e+" on ",this)}if(i<=0){a.warning("Warning: "+"The step could not be negative on ",this)}if(i>e-t&&!o){s=true;a.warning("Warning: "+"Property wrong step: "+i+" > max: "+e+" - "+"min: "+t+" on ",this)}return s};d.prototype._getPercentOfValue=function(t){return p.getPercentOfValue(t,this.getMin(),this.getMax())};d.prototype._getValueOfPercent=function(t){var e=this.getMin(),i=t*(this.getMax()-e)/100+e,o=this.toFixed(i,this.getDecimalPrecisionOfNumber(this.getStep()));return Number(o)};d.prototype._validateStep=function(t){if(typeof t==="undefined"){return 1}if(typeof t!=="number"){a.warning('Warning: "iStep" needs to be a number',this);return 0}if(Math.floor(t)===t&&isFinite(t)){return t}a.warning('Warning: "iStep" needs to be a finite interger',this);return 0};d.prototype._handleSliderResize=function(t){var e=this._getUsedScale();if(this.getEnableTickmarks()&&e&&e.handleResize){e.handleResize(t)}if(this.getShowAdvancedTooltip()){this._handleTooltipContainerResponsiveness()}};d.prototype._handleTooltipContainerResponsiveness=function(){this.getAggregation("_tooltipContainer").setWidth(this.$().width()+"px")};d.prototype.getDecimalPrecisionOfNumber=function(t){if(Math.floor(t)===t){return 0}var e=t.toString(),i=e.indexOf("."),o=e.indexOf("e-"),s=o!==-1,a=i!==-1;if(s){var n=+e.slice(o+2);if(a){return n+e.slice(i+1,o).length}return n}if(a){return e.length-i-1}return 0};d.prototype.toFixed=function(t,e){if(e===undefined){e=this.getDecimalPrecisionOfNumber(t)}if(e>20){e=20}else if(e<0){e=0}return t.toFixed(e)+""};d.prototype.setDomValue=function(t){var e=this.getDomRef(),i=this._formatValueByCustomElement(t),o=this.getAggregation("_tooltipContainer");if(!e){return}var s=Math.max(this._getPercentOfValue(+t),0)+"%",a=this.getDomRef("handle");if(this.getName()){this.getDomRef("input").setAttribute("value",i)}if(this.getProgress()){this.getDomRef("progress").style.width=s}a.style[sap.ui.getCore().getConfiguration().getRTL()?"right":"left"]=s;if(this.getShowAdvancedTooltip()&&o.getDomRef()){this.updateAdvancedTooltipDom(t)}if(this.getShowHandleTooltip()&&!this.getShowAdvancedTooltip()){a.title=i}this._updateHandleAriaAttributeValues(a,t,i)};d.prototype._updateHandleAriaAttributeValues=function(t,e,i){if(this._isElementsFormatterNotNumerical(e)){t.setAttribute("aria-valuenow",e);t.setAttribute("aria-valuetext",i)}else{t.setAttribute("aria-valuenow",i);t.removeAttribute("aria-valuetext")}};d.prototype._formatValueByCustomElement=function(t,e){var i=this._getUsedScale(),o=this.getUsedTooltips()[0],s=""+t;if(e==="slider"){return s}if(this.getEnableTickmarks()&&i&&i.getLabel){s=""+i.getLabel(t,this)}if(e==="scale"){return s}if(this.getShowAdvancedTooltip()&&o&&o.getLabel){s=""+o.getLabel(t,this)}return s};d.prototype._isElementsFormatterNotNumerical=function(t){var e=this._formatValueByCustomElement(t);return isNaN(e)};d.prototype.updateAdvancedTooltipDom=function(t){var e=this.getUsedTooltips();this.updateTooltipsPositionAndState(e[0],parseFloat(t))};d.prototype.getUsedTooltips=function(){var t=this.getCustomTooltips(),e=this.getAggregation("_defaultTooltips")||[];return t.length?t:e};d.prototype.updateTooltipsPositionAndState=function(t,e){var i=this.getAggregation("_tooltipContainer");t.setValue(e);i.repositionTooltips(this.getMin(),this.getMax())};d.prototype.getClosestHandleDomRef=function(){return this.getDomRef("handle")};d.prototype._increaseValueBy=function(t){var e,i;if(this.getEnabled()){e=this.getValue();this.setValue(e+(t||1));i=this.getValue();if(e<i){this._fireChangeAndLiveChange({value:i})}}};d.prototype._decreaseValueBy=function(t){var e,i;if(this.getEnabled()){e=this.getValue();this.setValue(e-(t||1));i=this.getValue();if(e>i){this._fireChangeAndLiveChange({value:i})}}};d.prototype._getLongStep=function(){var t=this.getMin(),e=this.getMax(),i=this.getStep(),o=(e-t)/10,s=(e-t)/i;return s>10?o:i};d.prototype._fireChangeAndLiveChange=function(t){this.fireChange(t);this.fireLiveChange(t)};d.prototype.handleTooltipChange=function(t){var e=parseFloat(t.getParameter("value"));this.setValue(e);this._fireChangeAndLiveChange({value:e})};d.prototype._registerResizeHandler=function(){if(!this._parentResizeHandler){this._parentResizeHandler=s.register(this,this._handleSliderResize.bind(this))}};d.prototype._deregisterResizeHandler=function(){if(this._parentResizeHandler){s.deregister(this._parentResizeHandler);this._parentResizeHandler=null}};d.prototype.init=function(){var t;this._iActiveTouchId=-1;this._bSetValueFirstCall=true;this._fValueBeforeFocus=0;this._parentResizeHandler=null;this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oTooltipContainer=null;t=new i({text:this._oResourceBundle.getText("SLIDER_HANDLE")});this.addAggregation("_handlesLabels",t)};d.prototype.exit=function(){if(this._oResourceBundle){this._oResourceBundle=null}if(this.getAggregation("_defaultTooltips")){this.destroyAggregation("_defaultTooltips")}this._deregisterResizeHandler()};d.prototype.onBeforeRendering=function(){var t=this._validateProperties();if(!t){this.setValue(this.getValue());this._sProgressValue=Math.max(this._getPercentOfValue(this.getValue()),0)+"%"}if(this.getShowAdvancedTooltip()){this.initAndSyncTooltips(["leftTooltip"])}this._deregisterResizeHandler();this._syncScaleUsage()};d.prototype.forwardProperties=function(t,e){t.forEach(function(t){e.setProperty(t,this.getProperty(t),true)},this)};d.prototype.forwardPropertiesToDefaultTooltips=function(t){var e=this.getAggregation("_defaultTooltips")||[];for(var i=0;i<t;i++){this.forwardProperties(["min","max","step"],e[i]);e[i].setProperty("width",this._getMaxTooltipWidth()+"px",true);e[i].setProperty("editable",this.getInputsAsTooltips(),true)}};d.prototype.associateCustomTooltips=function(t){this.destroyAggregation("_defaultTooltips",true);this._oTooltipContainer.removeAllAssociation("associatedTooltips",true);for(var e=0;e<t;e++){this._oTooltipContainer.addAssociation("associatedTooltips",this.getCustomTooltips()[e],true)}};d.prototype.assignDefaultTooltips=function(t){var e=this.getAggregation("_defaultTooltips")||[];if(e.length===0){this._oTooltipContainer.removeAllAssociation("associatedTooltips",true);t.forEach(function(t){this.initDefaultTooltip(t)},this)}this.forwardProperties(["enabled"],this._oTooltipContainer);this.forwardPropertiesToDefaultTooltips(t.length)};d.prototype.initAndSyncTooltips=function(t){var e=this.getCustomTooltips(),i=e.length,o=t.length;this.initTooltipContainer();if(i<o){this.assignDefaultTooltips(t)}else{if(i>o){a.warning("Warning: More than "+o+" Custom Tooltips are provided. Only the first will be used.")}this.associateCustomTooltips(o)}};d.prototype.initDefaultTooltip=function(t){var e=new l(this.getId()+"-"+t,{change:this.handleTooltipChange.bind(this)});this.getAggregation("_tooltipContainer").addAssociation("associatedTooltips",e,true);this.addAggregation("_defaultTooltips",e,true)};d.prototype.initTooltipContainer=function(){if(!this._oTooltipContainer){this._oTooltipContainer=new r;this.setAggregation("_tooltipContainer",this._oTooltipContainer,true)}};d.prototype._getMaxTooltipWidth=function(){var t=[Math.abs(this.getMin()),Math.abs(this.getMax())],e=t[0]>t[1]?0:1;return(t[e].toString().length+this.getDecimalPrecisionOfNumber(this.getStep())+1)*p.CONSTANTS.CHARACTER_WIDTH_PX};d.prototype.onAfterRendering=function(){if(this.getShowAdvancedTooltip()){this._recalculateStyles();this._handleTooltipContainerResponsiveness()}this._handleSliderResize({control:this});this._registerResizeHandler()};d.prototype.ontouchstart=function(t){var e=this.getMin(),i=t.targetTouches[0],o,s=this.getRenderer().CSS_CLASS,a="."+s;t.setMarked();if(t.target.className.indexOf("sapMInput")===-1){t.preventDefault()}this.focus();if(f.countContained(t.touches,this.getId())>1||!this.getEnabled()||t.button||t.srcControl!==this){return}this._iActiveTouchId=i.identifier;jQuery(document).on("touchend"+a+" touchcancel"+a+" mouseup"+a,this._ontouchend.bind(this)).on(t.originalEvent.type==="touchstart"?"touchmove"+a:"touchmove"+a+" mousemove"+a,this._ontouchmove.bind(this));var n=this.getClosestHandleDomRef();if(i.target!==n){setTimeout(n["focus"].bind(n),0)}this._recalculateStyles();this._fDiffX=this._fSliderPaddingLeft;this._fInitialValue=this.getValue();this.$("inner").addClass(s+"Pressed");if(i.target===this.getDomRef("handle")){this._fDiffX=i.pageX-jQuery(n).offset().left+this._fSliderPaddingLeft-this._fHandleWidth/2}else{o=(i.pageX-this._fSliderPaddingLeft-this._fSliderOffsetLeft)/this._fSliderWidth*(this.getMax()-e)+e;if(sap.ui.getCore().getConfiguration().getRTL()){o=this._convertValueToRtlMode(o)}this.setValue(o);o=this.getValue();if(this._fInitialValue!==o){this.fireLiveChange({value:o})}}};d.prototype._ontouchmove=function(t){t.setMarked();t.preventDefault();if(t.isMarked("delayedMouseEvent")||!this.getEnabled()||t.button){return}var e=this.getMin(),i=this.getValue(),o=f.find(t.changedTouches,this._iActiveTouchId),s=o?o.pageX:t.pageX,a=(s-this._fDiffX-this._fSliderOffsetLeft)/this._fSliderWidth*(this.getMax()-e)+e;if(sap.ui.getCore().getConfiguration().getRTL()){a=this._convertValueToRtlMode(a)}this.setValue(a);a=this.getValue();if(i!==a){this.fireLiveChange({value:a})}};d.prototype._ontouchend=function(t){var e=this.getRenderer().CSS_CLASS,i="."+e;t.setMarked();if(t.isMarked("delayedMouseEvent")||!this.getEnabled()||t.button){return}jQuery(document).off(i);var o=this.getValue();this.$("inner").removeClass(e+"Pressed");if(this._fInitialValue!==o){this.fireChange({value:o})}};d.prototype.onfocusin=function(t){this._fValueBeforeFocus=this.getValue();if(this.getShowAdvancedTooltip()){this.getAggregation("_tooltipContainer").show(this);this._setAriaControls();this.updateAdvancedTooltipDom(this.getValue())}};d.prototype._setAriaControls=function(){var t=this.getUsedTooltips()[0],e=this.getFocusDomRef();if(this.getInputsAsTooltips()&&t&&t.getDomRef()){e.setAttribute("aria-controls",t.getId())}};d.prototype.onfocusout=function(t){if(!this.getShowAdvancedTooltip()){return}var e=jQuery.contains(this.getDomRef(),t.relatedTarget),i=jQuery.contains(this.getAggregation("_tooltipContainer").getDomRef(),t.relatedTarget);if(e||i){return}this.getAggregation("_tooltipContainer").hide()};d.prototype.onmouseover=function(t){var e,i;if(this.getShowAdvancedTooltip()){this.getAggregation("_tooltipContainer").show(this);i=this.getAggregation("_tooltipContainer");e=jQuery.contains(i.getDomRef(),document.activeElement);this._setAriaControls();if(e){return}this.updateAdvancedTooltipDom(this.getValue())}};d.prototype.onmouseout=function(t){if(!this.getShowAdvancedTooltip()){return}var e=this.getAggregation("_tooltipContainer").getDomRef(),i=this.getDomRef(),o=jQuery.contains(i,document.activeElement),s=jQuery.contains(e,document.activeElement);if(!e||o||s){return}if(jQuery.contains(this.getDomRef(),t.toElement)||i===t.toElement){return}if(jQuery.contains(this.getAggregation("_tooltipContainer").getDomRef(),t.toElement)){return}this.getAggregation("_tooltipContainer").hide()};d.prototype.onkeydown=function(t){var e=this.getUsedTooltips();if(t.keyCode===p.CONSTANTS.F2_KEYCODE&&e[0]&&this.getInputsAsTooltips()){e[0].focus()}if(t.keyCode===g.SPACE){t.preventDefault()}};d.prototype.onsapincrease=function(t){var e,i;t.preventDefault();t.setMarked();if(this.getEnabled()){e=this.getValue();this.stepUp(1);i=this.getValue();if(e<i){this._fireChangeAndLiveChange({value:i})}}this._showTooltipsIfNeeded()};d.prototype.onsapincreasemodifiers=function(t){if(t.altKey){return}t.preventDefault();t.stopPropagation();t.setMarked();this._increaseValueBy(this._getLongStep());this._showTooltipsIfNeeded()};d.prototype.onsapdecrease=function(t){var e,i;t.preventDefault();t.setMarked();if(this.getEnabled()){e=this.getValue();this.stepDown(1);i=this.getValue();if(e>i){this._fireChangeAndLiveChange({value:i})}}this._showTooltipsIfNeeded()};d.prototype.onsapdecreasemodifiers=function(t){if(t.altKey){return}t.preventDefault();t.stopPropagation();t.setMarked();this._decreaseValueBy(this._getLongStep());this._showTooltipsIfNeeded()};d.prototype.onsapplus=function(t){var e,i;t.setMarked();if(this.getEnabled()){e=this.getValue();this.stepUp(1);i=this.getValue();if(e<i){this._fireChangeAndLiveChange({value:i})}}this._showTooltipsIfNeeded()};d.prototype.onsapminus=function(t){var e,i;t.setMarked();if(this.getEnabled()){e=this.getValue();this.stepDown(1);i=this.getValue();if(e>i){this._fireChangeAndLiveChange({value:i})}}this._showTooltipsIfNeeded()};d.prototype.onsapescape=function(){this.setValue(this._fValueBeforeFocus)};d.prototype.onsappageup=d.prototype.onsapincreasemodifiers;d.prototype.onsappagedown=d.prototype.onsapdecreasemodifiers;d.prototype.onsaphome=function(t){t.setMarked();var e=this.getMin();t.preventDefault();if(this.getEnabled()&&this.getValue()>e){this.setValue(e);this._fireChangeAndLiveChange({value:e})}this._showTooltipsIfNeeded()};d.prototype.onsapend=function(t){t.setMarked();var e=this.getMax();t.preventDefault();if(this.getEnabled()&&this.getValue()<e){this.setValue(e);this._fireChangeAndLiveChange({value:e})}this._showTooltipsIfNeeded()};d.prototype.getFocusDomRef=function(){return this.getDomRef("handle")};d.prototype.stepUp=function(t){return this.setValue(this.getValue()+this._validateStep(t)*this.getStep(),{snapValue:false})};d.prototype.stepDown=function(t){return this.setValue(this.getValue()-this._validateStep(t)*this.getStep(),{snapValue:false})};d.prototype.setValue=function(t,e){if(this._bSetValueFirstCall){this._bSetValueFirstCall=false;return this.setProperty("value",t,true)}var i=this.getMin(),o=this.getMax(),s=this.getStep(),a=this.getValue(),n,r=true,l;if(e){r=!!e.snapValue}if(typeof t!=="number"||!isFinite(t)){return this}l=Math.abs((t-i)%s);if(r&&l!==0){t=l*2>=s?t+s-l:t-l}if(t<i){t=i}else if(t>o){t=o}n=this.toFixed(t,this.getDecimalPrecisionOfNumber(s));t=Number(n);this.setProperty("value",t,true);if(a!==this.getValue()){this.setDomValue(n)}return this};return d});
//# sourceMappingURL=Slider.js.map