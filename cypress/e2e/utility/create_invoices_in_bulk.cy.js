describe('Session Login ',()=>{
    beforeEach(()=>{
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.kenPmc.username, data.kenPmc.password);
        });
        cy.fixture(`data/${data_path}/utility/create_invoices_in_bulk/data`).then(function(data) {
            this.data = data;
        });
    })
    describe('Create  Invoices In Bulk', function() {
        for ( let i = 1; i <= 100; i++) {
            it('Priority To verify invoices are approved ' + i, function() {
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
                this.data.supplier_invoice = generateString(6) + i;
                cy.log(this.data.supplier_invoice);
                cy.visit('/invoices/new');
                cy.wait(3000);
                cy.contains('a', 'More').click({force: true});
                cy.execute('script/utility/create_invoices_in_bulk', this.data);
                cy.contains('button','Submit').click({force: true});
                cy.wait(3000);
                cy.contains('Invoice was successfully created & approved').should('be.visible');
            });
        }
    });
});
