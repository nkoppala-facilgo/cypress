describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order/wo_labor_hours/data`).then(function (data) {
            this.data = data;
        });
    });

    describe("Work Order Labor Hours", function () {
        it('fc-4408 Verify child WO is create when WO has labor hours', function () {
            cy.execute('/script/work_order/create',this.data);
            cy.execute('/script/work_order/wo_labor_hours',this.data);    

            cy.contains('label','WO#:').parent().find('p').invoke('text')
			.then(text => {
                cy.log(text);
                cy.get('#js-react-WorkOrderDocumentHierarchyView').find('table').find('tbody').find('tr').first().find('td').first().find('a').invoke('text')
                .then(text1 => {
                    cy.log(text1);
                    let flag = text + '(NotAssigned)';
				    expect(flag).to.equal(text1);
                });
                cy.get('#js-react-WorkOrderDocumentHierarchyView').find('table').find('tbody').find('tr').eq(2).find('td').eq(1).find('a').invoke('text')
                .then(text2 => {
                    cy.log(text2);
                    let value = Number(text) + 2;
                    let text3 = value.toString();
                    let flag = text3 + '(SvcOrdered)';
				    expect(flag).to.equal(text2);
                });
                cy.get('#js-react-WorkOrderDocumentHierarchyView').find('table').find('tbody').find('tr').eq(1).find('td').eq(1).find('a').invoke('text')
                .then(text4 => {
                    cy.log(text4);
                    let value = Number(text) + 1;
                    let text5 = value.toString();
                    let flag = text5 + '(SentToSupplier)';
				    expect(flag).to.equal(text4);
                });
			}); 
        });
    });
});