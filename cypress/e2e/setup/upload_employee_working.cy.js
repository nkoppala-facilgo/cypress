describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/files/employee_working/data`).then(function (data) {
      this.data = data;
    });
  });

  describe("Upload employee working files", function () {
    it("fc-1349 Upload employee working files  <smoke>", function () {
      cy.visit("/user_management");
      cy.contains("span", "Import User Working Days/Hours").click();
      cy.execute("script/setup/upload", this.data);
      cy.get(".modal-footer")
        .contains("button", "Import")
        .click({ force: true });
    });
  });
});
