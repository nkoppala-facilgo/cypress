describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("PMC: Invoice Line Item Report", function () {
    it("FC-7761  Invoice Line Item Report export <smoke>", function () {
      cy.visit();
      cy.execute("/script/Reports/invoice_line_item_report");
    });
  });
});
