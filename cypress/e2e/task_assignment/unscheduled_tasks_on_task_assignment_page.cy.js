describe("Session Login", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/task_assignment/unscheduled_tasks_on_task_assignment_page/data`).then(function (data) {
            this.data = data;
        });
    });
  
    describe("Filter Work Order", function () {
        it("fc-3973 To verify user is able to see Unscheduled Tasks on task Assignment page <smoke>", function () {
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
  