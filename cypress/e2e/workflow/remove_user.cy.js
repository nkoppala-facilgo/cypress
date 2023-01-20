describe('Session Login ',()=>{
	beforeEach(() => {
		var data_path = Cypress.env(`data`);
		cy.fixture(`data/${data_path}/login/data`).then(function (data) {
			cy.login_with_session(data.pmc.username,data.pmc.password);
		});
		cy.fixture(`data/${data_path}/workflow/remove_user/data`).then(function (data) {
			this.remove_user = data;
		});     
	});
    describe("Remove user", function () {
		it('fc-2571 Remove user <smoke>', function () { 
			cy.execute('/script/workflow/path', this.remove_user);
			cy.contains('button','New Workflow').click({force: true});
			cy.wait(3000);
			const characters ='0123456789';
			function generateString(length) {
				let result = ' ';
				const charactersLength = characters.length;
				for ( let i = 0; i < length; i++ ) {
				    result += characters.charAt(Math.floor(Math.random() * charactersLength));
				}
				const common_str = Cypress.env(`common_string`);
				return common_str + result;
			}
			const woflow_name = generateString(6);
			cy.get('input[name=\"workflow[workflow_name]\"]').type(woflow_name);
			const weight = Math.floor((Math.random() * 10000) + 10);
			cy.get('input[name=\"workflow[weight]\"]').type(weight);
			cy.execute('/script/workflow/create', this.remove_user);
			cy.wait(3000);
			cy.get('.page_last > .white-box').invoke('text')
			.then((text)=>{
				this.remove_user.text = text ;
				cy.execute('/script/workflow/edit', this.remove_user);
				cy.wait(2000);
			});
			cy.contains(woflow_name).parent().find('.fa-plus-square-o').click({force: true});
			cy.execute('/script/workflow/add_new_user', this.remove_user);
			cy.execute('/script/workflow/remove_user', this.remove_user);
		});
    });
});