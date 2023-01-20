describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Cypress Automation || Create new Inventory items", function () {
    it("Fc-1109 Create new Inventory items", function () {
      cy.execute("/script/fixed_asset_inventory/create_new_inventory_items",this.data);
    });
  });
});
