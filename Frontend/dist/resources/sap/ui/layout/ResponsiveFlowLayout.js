/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./ResponsiveFlowLayoutData","./library","sap/ui/core/ResizeHandler","./ResponsiveFlowLayoutRenderer","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/rect"],function(t,e,i,r,n,jQuery){"use strict";var o=t.extend("sap.ui.layout.ResponsiveFlowLayout",{metadata:{library:"sap.ui.layout",properties:{responsive:{type:"boolean",group:"Misc",defaultValue:true}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}}});(function(){o.prototype.init=function(){this._rows=[];this._bIsRegistered=false;this._proxyComputeWidths=s.bind(this);this._iRowCounter=0};o.prototype.exit=function(){delete this._rows;if(this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}if(this._resizeHandlerComputeWidthsID){r.deregister(this._resizeHandlerComputeWidthsID)}delete this._resizeHandlerComputeWidthsID;delete this._proxyComputeWidths;if(this.oRm){this.oRm.destroy();delete this.oRm}delete this._$DomRef;delete this._oDomRef;delete this._iRowCounter};var t=function(t){var i=t.getContent();var r=[];var n=-1;var o={},a={};var s="";var l;var d=0,u=0,f=0;var g=false,p=false,c=false;for(var v=0;v<i.length;v++){d=e.MIN_WIDTH;u=e.WEIGHT;g=e.LINEBREAK;p=e.MARGIN;c=e.LINEBREAKABLE;l=h(i[v]);if(l instanceof e){g=l.getLinebreak();d=l.getMinWidth();u=l.getWeight();p=l.getMargin();c=l.getLinebreakable()}if(n<0||g){n++;r.push({height:-1,cont:[]})}f=r[n].cont.length;s=i[v].getId()+"-cont"+n+"_"+f;o={minWidth:d,weight:u,linebreakable:c,padding:p,control:i[v],id:s,breakWith:[]};var m=false;if(!c){for(var _=f;_>0;_--){a=r[n].cont[_-1];if(a.linebreakable){a.breakWith.push(o);m=true;break}}}if(!m){r[n].cont.push(o)}}t._rows=r};var i=function(t,e,i){var r=[];var n=1e7;var o=-1;var a=function(e){var i=jQuery(document.getElementById(t.cont[e].id));if(i.length>0){var a=i[0].offsetLeft;if(n>=a){r.push({cont:[]});o++}n=a;r[o].cont.push(t.cont[e])}};if(sap.ui.getCore().getConfiguration().getRTL()){for(var s=t.cont.length-1;s>=0;s--){a(s)}}else{for(var s=0;s<t.cont.length;s++){a(s)}}return r};var n=function(t,e){var i=[];var r=-1;var n=0;var o=0;var a=0;var s=0,h=0;var l=0,d=0;for(l=0;l<t.cont.length;l++){n=0;o=0;for(d=a;d<=l;d++){o=o+t.cont[d].weight}for(d=a;d<=l;d++){s=e/o*t.cont[d].weight;s=Math.floor(s);h=t.cont[d].minWidth;n+=Math.max(s,h)}if(r==-1||n>e){i.push({cont:[]});if(r!==-1){a=l}r++}i[r].cont.push(t.cont[l])}return i};var a=function(t,e){if(t.length!=e.length){return true}for(var i=0;i<t.length;i++){if(t[i].cont.length!=e[i].cont.length){return true}}return false};o.prototype.renderContent=function(t,e){var i=t,r=0,n=[],o=0,a=0,s=0,h=0,l=0,d=0,u,f=0,g=0,p=[],c=[],v=this.getId(),m="",_=this._getRenderManager();for(o=0;o<i.length;o++){d=0;n.length=0;r=100;c.length=0;c.push("sapUiRFLRow");if(i[o].cont.length<=1){c.push("sapUiRFLCompleteRow")}var C=v+"-row"+this._iRowCounter;var R={};_.writeHeader(C,R,c);l=0;for(a=0;a<i[o].cont.length;a++){l+=i[o].cont[a].weight}for(s=0;s<i[o].cont.length;s++){u=i[o].cont[s];f=0;g=0;if(u.breakWith.length>0){f=u.weight;g=u.minWidth;for(var w=0;w<u.breakWith.length;w++){f+=u.breakWith[w].weight;g+=u.breakWith[w].minWidth}}m=i[o].cont[s].id;c.length=0;R={"min-width":u.breakWith.length>0?g:u.minWidth};d=100/l*u.weight;var y=R["min-width"]/e*100;var W=Math.ceil(y);var I=Math.floor(d);if(I!==100&&W>I){d=W}else{d=I}d=r<d?r:d;r-=d;n.push(d);if(r>0&&s===i[o].cont.length-1){d+=r}c.push("sapUiRFLContainer");R["width"]=d+"%";R["min-width"]=R["min-width"]+"px";_.writeHeader(m,R,c);c.length=0;c.push("sapUiRFLContainerContent");if(u.breakWith.length>0){c.push("sapUiRFLMultiContainerContent")}if(u.padding){c.push("sapUiRFLPaddingClass")}var D=this._addContentClass(u.control,s);if(D){c.push(D)}R={};_.writeHeader("",R,c);if(u.breakWith.length>0){m=i[o].cont[s].id+"-multi0";c.length=0;R={"min-width":g+"px"};var b=100/f*u.weight;b=Math.floor(b);p.push(b);c.push("sapUiRFLMultiContent");R["width"]=b+"%";if(i[o].cont[s].padding){c.push("sapUiRFLPaddingClass")}_.writeHeader(m,R,c);var L=b;_.renderControl(u.control);_.close("div");for(h=0;h<u.breakWith.length;h++){m=u.breakWith[h].id+"-multi"+(h+1);c.length=0;R={"min-width":u.breakWith[h].minWidth+"px"};b=100/f*u.breakWith[h].weight;b=Math.floor(b);p.push(b);L+=b;if(L<100&&h===u.breakWith.length-1){b+=100-L}c.push("sapUiRFLMultiContent");R["width"]=b+"%";if(u.breakWith[h].padding){c.push("sapUiRFLPaddingClass")}_.writeHeader(m,R,c);_.renderControl(u.breakWith[h].control);_.close("div")}}else{_.renderControl(u.control)}_.close("div");_.close("div")}_.close("div");this._iRowCounter++}};var s=function(){this._iRowCounter=0;this._oDomRef=this.getDomRef();if(this._oDomRef){var t=this.getId();var e=jQuery(this._oDomRef).width();var o=false;if(this._rows){for(var s=0;s<this._rows.length;s++){var h=jQuery(document.getElementById(t+"-row"+s));var l=n(this._rows[s],e);var d=i(this._rows[s],h,this);o=a(d,l);var u=this._getElementRect(h);var f=this._rows[s].oRect;if(u&&f){o=o||u.width!==f.width&&u.height!==f.height}if(this._bLayoutDataChanged||o){this._oDomRef.innerHTML="";this._bLayoutDataChanged=false;this.renderContent(l,e)}}if(this._oDomRef.innerHTML===""){this._getRenderManager().flush(this._oDomRef);for(var s=0;s<this._rows.length;s++){var g=this._getElementRect(jQuery(document.getElementById(t+"-row"+s)));this._rows[s].oRect=g}}if(this._rows.length===0){if(this._resizeHandlerComputeWidthsID){r.deregister(this._resizeHandlerComputeWidthsID);delete this._resizeHandlerComputeWidthsID}}}}};o.prototype.onBeforeRendering=function(){t(this);if(this._resizeHandlerFullLengthID){r.deregister(this._resizeHandlerFullLengthID);delete this._resizeHandlerFullLengthID}};o.prototype.onAfterRendering=function(){this._oDomRef=this.getDomRef();this._$DomRef=jQuery(this._oDomRef);this._proxyComputeWidths();if(this.getResponsive()){if(!this._resizeHandlerComputeWidthsID){this._resizeHandlerComputeWidthsID=r.register(this,o.prototype.rerender.bind(this))}}else{if(this._resizeHandlerComputeWidthsID){r.deregister(this._resizeHandlerComputeWidthsID);delete this._resizeHandlerComputeWidthsID}}};o.prototype.onThemeChanged=function(e){if(e.type==="LayoutDataChange"){this._bLayoutDataChanged=true}if(!this._resizeHandlerComputeWidthsID){this._resizeHandlerComputeWidthsID=r.register(this,o.prototype.rerender.bind(this))}t(this);this._proxyComputeWidths()};o.prototype.onLayoutDataChange=o.prototype.onThemeChanged;var h=function(t){var i=t.getLayoutData();if(!i){return undefined}else if(i instanceof e){return i}else if(i.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){var r=i.getMultipleLayoutData();for(var n=0;n<r.length;n++){var o=r[n];if(o instanceof e){return o}}}};o.prototype.addContent=function(t){if(t&&this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}this.addAggregation("content",t);return this};o.prototype.insertContent=function(t,e){if(t&&this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}this.insertAggregation("content",t,e);return this};o.prototype.removeContent=function(t){if(t&&this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined}this.removeAggregation("content",t)};o.prototype._getAccessibleRole=function(){return null};o.prototype._addContentClass=function(t,e){return null};o.prototype._getElementRect=function(t){var e=t&&t.rect();if(e){e.height=e.height.toFixed(1);e.width=e.width.toFixed(1)}return e};o.prototype._getRenderManager=function(){if(!this.oRm){this.oRm=sap.ui.getCore().createRenderManager();this.oRm.writeHeader=function(t,e,i){this.openStart("div",t);if(e){for(var r in e){if(r==="width"&&e[r]==="100%"){this.class("sapUiRFLFullLength")}this.style(r,e[r])}}for(var n=0;n<i.length;n++){this.class(i[n])}this.openEnd()}}return this.oRm}})();return o});
//# sourceMappingURL=ResponsiveFlowLayout.js.map