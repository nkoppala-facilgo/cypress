describe('Session Login ',()=>{
	beforeEach(() => {
		var data_path = Cypress.env(`data`);
		cy.fixture(`data/${data_path}/login/data`).then(function (data) {
			cy.login_with_session(data.pmc.username,data.pmc.password);
		});
		cy.fixture(`data/${data_path}/workflow/expand/data`).then(function (data) {
			this.data = data;
		});
	});
    describe("Able to expand on workflow", function () {
		it('FC-2575 Able to expand on workflow <smoke>', function () { 
			cy.execute('/script/workflow/path', this.data);
			cy.execute('/script/workflow/expand', this.data);     
		});
    });
});     