describe("Session Login ", () => {
    beforeEach(() => {
      var data_path = Cypress.env(`data`);
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username, data.pmc.password);
      });
      cy.fixture(`data/${data_path}/setup/add_new_folder/data`).then(function (data) {
      this.data = data;
      });
    });
    describe("To verify user is able to add new list folder", function () {
      it("FC-6022 Setup- List|| To verify user is able to add new list folder <smoke> ", function () {
        cy.visit("/folders");
        cy.wait(4000);
        cy.execute("/script/setup/add_new_folder", this.data);
      });
    });
});
