describe('Session Login ',()=>{
        beforeEach(() => {
                var data_path = Cypress.env(`data`)
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.pmc.username,data.pmc.password);
              });
        cy.fixture(`data/${data_path}/work_order/supplier/create_invoice/data`).then(function (data) {
           this.data = data;
        })
     })
     describe("Create Invoice from Order at Supplier side.", function () {
      it('create invoice from supplier side', function () { 
         var data_path = Cypress.env(`data`)
         cy.visit()
         cy.execute('/script/work_order/create',this.data) 
         cy.execute('/script/work_order/non_catalog',this.data)
         cy.execute('/script/work_order/supplier/create_invoice',this.data)
         cy.contains('REFERENCE ORDER(S)#:')
         .parent()
         .find('.form-control-static')
         .find('a')
         .invoke('text')  
         .then(text => {
            const order = text;
            const size = order.length
            const order_number = order.substring(22, size-1);
            cy.log(order_number);
            this.data.customer_PO = order_number;
            cy.get('span[class=caret]').eq(0).click({force:true})   
            cy.contains('Logout').click({force:true})
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
               cy.execute('script/login/login', data.supplier)
            });
            cy.execute('/script/order/supplier/path_to_order',this.data)
            cy.get('[data-react-class="DocumentOrderFilterModal"]').find('i').click({force:true})
            cy.wait(3000)
            cy.execute("script/order/filter_status_supplier",this.data)
            cy.log(this.data['customer_PO'])
            const invoice_link = '/orders/'+ order_number + '/invoices/new';
            cy.log(invoice_link)
            cy.visit(invoice_link);
            //cy.visit(invoice_link);
         });
         cy.select_by_calendar_using_label('INVOICE DATE:',this.data['service_date'])
         cy.contains('SUPPLIER INVOICE#').first().parent().find('input').first().type(this.data['invoice_number'])
         cy.contains('Total Tax:').parent().parent().find('.td-ext-price').find('input').type(this.data['tax1'])
         cy.contains('Total Tax:').parent().parent().find('.td-80').find('input').type(this.data['tax2'])
         cy.contains('Shipping Amount:').parent().parent().find('.td-ext-price').find('input').type(this.data['ship_amnt'])
         cy.get('#btnDocumentPage > .btn-primary').click()
       });
     });
});