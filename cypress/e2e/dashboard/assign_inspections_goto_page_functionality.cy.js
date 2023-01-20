describe("Session Login ", () => {
    beforeEach(() => {
      var data_path = Cypress.env(`data`);
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
      });
      cy.fixture(`data/${data_path}/dashboard/assign_inspections_goto_page_functionality/data`).then(function (data) {
        this.data = data;
      })
    });
    
    describe("Assign Inspections", function () {
      it("UnAssigned Inspection: User should be able to land on the expected page using the Goto Page functionality <smoke>", function () {
        cy.visit();
        cy.wait(7000);
        cy.goto_page_functionality('#assign-inspection-tab-pane-unassigned',this.data.countrow);
      });
  
      it("Completed Inspection: User should be able to land on the expected page using the Goto Page functionality", function () {
        cy.visit();
        cy.wait(7000);
        cy.get(".assign-inspection").contains("a", "Completed").click();
        cy.goto_page_functionality('#assign-inspection-tab-pane-completed',this.data.countrow);
      });
    });
  });
    
    