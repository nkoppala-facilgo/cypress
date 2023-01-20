describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("To verify user is able to 'Disable' List folder", function () {
    it("Fc-5260 To verify user is able to 'Disable' List folder <smoke> ", function () {
      cy.visit("/folders");
      cy.execute("/script/setup/list/list_disable");
    });
  });
});
