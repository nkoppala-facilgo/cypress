describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/list/edit_list_folder/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });
  describe("To verify user is able to 'Edit' list folder", function () {
    it("Fc-5261 Setup- Lists|| To verify user is able to 'Edit' list folder <smoke> ", function () {
      cy.visit("/folders");
      cy.execute("/script/setup/list/edit_list_folder", this.data);
    });
  });
});
