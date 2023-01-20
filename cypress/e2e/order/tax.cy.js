describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
        cy.fixture(`data/${data_path}/order/tax/data`).then(function(data) {
            this.tax_data = data;
        })

    })
    describe("tax checkbox", function() {
        it('fc-2195 To verify Tax checkbox functionality.  <smoke>', function() {
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
            cy.execute('script/order/tax', this.tax_data)
            var data_path = Cypress.env(`data`)
            if(data_path=='staging'){
                cy.contains('button','Do Not Save All Items').click()
            }
            cy.wait(9000)
            cy.contains('Order was successfully created.').should('exist')
        });
    });
});

// cy.contains('button','Do Not Save All Items').click()