describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/add_newlistfolder/data`).then(function (
      data
    ) {
      this.data = data;
    });
  });
  describe("To verify user is able to add new list folder", function () {
    it("Fc-5326 Setup- List|| To verify user is able to add new list folder <smoke> ", function () {
      cy.visit("/folders");
      cy.execute("/script/setup/add_newlistfolder", this.data);
    });
  });
});
