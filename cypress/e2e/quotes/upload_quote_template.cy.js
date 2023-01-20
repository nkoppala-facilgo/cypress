describe('Session Login ',()=>{
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              });
            cy.fixture(`data/${data_path}/quotes/upload_quote_template/data`).then(function(data) {
                this.upload_quote_template_data = data;
            })
        }) 
        describe(" create quotes", function() {
            it('fc-2879 creating new quotes', function() {
                cy.visit()
                cy.wait(4000)
                cy.get('.icon-menu-work-order').click()
                cy.wait(5000)
                cy.get('a[href=\"/quotes/new\"]').click({ force: true })
                cy.wait(3000)
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.execute('script/quotes/upload_quote_template', this.upload_quote_template_data)
            });
        });
    });