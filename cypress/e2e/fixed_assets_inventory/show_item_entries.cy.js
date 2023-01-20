describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/show_item_entries/data`).then(function (data) {
        this.data = data;
     })
  });
  describe("Cypress Automation || To show Inventory items entries.", function () {
    it("FC-1195 To show Inventory items entries <smoke>  ", function () {
      cy.visit("/inventory_items");
      cy.wait(5000);
      cy.contains('label', 'Show').parents(`.form-group`).find('span[class="Select-arrow"]').click();
      cy.get(".Select-menu-outer").children().contains(this.data['entries']).click({ force: true });
      cy.wait(3000);
      cy.get("table > tbody > tr").its("length").should("be.gt", 0);
    });
  });
});
