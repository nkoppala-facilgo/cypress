describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/files/supplier/data`).then(function (data) {
      this.data = data;
    });
  });

  describe("Setup- Suppliers|| user is able to upload suppliers", function () {
    it("Fc-5621  user is able to upload suppliers  <smoke>", function () {
      cy.visit("/property_suppliers");
      cy.contains("a", "Upload Suppliers").click();
      cy.get('input[accept=".xlsx"]').attachFile(this.data["file_path"]);
      cy.get(".modal-footer")
        .contains("button", "Import")
        .click({ force: true });
      cy.wait(5000);
    });
  });
});
