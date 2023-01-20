describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("To Verify, user is able to Download Inventory items.", function () {
    it("FC-6760 User is able to Download Inventory items<smoke> ", function () {
      cy.visit("/inventory_items");
      cy.wait(4000);
      cy.contains("span", " Download").click();
      cy.contains("button","Download All Sku Items").click();
    });
  });
});
