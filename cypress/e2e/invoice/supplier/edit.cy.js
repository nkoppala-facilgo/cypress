describe('Session Login ',()=>{
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              });
        cy.fixture(`data/${data_path}/invoice/supplier/create/data`).then(function(data) {
                this.create_data = data;
        })
        cy.fixture(`data/${data_path}/invoice/supplier/edit/data`).then(function(data) {
                this.edit_data = data;
        })
})
describe("To verify that user is able to Edit Invoice after Supplier creating Invoice successfully", function() {
        it('FC-2244 To verify that user is able to Edit Invoice after Supplier creating Invoice successfully <smoke>', function() {
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
                this.create_data['supplier_invoice'] = generateString(7);
                cy.contains("Begin Work Menu").click()
                cy.contains('a', 'Create Invoice').click({ force: true })
                cy.execute('script/invoice/supplier/create',this.create_data)
                cy.contains('button','Submit').click({force:true})
                cy.contains('Invoice was successfully created').should('be.visible')
                cy.contains('a','Edit').click({force:true})
                cy.execute('script/invoice/supplier/edit',this.edit_data)
                cy.contains('button','Save').click({force:true})
        })
})
});