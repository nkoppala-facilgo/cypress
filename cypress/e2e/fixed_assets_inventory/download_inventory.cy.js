describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("Cypress Automation || Download Inventory Types", function () {
    it("Fc-1215 Download Inventory Types. <smoke> ", function () {
      cy.visit("/inventory_types");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/download_inventory");
    });
  });
});
