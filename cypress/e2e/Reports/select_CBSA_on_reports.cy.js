describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.supplier.username, data.supplier.password);
    });
  });
  describe("To verify user is able to filter field using CBSA while run 'Work Order Register' report at Supplier side. ", function () {
    it("FC-7681  user is able to filter field using CBSA while run Work Order Register report  <smoke>", function () {
      cy.visit();
      cy.execute("/script/Reports/select_CBSA_on_reports");
    });
  });
});
