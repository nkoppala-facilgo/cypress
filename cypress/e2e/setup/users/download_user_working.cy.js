describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("Setup - Users|| User is able to download 'User Working Days/Hours' file.", function () {
    it("FC-6038 User is able to download 'User Working Days/Hours' file.<smoke> ", function () {
      cy.visit("/user_management");
      cy.contains("span", " Download User Working Days / Hours").click();
    });
  });
});
