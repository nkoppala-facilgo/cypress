describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
        cy.fixture(`data/${data_path}/order/register/data`).then(function(data) {
            this.register_data = data;
        })

    }) 
    describe("create Order ", function() {
        it('fc-2192 creating new Orders for registered supplier  <smoke>', function() {
            cy.visit()
            cy.wait(3000)
            cy.contains("Documents").click()
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.get('a[href=\"/document_orders\"]').click({ force: true })
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.contains('a', 'Create Order').click({ force: true })
            cy.wait(3000)
            cy.execute('script/order/register', this.register_data)
            var data_path = Cypress.env(`data`)
            if(data_path=='staging'){
                cy.contains('button','Do Not Save All Items').click()
            }
            cy.wait(9000)
            cy.contains('Order was successfully created.').should('exist')
            
        });

    });
});

