describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/users/add_user_on_created_team/data`).then(function (data) {
        this.data = data;
      });
  });
  describe("Setup- Users> Team|| Verify user is able to 'Add user' on created Team", function () {
    it("fc-1799 Verify user is able to 'Add user' on created Team <smoke>", function () {
      cy.visit("/user_management");
      cy.contains("a", "Teams").click();
      cy.execute("script/setup/users/add_user_on_created_team", this.data);
      cy.contains('Team saved successfully!').should('be.visible');
    });
  });
});
