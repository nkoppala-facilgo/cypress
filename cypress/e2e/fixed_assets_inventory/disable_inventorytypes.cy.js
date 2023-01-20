describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("Cypress Automation ||To verify Disable Inventory Types", function () {
    it("fc-1216 To verify Disable Inventory Types", function () {
      cy.visit("/inventory_types");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/disable_inventorytypes");
    });
  });
});
