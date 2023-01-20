describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/change_pagination_inventory/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Cypress Automation || To verify change Pagination Inventory items.", function () {
    it("FC-1196 To verify change Pagination Inventory items ", function () {
      cy.visit("/inventory_items");
      cy.wait(3000);
      cy.get(`a[role=button]`).contains(this.data["page"]).click();
    });
  });
});
