describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
    });
    
    describe("Assign Work Order", function () {
      it("UnAssigned Work Order Tab: To Verify user can able to click the work order link <smoke>", function () {
        cy.visit();
        cy.wait(7000);
        cy.visit_new_tab('#assign-work-order-tab-pane-unassigned','WO#:','p','/work_orders/');
      });

      it("UnScheduled Work Order Tab: To Verify user can able to click the work order link <smoke>", function () {
        cy.visit();
        cy.wait(7000);
        cy.get(".assign-work-order").contains("a", "Unscheduled").click({force:true});
        cy.wait(15000);
        cy.visit_new_tab('#assign-work-order-tab-pane-unscheduled','WO#:','p','/work_orders/');
      });

      it("Completed Work Order Tab: To Verify user can able to click the work order link <smoke>", function () {
        cy.visit();
        cy.wait(7000);
        cy.get(".assign-work-order").contains("a", "Completed").click();
        cy.wait(15000);
        cy.visit_new_tab('#assign-work-order-tab-pane-completed','WO#:','p','/work_orders/');
      });
    });
});
    