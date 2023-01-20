describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("To verify Enable/Disable Inventory Categories.", function () {
    it("Fc-6766 To verify Enable/Disable Inventory Categories. <smoke> ", function () {
      cy.visit("/inventory_categories");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/disable_inventory_categories");
    });
  });
});
