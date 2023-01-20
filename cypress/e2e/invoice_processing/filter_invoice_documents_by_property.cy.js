describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/invoice_processing/filter_invoice_documents_by_property/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("To verify user is able to search/filter invoice documents by property.", function () {
        it("FC-8639 To verify user is able to search/filter invoice documents by property. <regression>", function () {
            cy.visit();
            cy.waitUntil(()=>cy.contains("a", "Invoice Processing").click({ force: true }));
            cy.contains("a", "Invoice Images").click({ force: true });
            cy.execute('/script/invoice_processing/search', this.data);
        });
    });
});
