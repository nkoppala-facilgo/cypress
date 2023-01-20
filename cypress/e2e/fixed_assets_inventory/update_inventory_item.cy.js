describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/update_inventory_item/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("To Verify, user is able to Update Inventory item", function () {
    it("Fc-6830 To Verify, user is able to Update Inventory item <smoke> ", function () {
      cy.visit("/inventory_items");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/update_inventory_item",this.data);
    });
  });
});
