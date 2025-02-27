sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/Device", "sap/ui/model/json/JSONModel"],
  function (UIComponent, Device, JSONModel) {
    "use strict";

    return UIComponent.extend("sap.ui.demo.app.Component", {
      metadata: {
        manifest: "json",
      },

      init: function () {
        // Chama o método init da classe pai
        UIComponent.prototype.init.apply(this, arguments);

        // Modelo global para armazenar dados do app
        var oData = {
          appTitle: "Teste Vitórya - BRGaap - App Notas Fiscais",
        };
        var oModel = new JSONModel(oData);
        this.setModel(oModel, "global");
      },
    });
  }
);
