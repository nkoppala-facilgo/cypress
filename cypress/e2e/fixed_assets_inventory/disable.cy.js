describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("Disable Fixed Asset", function () {
    it("FC-1131 Disable Fixed Asset item <smnoke>", function () {
      cy.visit();
      cy.on("uncaught:exception", (err, runnable) => {
        return false;
      });
      cy.contains("a", "Fixed Assets/Inventory").click();
      cy.visit("/fixed_asset_items");
      cy.wait(3000);
      cy.on("uncaught:exception", (err, runnable) => {
        return false;
      });
      cy.get("#fixed-asset-item-actions").first().click({ force: true });
      cy.wait(3000);
      cy.get(".danger a .fa-lock").first().click({ force: true });
      cy.contains("Are You Sure?").should("exist");
      cy.wait(2000);
      cy.contains("button", "OK").click();
      cy.get("#fixed-asset-item-actions").first().click({ force: true });
      cy.wait(3000);
      cy.get("a").find(`span`).contains("Enable").click({ force: true });
    });
  });
});
