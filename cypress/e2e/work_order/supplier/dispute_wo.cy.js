describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
        cy.fixture(`data/${data_path}/work_order/next_step/data`).then(function (data) {
            this.data = data;
        })
        cy.fixture(`data/${data_path}/work_order/supplier/update/data`).then(function (data) {
            this.update_data = data;
        })
    })
    describe("next step work order ", function () {
      it('next step workorder  <smoke>', function () {
            var data_path = Cypress.env(`data`)
            cy.visit("/dashboards/graph")
            cy.contains("Documents").click()
            cy.contains('a','Work Orders').click({ force: true })
            cy.contains('a','Create Work Order').click({ force: true })
            cy.execute('/script/work_order/create',this.data)
            cy.wait(5000)
            cy.execute('/script/work_order/next_step',this.data)
            cy.wait(3000) 
            cy.contains('button[class="pull-right btn btn-default"]','Close').click({force:true})
            cy.contains('label','WO#:').parent().find('input[type=text]')
            .invoke('val')
            .then(wo_number => {
                cy.get('span[class=caret]').eq(0).click({force:true})   
                cy.contains('Logout').click({force:true})
                cy.wait(5000);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                    cy.execute('script/login/login', data.supplier)
                });
                cy.contains("Documents").click()
                cy.contains('a','Quotes / Contracts').click({ force: true })
                cy.contains('a','Quote Requests').click({ force: true })
                cy.get('div[id=scroll-search]').find('li').first().find('a').first().click({force:true})
                cy.wait(5000)
                cy.contains('button','Create Quote').click({force:true})
                cy.select_by_calendar_using_label('QUOTE EXPIRES:',this.data['quote_expires'])
                cy.get('input[placeholder="Unit Price"]').type(this.data['unit_price'])
                cy.get('div[id=js-react-QuoteItemsTable]').contains('button','Save').click()
                cy.contains('button','Send').click()
                cy.get('span[class=caret]').eq(0).click({force:true})   
                cy.contains('Logout').click({force:true})
                cy.wait(5000);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                    cy.execute('script/login/login', data.pmc)
                });
                cy.visit('/quotes')
                cy.get('div[id=scroll-search]').find('li').first().find('a').first().click({force:true})
                cy.wait(10000)
                cy.contains('button','Create Order').click({force:true})
                cy.select_by_placeholder('Type here to search',this.data['vendor_assignment'])
                cy.contains('button','Checkout').click({force:true})
                cy.wait(5000)
                cy.get('span[class=caret]').eq(0).click({force:true})   
                cy.contains('Logout').click({force:true})
                cy.wait(5000);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                    cy.execute('script/login/login', data.supplier)
                });
                cy.visit();
                cy.contains("Documents").click()
                cy.contains('a','Work Orders').click({ force: true })
                cy.wait(5000);
                cy.get('.fa-filter').click()
                cy.select_by_label('WO#(s)',wo_number,0)
                cy.contains('button','Search').click()
                cy.execute('script/work_order/supplier/update',this.update_data)
                cy.execute('script/work_order/supplier/complete',this.data)
                cy.wait(1000)
                cy.contains("button","Complete").click();
                //cy.get("#js-react-WorkOrderItemsForm > div > div.grouped-items > div:nth-child(2) > div > div > div:nth-child(2) > div > div.col-lg-8.col-md-8.col-sm-12.col-xs-12 > div:nth-child(6) > div > div > label > input[type=checkbox]").click();
                cy.contains('button','Save').click()
                cy.wait(7000)
                //cy.get('#js-react-WorkOrderActionButtonsView > div > div > div > button:nth-child(3)').click().wait(3000)
                cy.contains("button","Next Steps").click();
                //cy.get("#js-react-WorkOrderForm > div > div.document-action-buttons.row > div > div > button:nth-child(2)").click().wait(2000)
                cy.get("body > div.sweet-alert.showSweetAlert.visible > div.sa-button-container > div > button").click()
                cy.get('span[class=caret]').eq(0).click({force:true})   
                cy.contains('Logout').click({force:true})
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.execute('script/login/login', data.pmc);
                });
                cy.visit("/work_orders/"+wo_number)
                cy.visit("/work_orders/"+wo_number)
                cy.contains('button','Dispute').click({force:true})
                cy.get('textarea[placeholder="Provide the message to be sent to supplier"]').type('This is test text',{force:true})
                cy.contains('button','Dispute').click({force:true})
                cy.get('textarea[placeholder="Provide the message to be sent to supplier"]').type('This is test text',{force:true})
                cy.contains('Send').click({force:true})
                cy.contains('Success').should('be.exist')
            }); 
        });
});
});



