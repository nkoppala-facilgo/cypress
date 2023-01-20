describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/edit_residentdata_pmc/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });
  describe("Setup- Resident|| To verify user is able to edit Resident.", function () {
    it("Fc-3068 To verify user is edit residents <smoke>", function () {
      cy.visit().wait(4000);
      cy.execute("script/setup/edit_residentdata_pmc", this.data);
      cy.contains("Resident has been updated.").should("exist").wait(3000);
    });
  });
});
