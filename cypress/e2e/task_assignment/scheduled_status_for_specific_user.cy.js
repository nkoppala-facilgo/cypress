describe('Session Login',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/task_assignment/scheduled_status_for_specific_user/data`).then(function (data) {
            this.data = data;
        });
    });

    describe("Documents -> Project/Matrices -> Task Assignments", function() {
        it("3976 Work Order with Scheduled status for specific user <smoke>", function() {
            cy.visit();
            cy.wait(7000);
            cy.execute('script/task_assignment/schedule_work_order',this.data);
            cy.get('i[title="Go to the Task Assignment"]').parent().click({force:true});
            cy.wait(5000);
            cy.contains('button','Clear').click({force: true});
            cy.wait(2000);
            cy.execute('/script/task_assignment/filter',this.data);
            cy.select_by_label('Additional Users',this.data['additional_user']);
            cy.select_by_checkbox(this.data['show_non_scheduled_task']);
            cy.contains('button','Filter Tasks').click({force:true});
            cy.wait(7000);
            cy.get('.sa-confirm-button-container').contains('button','OK').click({force:true});
            cy.wait(3000);
            cy.contains('Task Assignments').should('exist');
        });
    });
});