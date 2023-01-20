describe("Session Login ", () => {
    beforeEach(() => {
      var data_path = Cypress.env(`data`);
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
      });
      cy.fixture(`data/${data_path}/dashboard/assign_inspections_completed_tab_close_inspection_button/data`).then(function (data) {
        this.data = data;
      })
    });
  
    describe("Assign Inspections Completed Tab", function () {
      it("Completed Tab : To Verify that user can close the inspection. <smoke>", function () {
        cy.visit();
        cy.wait(7000);
        cy.get(".assign-inspection").contains("a", "Completed").click();
        cy.wait(5000)
        for(let i = 1; i <= this.data.countrow; i++)
        {
          cy.get("#assign-inspection-tab-pane-completed").find('input[type=checkbox]').eq(i).check();
        }
        cy.get(".assign-inspection").contains("button", "Close Inspections").click({ force: true });
        cy.wait(2000)
        cy.get(".sa-confirm-button-container").contains("button", "Yes").click();
        cy.wait(2000)
        cy.contains("Inspections successfully closed!").should("exist");
      });
    });
  });
  