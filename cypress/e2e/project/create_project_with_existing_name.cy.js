describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)   
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
 
        cy.fixture(`data/${data_path}/project/create_project_with_existing_name/data`).then(function (data) {
            this.data = data;
        })
    });
 
    describe("PMC is able to create a project with the existing name. Project is not able create with same project name", function () {
        it('FC-1459 PMC is able to create a project with the existing name. Project is not able create with same project name.', function () { 
            cy.visit('/projects');
            cy.wait(5000);
            cy.contains("Create Project").click({force: true});
            cy.execute("script/project/create_project_with_existing_name",this.data);
            cy.contains('Project has been created.').should('exist');
        });
    });
});
 