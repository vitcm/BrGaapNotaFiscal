/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.getCore().loadLibrary("sap.ui.unified");sap.ui.define(["sap/ui/core/Control","sap/ui/core/Icon","sap/ui/events/KeyCodes","sap/base/Log","sap/base/util/deepEqual","sap/m/library","sap/m/Button","sap/m/Dialog","sap/m/List","sap/m/MessageBox","sap/m/OverflowToolbar","sap/m/StandardListItem","sap/m/Text","sap/m/ToolbarSpacer","sap/ui/unified/FileUploader","sap/m/upload/UploadSetItem","sap/m/upload/Uploader","sap/m/upload/UploadSetRenderer","sap/m/upload/UploaderHttpRequestMethod"],function(e,t,o,i,a,s,r,n,l,p,d,h,m,g,u,f,c,_,y){"use strict";var I=e.extend("sap.m.upload.UploadSet",{metadata:{library:"sap.m",properties:{fileTypes:{type:"string[]",defaultValue:null},maxFileNameLength:{type:"int",defaultValue:null},maxFileSize:{type:"float",defaultValue:null},mediaTypes:{type:"string[]",defaultValue:null},noDataText:{type:"string",defaultValue:null},noDataDescription:{type:"string",defaultValue:null},instantUpload:{type:"boolean",defaultValue:true},showIcons:{type:"boolean",defaultValue:true},terminationEnabled:{type:"boolean",defaultValue:true},uploadEnabled:{type:"boolean",defaultValue:true},uploadUrl:{type:"string",defaultValue:null},httpRequestMethod:{type:"sap.m.upload.UploaderHttpRequestMethod",defaultValue:y.Post}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.upload.UploadSetItem",multiple:true,singularName:"item"},incompleteItems:{type:"sap.m.upload.UploadSetItem",multiple:true,singularName:"incompleteItem"},headerFields:{type:"sap.ui.core.Item",multiple:true,singularName:"headerField"},toolbar:{type:"sap.m.OverflowToolbar",multiple:false},uploader:{type:"sap.m.upload.Uploader",multiple:false}},events:{afterItemAdded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},afterItemRemoved:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},afterItemEdited:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},beforeItemAdded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeItemRemoved:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeItemEdited:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeUploadStarts:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},uploadCompleted:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},beforeUploadTermination:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},uploadTerminated:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileTypeMismatch:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileNameLengthExceeded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileSizeExceeded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},mediaTypeMismatch:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},selectionChanged:{parameters:{items:{type:"sap.m.upload.UploadSetItem[]"}}}}}});var D=s.UploadState;I.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oList=null;this._oNoDataIcon=new t(this.getId()+"-no-data-icon",{src:"sap-icon://document",size:"6rem",noTabStop:true});this._oEditedItem=null;this._oItemToBeDeleted=null;this._mListItemIdToItemMap={};this._$Body=null;this._$DragDropArea=null;this._oLastEnteredTarget=null};I.prototype.exit=function(){this._unbindDragAndDrop();this._oNoDataIcon.destroy();this._oNoDataIcon=null};I.prototype.onBeforeRendering=function(){this._unbindDragAndDrop()};I.prototype.onAfterRendering=function(){var e;if(this._oEditedItem){e=this._oEditedItem._getFileNameEdit().$("inner");if(e){e.on("focus",function(){e.selectText(0,e.val().length)});e.trigger("focus")}}this._bindDragAndDrop()};I.prototype.onkeydown=function(e){var t,i;if(this._oEditedItem&&this._oEditedItem._getFileNameEdit().$("inner")[0]===e.target){i=this._oEditedItem}else if(e.target){t=sap.ui.getCore().byId(e.target.id);if(t){i=this._mListItemIdToItemMap[t.getId()]}}if(!i){return}switch(e.keyCode){case o.F2:if(i._bInEditMode){this._handleItemEditConfirmation(e,i)}else{this._handleItemEdit(e,i)}break;case o.ESCAPE:this._handleItemEditCancelation(e,i);break;case o.DELETE:if(!i.$("fileNameEdit").hasClass("sapMInputFocused")){this._handleItemDelete(e,i)}break;case o.ENTER:if(i===this._oEditedItem){this._handleItemEditConfirmation(e,i)}else{i._handleFileNamePressed()}break;default:return}};I.prototype.getToolbar=function(){if(!this._oToolbar){this._oToolbar=this.getAggregation("toolbar");if(!this._oToolbar){this._oToolbar=new d(this.getId()+"-toolbar",{content:[this._oNumberOfAttachmentsTitle,new g,this.getDefaultFileUploader()]});this.addDependent(this._oToolbar)}else{this._oToolbar.addContent(this.getDefaultFileUploader())}}return this._oToolbar};I.prototype.getNoDataText=function(){var e=this.getProperty("noDataText");e=e||this._oRb.getText("UPLOAD_SET_NO_DATA_TEXT");return e};I.prototype.getNoDataDescription=function(){var e=this.getProperty("noDataDescription");e=e||this._oRb.getText("UPLOADCOLLECTION_NO_DATA_DESCRIPTION");return e};I.prototype.setToolbar=function(e){this.setAggregation("toolbar",e);this.getToolbar();return this};I.prototype.addAggregation=function(t,o,i){e.prototype.addAggregation.call(this,t,o,i);if(o&&(t==="items"||t==="incompleteItems")){this._projectToNewListItem(o);this._refreshInnerListStyle()}};I.prototype.insertAggregation=function(t,o,i,a){e.prototype.insertAggregation.call(this,t,o,i,a);if(o&&(t==="items"||t==="incompleteItems")){this._projectToNewListItem(o,i||0);this._refreshInnerListStyle()}};I.prototype.removeAggregation=function(t,o,i){var a;e.prototype.removeAggregation.call(this,t,o,i);if(o&&(t==="items"||t==="incompleteItems")){a=o._getListItem();var s=this.getList().removeAggregation("items",a,i);if(s){s.destroy()}this._refreshInnerListStyle()}};I.prototype.removeAllAggregation=function(t,o){if(t==="items"){this.getItems().forEach(function(e){this.getList().removeAggregation("items",e._getListItem(),o)}.bind(this))}else if(t==="incompleteItems"){this.getIncompleteItems().forEach(function(e){this.getList().removeAggregation("items",e._getListItem(),o)}.bind(this))}e.prototype.removeAllAggregation.call(this,t,o)};I.prototype.destroyAggregation=function(t,o){if(t==="items"||t==="incompleteItems"){this.removeAllAggregation(t,o)}if(this.getList().getItems().length===0){this.getList().destroyAggregation("items",o)}e.prototype.destroyAggregation.call(this,t,o)};I.prototype.setFileTypes=function(e){var t=e||null;if(typeof t==="string"){t=t.split(",")}t=(t||[]).map(function(e){return e?e.toLowerCase():""});if(!a(this.getFileTypes(),t)){this.setProperty("fileTypes",t,true);this._checkRestrictions()}return this};I.prototype.setMaxFileNameLength=function(e){if(this.getMaxFileNameLength()!==e){this.setProperty("maxFileNameLength",e,true);this._checkRestrictions()}return this};I.prototype.setMaxFileSize=function(e){if(this.getMaxFileSize()!==e){this.setProperty("maxFileSize",e,true);this._checkRestrictions()}return this};I.prototype.setMediaTypes=function(e){var t=e||null;if(typeof t==="string"){t=t.split(",")}t=(t||[]).map(function(e){return e?e.toLowerCase():""});if(!a(this.getMediaTypes(),t)){this.setProperty("mediaTypes",t,true);this._checkRestrictions()}return this};I.prototype.setShowIcons=function(e){if(e!==this.getShowIcons()){this._getAllItems().forEach(function(t){t._getIcon().setVisible(e)});this.setProperty("showIcons",e,false)}return this};I.prototype.setTerminationEnabled=function(e){if(e!==this.getTerminationEnabled()){this._getAllItems().forEach(function(t){if(t.getUploadState()===D.Uploading){t._getTerminateButton().setVisible(e)}});this.setProperty("terminationEnabled",e,false)}return this};I.prototype.setUploadEnabled=function(e){if(e!==this.getUploadEnabled()){this.getDefaultFileUploader().setEnabled(e);this.setProperty("uploadEnabled",e,false)}return this};I.prototype.getList=function(){if(!this._oList){this._oList=new l(this.getId()+"-list",{selectionChange:[this._handleSelectionChange,this],headerToolbar:this.getToolbar()});this._oList.addStyleClass("sapMUCList");this.addDependent(this._oList)}return this._oList};I.prototype.upload=function(){if(!this.getUploadEnabled()){i.warning("Upload is currently disabled for this upload set.");return}this.getIncompleteItems().forEach(function(e){this._uploadItemIfGoodToGo(e)}.bind(this))};I.prototype.uploadItem=function(e){this._uploadItemIfGoodToGo(e)};I.prototype.getDefaultFileUploader=function(){var e=this._oRb.getText("UPLOADCOLLECTION_UPLOAD");if(!this._oFileUploader){this._oFileUploader=new u(this.getId()+"-uploader",{buttonOnly:true,buttonText:e,tooltip:e,iconOnly:false,enabled:this.getUploadEnabled(),fileType:this.getFileTypes(),mimeType:this.getMediaTypes(),icon:"",iconFirst:false,multiple:true,style:"Transparent",name:"uploadSetFileUploader",sameFilenameAllowed:true,useMultipart:false,sendXHR:true,change:[this._onFileUploaderChange,this],uploadStart:[this._onUploadStarted,this],uploadProgress:[this._onUploadProgressed,this],uploadComplete:[this._onUploadCompleted,this],uploadAborted:[this._onUploadAborted,this]})}return this._oFileUploader};I.prototype.registerUploaderEvents=function(e){e.attachUploadStarted(this._onUploadStarted.bind(this));e.attachUploadProgressed(this._onUploadProgressed.bind(this));e.attachUploadCompleted(this._onUploadCompleted.bind(this));e.attachUploadAborted(this._onUploadAborted.bind(this))};I.prototype._onFileUploaderChange=function(e){var t=e.getParameter("files");this._processNewFileObjects(t)};I.prototype._onUploadStarted=function(e){var t=e.getParameter("item");t.setUploadState(D.Uploading)};I.prototype._onUploadProgressed=function(e){var t=e.getParameter("item"),o=Math.round(e.getParameter("loaded")/e.getParameter("total")*100);t.setProgress(o)};I.prototype._onUploadCompleted=function(e){var t=e.getParameter("item");t.setProgress(100);t.setUploadState(D.Complete);this.fireUploadCompleted({item:t})};I.prototype._onUploadAborted=function(e){var t=e.getParameter("item");t.setUploadState(D.Error);this.fireUploadTerminated({item:t})};I.prototype._handleItemEdit=function(e,t){if(this._oEditedItem){this._handleItemEditConfirmation(e,this._oEditedItem)}if(!this._oEditedItem){if(this.fireBeforeItemEdited({item:t})){this._oEditedItem=t;this._oEditedItem._setInEditMode(true)}}};I.prototype._handleItemRestart=function(e,t){t.setUploadState(D.Ready);this._uploadItemIfGoodToGo(t)};I.prototype._handleItemEditConfirmation=function(e,t){var o=t._getFileNameEdit(),i,a,s=t.getFileName(),r=f._splitFileName(s);i=o.getValue().trim();if(!i||i.length===0){t._setContainsError(true);return}if(r.name!==i){a=i+"."+r.extension;t.setFileName(a)}t._setContainsError(false);t._setInEditMode(false);this.fireAfterItemEdited({item:t});this._oEditedItem=null};I.prototype._handleItemEditCancelation=function(e,t){t._setContainsError(false);t._setInEditMode(false);this._oEditedItem=null};I.prototype._handleItemDelete=function(e,t){var o;if(this._oEditedItem){this._handleItemEditConfirmation(e,this._oEditedItem);if(this._oEditedItem){return}}if(!t.fireRemovePressed({item:t})){return}if(!this.fireBeforeItemRemoved({item:t})){return}if(!t.getFileName()){o=this._oRb.getText("UPLOAD_SET_DELETE_WITHOUT_FILE_NAME_TEXT")}else{o=this._oRb.getText("UPLOAD_SET_DELETE_TEXT",t.getFileName())}this._oItemToBeDeleted=t;p.show(o,{id:this.getId()+"-deleteDialog",title:this._oRb.getText("UPLOAD_SET_DELETE_TITLE"),actions:[p.Action.OK,p.Action.CANCEL],onClose:this._handleClosedDeleteDialog.bind(this),dialogId:"messageBoxDeleteFile",styleClass:this.hasStyleClass("sapUiSizeCompact")?"sapUiSizeCompact":""})};I.prototype._handleClosedDeleteDialog=function(e){if(e!==p.Action.OK){return}this.removeItem(this._oItemToBeDeleted);this.removeIncompleteItem(this._oItemToBeDeleted);this.fireAfterItemRemoved({item:this._oItemToBeDeleted});this._oItemToBeDeleted=null};I.prototype._handleTerminateRequest=function(e,t){var o=new l({items:[new h({title:t.getFileName(),icon:t._getIcon().getSrc()})]}),i=new n({id:this.getId()+"-teminateDialog",title:this._oRb.getText("UPLOAD_SET_TERMINATE_TITLE"),content:[new m({text:this._oRb.getText("UPLOAD_SET_TERMINATE_TEXT")}),o],buttons:[new r({text:this._oRb.getText("UPLOAD_SET_OKBUTTON_TEXT"),press:[a,this]}),new r({text:this._oRb.getText("UPLOAD_SET_CANCEL_BUTTON_TEXT"),press:function(){i.close()}})],afterClose:function(){i.destroy()}});i.open();function a(){if(t.getUploadState()===D.Uploading){if(this.fireBeforeUploadTermination({item:t})){this._handleUploadTermination(t)}}else if(t.getUploadState()===D.Complete){this.removeItem(t)}i.close();this.invalidate()}};I.prototype._handleUploadTermination=function(e){this._getActiveUploader().terminateItem(e)};I.prototype._handleSelectionChange=function(e){var t=e.getParameter("listItems"),o=[];t.forEach(function(e){o.push(this._mListItemIdToItemMap[e.getId()])}.bind(this));this.fireSelectionChanged({items:o})};I.prototype._onDragEnterSet=function(e){if(e.target===this._$DragDropArea[0]&&this.getUploadEnabled()){this._$DragDropArea.addClass("sapMUCDropIndicator")}};I.prototype._onDragLeaveSet=function(e){if(e.target===this._$DragDropArea[0]&&this.getUploadEnabled()){this._$DragDropArea.removeClass("sapMUCDropIndicator")}};I.prototype._onDragOverSet=function(e){e.preventDefault()};I.prototype._onDropOnSet=function(e){var t;e.preventDefault();if(e.target===this._$DragDropArea[0]&&this.getUploadEnabled()){this._$DragDropArea.removeClass("sapMUCDropIndicator");this._$DragDropArea.addClass("sapMUCDragDropOverlayHide");t=e.originalEvent.dataTransfer.files;this._processNewFileObjects(t)}};I.prototype._onDragEnterBody=function(e){if(this.getUploadEnabled()){this._oLastEnteredTarget=e.target;this._$DragDropArea.removeClass("sapMUCDragDropOverlayHide")}};I.prototype._onDragLeaveBody=function(e){if(this._oLastEnteredTarget===e.target&&this.getUploadEnabled()){this._$DragDropArea.addClass("sapMUCDragDropOverlayHide")}};I.prototype._onDragOverBody=function(e){e.preventDefault();if(this.getUploadEnabled()){this._$DragDropArea.removeClass("sapMUCDragDropOverlayHide")}};I.prototype._onDropOnBody=function(e){if(this.getUploadEnabled()){this._$DragDropArea.addClass("sapMUCDragDropOverlayHide")}};I.prototype._getAllItems=function(){return this.getItems().concat(this.getIncompleteItems())};I.prototype._refreshInnerListStyle=function(){var e=this.getList().length-1;this._oList.getItems().forEach(function(t,o){t.removeStyleClass("sapMUCListSingleItem").removeStyleClass("sapMUCListFirstItem").removeStyleClass("sapMUCListLastItem").removeStyleClass("sapMUCListItem");if(o===0&&e===0){t.addStyleClass("sapMUCListSingleItem")}else if(o===0){t.addStyleClass("sapMUCListFirstItem")}else if(o===e){t.addStyleClass("sapMUCListLastItem")}else{t.addStyleClass("sapMUCListItem")}})};I.prototype._processNewFileObjects=function(e){var t=[],o;for(var i=0;i<e.length;i++){t.push(e[i])}t.forEach(function(e){o=new f({uploadState:D.Ready});o._setFileObject(e);o.setFileName(e.name);if(!this.fireBeforeItemAdded({item:o})){return}this.insertIncompleteItem(o);this.fireAfterItemAdded({item:o});if(this.getInstantUpload()){this._uploadItemIfGoodToGo(o)}}.bind(this))};I.prototype._projectToNewListItem=function(e,t){var o=e._getListItem();this._mListItemIdToItemMap[o.getId()]=e;if(t||t===0){this.getList().insertAggregation("items",o,t,true)}else{this.getList().addAggregation("items",o,true)}this._checkRestrictionsForItem(e)};I.prototype._getImplicitUploader=function(){if(!this._oUploader){this._oUploader=new c({httpRequestMethod:this.getHttpRequestMethod()});this._oUploader.setUploadUrl(this.getUploadUrl());this.registerUploaderEvents(this._oUploader);this.addDependent(this._oUploader)}return this._oUploader};I.prototype._getActiveUploader=function(){return this.getUploader()||this._getImplicitUploader()};I.prototype._uploadItemIfGoodToGo=function(e){if(e.getUploadState()===D.Ready&&!e._isRestricted()){if(this.fireBeforeUploadStarts({item:e})){var t=e.getHeaderFields().length?e.getHeaderFields():this.getHeaderFields();this._getActiveUploader().uploadItem(e,t)}}};I.prototype._getDragDropHandlers=function(){if(!this._oDragDropHandlers){this._oDragDropHandlers={body:{dragenter:this._onDragEnterBody.bind(this),dragleave:this._onDragLeaveBody.bind(this),dragover:this._onDragOverBody.bind(this),drop:this._onDropOnBody.bind(this)},set:{dragenter:this._onDragEnterSet.bind(this),dragleave:this._onDragLeaveSet.bind(this),dragover:this._onDragOverSet.bind(this),drop:this._onDropOnSet.bind(this)}}}return this._oDragDropHandlers};I.prototype._bindDragAndDrop=function(){this._$Body=jQuery(document.body);Object.keys(this._getDragDropHandlers().body).forEach(function(e){this._$Body.on(e,this._getDragDropHandlers().body[e])}.bind(this));this._$DragDropArea=this.$("drag-drop-area");Object.keys(this._getDragDropHandlers().set).forEach(function(e){this.$().on(e,this._getDragDropHandlers().set[e])}.bind(this))};I.prototype._unbindDragAndDrop=function(){if(this._$Body){Object.keys(this._getDragDropHandlers().body).forEach(function(e){this._$Body.off(e,this._getDragDropHandlers().body[e])}.bind(this))}Object.keys(this._getDragDropHandlers().set).forEach(function(e){this.$().off(e,this._getDragDropHandlers().set[e])}.bind(this))};I.prototype._checkRestrictions=function(){this.getItems().forEach(function(e){this._checkRestrictionsForItem(e)}.bind(this));this.getIncompleteItems().forEach(function(e){this._checkRestrictionsForItem(e)}.bind(this))};I.prototype._checkRestrictionsForItem=function(e){e._checkTypeRestriction(this.getFileTypes());e._checkNameLengthRestriction(this.getMaxFileNameLength());e._checkSizeRestriction(this.getMaxFileSize());e._checkMediaTypeRestriction(this.getMediaTypes())};return I});
//# sourceMappingURL=UploadSet.js.map