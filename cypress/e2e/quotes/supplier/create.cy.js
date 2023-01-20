describe('Session Login ',()=>{
        beforeEach(() => {
              var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              });
              cy.on('uncaught:exception', (err, runnable) => { return false })
              cy.fixture(`data/${data_path}/quotes/supplier/create/data`).then(function (data) {
                this.data = data;
              })
              
           })
        describe("create quotes supplier", function() {
            it('fc-6046 Create/Save Quote for later', function() {
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
              cy.on('uncaught:exception', (err, runnable) => { return false })
              cy.execute('script/quotes/quote_from_quote_request', this.data)
            });
        });
    });