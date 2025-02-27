sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
  ],
  function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("sap.ui.demo.app.controller.App", {
      onInit: function () {
        var oData = {
          clientes: [],
          fornecedores: [],
          notasFiscais: [],
        };

        var oModel = new JSONModel(oData);
        this.getView().setModel(oModel, "dados");

        $.ajax({
          url: "http://localhost:5201/api/NotaFiscal",
          type: "GET",
          success: function (data) {
            console.log("Dados retornados pela API:", data);
            oModel.setProperty("/notasFiscais", data);
            oModel.refresh();
          },
          error: function (err) {
            console.error("Erro ao carregar notas fiscais:", err);
            MessageToast.show("Erro ao carregar notas fiscais.");
          },
        });
      },

      onCadastrarCliente: function () {
        console.log("Botão Cadastrar Cliente clicado!");
        var oModel = this.getView().getModel("dados");
        var nomeCliente = this.getView().byId("clienteNome").getValue();

        if (!nomeCliente) {
          MessageToast.show("Por favor, insira o nome do cliente.");
          return;
        }

        var oCliente = { nome: nomeCliente };

        $.ajax({
          url: "http://localhost:5201/api/Cliente",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(oCliente),
          success: function () {
            MessageToast.show("Cliente cadastrado com sucesso!");
            oModel.getData().clientes.push(oCliente);
            oModel.refresh();
          },
          error: function (err) {
            MessageToast.show("Erro ao cadastrar cliente.");
            console.error(err);
          },
        });
      },

      onCadastrarFornecedor: function () {
        var oModel = this.getView().getModel("dados");
        var nomeFornecedor = this.getView().byId("fornecedorNome").getValue();

        if (!nomeFornecedor) {
          MessageToast.show("Por favor, insira o nome do fornecedor.");
          return;
        }

        var oFornecedor = { nome: nomeFornecedor };

        $.ajax({
          url: "http://localhost:5201/api/Fornecedor",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(oFornecedor),
          success: function () {
            MessageToast.show("Fornecedor cadastrado com sucesso!");
            oModel.getData().fornecedores.push(oFornecedor);
            oModel.refresh();
          },
          error: function (err) {
            MessageToast.show("Erro ao cadastrar fornecedor.");
            console.error(err);
          },
        });
      },

      onCadastrarNota: function () {
        console.log("cadastrei nota");
        var oModel = this.getView().getModel("dados");
        var numeroNota = this.getView().byId("notaNumero").getValue();
        var valorNota = this.getView().byId("notaValor").getValue();
        var clienteNota = this.getView().byId("selectCliente").getValue();
        var fornecedorNota = this.getView().byId("selectFornecedor").getValue();

        if (!numeroNota || !valorNota || !clienteNota || !fornecedorNota) {
          MessageToast.show("Por favor, preencha todos os campos.");
          return;
        }

        var oNota = {
          numeroNota: numeroNota,
          valor: parseFloat(valorNota),
          clienteId: parseInt(clienteNota),
          fornecedorId: parseInt(fornecedorNota),
        };

        $.ajax({
          url: "http://localhost:5201/api/NotaFiscal",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(oNota),
          success: function () {
            MessageToast.show("Nota Fiscal cadastrada com sucesso!");
            oModel.getData().notasFiscais.push(oNota);
            oModel.refresh();
          },
          error: function (err) {
            MessageToast.show("Erro ao cadastrar Nota Fiscal.");
            console.error(err);
          },
        });
      },

      onRowSelect: function (oEvent) {
        console.log("Item pressionado!");

        var oSelectedItem =
          oEvent.getParameter("listItem") ||
          oEvent.getParameter("selectedItem");
        if (!oSelectedItem) {
          console.log("Nenhum item selecionado.");
          return;
        }

        var oContext = oSelectedItem.getBindingContext("dados");
        var oSelectedData = oContext.getObject();

        console.log("Selecionado: ", oSelectedData);

        var oDialog = this.getView().byId("notaFiscalDialog");
        oDialog.setBindingContext(oContext, "dados");
        oDialog.open();
      },

      onCloseDialog: function () {
        var oDialog = this.getView().byId("notaFiscalDialog");
        oDialog.close();
      },

      onSearchNota: function (oEvent) {
        var sQuery = oEvent.getParameter("query");
        var oTable = this.getView().byId("notaFiscalTable");
        var oBinding = oTable.getBinding("items");

        if (sQuery) {
          var aFilters = [
            new sap.ui.model.Filter({
              filters: [
                new sap.ui.model.Filter({
                  path: "numeroNota",
                  test: function (value) {
                    return value.toString().includes(sQuery);
                  },
                }),
              ],
              and: true,
            }),
          ];
          oBinding.filter(aFilters);
        } else {
          oBinding.filter([]);
        }
      },
    });
  }
);
