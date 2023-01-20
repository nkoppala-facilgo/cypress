describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("To show Inventory items entries.", function () {
    it("FC-6762 To show Inventory items entries. <smoke> ", function () {
      cy.visit("/inventory_items");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/inventory_items_entries");
    });
  });
});
