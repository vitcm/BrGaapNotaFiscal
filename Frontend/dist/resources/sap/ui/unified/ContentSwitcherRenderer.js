/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/library","sap/base/security/encodeXML"],function(t,e){"use strict";var i=t.ContentSwitcherAnimation;var n={};n.render=function(t,n){var r=n.getId();var s=n.getAnimation();if(!sap.ui.getCore().getConfiguration().getAnimation()){s=i.None}var a=n.getActiveContent();t.write("<div");t.writeControlData(n);t.addClass("sapUiUfdCSwitcher");t.addClass("sapUiUfdCSwitcherAnimation"+e(s));t.writeClasses();t.write(">");t.write('<section id="'+r+'-content1" class="sapUiUfdCSwitcherContent sapUiUfdCSwitcherContent1'+(a==1?" sapUiUfdCSwitcherVisible":"")+'">');this.renderContent(t,n.getContent1());t.write("</section>");t.write('<section id="'+r+'-content2" class="sapUiUfdCSwitcherContent sapUiUfdCSwitcherContent2'+(a==2?" sapUiUfdCSwitcherVisible":"")+'">');this.renderContent(t,n.getContent2());t.write("</section>");t.write("</div>")};n.renderContent=function(t,e){for(var i=0;i<e.length;++i){t.renderControl(e[i])}};return n},true);
//# sourceMappingURL=ContentSwitcherRenderer.js.map