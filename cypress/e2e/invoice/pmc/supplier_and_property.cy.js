describe('Session Login ',()=>{
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.pmc.username,data.pmc.password);
              });
        cy.fixture(`data/${data_path}/invoice/pmc/supplier_and_property/data`).then(function(data) {
                this.data = data;
        })
    })
describe("To verify that property field show only those properties that are assign to selected Non Register supplier.", function() {
        it('FC-4224 To verify that property field show only those properties that are assign to selected Non Register supplier.', function() {
                cy.visit("/invoices")
                cy.contains('a', 'Create Invoice').click({ force: true })
                cy.select_by_label('SUPPLIER NAME:',this.data['supplier'])
                for(let i=0;i<this.data.property.length;i++){
                        cy.contains('label','PROPERTY NAME:').parent().find('input[type=text]').type(this.data['property'][i])
                        cy.wait(3000)
                        cy.contains('li',this.data['property'][i]).should('be.visible')
                        cy.contains('label','PROPERTY NAME:').parent().find('input[type=text]').clear({force:true})
                }
        });
        
});
});