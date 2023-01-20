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
        describe("To verify that Supplier is able to Pay for the Non register PMC", function() {
                it('FC_2249 To verify that Supplier is able to Pay for the Non register PMC <smoke>', function() {
                        var data_path = Cypress.env(`data`);
                        cy.visit();
                        cy.wait(10000);
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
                        cy.contains("Begin Work Menu").click({force: true});
                        cy.contains('a', 'Create Invoice').click({force: true});
                        cy.execute('script/invoice/supplier/create',this.data);
                        cy.contains('button','Submit').click({force:true});
                        cy.contains('Invoice was successfully created').should('be.visible');
                        cy.get('span[class=caret]').eq(0).click({force:true});
                        cy.contains('Logout').click({force:true});
                        cy.wait(5000);
                        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                                cy.execute('script/login/login', data.pmc);
                        });
                        cy.visit();
                        cy.wait(7000);
                        cy.contains('Documents').click({force: true});
                        cy.contains('a', 'Invoices').click({force: true});
                        cy.contains('a[class=item-menu]', 'Invoices').click({force: true});
                        cy.wait(5000);
                        cy.get('div[id="js-react-InvoiceFilterModalToggle"]').find('i').click({force: true});

                        cy.wait(1500);
                        cy.select_by_label('Invoice(s)# :',this.data['supplier_invoice'],2000);
                        cy.contains('button','Search').click({force: true});
                        cy.wait(3000);
                        cy.get('div[id="document-scroll-search"]').find('li').click({force: true});
                        cy.wait(5000);
                        cy.contains('button','Approve').dblclick({force:true});
                        cy.wait(4000);
                        cy.contains('button','Approve').dblclick({force:true});
                        cy.wait(4000);
                        cy.contains('button','No, Skip and Approve').click({force:true});
                        cy.get('span[class=caret]').eq(0).click({force:true});   
                        cy.contains('Logout').click({force:true});
                        cy.wait(5000);
                        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                                cy.execute('script/login/login', data.supplier);
                        });
                        cy.visit('/invoices');
                        cy.wait(10000);
                        cy.visit('/invoices');
                        cy.wait(10000);
                        cy.get('#js-react-InvoiceFilterModalToggle').find('i').click({force:true});
                        cy.wait(10000);
                        cy.select_by_label('Invoice(s)# :',this.data['supplier_invoice']);
                        cy.contains('button','Search').click({force: true});
                        cy.wait(5000);
                        cy.get('div[id="document-scroll-search"]').find('li').click({force:true});
                        cy.wait(3000);
                        cy.contains('button','Paid').click({force:true});
                        cy.contains('Invoice has been Paid').should('be.visible');
                });
        });
});
