describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("Setup- Lists|| To verify user is able to open list folder", function () {
    it("Fc-6021 To verify user is able to open list folder <smoke> ", function () {
      cy.visit("/folders");
      cy.get('a.folder__name').first().click();
    });
  });
});
