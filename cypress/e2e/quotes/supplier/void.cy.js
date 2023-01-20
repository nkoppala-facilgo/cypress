describe('Session Login ',()=>{
        beforeEach(() => {
              var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              });
              cy.on('uncaught:exception', (err, runnable) => { return false })
              cy.fixture(`data/${data_path}/quotes/supplier/void/data`).then(function (data) {
                this.data = data;
              })
              
           })
          describe("quote from quote request", function () {
            it('fc-5634 user is able to void/cancel quote at supplier side <smoke>', function () { 
              cy.visit()
              cy.wait(4000)
              cy.contains('a','Documents').click()
              cy.contains('a','Quotes / Contracts').click()
              cy.wait(2000)
              cy.visit('/quote_requests')
              cy.wait(2000)
              cy.get('.btn-show-quote-request').first().click()
              cy.wait(4000)
              cy.contains('button','Create Quote').click()
              cy.execute('script/quotes/quote_from_quote_request', this.data)
              cy.wait(2000)
              cy.contains('button','Void').click()
              cy.contains('Are you sure?').should('exist')
              cy.wait(2000)
              cy.contains('button','Yes, void this Quote!').click()
              cy.contains('Voided!').should('exist')
              

             });
          });
        

});