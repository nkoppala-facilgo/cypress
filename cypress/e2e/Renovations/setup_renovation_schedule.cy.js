describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/renovations/setup_renovation_schedule/data`).then(function (data) {
            this.data = data;
        });
    });       
    describe("Setup Renovation Schedule", function () {
        it("fc-1544 Automation || To verify user is able to set up 'Renovation Schedule'", function () {
            cy.execute('script/Renovations/renovations_page',this.data);
            cy.wait(5000);
            cy.execute('script/Renovations/setup_renovation_schedule',this.data);
        });
    });
});



