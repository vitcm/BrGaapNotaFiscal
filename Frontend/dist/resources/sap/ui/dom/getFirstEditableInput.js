/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/dom/isHidden"],function(jQuery,t){"use strict";function e(t){return jQuery(t).find("input, textarea").not("input[readonly],textarea[readonly],input[type=hidden],input[type=button],input[type=submit],input[type=reset],input[type=image],button").filter(":enabled:visible:first")[0]}function n(n){if(!n||t(n)){return null}return e(n)}return n});
//# sourceMappingURL=getFirstEditableInput.js.map