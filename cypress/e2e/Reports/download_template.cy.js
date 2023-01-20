describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/Reports/download_template/data`).then(function (data) {
        this.data = data;
    });
  });
  describe("To verify user is able to download Template without any error.", function () {
    it("FC-7756 user is able to download Template <smoke>", function () {
      cy.visit();
      cy.execute("/script/Reports/download_template", this.data);
    });
  });
});
