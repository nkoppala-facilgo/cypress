describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
    });
    
    describe("Assign Inspections", function () {
      it("UnAssigned Tab: To Verify user can able to click the Inspeciton link <smoke>", function () {
        cy.visit();
        cy.wait(7000);
        cy.visit_new_tab('#assign-inspection-tab-pane-unassigned','INSPECTION#:','div','/inspections/');
      });

      it("Completed Tab: To Verify user can able to click the Inspeciton link <smoke>", function () {
        cy.visit();
        cy.wait(7000);
        cy.get(".assign-inspection").contains("a", "Completed").click();
        cy.wait(15000);
        cy.visit_new_tab('#assign-inspection-tab-pane-completed','INSPECTION#:','div','/inspections/');
      });
    });
});
    
    