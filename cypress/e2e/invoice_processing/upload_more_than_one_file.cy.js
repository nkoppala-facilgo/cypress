describe("Session Login ", () => {
	beforeEach(() => {
		var data_path = Cypress.env("data");
		cy.fixture(`data/${data_path}/login/data`).then(function (data) {
		    cy.login_with_session(data.pmc.username, data.pmc.password);
		});
		cy.fixture(`data/${data_path}/invoice_processing/upload_more_than_one_file/data`).then(function (data) {
		    this.data = data;
		});
	});
	describe("To verify that PMC is able to upload more than one invoice document.", function () {
		it("FC-3881 Upload more than one invoice document and to verify it <smoke>", function () {
			cy.visit();
			cy.wait(7000);
			cy.execute("/script/invoice_processing/upload_more_than_one_file", this.data);
		});
	});
});
