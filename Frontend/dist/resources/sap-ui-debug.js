/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap-ui-debug");(function(e){"use strict";var r,i,t,s,u,a,o=false;a=document.getElementById("sap-ui-bootstrap");if(a){t=a.getAttribute("src");s=t.match(/^(?:.*\/)?resources\//i);if(s){u=s[1]}}if(u==null){r=document.getElementsByTagName("script");for(i=0;i<r.length;i++){t=r[i].getAttribute("src");if(t){s=t.match(/(.*\/)sap-ui-core.*\.js$/i);if(s){u=s[1];break}}}}if(u==null){throw new Error("sap-ui-debug.js: could not identify script tag!")}for(i=0;i<e.length;i++){t=e[i];if(t.indexOf("raw:")===0){t=u+t.slice(4);document.write('<script src="'+t+'"><\/script>')}else if(t.indexOf("require:")===0){t=t.slice(8);o=o||t==="sap.ui.core.Core";document.write('<script>jQuery.sap.require("'+t+'");<\/script>')}}if(o){document.write("<script>sap.ui.getCore().boot && sap.ui.getCore().boot();<\/script>")}})(["raw:sap/ui/debug/ControlTree.js","raw:sap/ui/debug/Highlighter.js","raw:sap/ui/debug/LogViewer.js","raw:sap/ui/debug/PropertyList.js","raw:sap/ui/debug/DebugEnv.js"]);
//# sourceMappingURL=sap-ui-debug.js.map