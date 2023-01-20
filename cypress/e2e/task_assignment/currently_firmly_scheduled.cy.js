describe('Session Login',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/task_assignment/currently_firmly_scheduled/data`).then(function (data) {
            this.data = data;
        });
    });

    describe("Documents -> Project/Matrices -> Task Assignments", function() {
        it("fc-3937 Route optimization: Verify that the routing engine does not schedule WOs with overlapping schedules, including against ones that are currently Firmly Scheduled", function() {
            cy.visit();
            cy.wait(7000);
            cy.execute('script/task_assignment/schedule_work_order',this.data);
            cy.execute('script/task_assignment/schedule_work_order',this.data);
            cy.get('i[title="Go to the Task Assignment"]').parent().click({force:true});
            cy.wait(5000);
            cy.contains('button','Clear').click({force: true});
            cy.wait(2000);
            cy.execute('/script/task_assignment/filter',this.data);
            cy.select_by_label('Additional Users',this.data['additional_user']);
            cy.select_by_checkbox(this.data['show_non_scheduled_task']);
            cy.contains('button','Filter Tasks').click({force:true});
            cy.wait(3000);
            cy.get('.sa-confirm-button-container').contains('button','OK').click({force:true});
            cy.wait(3000);
            cy.contains('span','Insulation').first().click({force: true});
            cy.wait(3000);
            cy.contains('Schedule Flexibility').parent().contains('button','Reserved').click({force: true});
            cy.contains('Assignee Flexibility').parent().contains('button','Reserved').click({force: true});
            cy.contains('button','Save').click({force:true});
            cy.wait(3000);
            cy.contains('span','Dishwasher').first().click({force: true});
            cy.wait(3000);
            cy.contains('Schedule Flexibility').parent().contains('button','Reserved').click({force: true});
            cy.contains('Assignee Flexibility').parent().contains('button','Reserved').click({force: true});
            cy.wait(3000);
            cy.contains('button','Save').click({force:true});
            cy.wait(3000);
            cy.contains('button','Suggest Routing').click({force: true});
            cy.wait(3000);
            cy.get('.facilgo-modal__footer > .facilgo-button__blue').click({force: true});
            cy.wait(3000);
            cy.get('.sa-confirm-button-container').contains('button','OK').click({force:true}); 
        });
    });
});