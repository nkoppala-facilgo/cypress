describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("Cypress Automation || To verify Enable/Disable Inventory items.", function () {
    it("FC-1194 To verify Enable/Disable Inventory items. <smoke> ", function () {
      cy.visit("/inventory_items");
      cy.wait(3000);
      cy.get("#fixed-asset-item-actions").first().click({ force: true });
      cy.wait(3000);
      cy.get(".danger a .fa-lock").first().click({ force: true });
      cy.contains("Are You Sure?").should("exist");
      cy.wait(2000);
      cy.contains("button", "OK").click();
      cy.get("#fixed-asset-item-actions").first().click({ force: true });
      cy.wait(3000);
      cy.get("a").find(`span`).contains('Enable').click({ force: true });
      
    });
  });
});
