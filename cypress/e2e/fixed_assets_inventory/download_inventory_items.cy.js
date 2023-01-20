describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);

    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });

  describe("Cypress Automation || Download Inventory items.", function () {
    it("FC-1193 Download Inventory items  <smoke>", function () {
      cy.visit("/inventory_items");
      cy.contains("span", " Download").click();
      cy.contains("button.cancel","Download Only primary source items").click();
    });
  });
});
