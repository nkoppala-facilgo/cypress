describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("Cypress Automation || warranty types", function () {
    it("update warranty types ", function () {
      cy.visit("/inventory_types");
      cy.execute("/script/fixed_assets_inventory/update_warrantytypes");
      cy.contains("Warranty Type was successfully updated").should("exist");
    });
  });
});
