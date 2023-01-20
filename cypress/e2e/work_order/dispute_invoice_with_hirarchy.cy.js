describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(
      `data/${data_path}/work_order/dispute_invoice_with_hirarchy/data`
    ).then(function (data) {
      this.data = data;
    });
  });
  describe("Dispute Invoice at PMC side at WO document hierarchy", function () {
    it("FC-4050 dispute invoices", function () {
      cy.execute("script/work_order/dispute_invoice", this.data);
      cy.execute("script/work_order/filter", this.data);
      cy.wait(5000);
      cy.get(".media").first().click();
      cy.wait(5000);
      cy.get(".col-lg-12 > .text-center > .text-blue").click();
      cy.get("#js-react-WorkOrderDocumentHierarchyView > .invoiceTable")
        .contains("Dispute")
        .click();
      cy.get(".col-xs-12 > .form-control").type(this.data["reason"]);
      cy.get(".modal-content").contains("button", "Send").click();
    });
  });
});
