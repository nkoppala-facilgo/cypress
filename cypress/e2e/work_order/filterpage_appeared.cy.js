describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.supplier.username, data.supplier.password);
    });
  });
  describe("Supplier To verify filter pop is appeared when user clicks on filter icon.", function () {
    it("Fc-7122 filter page after click filter icon <smoke>", function () {
      cy.visit();
      cy.wait(4000);
      cy.execute("/script/work_order/filterpage_appeared");
    });
  });
});
