describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/create_new_fixed_asset_catrgories/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Cypress Automation || Create new Fixed Asset Categories.", function () {
    it("Fc-1197 Create new Fixed Asset Categories. ", function () {
      cy.execute("/script/fixed_Assets_inventory/create_new_fixed_asset_categories",this.data);
    });
  });
});
