describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc2.username,data.pmc2.password);
        });
        cy.fixture(`data/${data_path}/matrices/create_matrices/data`).then(function (data) {
            this.data = data;
        });
    });
  
    describe("Documents -> Project/Matrices -> Matrices", function () {
        it("fc-3867 Documents Inspections Link : To verify related document should open after clicking on reference link on Matrices filter page. <smoke>", function () {
            cy.execute('script/matrices/matrices_page',this.data);
            cy.select_by_placeholder('Matrices',this.data.Filter_Matrix);
            cy.wait(5000);
            cy.get('#js-react-TurnMatrix .matrix-content .matrix-fixed-header  table  tbody  tr  td  a').first()
            .should('have.attr', 'href')
            .then((href) => {
            cy.visit(href)
            })
        });
    });
});
  