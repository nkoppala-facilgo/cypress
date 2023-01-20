describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/create_new_warrantytypes/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Cypress Automation ||To verify user able to create new warranty types", function () {
    it("FC-4189 To verify user able to create new warranty types ", function () {
      cy.visit("");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/create_new_warrantytypes",this.data);
    });
  });
});
