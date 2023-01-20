describe('Session Login ',()=>{
    beforeEach(()=>{
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/invoice/pmc/download_credit_memo_pdf/data`).then(function(data) {
            this.data = data;
        });
    })
    describe("To verify PMC is able to download PDF file for created Credit memos", function() {
        it('FC-4220 To verify PMC is able to download PDF file for created Credit memos. <smoke>', function() {
            cy.visit()
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
            this.data.supplier_invoice = generateString(7);
            cy.contains("Documents").click()
            cy.contains('a', 'Invoices').click({ force: true })
            cy.contains('a[class=item-menu]', 'Invoices').click({ force: true })
            cy.contains('a', 'Create Invoice').click({ force: true })
            cy.contains('a', 'More').click({ force: true })
            cy.execute('script/invoice/pmc/create',this.data)
            cy.contains('button','Submit').click({force:true})
            cy.contains('Invoice was successfully created').should('be.visible')

            cy.contains('span','More').parent().click({force:true})
            cy.contains('label','FINVOICE#:').parent().find('p')
            .invoke('text')
            .then(finvoice => {
                this.data.supplier_cm = generateString(7)
                cy.visit("/credit_memos/new?ref_invoice_id="+finvoice)
                cy.execute('script/invoice/pmc/create_memo',this.data)
                cy.get('input[type=submit]').click({force:true})
                cy.contains("Credit Memo was successfully created.").should('be.visible')
                cy.get('.box-body-header .icon-group a').eq(2).click()
                cy.contains('a','Print Original Credit Memo').invoke('removeAttr', 'target').click()
            })
        });
    });
});