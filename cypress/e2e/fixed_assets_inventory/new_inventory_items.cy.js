describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/new_inventory_items/data`).then(function (data) {
      this.data = data;
    });
  });
    describe("Verify user is able to Create new Inventory items", function () {
    it("Fc-6829 Verify user is able to Create new Inventory items <smoke>", function () {
      cy.visit('/inventory_items')
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/new_inventory_items",this.data);
    });
  });
});
