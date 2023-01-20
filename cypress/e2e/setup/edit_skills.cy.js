describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/edit_skills/data`).then(function (
      data
    ) {
      this.data = data;
    });
  });
  describe("Setup- Skills|| To verify user is able to edit skill.", function () {
    it("FC-3071 To verify user is able to edit skill. <smoke>", function () {
      cy.visit("/skills");
      cy.execute("script/setup/edit_skills", this.data);
      cy.contains('h2','Success').should("be.visible");
      cy.contains('button','OK').click();
    });
  });
});
