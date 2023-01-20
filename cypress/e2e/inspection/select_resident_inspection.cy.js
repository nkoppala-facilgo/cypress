describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/inspection/select_resident_inspection/data`).then(function (data) {
            this.data = data;
        });
    });
  
    describe("To verify if the user able to select the resident in Inspection.", function () {
        it("FC-8158 user able to select the resident in Inspection <regression>", function () {
            cy.visit();
            cy.wait(7000);
            cy.execute("script/inspection/select_resident_inspection",this.data);
        });
    });
});
