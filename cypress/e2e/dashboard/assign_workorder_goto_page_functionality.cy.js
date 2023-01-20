describe("Session Login ", () => {
    beforeEach(() => {
      var data_path = Cypress.env(`data`);
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
      });
      cy.fixture(`data/${data_path}/dashboard/assign_workorder_goto_page_functionality/data`).then(function (data) {
        this.data = data;
      })
    });
    
    describe("Assign Work Order", function () {
      it("UnAssigned Work Order Tab: User should be able to land on the expected page using the Goto Page functionality  <smoke>", function () {
        cy.visit();
        cy.wait(7000);
        cy.goto_page_functionality('#assign-work-order-tab-pane-unassigned',this.data.countrow);
      });
  
      it("UnScheduled Work Order Tab: User should be able to land on the expected page using the Goto Page functionality  <smoke>", function () {
        cy.visit();
        cy.wait(7000);
        cy.get(".assign-work-order").contains("a", "Unscheduled").click({force:true});
        cy.goto_page_functionality('#assign-work-order-tab-pane-unscheduled',this.data.countrow);
      });

      it("Completed Work Order Tab: User should be able to land on the expected page using the Goto Page functionality.  <smoke>", function () {
        cy.visit();
        cy.wait(7000);
        cy.get(".assign-work-order").contains("a", "Completed").click({force:true});;
        cy.goto_page_functionality('#assign-work-order-tab-pane-completed',this.data.countrow);
      });
    });
});
    