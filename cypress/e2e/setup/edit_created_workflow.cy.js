describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/edit_created_workflow/data`).then(
      function (data) {
        this.data = data;
      });
  });

  describe("Setup- Workflow|| User is able to edit created workflow.", function () {
    it("Fc-3056 Setup- Workflow|| User is able to edit created workflow.<smoke>", function () {
      cy.execute('/script/setup/edit_created_workflow',this.data);
      cy.contains('Data has been updated.').should('be.visible');
    });
  });
});
