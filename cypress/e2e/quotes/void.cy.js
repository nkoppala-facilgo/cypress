describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.supplier.username,data.supplier.password);
        });
        cy.fixture(`data/${data_path}/quotes/void/data`).then(function(data) {
            this.void_data = data;
        })
    }) 
    describe(" Void quotes", function() {
        it('fc-2882 Voiding new quotes', function() {
            cy.visit()
            cy.wait(5000)
            cy.get('.icon-menu-work-order').click()
            cy.wait(5000)
            cy.get('a[href=\"/quotes/new\"]').click({ force: true })
            cy.wait(3000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.execute('script/quotes/create', this.void_data)
            cy.wait(3000)
            cy.get('.btn-show-quote').first().click({force:true})
            cy.contains('button','Void').click({force:true})
            cy.wait(2000)
            cy.contains('button','Yes').click({force:true})
            cy.contains('Voided').should('be.visible')
            cy.wait(2000)
            cy.contains('button','OK').click({force:true})
        });
    });
});