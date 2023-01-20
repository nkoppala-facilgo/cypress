describe('Session Login ',()=>{
        beforeEach(() => {
                var data_path = Cypress.env(`data`)
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.pmc.username,data.pmc.password);
                });
                cy.fixture(`data/${data_path}/work_order/create_invoice/data`).then(function (data) {
                        this.data = data;
                })
      });
      describe("Create Invoice from Contract at Supplier side.", function () {
        it('FC-4390 Create_invoice', function () { 
                cy.execute("/script/work_order/create", this.data);
                cy.execute("/script/work_order/next_step", this.data); 
                cy.wait(3000)  
                cy.get('.close > span').click()
                cy.wait(20000)
                cy.get('span[class=caret]').eq(0).click({force:true})   
                cy.contains('Logout').click({force:true}) 
        });
        it("login as supplier and create quote from same QR", function () {
                cy.visit()
                var data_path = Cypress.env(`data`)
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.execute('script/login/login', data.supplier)  
                });
                cy.visit('/quote_requests')
                cy.get('a[data-remote="true"]').first().dblclick({ force: true });
                cy.wait(10000);
                cy.contains('button','Create Quote').click()
                cy.execute("/script/work_order/product_type_qr/pricelist_and_contract/create_qr", this.data);
                cy.execute('script/work_order/create_qr_from_wo/customer_id.json',this.data);
                cy.get(".btn.btn-success").contains("Save").click({ force: true });
                cy.get(".btn.btn-primary").contains("Send").click({ force: true });
                cy.get('#js-react-QuoteSupplierView').contains('QU#:').parent()
                .find('.col-sm-8')
                .find('p')
                .invoke('text') 
                .then(text => {
                        const quote_number = text;
                        cy.log(quote_number);
                        this.data.quote_number = quote_number;
                        cy.get('span[class=caret]').eq(0).click({force:true})   
                        cy.contains('Logout').click({force:true})
                        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                                cy.execute('script/login/login', data.pmc)
                        });
                        cy.visit('/quotes')
                        cy.wait(3000)
                        cy.get('.fa-filter').click({multiple:true})
                        cy.wait(5000)
                        cy.execute('/script/quote/search',this.data)
                        cy.wait(5000)
                        cy.get('.media').first().click()
                        cy.wait(8000)
                        cy.get('.document-action-buttons > .btn-primary').click({force:true})
                        cy.get('.option-signature > .fa').click()
                        cy.get('.input-signature > .form-control').type(this.data['sign'])
                        cy.contains('button','Sign & Send Quote').click()
                        cy.select_by_placeholder('Select...',this.data['workflow'],1000)
                        cy.get('.items-table').find('tbody > tr').find('td').eq(5).click().find(`.Select-control `)
                        .within(()=>{
                                cy.get('input[role=\"combobox\"]')
                                .click({force: true})
                                .type(this.data['gl_code'],{force: true})
                                .wait(2000)
                                .type('{enter}')
                        })
                        cy.get('.items-table').find('tbody > tr').find('td').eq(6).click().find(`.Select-control `)
                        .within(()=>{
                                cy.get('input[role=\"combobox\"]')
                                .click({force: true})
                                .type(this.data['fiscal_period'],{force: true})
                                .wait(2000)
                                .type('{enter}')
                        })
                        cy.get('.document-action-buttons > .btn-primary').click({force:true})
                        cy.wait(3000)
                        cy.get('.col-lg-12 > .form-control-required').type(this.data['scope'])
                        cy.get('.pull-right > div > .btn-primary').click({force:true});
                        cy.get('[title="Save and Send Contract"]').click({force:true})
                        cy.wait(4000)
                        cy.get('.list-group-item > .fa').click()
                        cy.get('textarea[placeholder=\"Your Reason\"]').type(this.data['reason'])
                        cy.get('.modal-dialog > .modal-content > .modal-footer > .pull-right').click()
                        cy.wait(10000)
                        cy.get('span[class=caret]').eq(0).click({force:true})   
                        cy.contains('Logout').click({force:true})
                        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                                cy.execute('script/login/login', data.supplier)
                        });
                        cy.visit('/contracts');
                        cy.get('.media').first().click()
                        cy.wait(7000)
                        cy.contains('button','Create Invoice').click()
                        cy.wait(6000)
                        cy.select_by_calendar_using_label('INVOICE DATE:',this.data['invoice_date'])
                        cy.contains('label','SUPPLIER INVOICE#').parent().find('input[type=text]').type(this.data['supplier_inv'])
                        cy.get('#btnDocumentPage > .btn-primary').click({force:true})
                });
        });
      });
});