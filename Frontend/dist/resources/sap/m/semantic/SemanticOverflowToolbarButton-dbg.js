/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.m.semantic.SemanticOverflowToolbarButton.
sap.ui.define(['sap/m/OverflowToolbarButton', 'sap/m/ButtonRenderer'],
	function(OverflowToolbarButton, ButtonRenderer) {
	"use strict";



	/**
	 * Constructor for a new SemanticOverflowToolbarButton.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * SemanticOverflowToolbarButton is a version of OverflowToolbarButton that ensures a default tooltip, derived from the button text
	 * @extends sap.m.OverflowToolbarButton
	 *
	 * @author SAP SE
	 * @version 1.92.0
	 *
	 * @constructor
	 * @private
	 * @since 1.38
	 * @alias sap.m.SemanticOverflowToolbarButton
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var SemanticOverflowToolbarButton = OverflowToolbarButton.extend("sap.m.semantic.SemanticOverflowToolbarButton", /** @lends sap.m.SemanticOverflowToolbarButton.prototype */ {
		metadata: {
			library: "sap.m"
		},
		renderer: ButtonRenderer
	});

	SemanticOverflowToolbarButton.prototype._getTooltip = function() {

		var sTooltip = OverflowToolbarButton.prototype._getTooltip.call(this);

		if (!sTooltip && !this._bInOverflow && this.getText()) {
			sTooltip = this.getText();
		}

		return sTooltip;
	};

	return SemanticOverflowToolbarButton;

});
