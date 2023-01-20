describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/users/edit_team/data`).then(function (
      data
    ) {
      this.data = data;
    });
  });
  describe("Setup- Users> Team|| Verify user is able to Edit a created Team", function () {
    it("FC-5624 Verify user is able to Edit a created Team <smoke> ", function () {
      cy.visit("/user_management");
      cy.contains("a", "Teams").click();
      cy.execute("script/setup/users/edit_team", this.data);
    });
  });
});
