describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.supplier.username,data.supplier.password);
        });
        cy.fixture(`data/${data_path}/invoice/supplier/create/data`).then(function(data) {
            this.data = data;
        });
    });
    describe("To verify that Supplier is able to create Invoice with Register Supplier.", function() { 
        it('enter a duplicate invoice  <smoke>', function() {
            cy.visit();
            cy.wait(10000);
            cy.contains("Begin Work Menu").click({force: true});
            cy.contains('a', 'Create Invoice').click({force: true});
            cy.execute('script/invoice/supplier/create',this.data);
            cy.contains('button','Submit').click({force:true});
            cy.contains('Invoice number already exist').should('be.visible');
        });
    });
});