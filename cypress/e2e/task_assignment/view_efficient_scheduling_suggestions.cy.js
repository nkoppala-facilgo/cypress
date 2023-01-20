describe('Session Login',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/task_assignment/filter/data`).then(function (data) {
        this.data = data;
        });
    });

    describe("Documents -> Project/Matrices -> Task Assignments", function() {
        it("fc-5092 Check Button : Verify when Efficient scheduling suggestions includes all the incomplete WOs for the properties associated to the WOs on the left sections of the Task Assignment Grid page.", function() {
            cy.visit();
            cy.wait(7000);
            cy.get('i[title="Go to the Task Assignment"]').parent().click({force:true});
            cy.execute('/script/task_assignment/filter',this.data);
            cy.contains('button','Filter Tasks').click({force:true});
            cy.wait(7000);
            cy.contains('button','OK').click({force:true});
            cy.contains('button','Check').click({force:true});
            cy.contains('Efficient Scheduling Suggestions').should("be.visible");
        });
    });
});