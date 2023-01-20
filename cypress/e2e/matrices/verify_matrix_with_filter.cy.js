describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/matrices/create_matrices/data`).then(function (data) {
            this.data = data;
        });
    });

    describe("Documents -> Project/Matrices -> Matrices", function () {
        it("fc-3857 With Filter : Filtered metrics appear when using the Matrices filter. <smoke>", function () {
            cy.execute('script/matrices/matrices_page',this.data);
            cy.select_by_placeholder('Matrices',this.data.Filter_Matrix);
            cy.wait(5000);
            cy.get('.matrix-fixed-header').find('table').find('tbody').find('tr').its('length').should('be.gt', 0);
        });
    });
});
  