describe('Session Login ',()=>{
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              });
            cy.fixture(`data/${data_path}/quotes/property_fetching_customer/data`).then(function(data) {
                this.property_fetching_customer_data = data;
            })
        }) 
        describe(" fetching quotes", function() {
            it('fc-2871 fetching new quotes', function() {
                cy.visit()
                cy.wait(5000)
                cy.get('.icon-menu-work-order').click()
                cy.wait(5000)
                cy.get('a[href=\"/quotes/new\"]').click({ force: true })
                cy.wait(3000)
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.execute('script/quotes/property_fetching_customer', this.property_fetching_customer_data)
            });
        });
    });
