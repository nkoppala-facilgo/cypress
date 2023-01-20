describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/Reports/dd_investigation_report_template/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("To verify DD investigation report template file should be 6 pages", function () {
    it("FC-7757 DD investigation report template file should be downloaded <smoke>", function () {
      cy.visit();
      cy.execute("/script/Reports/dd_investigation_report_template", this.data);
    });
  });
});
