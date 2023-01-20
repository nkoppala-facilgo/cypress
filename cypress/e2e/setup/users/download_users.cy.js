describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("Setup - user|| User is able to download Users.", function () {
    it("FC-6039 User is able to download Users.<smoke> ", function () {
      cy.visit("/user_management");
      cy.wait(4000);
      cy.execute("script/setup/users/download_users");
    });
  });
});
