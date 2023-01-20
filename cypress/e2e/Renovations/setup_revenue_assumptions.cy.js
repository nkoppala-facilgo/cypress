describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/renovations/setup_revenue_assumptions/data`).then(function (data) {
            this.data = data;
        });
    });
    
    describe("Documents -> Project/Matrices -> Renovation", function () {
        it("fc-1541 Automation || To verify user is able to initiate 'Setup Revenue Assumptions'", function () {
            cy.execute('script/Renovations/renovations_page',this.data);
            cy.wait(5000);
            cy.execute('script/Renovations/setup_revenue_assumptions',this.data);
        });
    });
});