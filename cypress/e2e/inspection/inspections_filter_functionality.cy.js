describe("Session Login", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/inspection/inspection_filter_functionality/data`).then(function (data) {
      this.data = data;
    });
  });

  describe("Inspections filter functionality with 'Status' and 'Assignee' fields.", function () {
    it("FC-5436 Inspections filter functionality with 'Status' and 'Assignee' fields. <smoke>", function () {
      cy.execute("/script/inspection/inspection_filter_functionality",this.data);
      cy.get('li[class="list-group-item btn-show-inspection-head"]').its('length').should('be.gt',0)
    });
  });
});
