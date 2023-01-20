describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("Cypress Automation || To verify Enable/Disable Fixed Asset Categories.", function () {
    it("FC-1190 Cypress Automation || To verify Enable/Disable Fixed Asset Categories. <smoke> ", function () {
      cy.visit();
      cy.visit("/fixed_asset_categories");
      cy.wait(3000);
      cy.get('#inventory-category-actions').first().click({force: true})
      cy.wait(3000)
      cy.get(".danger a .fa-lock").first().click({ force: true });
      cy.contains("button.confirm", "Yes").click({force: true});
    });
  });
});
