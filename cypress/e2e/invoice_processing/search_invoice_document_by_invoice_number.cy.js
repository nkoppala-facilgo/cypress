describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/invoice_processing/search_invoice_document_by_invoice_number/data`).then(function (data) {
	    this.data = data;
	});
    });
    describe("To verify user is able to search invoice document which by Invoice number", function () {
        it("FC-8636 User is able to search invoice document which by Invoice number <regression>", function () {
            cy.visit();
            cy.waitUntil(()=>cy.contains("a", "Invoice Processing").click({force: true}));
            cy.waitUntil(()=>cy.contains("a", "Quality Control").click({force: true}));
            cy.execute('script/invoice_processing/search_invoice_document_by_invoice_number', this.data);
        });
    });
});
