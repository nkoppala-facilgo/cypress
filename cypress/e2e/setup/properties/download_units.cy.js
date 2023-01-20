describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/properties/download_units/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });
  describe("Setup - Properties|| user is able to download Units file.", function () {
    it("FC-6036 user is able to download Units file.<smoke> ", function () {
      cy.visit("/properties");
      cy.wait(4000);
      cy.contains("span", "Download Units").click();
      cy.select_by_label_new("Property:", this.data["property"]);
      cy.select_by_label_new("Units:", this.data["units"]);
      cy.wait(2000);
      cy.get('.pull-right  .btn-primary').contains("button", "Download").click({ force: true }).reload();
    
    });
  });
});
