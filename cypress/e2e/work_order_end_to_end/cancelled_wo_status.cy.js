describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order_end_to_end/cancelled_wo_status/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is  CanCelled", function () {
        it('FC-11281 Verify WO Status is  CanCelled', function () {
            cy.execute("/script/work_order/create_wo_with_project", this.data);
            cy.wait(3000); 
            cy.contains('button','Goto Summary').click({force:true});
            cy.wait(3000);
            cy.get('.document-action-buttons .btn-danger').contains('Void').click();
            cy.contains('h5','Reason: ').parent().find(`.Select-control `).within(()=>{cy.get('input[role=\"combobox\"]').click({force: true}).type(this.data['reason'],{force: true}).wait(3000).type('{enter}')})
            cy.wait(2000);
            cy.get('.modal-footer  .btn-primary').contains('Save').click();  
            cy.contains('Are you sure?').should('exist'); 
            cy.wait(2000);
            cy.get('.confirm').contains('button','Yes').click();   
            cy.get('.confirm').click();
            cy.reload();
        });
    });
});
