describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/new_inventory_categories/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Create new Inventory Categories.", function () {
    it("FC-6765 Create new Inventory Categories <smoke>", function () {
      cy.visit("/inventory_categories");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/new_inventory_categories",this.data);
    });
  });
});
