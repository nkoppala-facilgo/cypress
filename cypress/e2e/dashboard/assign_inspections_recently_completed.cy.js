describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/dashboard/assign_inspections_recently_completed/data`).then(function (data) {
            this.data = data;
        });
    });
    
    describe("Assign Inspections", function () {
        it("Assign Inspections : Recently Completed-To Verify the submit button <smoke>", function () {
            cy.visit();
            cy.wait(7000);
            cy.get('#assign-inspection-tab-tab-recently_completed').click({force: true});
            cy.wait(3000);
            cy.select_by_placeholder('Inspection Lists', this.data['inspection_lists']);
            cy.get('.assign-inspection').contains('label','Within the last').parent().find('input').type(this.data['last_days']);
            cy.wait(3000);
            cy.get('.assign-inspection').contains('button','Submit').click({force: true});
        });
    });
});
    
    