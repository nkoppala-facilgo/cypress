describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username,data.pmc.password);
      });
     cy.fixture(`data/${data_path}/dashboard/completed_close_wo_on_assign_wo/data`).then(function (data) {
        this.data = data;
     })
  });

  describe("Assign Work Orders Completed Tab", function () {
    it("To Verify that user can close the work order <smoke>", function () {
      cy.visit();
      cy.wait(7000);
      cy.get(".assign-work-order").contains("a", "Completed").click();
      cy.wait(5000)
      for(let i = 1; i <= this.data.countrow; i++)
      {
        cy.get("#assign-work-order-tab-pane-completed").find('input[type=checkbox]').eq(i).check();
      }
      cy.get(".assign-work-order").contains("button", "Close Work Orders").click({ force: true });
      cy.wait(2000)
      cy.get(".sa-confirm-button-container").contains("button", "Yes").click();
      cy.wait(2000)
      cy.contains("Work Orders successfully closed!").should("exist");
    });
  });
});
