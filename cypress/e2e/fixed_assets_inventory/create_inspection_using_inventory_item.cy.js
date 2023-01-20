describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/create_inspection_using_inventory_item/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("To Verify User is able to create an inspection using Inventory items.", function () {
    it("FC-6831 User is able to create an inspection using Inventory items. <smoke> ", function () {
      cy.visit("/inspections/new");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/create_inspection_using_inventory_item",this.data);
    });
  });
});
