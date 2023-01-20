describe('Session Login ',()=>{
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              });
        cy.fixture(`data/${data_path}/invoice/supplier/create/data`).then(function(data) {
                this.data = data;
        })
})
describe("To verify that user is able to Void the Invoice after Supplier creating Invoice successfully", function() {
        it('FC-2250 To verify that user is able to "Void" the Invoice after Supplier creating Invoice successfully  <smoke>', function() {
                cy.visit()
                cy.wait(2000)
                const characters ='0123456789';
                function generateString(length) {
                        let result = '';
                        const charactersLength = characters.length;
                        for ( let i = 0; i < length; i++ ) {
                                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                        }
                        const common_str = Cypress.env(`common_string`);
               return common_str + result;
                }
                this.data['supplier_invoice'] = generateString(7);
                cy.contains("Begin Work Menu").click()
                cy.contains('a', 'Create Invoice').click({ force: true })
                cy.execute('script/invoice/supplier/create',this.data)
                cy.contains('button','Submit').click({force:true})
                cy.contains('Invoice was successfully created').should('be.visible')
                cy.wait(2000)
                cy.contains('button','Void').click({force:true})
                cy.wait(2000)
                cy.contains('button','Yes').click({force:true})
                cy.contains('Invoice has been voided').should('be.visible')

        })
})
});