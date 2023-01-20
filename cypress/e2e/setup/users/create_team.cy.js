describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/users/create_team/data`).then(function (data) {
      this.data = data;
    });
  });

  describe("Setup- Users> Team|| Verify user is able create new Team.", function () {
    it("Fc-5625 Verify user is able create new Team <smoke> ", function () {
      cy.visit("/user_management");
      cy.contains("a", "Teams").click();
      cy.contains("button", "Create New Team").click();
      cy.execute("script/setup/users/create_team", this.data);
    });
  });
});
