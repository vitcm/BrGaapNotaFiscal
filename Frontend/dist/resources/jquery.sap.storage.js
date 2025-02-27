/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/base/assert","sap/ui/util/Storage"],function(jQuery,e,t){"use strict";var s={};jQuery.sap.storage=function(a,r){if(!a){a=t.Type.session}if(typeof a==="string"&&t.Type[a]){var n=a;if(r&&r!="state.key_"){n=a+"_"+r}return s[n]||(s[n]=new t(a,r))}e(a instanceof Object&&a.clear&&a.setItem&&a.getItem&&a.removeItem,"storage: duck typing the storage");return new t(a,r)};jQuery.sap.storage.Storage=t;jQuery.sap.storage.Type=t.Type;Object.assign(jQuery.sap.storage,t);return jQuery});
//# sourceMappingURL=jquery.sap.storage.js.map