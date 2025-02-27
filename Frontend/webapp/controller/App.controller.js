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

            $.ajax({
              url: "http://localhost:5201/api/Cliente",
              type: "GET",
              success: function (clientes) {
                oModel.setProperty("/clientes", clientes);

                $.ajax({
                  url: "http://localhost:5201/api/Fornecedor",
                  type: "GET",
                  success: function (fornecedores) {
                    oModel.setProperty("/fornecedores", fornecedores);

                    var notasFiscaisComNomes = data.map(function (nota) {
                      var cliente = clientes.find(
                        (c) => c.id === nota.clienteId
                      );
                      var fornecedor = fornecedores.find(
                        (f) => f.id === nota.fornecedorId
                      );
                      return {
                        ...nota,
                        clienteNome: cliente ? cliente.nome : "",
                        fornecedorNome: fornecedor ? fornecedor.nome : "",
                      };
                    });

                    oModel.setProperty("/notasFiscais", notasFiscaisComNomes);
                    oModel.refresh();
                  },
                  error: function (err) {
                    console.error("Erro ao carregar fornecedores:", err);
                  },
                });
              },
              error: function (err) {
                console.error("Erro ao carregar clientes:", err);
              },
            });
          },
          error: function (err) {
            console.error("Erro ao carregar notas fiscais:", err);
            MessageToast.show("Erro ao carregar notas fiscais.");
          },
        });
      },

      onCadastrarNota: function () {
        var oModel = this.getView().getModel("dados");
        var numeroNota = this.getView().byId("notaNumero").getValue();
        var valorNota = this.getView().byId("notaValor").getValue();
        var nomeCliente = this.getView().byId("selectCliente").getValue();
        var nomeFornecedor = this.getView().byId("selectFornecedor").getValue();

        if (!numeroNota || !valorNota || !nomeCliente || !nomeFornecedor) {
          MessageToast.show("Por favor, preencha todos os campos.");
          return;
        }

        var oModelClientes = oModel.getData().clientes;
        var clienteExistente = oModelClientes.find(
          (c) => c.nome === nomeCliente
        );

        if (!clienteExistente) {
          var oCliente = { nome: nomeCliente };
          console.log("entrei", oCliente);

          $.ajax({
            url: "http://localhost:5201/api/Cliente",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(oCliente),
            success: function (data) {
              MessageToast.show("Cliente cadastrado com sucesso!");
              oModelClientes.push({ nome: nomeCliente, id: data.id });
              oModel.refresh();
              salvarNotaFiscal(data.id, nomeFornecedor);
            },
            error: function (err) {
              MessageToast.show("Erro ao cadastrar cliente.");
              console.error(err);
            },
          });
        } else {
          salvarNotaFiscal(clienteExistente.id, nomeFornecedor);
        }

        function salvarNotaFiscal(clienteId, nomeFornecedor) {
          var oModelFornecedores = oModel.getData().fornecedores;
          var fornecedorExistente = oModelFornecedores.find(
            (f) => f.nome === nomeFornecedor
          );

          if (!fornecedorExistente) {
            var oFornecedor = { nome: nomeFornecedor };

            $.ajax({
              url: "http://localhost:5201/api/Fornecedor",
              type: "POST",
              contentType: "application/json",
              data: JSON.stringify(oFornecedor),
              success: function (data) {
                MessageToast.show("Fornecedor cadastrado com sucesso!");
                oModelFornecedores.push({ nome: nomeFornecedor, id: data.id });
                oModel.refresh();
                cadastrarNotaFiscal(clienteId, data.id);
              },
              error: function (err) {
                MessageToast.show("Erro ao cadastrar fornecedor.");
                console.error(err);
              },
            });
          } else {
            cadastrarNotaFiscal(clienteId, fornecedorExistente.id);
          }
        }

        function cadastrarNotaFiscal(clienteId, fornecedorId) {
          var oNota = {
            numeroNota: numeroNota,
            valor: parseFloat(valorNota),
            clienteId: clienteId,
            fornecedorId: fornecedorId,
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
        }
      },

      onRowSelect: function (oEvent) {
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
