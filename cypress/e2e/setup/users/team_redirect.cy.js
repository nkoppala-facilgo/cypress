describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("Verify user is able to redirect on Team page", function () {
    it("FC-5626 Verify user is able to redirect on Team page <smoke> ", function () {
      cy.visit("/user_management");
      cy.execute("script/setup/users/team_redirect");
    });
  });
});
