describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("Cypress Automation ||To verify filter icon appear on Work Order page at PMC and Supplier side.", function () {
    it("fc-6754 To verify filter icon appear on Work Order page at PMC and Supplier side. <smoke>", function () {
      cy.visit("");
      cy.wait(4000);
      cy.execute("/script/work_order/filtericon_on_wo");
    });
  });
});
