describe('Session Login ',()=>{
	beforeEach(() => {
		var data_path = Cypress.env(`data`);
		cy.fixture(`data/${data_path}/login/data`).then(function (data) {
			cy.login_with_session(data.pmc.username,data.pmc.password);
		});
		cy.fixture(`data/${data_path}/workflow/edit/data`).then(function (data) {
			this.edit_data =  data;
		});     
	});
    describe("Edit workflow", function () {
		it('FC-2565 Edit workflow <smoke>', function () { 
			cy.execute('/script/workflow/path', this.edit_data);
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
			cy.execute('/script/workflow/create', this.edit_data);
			cy.wait(3000);
			cy.get('body').then((body) => {
				if (body.find('.pagination').length > 0) {
					if (body.find('.page_last').length > 0) {
						cy.get('.page_last > .white-box').invoke('text')
						.then((text)=>{
							this.edit_data.text = text ;
							cy.execute('/script/workflow/edit', this.edit_data);
						});
					}else{
						cy.get('.page_next> .white-box').invoke('text')
						.then((text)=>{
							this.edit_data.text = text ;
							cy.execute('/script/workflow/edit', this.edit_data);
						});
					}
				}
		    });
			cy.contains(woflow_name).parent().find('td').find('.fa-sort-down').click({force: true});
			cy.get('.dropdown-menu >li > a').contains('a','Edit').click({force: true});
			const workflow_name_edit = generateString(6);
			cy.get('input[name=\"workflow[workflow_name]\"]').clear().type(workflow_name_edit);
			cy.get('input[Value = \"Save\"]').click({force: true});
		});
    });
})