describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/import_inventory_types/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Cypress Automation || Import Inventory Types.", function () {
    it("Fc-1214 Import Inventory Types. <smoke> ", function () {
      cy.visit("/inventory_types");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/import_inventory_types",this.data);
    });
  });
});
