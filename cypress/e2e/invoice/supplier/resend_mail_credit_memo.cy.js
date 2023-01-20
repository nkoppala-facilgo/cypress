describe('Session Login ',()=>{
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              });
        cy.fixture(`data/${data_path}/invoice/supplier/create_memo/data`).then(function(data) {
                this.data = data;
        })
})

describe("To verify that PMC gets email notification after Supplier Re-Send Email for the Credit memos.", function() {
        it('FC_2261 To verify that PMC gets email notification after Supplier Re-Send Email for the Credit memos.  <smoke>', function() {
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
                this.data.supplier_cm = generateString(7)
                cy.visit('/invoices')
                cy.wait(3000)
                cy.get('li[class="list-group-item"]').first().click({force:true})
                cy.contains('label','FINVOICE#:').parent().find('p')
                .invoke('text')
                .then(finvoice => {
                        cy.visit("/credit_memos/new?ref_invoice_id="+finvoice)
                        cy.execute('script/invoice/supplier/create_memo',this.data)
                        cy.get('input[value="Submit"]').click({force:true})
                        cy.contains('Credit Memo was successfully created.').should('be.visible')
                        cy.contains('button','Re-Send Email').click({force:true})
                        cy.contains('Email sent.').should('be.visible')
                })
        })
})
});