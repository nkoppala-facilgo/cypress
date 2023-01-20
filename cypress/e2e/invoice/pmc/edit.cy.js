describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env(`data`);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                    cy.login_with_session(data.pmc.username,data.pmc.password);
                });
                cy.fixture(`data/${data_path}/invoice/pmc/create/data`).then(function(data) {
                        this.create_data = data;
                });
                cy.fixture(`data/${data_path}/invoice/pmc/edit/data`).then(function(data) {
                        this.edit_data = data;
                });
        });

        describe("edit an invoice", function() {

                it('create and edit invoice  <smoke>', function() {
                        cy.visit();
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
                        this.create_data.supplier_invoice = generateString(7);
                        cy.contains("Documents").click()
                        cy.contains('a', 'Invoices').click({ force: true })
                        cy.contains('a[class=item-menu]', 'Invoices').click({ force: true })
                        cy.contains('a', 'Create Invoice').click({ force: true })
                        cy.contains('a', 'More').click({ force: true })
                        cy.execute('script/invoice/pmc/create',this.create_data)
                        cy.contains('button','Submit').click({force:true})
                        cy.contains('Invoice was successfully created').should('be.visible')
                        cy.wait(3000)
                        cy.get('div[id="js-react-InvoiceActionButtonsView"]').find('a').contains('Edit').click()
                        cy.contains('a', 'More').click({ force: true })
                        cy.execute('script/invoice/pmc/edit',this.edit_data)
                        cy.contains('button','Save').click({force:true})

                });

                it('search invoice according status and edit  <smoke>',function() {
                        cy.visit()
                        cy.contains("Documents").click()
                        cy.contains('a', 'Invoices').click({ force: true })
                        cy.contains('a[class=item-menu]', 'Invoices').click({ force: true })
                        cy.get('div[id="js-react-InvoiceFilterModalToggle"]').find('i').click({force:true})
                        cy.wait(3000)
                        cy.select_by_label('Status(es):',this.edit_data['status'])
                        cy.contains('button','Search').click({force:true})
                        cy.wait(3000)
                        cy.get('div[id="document-scroll-search"]').children().first().find('li').click({force:true})
                        cy.wait(3000)
                        cy.get('div[id="js-react-InvoiceActionButtonsView"]').find('a').contains('Edit').click()
                        cy.contains('a', 'More').click({ force: true })
                        cy.execute('script/invoice/pmc/edit',this.edit_data)
                        cy.contains('button','Save').click({force:true})

                });

                it('search invoice according status and attach files  <smoke>',function() {
                        cy.visit()
                        cy.contains("Documents").click()
                        cy.contains('a', 'Invoices').click({ force: true })
                        cy.contains('a[class=item-menu]', 'Invoices').click({ force: true })
                        cy.get('div[id="js-react-InvoiceFilterModalToggle"]').find('i').click({force:true})
                        cy.wait(3000)
                        cy.select_by_label('Status(es):',this.edit_data['status'])
                        cy.contains('button','Search').click({force:true})
                        cy.wait(3000)
                        cy.get('div[id="document-scroll-search"]').children().first().find('li').click({force:true})
                        cy.wait(3000)
                        cy.get('div[id="js-react-InvoiceActionButtonsView"]').find('a').contains('Edit').click()
                        cy.contains('p','Attach Image(s)').parent().find('input[type=file]').attachFile(this.edit_data['attach_image'])
                        cy.contains('p','Attach File(s)').parent().find('input[type=file]').attachFile(this.edit_data['attach_file'])

                });
        });
});
