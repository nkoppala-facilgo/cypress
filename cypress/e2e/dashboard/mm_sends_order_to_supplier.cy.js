describe('Session Login ',()=>{
        beforeEach(() => {
               var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.maintenance.username,data.maintenance.password);
              });
         cy.fixture(`data/${data_path}/dashboard/mm_sends_order_to_supplier/data`).then(function (data) {
            this.data = data;
         })
      })
      
      describe("maintainance manager sends order to supplier ", function () {
        it('MM sends order to supplier', function () { 
                cy.execute('/script/work_order/create',this.data)
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.get('.btn-default').contains('button','Goto Summary').click()
                cy.wait(5000)
                 cy.contains('label','WO#:').parent().find('p')
                 .invoke('text')
                 .then(worder_number => {
                    cy.execute('/script/work_order/next_step',this.data) 
                    cy.get('span[class=caret]').eq(0).click({force:true})  
                    cy.contains('Logout').click({force:true})
                    cy.wait(3000) 
                    var data_path = Cypress.env(`data`)
                    cy.fixture('data/login/data').then(function (data) {
                       cy.login_with_session(data.supplier2.username,data.supplier2.password);
                    });   
                    this.data.worder_number=worder_number  
                    cy.visit("/work_orders/"+worder_number)
                    cy.wait(5000)
                    cy.get('btn-show-work-order').first().click()
                    cy.wait(5000)
                    cy.execute('/script/dashboard/mm_sends_order_to_supplier',this.data)
                    var data_path = Cypress.env(`data`)
                    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                      cy.login_with_session(data.maintenance.username,data.maintenance.password);
                     });
                     cy.visit("/work_orders/"+worder_number)
                     cy.wait(5000)
                    cy.get('btn-show-work-order').first().click()
                    cy.get('tab-wo-conversation-history-tab-Supplier').click()
                    cy.get('input[placeholder =\"Type here...\"]').type('message')
                    cy.contains('button','Send Message').click()
                    cy.wait(3000)    
                    var data_path = Cypress.env(`data`)
                     cy.fixture('data/login/data').then(function (data) {
                        cy.login_with_session(data.supplier2.username,data.supplier2.password);
                     }); 
                     cy.visit("/work_orders/"+worder_number)
                    cy.wait(5000)
                    cy.get('btn-show-work-order').first().click()
                    cy.contains('button','Edit').click()
                    cy.wait(5000)
                    cy.execute('/script/dashboard/mmsends_supplier',this.data)
                  })
               });
           });
});