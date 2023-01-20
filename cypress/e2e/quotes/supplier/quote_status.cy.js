describe('Session Login ',()=>{
        beforeEach(() => {
              var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              });
              cy.on('uncaught:exception', (err, runnable) => { return false })
              cy.fixture(`data/${data_path}/quotes/supplier/quote_status/data`).then(function (data) {
                this.qdata = data;
              })
              
           })
          describe("create quote from quote request", function () {
            it('fc-5631 Quote status should change when Quote is read by Customer/PMC <smoke>', function () { 
              cy.on('uncaught:exception', (err, runnable) => { return false })
              cy.visit()
              cy.wait(4000)
              cy.on('uncaught:exception', (err, runnable) => { return false })
              cy.contains('a','Documents').click()
              cy.contains('a','Quotes / Contracts').click()
              cy.wait(2000)
              cy.visit('/quote_requests')
              cy.get('[data-react-class="QuoteRequestFilterModalToggle"]').find('i').click()
              cy.select_by_label_with_enter('Status(es):',this.qdata.status)
              cy.get('button').contains('Search').click()
              cy.get('.btn-show-quote-request').first().click()
              cy.wait(4000)
              cy.contains('button','Create Quote').click()
              cy.execute('script/quotes/quote_from_quote_request', this.qdata)
              cy.wait(3000)
              cy.contains('label','QU#:').parent().find('p')
              .invoke('text')
              .then(Quote_number => {
                      cy.get('span[class=caret]').eq(0).click({force:true})  
                      cy.contains('Logout').click({force:true})
                      cy.wait(3000) 
                      var data_path = Cypress.env(`data`)
                      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                          cy.login_with_session(data.pmc.username,data.pmc.password);
                      });
                      cy.wait(4000)
                      cy.visit("/quotes/"+Quote_number)
              });
             });
          });
        

});
