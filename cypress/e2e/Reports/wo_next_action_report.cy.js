describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.supplier.username, data.supplier.password);
    });
  });
  describe("Supplier: Work Order Next Action Report ", function () {
    it("FC-7758 Work Order Next Action Report <smoke>", function () {
      cy.visit();
      cy.execute("/script/Reports/wo_next_action_report");
    });
  });
});
