describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/new_fixed_asset_item/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Verify user is able to Create new fixed asset item", function () {
    it("FC-5203 Verify user is able to Create new fixed asset item <smoke> ", function () {
      cy.visit("/fixed_asset_items/new");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/new_fixed_asset_item",this.data);
    });
  });
});
