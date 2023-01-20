describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order/administrator_action_items_widget/declined_or_cancelled_urgent/data`).then(function (data) {
            this.data = data;
        })
    })

    describe("Administrator action items widget", function () {
		it("FC-11145 Review and Resend: To verify that Created Sdeclined Work Orders are displayed in the Admin Action Items widget's Declined or Cancelled. Review and Resend section urgent <smoke>", function () { 
			cy.visit();
            cy.wait(4000);
            cy.get('#graph-content-0').find('tbody').find('tr').eq(7).find('td').eq(1).find('a').invoke('text')
            .then(text => {
                const count1 = text;
                cy.log("Count is => ",count1);
                cy.execute('/script/work_order/create',this.data)
                cy.contains('label','WO#:').parent().find('input[type=text]').invoke('val')
                .then(wo_number => {
				    cy.get('span[class=caret]').eq(0).click({force:true})  
                    cy.execute('/script/work_order/next_step',this.data)
                    cy.wait(5000) 
                    cy.visit("/work_orders/"+wo_number)
                    cy.get("#js-react-WorkOrderDocumentHierarchyView > div > table > tbody > tr > td:nth-child(3) > a").invoke('text')
                    .then(Quote_number => {
                        cy.get('span[class=caret]').eq(0).click({force:true}) 
                        cy.contains("Logout").click({ force: true });
                        var data_path = Cypress.env(`data`)
                        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                            cy.login_with_session(data.supplier.username,data.supplier.password);
                        });   
                        cy.visit("/quote_requests/"+Quote_number)
                        cy.get('a[data-remote="true"]').first().dblclick({ force: true });
                        cy.wait(5000);
                        cy.contains(".btn.btn-primary", "Create Quote").click();
                        cy.execute("/script/work_order/not_quoteclosed_for_openorders",this.data);
                        cy.contains("Logout").click({ force: true });
                        var data_path = Cypress.env(`data`)
                        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                            cy.execute('script/login/login', data.pmc)
                        });
                        cy.visit("")
                        cy.visit("/work_orders/"+wo_number)
                        cy.contains("button","Decline").click()
                        cy.contains("button","Yes").click()
                        cy.contains("button","OK").click()
                        cy.visit();
                        cy.wait(4000);
                        cy.get('#graph-content-0').find('tbody').find('tr').eq(7).find('td').eq(1).find('a').invoke('text')
                        .then(text => {
                            const count2 = text;
                            cy.log("Count is => ",count2);
                            cy.log(count1 < count2); 
		                });
                    });
		        });
			});
		});
	});
});