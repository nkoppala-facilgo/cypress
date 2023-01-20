describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/edit_inventory_items/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Cypress Automation || Update Inventory item", function () {
    it("FC-1190 Update Inventory item <smoke> ", function () {
      cy.visit("/inventory_items");
      cy.wait(3000);
      cy.get("#fixed-asset-item-actions").first().click({ force: true });
      cy.contains("span", "Edit").click();
      cy.execute("/script/fixed_asset_inventory/edit_inventory_items",this.data);
      cy.contains("Inventory Item successfully updated").should("be.visible");
    });
  });
});
