describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
        cy.fixture(`data/${data_path}/order/prop_suplier_fatching/data`).then(function(data) {
            this.prop_suplier_fatching_data = data;
        })

    }) 
    describe("Propety fatching supplier ", function() {
        it('Propety fatching supplier new order  <smoke>', function() {
            cy.visit()
            cy.wait(3000)
            cy.wait(3000)
            cy.contains("Setup").click({force: true})
            cy.wait(2000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.get('a[href=\"/property_suppliers\"]').click({ force: true })
            cy.wait(5000)
            cy.execute('script/order/prop_suplier_fatching', this.prop_suplier_fatching_data)
            var data_path = Cypress.env(`data`)
            if(data_path=='staging'){
                cy.contains('button','Do Not Save All Items').click()
            }
            
            cy.wait(9000)
            cy.contains('Order was successfully created.').should('exist')
            cy.get('.media-body').first().click()
        });
    });
});