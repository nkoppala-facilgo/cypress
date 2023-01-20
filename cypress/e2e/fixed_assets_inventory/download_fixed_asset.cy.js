describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("Cypress Automation || Download Fixed Asset Types", function () {
    it("Fc-1208 Download Fixed Asset Types <smoke> ", function () {
      cy.visit("/fixed_asset_types");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/download_fixed_asset");
    });
  });
});
