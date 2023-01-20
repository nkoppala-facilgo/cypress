describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.apSpecialistqc.username, data.apSpecialistqc.password);
        });
        cy.fixture(`data/${data_path}/invoice_processing/select_RouteTo_after_UserRole_in_invoice/data`).then(function (data) {
	    this.data = data;
	});
    });
    
    describe("To verify user is able to select 'Company' on Route To (Asset group) field without selecting 'User Role' while creating invoice exception", function () {
        it("FC-8372 verify user is able to select 'Company' on Route To (Asset group) <regression>", function () {
            cy.visit();
            cy.wait(7000);
            cy.execute('/script/invoice_processing/select_RouteTo_after_UserRole_in_invoice', this.data);
        });
    });
});
