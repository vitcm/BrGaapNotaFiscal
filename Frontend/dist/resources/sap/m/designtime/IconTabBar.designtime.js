/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return{name:{singular:"ICON_TAB_BAR_NAME",plural:"ICON_TAB_BAR_NAME_PLURAL"},palette:{group:"CONTAINER",icons:{svg:"sap/m/designtime/IconTabBar.icon.svg"}},aggregations:{items:{domRef:":sap-domref > .sapMITH",actions:{move:"moveControls"}},content:{domRef:function(e){var t=e._getIconTabHeader().oSelectedItem;if(t&&t.getContent().length){return}return e.getDomRef("content")},actions:{move:"moveControls"}}},templates:{create:"sap/m/designtime/IconTabBar.create.fragment.xml"}}});
//# sourceMappingURL=IconTabBar.designtime.js.map