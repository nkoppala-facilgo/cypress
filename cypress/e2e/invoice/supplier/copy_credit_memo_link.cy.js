describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.supplier.username,data.supplier.password);
        });
        cy.fixture(`data/${data_path}/invoice/supplier/create/data`).then(function(data) {
            this.data = data;
        });
        cy.fixture(`data/${data_path}/invoice/supplier/create_memo/data`).then(function(data) {
            this.memo_data = data;
        });
    });

    describe("To verify that Supplier is able to copy Credit memos link.", function() {
        it('FC-4253 To verify that Supplier is able to copy Credit memos link..', function() {
            cy.visit();
            cy.wait(7000);
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
            this.memo_data.supplier_cm = generateString(10);
            cy.contains("Begin Work Menu").click({ force: true });
            cy.contains('a', 'Create Invoice').click({ force: true });
            cy.execute('script/invoice/supplier/create',this.data);
            cy.contains('button','Submit').click({force:true});
            cy.contains('Invoice was successfully created').should('be.visible');
            cy.wait(3000);
            cy.contains('a','Create Credit Memo').invoke('removeAttr', 'target').click({force: true});
            cy.execute('script/invoice/supplier/create_memo',this.memo_data);
            cy.get('input[value="Submit"]').click({force:true});
            cy.contains('Credit Memo was successfully created.').should('be.visible');
            cy.wait(5000);
            cy.contains('label','CREDIT MEMO#:').parent().find('p').invoke('text')
            .then(text => {
                var data_path = Cypress.env(`data`);
                let flag =  `Copied https://${data_path}.facilgo.com/credit_memos/` + text + ' to clipboard.'
                cy.get('.box-body-header').find('i').eq(2).click({force: true});
                cy.contains(flag).should('be.visible');
            });
        });
    });
});