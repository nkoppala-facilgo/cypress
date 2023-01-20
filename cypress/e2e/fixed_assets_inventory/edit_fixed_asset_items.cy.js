describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/edit_fixed_asset_items/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Cypress Automation || To edit Fixed Asset items.", function () {
    it("FC-1100 To edit Fixed Asset items <smoke> ", function () {
      cy.visit();
      cy.visit("/fixed_asset_items");
      cy.wait(3000);
      cy.get("#fixed-asset-item-actions").first().click({ force: true });
      cy.wait(3000);
      cy.contains("span", "Edit").click();
      cy.execute("/script/fixed_asset_inventory/edit_fixed_asset_items",this.data);
      cy.contains("Fixed Asset Item successfully updated").should("be.visible");
    });
  });
});
