describe('Session Login ',()=>{
      beforeEach(() => {
            var data_path = Cypress.env(`data`)
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.maintenance.username,data.maintenance.password);
            });
      cy.fixture(`data/${data_path}/dashboard/qr_multiple_suppliers_covert_quote_to_order/data`).then(function (data) {
         this.data = data;
      })
      cy.fixture(`data/${data_path}/work_order/create/data`).then(function (data) {
         this.create_data = data;
      
      })
   })

      describe("over NTE regional approval", function () {
         it('QR multiple suppliers, covert quote to order ', function () { 
            cy.execute('/script/work_order/create',this.create_data)
            cy.get('.btn-default').contains('button','Goto Summary').click()
            cy.wait(5000)
            cy.execute('/script/work_order/next_step',this.data) 
            cy.get('textarea[placeholder=\"Notes\"]').type('dfnbvcfrvabashs')
            cy.contains('button','Save As Note').click()
            cy.wait(5000)
            cy.contains('label','WO#:').parent().find('p')
            .invoke('text')
            .then(worder_number1 => {
               cy.get('btn-show-work-order').eq(1).click()
               cy.wait(4000)
               cy.contains('label','WO#:').parent().find('p')
               .invoke('text')
               .then(worder_number2 => {
                  cy.get('span[class=caret]').eq(0).click({force:true})  
                  cy.contains('Logout').click({force:true})
                  cy.wait(3000) 
                  var data_path = Cypress.env(`data`)
                  cy.fixture('data/login/data').then(function (data) {
                     cy.login_with_session(data.supplier.username,data.supplier.password);
                  });   
                  this.data.worder_number1=worder_number1  
                  cy.visit("/work_orders/"+worder_number1)
                  cy.wait(5000)
                  cy.get('btn-show-work-order').first().click()
                  cy.wait(5000)
                  cy.contains("button", "Create Quote").click();
                  cy.select_by_calendar_using_label('QUOTE EXPIRES:',this.data.expire_date)
                  cy.get('input[placeholder=\"Unit Price\"]',this.data.unit_price1)
                  cy.contains("button.btn.btn-success", "Save").click();
                  cy.contains(".btn.btn-primary", "Send").click();
                  cy.get('span[class=caret]').eq(0).click({force:true})  
                  cy.contains('Logout').click({force:true})
                  cy.wait(3000) 
                  var data_path = Cypress.env(`data`)
                  cy.fixture('data/login/data').then(function (data) {
                     cy.login_with_session(data.supplier2.username,data.supplier2.password);
                  });   
                  this.data.worder_number2=worder_number2
                  cy.visit("/work_orders/"+worder_number2)
                  cy.wait(5000)
                  cy.get('btn-show-work-order').first().click()
                  cy.wait(5000)
                  cy.contains("button", "Create Quote").click();
                  cy.select_by_calendar_using_label('QUOTE EXPIRES:',this.data.expire_date)
                  cy.get('input[placeholder=\"Unit Price\"]',this.data.unit_price2)
                  cy.contains("button.btn.btn-success", "Save").click();
                  cy.contains(".btn.btn-primary", "Send").click();

                  var data_path = Cypress.env(`data`)
                  cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                     cy.login_with_session(data.maintenance.username,data.maintenance.password);
                     });
                     cy.visit("/work_orders/"+worder_number2)
                  cy.wait(5000)
                  cy.get('btn-show-work-order').first().click()
                  cy.get('.btn-danger').contains('button','Decline').first().click()
                  cy.contains('Are You Sure?').should('exist')
                  cy.get('.sa-confirm-button-container .confirm').contains('button','Yes').click({force: true})
                  cy.get('.sa-confirm-button-container .confirm').contains('button','OK').click({force: true})

                  cy.get('.invoiceTable').contains('button','Create Order').click({force: true})
                  cy.select_by_upper_label('Vendor Assignment Workflow',this.data.vendor_assignie)
                  cy.get('#react-select-3--value > .Select-placeholder').click()
                  cy.get('input[aria-expanded=\"true\"]').input(this.data.workflow)
                  cy.get('input[aria-expanded=\"true\"]').type('{enter}')
                  cy.contains('button','Checkout').click()
                  cy.wait(3000)
                  cy.get('.Select-placeholder').contains('Select...').type(this.data.vendor_assignie)
                  cy.get('.is-open').type('{enter}')
                  cy.get('textarea[placeholder=\"Your Notes/Reason\"]').input(this.data.notes)
                  cy.contains('button','Approve').click()
                  cy.wait(6000)
                  cy.contains('button','Close').click()
                  cy.contains('button','Edit').click()
                  cy.contains('button','Save').click()
                  
                  var data_path = Cypress.env(`data`)
                  cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                     cy.login_with_session(data.administrator.username,data.administrator.password);
                     });
                     cy.contains('a','Approve Documents').click()
                  cy.visit('/document_approval_logs?tab=requests')
                  cy.get('.icheckbox_square-blue').eq(1).click()
                  cy.wait(4000)
                  cy.contains('button','Approve').click()
                  cy.contains('button','OK').click()
                  var data_path = Cypress.env(`data`)
                  cy.fixture('data/login/data').then(function (data) {
                     cy.login_with_session(data.supplier2.username,data.supplier2.password);
                  }); 
                  cy.visit("/work_orders/"+worder_number2)
                  cy.contains('button','Confirm').click()
                  cy.contains('button','OK').click()
                  cy.contains('button','Edit').click()
                  cy.get('.hidden-md .hidden-lg').contains('span.linkable-text','Attach Image(s)').parents('div.attachment-form.form-group').find('input[type=file]').attachFile(data['file_path'])
                  cy.get('textarea[placeholder=\"Type here...\"]').input(this.data.notes)
                  cy.contains('button','Save').click()
                  cy.contains('button','Complete').click()
                  cy.contains('button','VerCompleted').click()
                  cy.contains('button','Create Invoice').click()
                  cy.wait(3000)
                  cy.select_by_calendar_using_label('INVOICE DATE:',data['invoice_date'])
                  cy.contains('label','SUPPLIER INVOICE#:').parent().find('input[type=text]')
                  cy.contains('button','Submit').click()
                  var data_path = Cypress.env(`data`)
                  cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                  cy.login_with_session(data.maintenance.username,data.maintenance.password);
                  });
                  cy.visit("/work_orders/"+worder_number2)
                  cy.get('textarea[placeholder=\"Type here...\"]').input(this.data.notes)
                  cy.contains('button','Save AS Note').click()
                  cy.wait(3000)
                  cy.contains('button','Complete').click()
                  cy.get('.Select-placeholder').click()
                  cy.get('input[aria-expanded=\"true\"]').type(this.data.resolution)
                  cy.get('.isopen').type('{enter}')
                  cy.contains('button','Save').click()
                  cy.contains('Completed!').should('be.visible')

               });
         })
      });
   });

});

