describe("Session Login", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(
      `data/${data_path}/task_assignment/filter_wo_by_asset_group_and_user_type/data`
    ).then(function (data) {
      this.data = data;
    });
  });

  describe("Filter Work Order", function () {
    it("fc-3973 User is able to filter WOs by Asset group and User type <smoke>", function () {
        cy.visit();
        cy.wait(7000);
        cy.get('i[title="Go to the Task Assignment"]').parent().click({ force: true });
        cy.execute("/script/task_assignment/filter", this.data);
        cy.contains("button", "Filter Tasks").click({ force: true });
        cy.wait(7000);
        cy.get('.sa-confirm-button-container').contains('button','OK').click({force: true});
        cy.wait(3000);
        cy.contains('h2','Task Assignments').should('exist');
    });
  });
});
