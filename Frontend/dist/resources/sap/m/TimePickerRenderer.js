/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./InputBaseRenderer","sap/ui/core/library"],function(e,t,a){"use strict";var i=e.extend(t);i.apiVersion=2;i.CSS_CLASS="sapMTimePicker";i.addOuterClasses=function(e,t){e.class(i.CSS_CLASS)};i.writeInnerValue=function(e,t){e.attr("value",t._formatValue(t.getDateValue()))};i.getAriaRole=function(){return"combobox"};i.getLabelledByAnnouncement=function(e){return e._getPlaceholder()||""};i.getAccessibilityState=function(e){var i=t.getAccessibilityState.apply(this,arguments);i["roledescription"]=e._oResourceBundle.getText("ACC_CTR_TYPE_TIMEINPUT");i["autocomplete"]="none";i["haspopup"]=a.aria.HasPopup.Dialog.toLowerCase();i["expanded"]="false";i["disabled"]=null;i["owns"]=e.getId()+"-clocks";if(e._isMobileDevice()){i["describedby"]=e._oResourceBundle.getText("ACC_CTR_TYPE_TIMEINPUT_MOBILE_DESCRIBEDBY")}return i};i.writeInnerAttributes=function(e,t){if(t._isMobileDevice()){e.attr("readonly","readonly")}if(t.getShowValueStateMessage()){e.attr("autocomplete","off")}};return i},true);
//# sourceMappingURL=TimePickerRenderer.js.map