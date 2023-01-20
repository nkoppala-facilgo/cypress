
describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
        cy.fixture(`data/${data_path}/order/tax_amount/data`).then(function(data) {
            this.tax_amount_data = data;
        })

    }) 
    describe("updating tax ", function() {
        it(' FC-2208 updating tax value and reflecting changes.  <smoke>', function() {
            cy.visit()
            cy.wait(3000)
            cy.get('.icon-menu-work-order').click()
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.contains("Non-Catalog Order").click()
            cy.wait(5000)
            cy.execute('script/order/tax_amount', this.tax_amount_data)
            var data_path = Cypress.env(`data`)
            if(data_path=='staging'){
                cy.contains('button','Do Not Save All Items').click()
            }
            cy.wait(9000)
            cy.contains('Order was successfully created.').should('exist')
        });
    });

});