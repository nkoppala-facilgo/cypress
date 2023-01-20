describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/download_residents_pmc/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });
  describe("Setup- Residents|| To verify user is able to download residents.", function () {
    it("FC-1484 To verify user is able to download residents. <smoke>", function () {
      cy.visit().wait(4000);
      cy.execute("script/setup/download_residents_pmc", this.data);
    });
  });
});
