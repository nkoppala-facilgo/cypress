describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/matrices/create_multiple_inspection/data`).then(function (data) {
            this.data = data;
        });
    });
  
    describe("Documents -> Project/Matrices -> Matrices", function () {
        it("fc-3859 Create Multiple Inspections Button : Create Multiple Inspections from Matrices.", function () {
            cy.execute('script/matrices/matrices_page',this.data);
            cy.select_by_placeholder('Matrices',this.data.Filter_Matrix);
            cy.get('.content-header-fancy').contains('button','Create Multiple Inspections').click();
            cy.wait(10000);
            cy.execute('script/matrices/create_multiple_inspection',this.data);
        });
    });
});