describe('Session Login ',()=>{
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.pmc.username,data.pmc.password);
              });
cy.fixture(`data/${data_path}/work_order/next_step/data`).then(function (data) {
        this.data = data;
})
})
describe("next step work order ", function () {
        it('next step workorder  <smoke>', function () {
                var data_path = Cypress.env(`data`)
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
                        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                                cy.execute('script/login/login', data.supplier)
                        });
                        cy.visit("/work_orders");
                        cy.wait(7000);
                        cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true});
                        cy.wait(5000);
                        cy.contains('button','Clear').click({force: true});
                        cy.wait(3000);
                        cy.select_by_label_with_enter('WO#(s):',wo_number,2000);
                        cy.contains('button','Search').click({force: true});
                        cy.wait(5000);
                        cy.contains(this.data.work_order_title).first().click({force: true});
                        cy.wait(5000);
                        cy.contains('button','Confirm').click({force:true})
                        cy.contains('Confirmed.').should('be.visible')
                }); 
        });
});
});