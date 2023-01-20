describe("Session Login", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/inspection/change_resident/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("To verify that current ‘Lease title' is displaying on 'Lease Title' field on 'Change resident' pop-up on 'Create Inspection’ page", function () {
        it("FC-8150  user is able to change resident <regression>", function () {
            cy.visit();
            cy.wait(7000);
            cy.execute("script/inspection/change_resident", this.data);
        });
    });
});
