describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("To verify Enable/Disable Fixed Asset Types", function () {
    it("Fc-6761 verify Enable/Disable Fixed Asset Types <smoke> ", function () {
      cy.visit("/inventory_items");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/enable_inventory_items",this.data);
    });
  });
});
