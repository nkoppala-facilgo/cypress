describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/filter_fixed_asset/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Cypress Automation || Update Fixed Asset Types", function () {
    it("FC-1204 Update Fixed Asset Types <smoke> ", function () {
      cy.visit("/fixed_asset_types");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/filter_fixed_asset", this.data);
    });
  });
});
  