describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/disable_listfolder/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });
  describe("Setup- Lists || To verify user is able to 'Disable' List folder", function () {
    it("FC-3076 To verify user is to disable list <smoke>", function () {
      cy.visit("/folders").wait(7000);
      cy.execute("script/setup/disable_listfolder", this.data);
    });
  });
});
