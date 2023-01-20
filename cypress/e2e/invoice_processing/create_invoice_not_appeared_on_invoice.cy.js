describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/invoice_processing/create_invoice_not_appeared_on_invoice/data`).then(function (data) {
            this.data = data;
        });
    });

    describe("CLONE - Invoice Processing: 'Create invoice' button should not display until user select the assignee on invoice.", function () {
        it("FC-8368 'Create invoice' button should not display until user select the assignee on invoice <regression>", function () {
            cy.visit();
            cy.wait(7000);
            cy.execute('/script/invoice_processing/create_invoice_not_appeared_on_invoice', this.data);
        });
    });
});
