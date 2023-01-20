describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
    });

    describe("To verify user is able to select date on 'Date' field on filter pop up ", function () {
        it("FC-8623 user is able to select date on 'Date' field on filter pop up <regression>", function () {
            cy.visit();
            cy.wait(3000);
            cy.execute("script/invoice_processing/filter_using_date_field");
        });
    });
});
