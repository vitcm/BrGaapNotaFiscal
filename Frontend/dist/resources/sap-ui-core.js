/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(e){"use strict";var r,i,t,s,o,c,u=false;c=document.getElementById("sap-ui-bootstrap");if(c){t=c.getAttribute("src");s=t.match(/^(?:[^?#]*\/)?resources\//i);if(s){o=s[0]}}if(o==null){r=document.getElementsByTagName("script");for(i=0;i<r.length;i++){t=r[i].getAttribute("src");if(t){s=t.match(/^([^?#]*\/)sap-ui-core\.js(?:[?#]|$)/i);if(s){o=s[1];break}}}}if(o==null){throw new Error("sap-ui-core.js: could not identify script tag!")}for(i=0;i<e.length;i++){t=e[i];if(t.indexOf("raw:")===0){t=o+t.slice(4);document.write('<script src="'+t+'"><\/script>')}else if(t.indexOf("require:")===0){t=t.slice(8);u=u||t==="sap/ui/core/Core";document.write('<script>sap.ui.requireSync("'+t+'");<\/script>')}}if(u){document.write("<script>sap.ui.getCore().boot && sap.ui.getCore().boot();<\/script>")}})(["raw:ui5loader.js","raw:ui5loader-autoconfig.js","require:sap/ui/core/Core"]);
//# sourceMappingURL=sap-ui-core.js.map