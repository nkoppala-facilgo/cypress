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
                it('FC-2241 To verify that Supplier is able to create Invoice with Register Supplier. <smoke>', function() {
                        const data_path = Cypress.env(`data`);
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
                        cy.visit();
                        cy.wait(7000);
                        cy.contains("Begin Work Menu").click({force: true});
                        cy.contains('a', 'Create Invoice').click({force: true});
                        cy.execute('script/invoice/supplier/create',this.data);
                        cy.contains('button','Submit').click({force: true});
                        cy.contains('Invoice was successfully created').should('be.visible');
                        cy.contains('label','REGISTERED:').parent().find('p').invoke('text')
                        .then(register => {
                                if(register == "Y"){
                                        cy.log("supplier is registered.");
                                        cy.get('span[class=caret]').eq(0).click({force:true}); 
                                        cy.contains('Logout').click({force:true});
                                        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                                                cy.login_with_session(data.pmc.username,data.pmc.password);
                                        });
                                        cy.visit('/invoices');
                                        cy.get('div[id="js-react-InvoiceFilterModalToggle"]').find('i').click({force:true});
                                        cy.wait(1500);
                                        cy.select_by_label('Invoice(s)# :',this.data['supplier_invoice'],2000);
                                        cy.contains('button','Search').click({force: true});
                                        cy.wait(3000);
                                        cy.get('div[id="document-scroll-search"]').find('li').should('have.length',1);
                                }
                                else {
                                        cy.log("supplier is non registered.");
                                }
                        });
                });
        });
});