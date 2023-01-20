describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/workflow/view_chart/data`).then(function (data) {
            this.view_chart_data = data;
        });   
    });
    describe("Able to view chart", function () {
		it('FC-2573 Able to view chart <smoke>', function () { 
			cy.execute('/script/workflow/path', this.view_chart_data);
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
			cy.execute('/script/workflow/create', this.view_chart_data);
			cy.wait(3000);
			cy.get('body').then((body) => {
				if (body.find('.pagination').length > 0) {
					if (body.find('.page_last').length > 0) {
						cy.get('.page_last > .white-box').invoke('text')
						.then((text)=>{
							this.view_chart_data.text = text;
							cy.execute('/script/workflow/edit', this.view_chart_data);
							cy.wait(2000);
						});
					}else{
						cy.get('.page_next > .white-box').invoke('text')
						.then((text)=>{
							this.view_chart_data.text = text;
							cy.execute('/script/workflow/edit', this.view_chart_data);
							cy.wait(2000);
						});
					}
				}
			});
			this.view_chart_data.woflow_name = woflow_name;
			cy.execute('/script/workflow/view_chart', this.view_chart_data);
		});
    });
});