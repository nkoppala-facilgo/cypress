describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/import_newskill/data`).then(function (
      data
    ) {
      this.data = data;
    });
  });
  describe("Setup- Residents|| To verify user is able to download residents.", function () {
    it("Fc-5269 To verify user is able to download residents. <smoke>", function () {
      cy.visit().wait(7000);
      cy.execute("script/setup/import_newskill", this.data);
    });
  });
});
