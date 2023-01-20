describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/invoice_processing/verify_user_is_able_to_search_invoice_with_grand_total/data`).then(function (data) {
	    this.data = data;
	});
    });
    describe("To verify user is able to search invoices by grand total amount on 'Invoice Image' field", function () {
        it("FC-6892 Verify User Is able to search invoice with grand total <smoke>", function () {
            cy.visit('/invoice_processings');
            cy.wait(7000);
            cy.execute("/script/invoice_processing/verify_user_is_able_to_search_invoice_with_grand_total", this.data);
        });
    });
});
  
