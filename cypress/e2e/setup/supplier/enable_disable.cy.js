describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("User is able to Enable/Disable supplier", function () {
    it("Fc-1351 User is able to Enable/Disable supplier <smoke> ", function () {
      cy.visit("/property_suppliers");
      cy.wait(4000);
      cy.execute("/script/setup/supplier/enable_disable");
    });
  });
});
