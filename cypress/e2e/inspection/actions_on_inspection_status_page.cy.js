describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("To verify that 'Page Unresponsive' pop-up is not displaying and actions are performed instantly when user clicks on any field on 'Inspection Status' page", function () {
    it("FC-8152 Actions are performed instantly when user clicks on any field on Inspection Status page <regression>", function () {
      cy.visit("/dashboards/graph");
      cy.execute("script/inspection/actions_on_inspection_status_page");
    });
  });
});
