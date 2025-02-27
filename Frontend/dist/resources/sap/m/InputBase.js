/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","./delegate/ValueStateMessage","sap/ui/core/message/MessageMixin","sap/ui/core/library","sap/ui/Device","./InputBaseRenderer","sap/base/Log","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/cursorPos","sap/ui/dom/jquery/getSelectedText","sap/ui/dom/jquery/selectText"],function(e,t,a,i,n,o,s,r,u,l,p,jQuery){"use strict";var c=s.TextDirection;var h=s.TextAlign;var g=s.ValueState;var f=t.extend("sap.m.InputBase",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{value:{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:g.None},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Misc",defaultValue:null},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueStateText:{type:"string",group:"Misc",defaultValue:null},showValueStateMessage:{type:"boolean",group:"Misc",defaultValue:true},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:h.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:c.Inherit},required:{type:"boolean",group:"Misc",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{change:{parameters:{value:{type:"string"}}}},aggregations:{formattedValueStateText:{type:"sap.m.FormattedText",multiple:false,defaultValue:null},_invisibleFormattedValueStateText:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden",defaultValue:null},_endIcon:{type:"sap.ui.core.Icon",multiple:true,visibility:"hidden"},_beginIcon:{type:"sap.ui.core.Icon",multiple:true,visibility:"hidden"}},designtime:"sap/m/designtime/InputBase.designtime"}});a.call(f.prototype);i.insertFontFaceStyle();o.call(f.prototype);f.ICON_PRESSED_CSS_CLASS="sapMInputBaseIconPressed";f.ICON_CSS_CLASS="sapMInputBaseIcon";f.prototype.bShowLabelAsPlaceholder=!r.support.input.placeholder;f.prototype._getPlaceholder=function(){return this.getPlaceholder()||""};f.prototype._getInputValue=function(e){return e===undefined?this.$("inner").val()||"":e.toString()};f.prototype._getInputElementTagName=function(){if(!this._sInputTagElementName){this._sInputTagElementName=this._$input&&this._$input.get(0)&&this._$input.get(0).tagName}return this._sInputTagElementName};f.prototype.init=function(){this.setLastValue("");this.bRenderingPhase=false;this._oValueStateMessage=new n(this);this._bIsComposingCharacter=false;this.fnCloseValueStateOnClick=function(){this.closeValueStateMessage()}};f.prototype.oncompositionstart=function(){this._bIsComposingCharacter=true};f.prototype.oncompositionend=function(e){this._bIsComposingCharacter=false;if(!r.browser.firefox){this._bCheckDomValue=true}};f.prototype.isComposingCharacter=function(){return this._bIsComposingCharacter};f.prototype.onBeforeRendering=function(){var e=this.getFormattedValueStateText();var t=e&&e.getHtmlText();var a=this.getAggregation("_invisibleFormattedValueStateText");var i=a&&a.getHtmlText();if(this._bCheckDomValue&&!this.bRenderingPhase){if(this.isActive()){this._sDomValue=this._getInputValue()}else{this._bCheckDomValue=false}}if(e&&t!==i){a&&a.destroy();this.setAggregation("_invisibleFormattedValueStateText",e.clone())}this.bRenderingPhase=true};f.prototype.onAfterRendering=function(){var e=this.getValueState();var t=this.getFocusDomRef()===document.activeElement;var a=e===g.None;if(this._bCheckDomValue&&this._sDomValue!==this._getInputValue()){this.$("inner").val(this._sDomValue)}this.$("message").text(this.getValueStateText());this._bCheckDomValue=false;this.bRenderingPhase=false;if(t){this[a?"closeValueStateMessage":"openValueStateMessage"]()}if(this.getAggregation("_invisibleFormattedValueStateText")){this.getAggregation("_invisibleFormattedValueStateText").getControls().forEach(function(e){e.getDomRef()&&e.getDomRef().setAttribute("tabindex",-1)})}};f.prototype.exit=function(){if(this._oValueStateMessage){this._oValueStateMessage.destroy()}this._oValueStateMessage=null;this._oDomRefBeforeRendering=null};f.prototype.ontouchstart=function(e){e.setMarked()};f.prototype.onfocusin=function(e){this.addStyleClass("sapMFocus");this.openValueStateMessage()};f.prototype.onfocusout=function(e){this.removeStyleClass("sapMFocus");if(!this._bClickOnValueStateLink(e)){this.closeValueStateMessage()}};f.prototype.onsapfocusleave=function(e){if(!this.preventChangeOnFocusLeave(e)){this.onChange(e)}};f.prototype.preventChangeOnFocusLeave=function(e){return this.bFocusoutDueRendering};f.prototype.getChangeEventParams=function(){return{}};f.prototype.ontap=function(e){return};f.prototype.onChange=function(e,t,a){t=t||this.getChangeEventParams();if(!this.getEditable()||!this.getEnabled()){return}var i=this._getInputValue(a);if(i!==this.getLastValue()){this.setValue(i);i=this.getValue();this.setLastValue(i);this.fireChangeEvent(i,t);return true}else{this._bCheckDomValue=false}};f.prototype.fireChangeEvent=function(e,t){var a=jQuery.extend({value:e,newValue:e},t);this.fireChange(a)};f.prototype.onValueRevertedByEscape=function(e,t){this.fireEvent("liveChange",{value:e,escPressed:true,previousValue:t,newValue:e})};f.prototype.onsapenter=function(e){if(r.browser.safari&&this.isComposingCharacter()){e.setMarked("invalid");return}this.onChange(e)};f.prototype.onsapescape=function(e){var t=this._getInputValue();if(t!==this.getLastValue()){e.setMarked();e.preventDefault();this.updateDomValue(this.getLastValue());this.onValueRevertedByEscape(this.getLastValue(),t)}};f.prototype.oninput=function(e){this._bCheckDomValue=true};f.prototype.onkeydown=function(e){if(this.getDomRef("inner")&&this.getDomRef("inner").getAttribute("readonly")&&e.keyCode==p.BACKSPACE){e.preventDefault()}};f.prototype.oncut=function(e){};f.prototype.selectText=function(e,t){this.$("inner").selectText(e,t);return this};f.prototype.getSelectedText=function(){return this.$("inner").getSelectedText()};f.prototype.setProperty=function(e,a,i){if(e=="value"){this._bCheckDomValue=false}return t.prototype.setProperty.apply(this,arguments)};f.prototype.getFocusInfo=function(){var e=t.prototype.getFocusInfo.call(this),a=this.getFocusDomRef();jQuery.extend(e,{cursorPos:0,selectionStart:0,selectionEnd:0});if(a){e.cursorPos=jQuery(a).cursorPos();try{e.selectionStart=a.selectionStart;e.selectionEnd=a.selectionEnd}catch(e){}}return e};f.prototype.applyFocusInfo=function(e){t.prototype.applyFocusInfo.call(this,e);this.$("inner").cursorPos(e.cursorPos);this.selectText(e.selectionStart,e.selectionEnd);return this};f.prototype.updateDomValue=function(e){var t=this.getFocusDomRef();if(!this.isActive()){return this}e=this._getInputValue(e);this._bCheckDomValue=true;if(this._bPreferUserInteraction){this.handleInputValueConcurrency(e)}else{t.value=e}return this};f.prototype._aValueStateLinks=function(){if(this.getFormattedValueStateText()&&this.getFormattedValueStateText().getHtmlText()&&this.getFormattedValueStateText().getControls().length){return this.getFormattedValueStateText().getControls()}else{return[]}};f.prototype._bClickOnValueStateLink=function(e){var t=this._aValueStateLinks();return t.some(function(t){return e.relatedTarget===t.getDomRef()})};f.prototype._attachValueStateLinkPress=function(){this._aValueStateLinks().forEach(function(e){e.attachPress(this.fnCloseValueStateOnClick,this)},this)};f.prototype._detachValueStateLinkPress=function(){this._aValueStateLinks().forEach(function(e){e.detachPress(this.fnCloseValueStateOnClick,this)},this)};f.prototype.handleInputValueConcurrency=function(e){var t=this.getFocusDomRef(),a=t&&this._getInputValue(),i=this.getProperty("value"),n=document.activeElement===t,o=this.isBound("value")&&this.getBindingInfo("value").skipModelUpdate;if(n&&o&&a&&i!==a){return this}t.value=e;if(n&&o&&!a){t.select()}};f.prototype._setPreferUserInteraction=function(e){this._bPreferUserInteraction=e};f.prototype.closeValueStateMessage=function(){setTimeout(function(){if(this._oValueStateMessage){this._detachValueStateLinkPress();this._oValueStateMessage.close()}}.bind(this),0)};f.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef("content")};f.prototype.getPopupAnchorDomRef=function(){return this.getDomRef()};f.prototype.iOpenMessagePopupDuration=0;f.prototype.getValueStateMessageId=function(){return this.getId()+"-message"};f.prototype.getLabels=function(){var e=this.getAriaLabelledBy().map(function(e){return sap.ui.getCore().byId(e)});var t=sap.ui.require("sap/ui/core/LabelEnablement");if(t){e=e.concat(t.getReferencingLabels(this).map(function(e){return sap.ui.getCore().byId(e)}))}return e};f.prototype.openValueStateMessage=function(){if(this._oValueStateMessage&&this.shouldValueStateMessageBeOpened()){setTimeout(function(){if(!this.bIsDestroyed){this._detachValueStateLinkPress();this._attachValueStateLinkPress();this._oValueStateMessage.open()}}.bind(this),0)}};f.prototype.shouldValueStateMessageBeOpened=function(){return this.getValueState()!==g.None&&this.getEditable()&&this.getEnabled()&&this.getShowValueStateMessage()};f.prototype._calculateIconsSpace=function(){var e=this.getAggregation("_endIcon")||[],t=this.getAggregation("_beginIcon")||[],a=e.concat(t),i;return a.reduce(function(e,t){i=t&&t.getDomRef()?t.getDomRef().offsetWidth:0;return e+i},0)};f.prototype.setValue=function(e){e=this.validateProperty("value",e);e=this._getInputValue(e);this.updateDomValue(e);if(e!==this.getProperty("value")){this.setLastValue(e)}this.setProperty("value",e,true);return this};f.prototype.getFocusDomRef=function(){return this.getDomRef("inner")};f.prototype.getIdForLabel=function(){return this.getId()+"-inner"};f.prototype.getAccessibilityInfo=function(){var e=this.getRequired()?"Required":"",t=this.getRenderer();return{role:t.getAriaRole(this),type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_INPUT"),description:[this.getValue()||"",t.getLabelledByAnnouncement(this),t.getDescribedByAnnouncement(this),e].join(" ").trim(),focusable:this.getEnabled(),enabled:this.getEnabled(),editable:this.getEnabled()&&this.getEditable()}};f.prototype._addIcon=function(e,t){if(["begin","end"].indexOf(e)===-1){l.error('icon position is not "begin", neither "end", please check again the passed setting');return null}var a=i.createControlByURI(t).addStyleClass(f.ICON_CSS_CLASS);this.addAggregation("_"+e+"Icon",a);return a};f.prototype.addBeginIcon=function(e){return this._addIcon("begin",e)};f.prototype.addEndIcon=function(e){return this._addIcon("end",e)};Object.defineProperty(f.prototype,"_$input",{get:function(){return this.$("inner")}});f.prototype.setLastValue=function(e){this._lastValue=e;return this};f.prototype.getLastValue=function(){return this._lastValue};return f});
//# sourceMappingURL=InputBase.js.map