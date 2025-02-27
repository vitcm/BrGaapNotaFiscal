/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/support/techinfo/moduleTreeHelper","sap/ui/Device","sap/ui/Global","sap/ui/core/format/DateFormat","sap/ui/model/resource/ResourceModel","sap/ui/model/json/JSONModel","sap/ui/thirdparty/URI","sap/m/MessageBox","sap/m/MessageToast","sap/ui/core/support/Support","sap/ui/model/ValidateException","sap/m/library","sap/ui/util/Storage","sap/ui/core/syncStyleClass","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,t,o,s,i,r,a,n,u,p,_,l,g,h,c,jQuery){"use strict";return{_MIN_UI5VERSION_SUPPORT_ASSISTANT:"1.47",_MIN_EXPAND_LEVEL_DEBUG_MODULES:3,_SUPPORT_ASSISTANT_POPOVER_ID:"technicalInfoDialogAssistantPopover",_DEBUG_MODULES_ID:"TechnicalInfoDialogDebugModules",_TECHNICAL_INFO_DIALOG_ID:"technicalInfoDialog",_LOCAL_STORAGE_KEYS:{STANDARD_URL:"sap-ui-standard-bootstrap-URL",CUSTOM_URL:"sap-ui-custom-bootstrap-URL",LOCATION:"sap-ui-selected-location",OPEN_IN_NEW_WINDOW:"sap-ui-open-sa-in-new-window"},_storage:new g(g.Type.local),_treeHelper:e,open:function(e){if(this._oDialog&&this._oDialog.isOpen()){return}this._oModuleSystemInfo=e()||{};if(!this._oDialog){this._oDialog=sap.ui.xmlfragment(this._TECHNICAL_INFO_DIALOG_ID,"sap.ui.core.support.techinfo.TechnicalInfo",this)}this._initialize();this._oDialog.open()},close:function(){this._oDialog.close();this._oDialog.destroy();this._oDialog=null;if(this._oAssistantPopover){this._oAssistantPopover.destroy();this._oAssistantPopover=null}if(this._oDebugPopover){this._oDebugPopover.destroy();this._oDebugPopover=null}},onShowHelp:function(){l.URLHelper.redirect("https://ui5.sap.com/#/topic/616a3ef07f554e20a3adf749c11f64e9.html#loio616a3ef07f554e20a3adf749c11f64e9",true)},onShowVersion:function(){l.URLHelper.redirect(sap.ui.resource("","sap-ui-version.json"),true)},onCopyTechnicalInfoToClipboard:function(){var e=this._oDialog.getModel("view"),t=e.getProperty("/ProductName")+": "+e.getProperty("/ProductVersion")+" "+this._getControl("versionBuiltAt",this._TECHNICAL_INFO_DIALOG_ID).getText(),o="OpenUI5 Version: "+e.getProperty("/OpenUI5ProductVersion")+" "+this._getControl("versionOpenUI5BuiltAt",this._TECHNICAL_INFO_DIALOG_ID).getText(),s=t+"\r\n"+(e.getProperty("/OpenUI5ProductVersion")?o+"\r\n":"")+this._getText("TechInfo.UserAgent.Label")+": "+e.getProperty("/UserAgent")+"\r\n"+this._getText("TechInfo.AppUrl.Label")+": "+e.getProperty("/ApplicationURL")+"\r\n";this._copyToClipboard(s,"TechInfo.CopyToClipboard")},onConfigureDebugModulesCopyToClipboard:function(){var e=this._oDialog.getModel("view"),t=e.getProperty("/DebugModules")[0],o="sap-ui-debug="+this._treeHelper.toDebugInfo(t);this._copyToClipboard(o,"TechInfo.DebugModulesCopyToClipboard")},onDebugSources:function(e){var t=e.getParameter("selected");this._confirmReload(function(){this._reloadWithParameter("sap-ui-debug",t)}.bind(this),function(){var e=this._oDialog.getModel("view");e.setProperty("/DebugMode",!e.getProperty("/DebugMode"))}.bind(this))},onConfigureDebugModules:function(){var e=this._oDialog.getModel("view"),t;if(this._oDebugPopover&&this._oDebugPopover.isOpen()){return}t=this._treeHelper.toTreeModel(this._oModuleSystemInfo);e.setProperty("/DebugModules",[t.tree]);this._updateTreeInfos();if(!this._oDebugPopover){this._oDebugPopover=sap.ui.xmlfragment(this._DEBUG_MODULES_ID,"sap.ui.core.support.techinfo.TechnicalInfoDebugDialog",this);this._oDialog.addDependent(this._oDebugPopover);h(this._getContentDensityClass(),this._oDialog,this._oDebugPopover);var o=this._getControl("customDebugValue",this._DEBUG_MODULES_ID);try{this._validateCustomDebugValue(o.getValue())}catch(e){this._showError(o,e.message);return}}this._getControl("tree",this._DEBUG_MODULES_ID).expandToLevel(Math.max(this._MIN_EXPAND_LEVEL_DEBUG_MODULES,t.depth));this._oDebugPopover.open()},onConfigureDebugModulesConfirm:function(){this._confirmReload(function(){var e=this._oDialog.getModel("view");this._reloadWithParameter("sap-ui-debug",e.getProperty("/CustomDebugMode"))}.bind(this))},onConfigureDebugModulesClose:function(){this.onConfigureDebugModulesReset();this._oDebugPopover.close()},onConfigureDebugModuleSelect:function(e){var t=this._oDialog.getModel("view"),o=e.getParameter("listItem"),s=o.getItemNodeContext(),i=s.context.getPath(),r=t.getProperty(i),a=this._getControl("customDebugValue",this._DEBUG_MODULES_ID);this._resetValueState(a);this._treeHelper.recursiveSelect(r,o.getSelected());this._updateTreeInfos()},onChangeCustomDebugMode:function(){var e=this._oDialog.getModel("view"),t=this._getControl("customDebugValue",this._DEBUG_MODULES_ID),o;try{this._validateCustomDebugValue(t.getValue())}catch(e){this._showError(t,e.message);return}if(e.getProperty("/CustomDebugMode")==="true"){e.setProperty("/CustomDebugMode",true)}if(e.getProperty("/CustomDebugMode")==="false"){e.setProperty("/CustomDebugMode",false)}window["sap-ui-debug"]=e.getProperty("/CustomDebugMode");o=this._treeHelper.toTreeModel(this._oModuleSystemInfo);e.setProperty("/DebugModules",[o.tree]);this._getControl("tree",this._DEBUG_MODULES_ID).expandToLevel(Math.max(this._MIN_EXPAND_LEVEL_DEBUG_MODULES,o.depth));this._updateTreeInfos()},onConfigureDebugModulesReset:function(){var e=this._oDialog.getModel("view"),t=e.getProperty("/DebugModules")[0];this._treeHelper.recursiveSelect(t,false);this._updateTreeInfos()},onOpenDiagnostics:function(){var e=p.getStub();if(e.getType()!=p.StubType.APPLICATION){return}e.openSupportTool();this.close()},onOpenTestRecorderInIFrame:function(){this.close();sap.ui.require(["sap/ui/testrecorder/Bootstrap"],function(e){e.init(["true"])},function(e){c.error("Could not load module 'sap/ui/testrecorder/Bootstrap'! Details: "+e)})},onOpenAssistant:function(){var e=this._oDialog.getModel("view"),t=e.getProperty("/SelectedLocation"),o=e.getProperty("/StandardBootstrapURL"),s=e.getProperty("/CustomBootstrapURL"),i=[],r;e.getProperty("/SupportAssistantPopoverURLs").forEach(function(e){i.push(e.Value)});if(i.indexOf(o)===-1&&t==="standard"){t="custom";s=o;e.setProperty("/SelectedLocation",t);this._storage.put(this._LOCAL_STORAGE_KEYS.STANDARD_URL,i[0]);e.setProperty("/StandardBootstrapURL",this._storage.get(this._LOCAL_STORAGE_KEYS.STANDARD_URL))}if(t==="standard"){r=o}else if(s){if(!s.match(/\/$/)){s+="/"}this._storage.put(this._LOCAL_STORAGE_KEYS.CUSTOM_URL,s);e.setProperty("/CustomBootstrapURL",this._storage.get(this._LOCAL_STORAGE_KEYS.CUSTOM_URL));r=s}this._startAssistant(r)},onSelectBootstrapOption:function(e){var t=e.getSource().getId().split("--").pop();this._setActiveLocations(t)},onChangeStandardBootstrapURL:function(e){var t=e.getParameter("selectedItem").getKey(),o=e.getSource();this._storage.put(this._LOCAL_STORAGE_KEYS.STANDARD_URL,t);this._resetValueState(o);this._pingUrl(t,o).then(function e(){o.setValueState("Success")},function e(){var t=this._getText("TechInfo.SupportAssistantConfigPopup.NotAvailableAtTheMoment");this._showError(o,t);c.error("Support Assistant could not be loaded from the URL you entered")})},onLiveChangeCustomBootstrapURL:function(e){var t=e.getParameter("value"),o=e.getSource();this._storage.put(this._LOCAL_STORAGE_KEYS.CUSTOM_URL,t);try{this._validateValue(o.getValue());this._resetValueState(o)}catch(e){this._showError(o,e.message)}},onChangeOpenInNewWindow:function(e){var t=e.getParameter("selected");this._storage.put(this._LOCAL_STORAGE_KEYS.OPEN_IN_NEW_WINDOW,t)},onConfigureAssistantBootstrap:function(e){if(this._oAssistantPopover&&this._oAssistantPopover.isOpen()){return}if(!this._oAssistantPopover){this._oAssistantPopover=sap.ui.xmlfragment(this._SUPPORT_ASSISTANT_POPOVER_ID,"sap.ui.core.support.techinfo.TechnicalInfoAssistantPopover",this);this._oAssistantPopover.attachAfterOpen(this._onAssistantPopoverOpened,this);this._oDialog.addDependent(this._oAssistantPopover);h(this._getContentDensityClass(),this._oDialog,this._oAssistantPopover);var t=this._getControl("customBootstrapURL",this._SUPPORT_ASSISTANT_POPOVER_ID);sap.ui.getCore().getMessageManager().registerObject(t,true)}var o=this._getControl("standardBootstrapURL",this._SUPPORT_ASSISTANT_POPOVER_ID).getItems()[0];if(this._isVersionBiggerThanMinSupported()){var s=sap.ui.getCore().getConfiguration().getVersion().toString();o.setText(o.getText().replace("[[version]]",s));o.setEnabled(true)}else{o.setText(o.getText().replace("[[version]]","not supported"));o.setEnabled(false)}var i=this._oDialog.getModel("view"),r=i.getProperty("/SelectedLocation");this._setActiveLocations(r);var a=this._getControl("supportAssistantSettingsButton",this._TECHNICAL_INFO_DIALOG_ID);this._oAssistantPopover.openBy(a)},_getText:function(e,t){return sap.ui.getCore().getLibraryResourceBundle().getText(e,t)},_validateValue:function(e){var t=/^https?:\/\/(www\.)?([-a-zA-Z0-9.%_+~#=]{2,})([-a-zA-Z0-9@:%_+.~#?&/=]*)\/sap\/ui\/support\/?$/,o=window.location.protocol;if(e&&!e.match(t)){throw new _(this._getText("TechInfo.SupportAssistantConfigPopup.URLValidationMessage"))}if(e&&o==="https:"&&!e.match(o)){throw new _(this._getText("TechInfo.SupportAssistantConfigPopup.ProtocolError"))}return true},_validateCustomDebugValue:function(e){var t=/^(true|false|x|X)$|^(([a-zA-Z*[\]{}()+?.\\^$|]+\/?)+(,([a-zA-Z*[\]{}()+?.\\^$|]+\/?)+)*)$/;if(e&&!e.match(t)){throw new _(this._getText("TechInfo.DebugModulesConfigPopup.ModeValidationMessage"))}return true},_convertBuildDate:function(e){var t=s.getInstance({pattern:"yyyyMMdd-HHmmss"});return t.parse(e)},_getContentDensityClass:function(){if(!this._sContentDensityClass){if(!t.support.touch){this._sContentDensityClass="sapUiSizeCompact"}else{this._sContentDensityClass="sapUiSizeCozy"}}return this._sContentDensityClass},_startAssistant:function(e){var t=this._oDialog.getModel("view"),o={support:"true",window:t.getProperty("/OpenSupportAssistantInNewWindow")};this._loadAssistant(e,o)},_loadAssistant:function(e,t){this._pingUrl(e).then(function o(){this.close();var s=[t.support];sap.ui.getCore().loadLibrary("sap.ui.support",{async:true,url:e}).then(function(){if(t.window){s.push("window")}if(s[0].toLowerCase()==="true"||s[0].toLowerCase()==="silent"){sap.ui.require(["sap/ui/support/Bootstrap"],function(e){e.initSupportRules(s)})}})},function e(t,o){var s=this._getText("TechInfo.SupportAssistantConfigPopup.SupportAssistantNotFound");if(t.status===0){s+=this._getText("TechInfo.SupportAssistantConfigPopup.ErrorTryingToGetRecourse")}else if(t.status===404){s+=this._getText("TechInfo.SupportAssistantConfigPopup.ErrorNotFound")}else if(t.status===500){s+=this._getText("TechInfo.SupportAssistantConfigPopup.InternalServerError")}else if(o==="parsererror"){s+=this._getText("TechInfo.SupportAssistantConfigPopup.ErrorOnJsonParse")}else if(o==="timeout"){s+=this._getText("TechInfo.SupportAssistantConfigPopup.ErrorOnTimeout")}else if(o==="abort"){s+=this._getText("TechInfo.SupportAssistantConfigPopup.ErrorWhenAborted")}else{s+=this._getText("TechInfo.SupportAssistantConfigPopup.UncaughtError")+t.responseText}this._sErrorMessage=s;this.onConfigureAssistantBootstrap();c.error("Support Assistant could not be loaded from the URL you entered")})},_initialize:function(){var e=new i({bundleName:"sap.ui.core.messagebundle"});this._oDialog.setModel(e,"i18n");this._oDialog.setModel(this._createViewModel(),"view");this._oDialog.addStyleClass(this._getContentDensityClass())},_createViewModel:function(){var e=new a(sap.ui.require.toUrl(""),window.location.origin+window.location.pathname)+"/sap/ui/support/",t="standard",s=false;this._saveLocalStorageDefault(this._LOCAL_STORAGE_KEYS.STANDARD_URL,e);this._saveLocalStorageDefault(this._LOCAL_STORAGE_KEYS.LOCATION,t);this._saveLocalStorageDefault(this._LOCAL_STORAGE_KEYS.OPEN_IN_NEW_WINDOW,s);var i=new r({ProductName:"SAPUI5",StandardBootstrapURL:this._storage.get(this._LOCAL_STORAGE_KEYS.STANDARD_URL),CustomBootstrapURL:this._storage.get(this._LOCAL_STORAGE_KEYS.CUSTOM_URL),OpenSupportAssistantInNewWindow:this._storage.get(this._LOCAL_STORAGE_KEYS.OPEN_IN_NEW_WINDOW),SelectedLocation:this._storage.get(this._LOCAL_STORAGE_KEYS.LOCATION),OpenUI5ProductVersion:null,OpenUI5ProductTimestamp:null,DebugModuleSelectionCount:0});var n={};try{n=o.getVersionInfo();i.setProperty("/ProductName",n.name);i.setProperty("/ProductVersion",n.version)}catch(e){n.version="";c.error("failed to load global version info")}try{i.setProperty("/ProductTimestamp",this._generateLocalizedBuildDate(n.buildTimestamp))}catch(e){c.error("failed to parse build timestamp from global version info")}if(!/openui5/i.test(n.name)){i.setProperty("/OpenUI5ProductVersion",o.version);try{i.setProperty("/OpenUI5ProductTimestamp",this._generateLocalizedBuildDate(o.buildinfo.buildtime))}catch(e){c.error("failed to parse OpenUI5 build timestamp from global version info")}}var u;try{u=this._getText("TechInfo.SupportAssistantConfigPopup.AppVersionOption",n.version)}catch(e){u="Application"}var p=[{DisplayName:u,Value:e},{DisplayName:"OpenUI5 CDN",Value:"https://openui5.hana.ondemand.com/resources/sap/ui/support/"},{DisplayName:"OpenUI5 (Nightly)",Value:"https://openui5nightly.hana.ondemand.com/resources/sap/ui/support/"},{DisplayName:"OpenUI5 (Beta)",Value:"https://openui5beta.hana.ondemand.com/resources/sap/ui/support/"},{DisplayName:"SAPUI5 CDN",Value:"https://sapui5.hana.ondemand.com/resources/sap/ui/support/"}];var _=this._getText("TechInfo.DebugModulesConfigPopup.SelectionCounter",i.DebugModuleSelectionCount);i.setProperty("/DebugModulesTitle",_);i.setProperty("/SupportAssistantPopoverURLs",p);i.setProperty("/ApplicationURL",document.location.href);i.setProperty("/UserAgent",navigator.userAgent);i.setProperty("/DebugMode",sap.ui.getCore().getConfiguration().getDebug());if(!this._isVersionBiggerThanMinSupported()){i.setProperty("/StandardBootstrapURL",p[2].Value);this._storage.put(this._LOCAL_STORAGE_KEYS.STANDARD_URL,p[2].Value)}i.setSizeLimit(1e5);return i},_saveLocalStorageDefault:function(e,t){if(!this._storage.get(e)){this._storage.put(e,t)}},_isVersionBiggerThanMinSupported:function(){var e=sap.ui.getCore().getConfiguration().getVersion();if(e&&e.compareTo(this._MIN_UI5VERSION_SUPPORT_ASSISTANT)>=0){return true}return false},_generateLocalizedBuildDate:function(e){var t=s.getDateInstance({pattern:"dd.MM.yyyy HH:mm:ss"}),o=t.format(this._convertBuildDate(e));return this._getText("TechInfo.VersionBuildTime.Text",o)},_setActiveLocations:function(e){var t=this._oDialog.getModel("view"),o=this._getControl("standard",this._SUPPORT_ASSISTANT_POPOVER_ID),s=this._getControl("custom",this._SUPPORT_ASSISTANT_POPOVER_ID),i=this._getControl("customBootstrapURL",this._SUPPORT_ASSISTANT_POPOVER_ID),r=this._getControl("standardBootstrapURL",this._SUPPORT_ASSISTANT_POPOVER_ID),a;this._resetValueState(i);this._resetValueState(r);if(e==="standard"){a=true;t.setProperty("/StandardBootstrapURL",this._storage.get(this._LOCAL_STORAGE_KEYS.STANDARD_URL));r.setSelectedKey(t.getProperty("/StandardBootstrapURL"))}else{a=false}r.setEnabled(a);o.setSelected(a);i.setEnabled(!a);s.setSelected(!a);this._storage.put(this._LOCAL_STORAGE_KEYS.LOCATION,e);t.setProperty("/SelectedLocation",this._storage.get(this._LOCAL_STORAGE_KEYS.LOCATION))},_confirmReload:function(e,t){n.confirm(this._getText("TechInfo.DebugSources.ConfirmMessage"),{title:this._getText("TechInfo.DebugSources.ConfirmTitle"),onClose:function(o){if(o===n.Action.OK){e()}else if(t){t()}}})},_onAssistantPopoverOpened:function(){var e=this._oDialog.getModel("view"),t=e.getProperty("/SelectedLocation"),o;if(t==="custom"){o=this._getControl("customBootstrapURL",this._SUPPORT_ASSISTANT_POPOVER_ID);var s=o.getValue();try{this._validateValue(s)}catch(e){this._showError(o,e.message);if(this._sErrorMessage){this._sErrorMessage=null}return}}else{o=this._getControl("standardBootstrapURL",this._SUPPORT_ASSISTANT_POPOVER_ID)}if(this._sErrorMessage){this._showError(o,this._sErrorMessage);this._sErrorMessage=null}},_showError:function(e,t){e.setValueStateText(t);e.setValueState("Error");e.openValueStateMessage()},_resetValueState:function(e){e.setValueState("None");e.closeValueStateMessage()},_pingUrl:function(e){return jQuery.ajax({type:"HEAD",async:true,context:this,url:e+"Bootstrap.js"})},_getControl:function(e,t){if(t){return sap.ui.getCore().byId(t+"--"+e)}return sap.ui.getCore().byId(e)},_reloadWithParameter:function(e,t){var o=window.location.search,s=e+"="+t;if(o&&o!=="?"){var i=new RegExp("(?:^|\\?|&)"+e+"=[^&]+");if(o.match(i)){o=o.replace(i,s)}else{o+="&"+s}}else{o="?"+s}window.location.search=o},_copyToClipboard:function(e,t){var o=jQuery("<textarea>");try{jQuery("body").append(o);o.val(e).trigger("select");document.execCommand("copy");o.remove();u.show(this._getText(t+".Success"))}catch(e){u.show(this._getText(t+".Error"))}},_updateTreeInfos:function(){var e=this._oDialog.getModel("view"),t=e.getProperty("/DebugModules")[0],o;e.setProperty("/CustomDebugMode",this._treeHelper.toDebugInfo(t));e.setProperty("/DebugModuleSelectionCount",this._treeHelper.getSelectionCount(t));o=e.getProperty("/DebugModuleSelectionCount").toString();e.setProperty("/DebugModulesTitle",this._getText("TechInfo.DebugModulesConfigPopup.SelectionCounter",o))}}});
//# sourceMappingURL=TechnicalInfo.js.map