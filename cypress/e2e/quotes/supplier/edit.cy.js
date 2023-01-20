describe('Session Login ',()=>{
        beforeEach(() => {
              var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              });
              cy.on('uncaught:exception', (err, runnable) => { return false })
              cy.fixture(`data/${data_path}/quotes/supplier/edit/data`).then(function (data) {
                this.data = data;
              })
              
           })
          describe("quote from quote request", function () {
            it('fc-5635 User is able to Edit quote from supplier side <smoke>', function () { 
              cy.visit()
              cy.wait(4000)
              cy.contains('a','Documents').click()
              cy.contains('a','Quotes / Contracts').click()
              cy.wait(2000)
              cy.visit('/quote_requests')
              cy.get('[data-react-class="QuoteRequestFilterModalToggle"]').find('i').click()
              cy.select_by_label_with_enter('Status(es):',this.data.status)
              cy.get('button').contains('Search').click()
              cy.get('.btn-show-quote-request').first().click()
              cy.wait(4000)
              cy.contains('button','Create Quote').click()
              cy.execute('script/quotes/quote_from_quote_request', this.data)
              cy.wait(3000)
              cy.contains('button','Edit').click()
              cy.get('#title').clear()
              cy.get('#title').type(this.data.title)
              cy.select_by_calendar('#schedule-start-date',this.data.schedule_start_date)
              cy.contains('button','Send').click()
              cy.wait(3000)
              cy.contains('Quote created.').should('exist')

             });
          });
});