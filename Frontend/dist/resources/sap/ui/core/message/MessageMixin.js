/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/base/Log","sap/ui/core/LabelEnablement"],function(e,t,a){"use strict";var i=e.ValueState;var s=function(){this.refreshDataState=n;this.fnDestroy=this.destroy;this.destroy=r};function n(e,s){if(s.getChanges().messages&&this.getBinding(e)&&this.getBinding(e).isA("sap.ui.model.PropertyBinding")){var n=s.getMessages();var r=a.getReferencingLabels(this);var g=r[0];var o=false;n.forEach(function(e){if(r&&r.length>0){var a=sap.ui.getCore().byId(g);if(a.getMetadata().isInstanceOf("sap.ui.core.Label")&&a.getText&&e.getAdditionalText()!==a.getText()){e.setAdditionalText(a.getText());o=true}else{t.warning("sap.ui.core.message.Message: Can't create labelText."+"Label with id "+g+" is no valid sap.ui.core.Label.",this)}}if(e.getControlId()!==this.getId()){e.addControlId(this.getId());o=true}}.bind(this));var d=sap.ui.getCore().getMessageManager().getMessageModel();d.checkUpdate(o,true);if(n&&n.length>0){var h=n[0];if(i[h.type]){this.setValueState(h.type);this.setValueStateText(h.message)}}else{this.setValueState(i.None);this.setValueStateText("")}}}function r(){var e=this.getId();function t(t){t.removeControlId(e)}for(var a in this.mBindingInfos){var i=this.mBindingInfos[a];if(i.binding){var s=i.binding.getDataState();var n=s.getMessages();n.forEach(t)}}this.fnDestroy.apply(this,arguments)}return s},true);
//# sourceMappingURL=MessageMixin.js.map