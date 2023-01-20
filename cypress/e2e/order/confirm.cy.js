describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
        cy.fixture(`data/${data_path}/order/confirm/data`).then(function(data) {
            this.confirm_data = data;
        })

    }) 
    describe("verify Confirm ", function() {
        it(' FC-2198 verifying Confirm button  <smoke>', function() {
            cy.visit()
            cy.contains("Documents").click()
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.get('a[href=\"/document_orders\"]').click({ force: true })
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.contains('a', 'Create Order').click({ force: true })
            cy.wait(3000)
            cy.execute('script/order/register', this.confirm_data)
            cy.wait(3000)
            cy.get('#js-react-DocumentOrderPage  .document-order__content').first().click()
            cy.wait(3000)
            cy.contains('label','PO#:').parent().find('p')
            .invoke('text')
            .then(order_number => {
                cy.get('span[class=caret]').eq(0).click({force:true})  
                cy.contains('Logout').click({force:true})
                cy.wait(3000) 
                var data_path = Cypress.env(`data`)
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                    cy.login_with_session(data.supplier2.username,data.supplier2.password);
                });
                this.confirm_data.order_number=order_number
                cy.visit()
                cy.wait(4000)
                cy.contains("Documents").click()
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.get('a[href=\"/document_orders\"]').click({ force: true })
               cy.wait(5000)
               cy.get('[data-react-class="DocumentOrderFilterModal"]').find('i').click()
               cy.wait(3000)
               cy.select_by_label_with_enter('PO#:',this.confirm_data.order_number,2400)
               cy.get('button').contains('Search').click()
               cy.wait(3000)
               cy.get('#js-react-DocumentOrderPage  .document-order__content').first().click()
                cy.wait(3000)
                cy.contains('button','Confirm').click({force:true})
                cy.wait(2000)
                cy.contains('Confirmed.').should('be.visible')
            }); 
        });
    });
});