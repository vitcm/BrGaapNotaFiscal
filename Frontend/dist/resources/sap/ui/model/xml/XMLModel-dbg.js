/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/**
 * XML-based DataBinding
 *
 * @namespace
 * @name sap.ui.model.xml
 * @public
 */

// Provides the XML object based model implementation
sap.ui.define([
	'sap/ui/model/ClientModel',
	'sap/ui/model/Context',
	'./XMLListBinding',
	'./XMLPropertyBinding',
	'./XMLTreeBinding',
	"sap/ui/util/XMLHelper",
	"sap/base/Log",
	"sap/base/util/each"
],
	function(
		ClientModel,
		Context,
		XMLListBinding,
		XMLPropertyBinding,
		XMLTreeBinding,
		XMLHelper,
		Log,
		each
	) {
	"use strict";


	/**
	 * Constructor for a new XMLModel.
	 *
	 * @class
	 * Model implementation for XML format
	 *
	 * @extends sap.ui.model.ClientModel
	 *
	 * @author SAP SE
	 * @version 1.92.0
	 *
	 * @param {object} oData either the URL where to load the XML from or an XML
	 * @public
	 * @alias sap.ui.model.xml.XMLModel
	 */
	var XMLModel = ClientModel.extend("sap.ui.model.xml.XMLModel", /** @lends sap.ui.model.xml.XMLModel.prototype */ {

		constructor : function (oData) {
			ClientModel.apply(this, arguments);
			this.oNameSpaces = null;

			if (oData && oData.documentElement) {
				this.setData(oData);
			}
		},

		metadata : {
			publicMethods : ["setXML", "getXML", "setNameSpace"]
		}

	});

	/**
	 * Sets the specified XML formatted string text to the model
	 *
	 * @param {string} sXMLText the XML data as string
	 * @public
	 */
	XMLModel.prototype.setXML = function(sXMLText){
		var oXMLDocument = XMLHelper.parse(sXMLText);

		if (oXMLDocument.parseError.errorCode != 0) {
			var oParseError = oXMLDocument.parseError;
			Log.fatal("The following problem occurred: XML parse Error for " + oParseError.url + " code: " + oParseError.errorCode + " reason: " +
					oParseError.reason +  " src: " + oParseError.srcText + " line: " +  oParseError.line +  " linepos: " + oParseError.linepos +  " filepos: " + oParseError.filepos);
			this.fireParseError({url : oParseError.url, errorCode : oParseError.errorCode,
				reason : oParseError.reason, srcText : oParseError.srcText, line : oParseError.line, linepos : oParseError.linepos,
				filepos : oParseError.filepos});
		}
		this.setData(oXMLDocument);
	};

	/**
	 * Serializes the current XML data of the model into a string.
	 *
	 * @return the XML document serialized as string
	 * @public
	 */
	XMLModel.prototype.getXML = function(){
		return XMLHelper.serialize(this.oData);
	};

	/**
	 * Sets the provided XML encoded data object to the model
	 *
	 * @param {object} oData the data to set to the model
	 * @public
	 */
	XMLModel.prototype.setData = function(oData){
		this.oData = oData;
		this.checkUpdate();
	};

	/**
	 * Load XML-encoded data from the server using a GET HTTP request and store the resulting XML data in the model.
	 * Note: Due to browser security restrictions, most "Ajax" requests are subject to the same origin policy,
	 * the request can not successfully retrieve data from a different domain, subdomain, or protocol.
	 *
	 * @param {string} sURL A string containing the URL to which the request is sent
	 * @param {object | string} [oParameters] A map of parameters or a single parameter string that is sent to the server with the request
	 * @param {boolean} [bAsync=true] By default, all requests are sent asynchronous.
	 * <b>Do not use <code>bAsync=false</code></b> because synchronous requests may temporarily lock
	 * the browser, disabling any actions while the request is active. Cross-domain requests do not
	 * support synchronous operation.
	 * @param {string} [sType=GET] HTTP method of request
	 * @param {string} [bCache=false] Force no caching if false
	 * @param {object} [mHeaders] An object of additional header key/value pairs to send along with the request
	 *
	 * @public
	 */
	XMLModel.prototype.loadData = function(sURL, oParameters, bAsync, sType, bCache, mHeaders){
		var that = this;

		bAsync = (bAsync !== false);
		sType = sType || "GET";
		bCache = bCache === undefined ? this.bCache : bCache;

		this.fireRequestSent({url : sURL, type : sType, async : bAsync, headers: mHeaders,
			info : "cache=" + bCache, infoObject: {cache: bCache}});
		this._ajax({
		  url: sURL,
		  async: bAsync,
		  cache: bCache,
		  dataType: 'xml',
		  data: oParameters,
		  headers: mHeaders,
		  type: sType,
		  success: function(oData) {
			if (!oData) {
				Log.fatal("The following problem occurred: No data was retrieved by service: " + sURL);
			}
			that.setData(oData);
			that.fireRequestCompleted({url : sURL, type : sType, async : bAsync, headers: mHeaders,
				info : "cache=" + bCache, infoObject: {cache: bCache}, success: true});
		  },
		  error: function(XMLHttpRequest, textStatus, errorThrown){
			var oError = { message : textStatus, statusCode : XMLHttpRequest.status, statusText : XMLHttpRequest.statusText, responseText : XMLHttpRequest.responseText};
			Log.fatal("The following problem occurred: " + textStatus, XMLHttpRequest.responseText + ","
						+ XMLHttpRequest.status + "," + XMLHttpRequest.statusText);
			that.fireRequestCompleted({url : sURL, type : sType, async : bAsync, headers: mHeaders,
				info : "cache=" + bCache, infoObject: {cache: bCache}, success: false, errorobject: oError});
			that.fireRequestFailed(oError);
		  }
		});
	};

	/**
	 * Sets an XML namespace to use in the binding path
	 *
	 * @param {string} sNameSpace the namespace URI
	 * @param {string} [sPrefix=null] the prefix for the namespace (optional)
	 * @public
	 */
	XMLModel.prototype.setNameSpace = function(sNameSpace, sPrefix){
		if (!sPrefix) {
			sPrefix = "";
		}
		if (!this.oNameSpaces) {
			this.oNameSpaces = {};
		}
		this.oNameSpaces[sPrefix] = sNameSpace;
	};

	/**
	 * @see sap.ui.model.Model.prototype.bindProperty
	 */
	XMLModel.prototype.bindProperty = function(sPath, oContext, mParameters) {
		var oBinding = new XMLPropertyBinding(this, sPath, oContext, mParameters);
		return oBinding;
	};

	/**
	 * @see sap.ui.model.Model.prototype.bindList
	 */
	XMLModel.prototype.bindList = function(sPath, oContext, aSorters, aFilters, mParameters) {
		var oBinding = new XMLListBinding(this, sPath, oContext, aSorters, aFilters, mParameters);
		return oBinding;
	};

	/**
	 * @see sap.ui.model.Model.prototype.bindTree
	 */
	XMLModel.prototype.bindTree = function(sPath, oContext, aFilters, mParameters, aSorters) {
		var oBinding = new XMLTreeBinding(this, sPath, oContext, aFilters, mParameters, aSorters);
		return oBinding;
	};

	/**
	 * Sets a new value for the given property <code>sPropertyName</code> in the model.
	 * If the model value changed all interested parties are informed.
	 *
	 * @param {string}  sPath path of the property to set
	 * @param {any}     oValue value to set the property to
	 * @param {object} [oContext=null] the context which will be used to set the property
	 * @param {boolean} [bAsyncUpdate] whether to update other bindings dependent on this property asynchronously
	 * @return {boolean} true if the value was set correctly and false if errors occurred like the entry was not found.
	 * @public
	 */
	XMLModel.prototype.setProperty = function(sPath, oValue, oContext, bAsyncUpdate) {
		var sObjectPath = sPath.substring(0, sPath.lastIndexOf("/") + 1),
			sProperty = sPath.substr(sPath.lastIndexOf("/") + 1);

		// check if path / context is valid
		if (!this.resolve(sPath, oContext)) {
			return false;
		}

		if (!this.oData.documentElement) {
			Log.warning("Trying to set property " + sPath + ", but no document exists.");
			return false;
		}
		var oObject;
		if (sProperty.indexOf("@") == 0) {
			oObject = this._getObject(sObjectPath, oContext);
			if (oObject[0]) {
				oObject[0].setAttribute(sProperty.substr(1), oValue);
				this.checkUpdate(false, bAsyncUpdate);
				return true;
			}
		} else {
			oObject = this._getObject(sPath, oContext);
			if (oObject[0]) {
				oObject[0].textContent = oValue;
				this.checkUpdate(false, bAsyncUpdate);
				return true;
			}
		}
		return false;

	};

	/**
	* Returns the value for the property with the given <code>sPropertyName</code>
	*
	* @param {string} sPath the path to the property
	* @param {object} [oContext=null] the context which will be used to retrieve the property
	* @type any
	* @return the value of the property
	* @public
	*/
	XMLModel.prototype.getProperty = function(sPath, oContext) {
		var oResult = this._getObject(sPath, oContext);
		if (oResult && typeof oResult != "string") {
			oResult = oResult[0] ? oResult[0].textContent : ""; // TODO is this right? shouldn't we return the object?!
		}
		return oResult;
	};

	/**
	* Returns the object for the given <code>path</code>
	*
	* @param {string} sPath the path to the object
	* @param {object} [oContext=null] the context which will be used to retrieve the object
	* @type any
	* @return the object
	* @public
	*/
	XMLModel.prototype.getObject = function(sPath, oContext) {
		var oObject = this._getObject(sPath, oContext);
		if (Array.isArray(oObject)) {
			oObject = oObject[0];
		}
		return oObject;
	};

	/**
	 * @param {string} sPath
	 * @param {object} oContext
	 * @returns {any} the node of the specified path/context
	 */
	XMLModel.prototype._getObject = function (sPath, oContext) {
		var oRootNode = this.oData.documentElement;
		if (!oRootNode) {
			return null;
		}
		var oNode = this.isLegacySyntax() ? [oRootNode] : [];
		if (oContext instanceof Context) {
			oNode = this._getObject(oContext.getPath());
		} else if (oContext) {
			oNode = [oContext];
		}
		if (!sPath) {
			return oNode;
		}
		var aParts = sPath.split("/"),
			sPart,
			iIndex = 0;
		if (!aParts[0]) {
			// absolute path starting with slash
			oNode = oRootNode;
			iIndex++;
		}

		oNode = oNode.length == undefined ? [oNode] : oNode;
		oNode = oNode[0] ? oNode : null;

		while (oNode && oNode.length > 0 && aParts[iIndex]) {
			sPart = aParts[iIndex];
			if (sPart.indexOf("@") == 0) {
				oNode = this._getAttribute(oNode[0], sPart.substr(1));
			} else if (sPart == "text()") {
				oNode = oNode[0] ? oNode[0].textContent : "";
			} else if (isNaN(sPart)) {
				oNode = this._getChildElementsByTagName(oNode[0], sPart);
			} else {
				oNode = [ oNode[sPart] ];
			}
			iIndex++;
		}
		return oNode;
	};

	/**
	 * @param {string} sPath
	 * @param {object} oContext
	 * @returns {any}
	 */
	XMLModel.prototype._getAttribute = function (oNode, sName) {
		if (!this.oNameSpaces || sName.indexOf(":") == -1) {
			return oNode.getAttribute(sName);
		}
		var sNameSpace = this._getNameSpace(sName),
			sLocalName = this._getLocalName(sName);
		return oNode.getAttributeNS(sNameSpace, sLocalName);
	};

	/**
	 * @param {object} oNode
	 * @param {string} sName
	 * @returns {any}
	 */
	XMLModel.prototype._getChildElementsByTagName = function (oNode, sName) {
		var aChildNodes = oNode.childNodes,
			aResult = [];

		if (this.oNameSpaces) {
			var sNameSpace = this._getNameSpace(sName),
				sLocalName = this._getLocalName(sName),
				sChildLocalName;
			each(aChildNodes, function(i, oChild){
				sChildLocalName =  oChild.localName || oChild.baseName;
				if (oChild.nodeType == 1 && sChildLocalName == sLocalName && oChild.namespaceURI == sNameSpace) {
					aResult.push(oChild);
				}
			});
		} else {
			each(aChildNodes, function(i, oChild){
				if (oChild.nodeType == 1 && oChild.nodeName == sName) {
					aResult.push(oChild);
				}
			});
		}

		return aResult;
	};

	/**
	 * @param {string} sName
	 * @returns {string}
	 */
	XMLModel.prototype._getNameSpace = function (sName) {
		var iColonPos = sName.indexOf(":"),
			sPrefix = "";
		if (iColonPos > 0) {
			sPrefix = sName.substr(0, iColonPos);
		}
		return this.oNameSpaces[sPrefix];
	};

	/**
	 * @param {string} sName
	 * @returns {string}
	 */
	XMLModel.prototype._getLocalName = function (sName) {
		var iColonPos = sName.indexOf(":"),
			sLocalName = sName;
		if (iColonPos > 0) {
			sLocalName = sName.substr(iColonPos + 1);
		}
		return sLocalName;
	};


	/**
	 * @returns {object}
	 */
	XMLModel.prototype._getDocNSPrefixes = function () {
		var oPrefixes = {},
			oDocumentElement = this.oData && this.oData.documentElement;
		if (!oDocumentElement) {
			return oPrefixes;
		}
		var aAttributes = oDocumentElement.attributes;
		each(aAttributes, function(i, oAttribute) {
			var name = oAttribute.name,
				value = oAttribute.value;
			if (name == "xmlns") {
				oPrefixes[value] = "";
			} else if (name.indexOf("xmlns") == 0) {
				oPrefixes[value] = name.substr(6);
			}
		});
		return oPrefixes;
	};

	/**
	 * Resolve the path relative to the given context
	 */
	XMLModel.prototype._resolve = function(sPath, oContext) {
		var bIsRelative = !sPath.startsWith("/"),
			sResolvedPath = sPath;
		if (bIsRelative) {
			if (oContext) {
				sResolvedPath = oContext.getPath() + "/" + sPath;
			} else {
				sResolvedPath = this.isLegacySyntax() ? "/" + sPath : undefined;
			}
		}
		return sResolvedPath;
	};

	XMLModel.prototype.isList = function(sPath, oContext) {
		return false;
	};

	/**
	 * Sets the meta model associated with this model
	 *
	 * @private
	 * @param {sap.ui.model.MetaModel} oMetaModel the meta model associated with this model
	 */
	XMLModel.prototype._setMetaModel = function(oMetaModel) {
		this._oMetaModel = oMetaModel;
	};

	XMLModel.prototype.getMetaModel = function() {
		return this._oMetaModel;
	};


	return XMLModel;

});