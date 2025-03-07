/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/layout/form/Form"],function(e){"use strict";function t(e){return e.getParent().isA("sap.ui.layout.form.FormElement")}function n(t){if(t instanceof e&&t.getLayout()&&t.getLayout().getMetadata().getName()==="sap.ui.layout.form.GridLayout"){return false}return true}return{palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/form/Form.icon.svg"}},aggregations:{title:{ignore:true},toolbar:{ignore:function(e){return!e.getToolbar()},domRef:function(e){return e.getToolbar().getDomRef()}},formContainers:{propagateRelevantContainer:true,propagateMetadata:function(e){if(t(e)){return{actions:"not-adaptable"}}},childNames:{singular:"GROUP_CONTROL_NAME",plural:"GROUP_CONTROL_NAME_PLURAL"},domRef:":sap-domref",actions:{move:function(e){if(n(e)){return"moveControls"}else{return null}},createContainer:function(e){if(n(e)){return{changeType:"addGroup",isEnabled:true,getCreatedContainerId:function(e){return e}}}else{return null}}}}},actions:{localReset:"localReset"}}});
//# sourceMappingURL=Form.designtime.js.map