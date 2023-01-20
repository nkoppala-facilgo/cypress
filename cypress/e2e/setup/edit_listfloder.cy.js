describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/edit_listfolder/data`).then(function (
      data
    ) {
      this.data = data;
    });
  });
  describe("Setup- Lists|| To verify user is able to 'Edit' list folder", function () {
    it("Fc-3075 To verify user is to edit list <smoke>", function () {
      cy.visit("/folders").wait(7000);
      cy.execute("script/setup/edit_listfolder", this.data);
      cy.contains("Update Successful!").should("exist");
    });
  });
});
