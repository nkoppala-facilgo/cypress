describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/invoice_processing/user_role_editable_on_form_exception/data`).then(function (data) {
	        this.data = data;
	    });
    });
    
    describe("To verify 'user role' should be editable on 'Form Exception pop up when user role is set on company setting ", function () {
        it("FC-8631 'user role' should be editable on 'Form Exception pop up  <regression>", function() {
            cy.visit();
            cy.wait(3000);
            cy.execute('/script/invoice_processing/user_role_editable_on_form_exception', this.data);
        });
    });
});
