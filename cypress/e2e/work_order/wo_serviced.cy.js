describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order/wo_serviced/data`).then(function (data) {
            this.data = data;
        });
    });

    describe("Work Order Serviced", function () {
        it(' FC-4408 Verify child WO is created when WO is already serviced', function () {
            cy.execute('/script/work_order/create',this.data);
            cy.execute('/script/work_order/wo_serviced',this.data);    

            cy.contains('label','WO#:').parent().find('p').invoke('text')
			.then(text => {
                cy.log(text);
                cy.get('#js-react-WorkOrderDocumentHierarchyView').find('table').find('tbody').find('tr').first().find('td').first().find('a').invoke('text')
                .then(text1 => {
                    cy.log(text1);
                    let flag = text + '(SvcOrdered)';
				    expect(flag).to.equal(text1);
                });
                cy.get('#js-react-WorkOrderDocumentHierarchyView').find('table').find('tbody').find('tr').eq(1).find('td').eq(1).find('a').invoke('text')
                .then(text2 => {
                    cy.log(text2);
                    let value = Number(text) + 1;
                    let text3 = value.toString();
                    let flag = text3 + '(SvcOrdered)';
				    expect(flag).to.equal(text2);
                });
			}); 
        });
    });
});