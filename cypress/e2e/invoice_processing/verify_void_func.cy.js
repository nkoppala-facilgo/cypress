describe("Session Login ", () => {
    beforeEach(() => {
		var data_path = Cypress.env("data");
		cy.fixture(`data/${data_path}/login/data`).then(function (data) {
			cy.login_with_session(data.pmc.username, data.pmc.password);
		});
		cy.fixture(`data/${data_path}/invoice_processing/verify_void_function/data`).then( function (data) {
			this.data = data;
		});
    });
    describe("To verify Void functionality.", function () {
		it("FC-3882 Upload Invoice image documents. and verify void functionality too <smoke>", function () {
			cy.visit();
			cy.wait(7000);
			cy.execute('/script/invoice_processing/verify_void_func', this.data);
		});
    });
});