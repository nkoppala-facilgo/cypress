describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/files/user/data`).then(function (data) {
      this.data = data;
    });
  });

  describe("Upload user files", function () {
    it("Upload user files  <smoke>", function () {
      cy.visit("/user_management");
      cy.contains("span", " Import Users").click();
      cy.execute("script/setup/upload", this.data);
      cy.get(".modal-footer")
        .contains("button", "Import")
        .click({ force: true });
    });
  });
});
