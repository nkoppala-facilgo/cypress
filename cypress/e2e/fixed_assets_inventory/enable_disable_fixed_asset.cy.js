describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    }); 
  });
  describe("Cypress Automation ||To verify Enable/Disable Fixed Asset Types", function () {
    it("FC-1210 To verify Enable/Disable Fixed Asset Types <smoke> ", function () {
      cy.visit("/fixed_asset_types");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/enable_disable_fixed_asset");
    });
  });
});
