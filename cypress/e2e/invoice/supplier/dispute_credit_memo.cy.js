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

describe("To verify that PMC is able to Dispute Credit memos. ", function() {
        it('FC-2266 To verify that PMC is able to Dispute Credit memos.  <smoke>', function() {
                cy.visit()
                var data_path = Cypress.env(`data`)
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
                        cy.get('span[class=caret]').eq(0).click({force:true})   
                        cy.contains('Logout').click({force:true})
                        cy.wait(10000);
                        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                                cy.execute('script/login/login', data.pmc)
                        });
                        cy.wait(5000);
                        cy.visit('/credit_memos')
                        cy.wait(5000);
                        cy.get('div[data-react-class="CreditMemoFilterModalToggle"]').find('i').click({force:true})
                        cy.select_by_label('Credit Memo(s)#',this.data['supplier_cm'])
                        cy.contains('button','Search').click({force:true})
                        cy.get('div[id="js-react-CreditMemoPage"]').find('li').find('a').first().click({force:true})
                        cy.wait(3000)
                        cy.contains('button','Dispute').click({force:true})
                        cy.contains('div','Dispute Message').parent().find('textarea').type(this.data['dispute_message'],{force:true})
                        cy.contains('div','Dispute Message').parent().contains('button','Send').click()
                        cy.wait(3000)
                        cy.contains('Disputed').should('be.visible')
                })
        })
})
});