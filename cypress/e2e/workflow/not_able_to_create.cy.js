describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/workflow/not_able_to_create/data`).then(function (data) {
          this.data = data;
        });
    });
    describe("Not able to create workflow with existing workflow name", function () {
		it('FC-2566 Not able to create workflow with existing workflow name <smoke>', function () { 
			cy.execute('/script/workflow/path', this.data);
			cy.execute('/script/workflow/not_able_to_create', this.data);     
		});
    });
});    