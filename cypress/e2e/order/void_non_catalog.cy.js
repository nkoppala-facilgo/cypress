describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
        cy.fixture(`data/${data_path}/order/void_non_catalog/data`).then(function(data) {
            this.void_non_catalog_data = data;
        })
    }) 
    describe("non catalog void ", function() {
        it(' FC-2210 verifying void button from non catalog  <smoke>', function() {
            cy.visit()
            cy.wait(3000)
            cy.get('.icon-menu-work-order').click()
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.contains("Non-Catalog Order").click()
            cy.wait(5000)
            cy.execute('script/order/non_register', this.void_non_catalog_data)
            var data_path = Cypress.env(`data`)
            if(data_path=='staging'){
                cy.contains('button','Do Not Save All Items').click()
            }
            cy.wait(9000)
            cy.contains('Order was successfully created.').should('exist')
            cy.wait(3000)
            cy.get('#js-react-DocumentOrderPage  .document-order__content').first().click()
            cy.wait(5000)
            cy.contains('button','Void').click({force:true})
            cy.wait(1000)
            cy.get('.confirm').contains('button','Yes').click({force:true})
            cy.wait(4000)
            cy.contains('Your Order is PendCancellation and will be cancelled once the supplier accepts the cancellation request.').should('be.visible')
        
        });
    });
});