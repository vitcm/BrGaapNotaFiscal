/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";var e,t,r;e=document.querySelector("[src$='runTest.js']");if(e){t=/^([^?#]*\/)?runTest.js/.exec(e.getAttribute("src"));if(t){r=t[1]+"../../../../"}}if(r==null){throw new Error("runTest.js: could not identify script tag!")}function n(e,t){var n=e.length,i=0;if(n===0){t();return}function o(e){n--;if(e.type==="error"){i++}e.target.removeEventListener("load",o);e.target.removeEventListener("error",o);if(n===0&&i===0&&t){t()}}for(var s=0;s<e.length;s++){var u=document.createElement("script");u.addEventListener("load",o);u.addEventListener("error",o);u.src=r+e[s];document.head.appendChild(u)}}window["sap-ui-optimized"]=window["sap-ui-optimized"]||/\.head/.test(n)&&!/pending/.test(n);window["sap-ui-debug-no-reboot"]=true;n(["ui5loader.js"],function(){n(["sap/ui/test/starter/_configureLoader.js"],function(){n(["ui5loader-autoconfig.js"],function(){sap.ui.require(["sap/ui/test/starter/_setupAndStart"])})})})})();
//# sourceMappingURL=runTest.js.map