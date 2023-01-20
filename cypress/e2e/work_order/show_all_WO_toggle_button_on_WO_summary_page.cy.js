describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/show_all_WO_toggle_button_on_WO_summary_page/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("To verify when user filter any work order Show All Work Orders toggle button should be selected on the Work Order summary page", function () {
    it("FC-9354 Work Order Show All Work Orders toggle button should be selected on the Work Order summary page <regression> ", function () {
        cy.visit("/dashboards/graph")
        cy.wait(3000);
        cy.contains("Documents").click()
        cy.contains('a','Work Orders').click({ force: true })
        cy.wait(5000);
        cy.execute('script/work_order/filter',this.data)
    });
  });
});
