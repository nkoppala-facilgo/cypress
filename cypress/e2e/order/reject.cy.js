describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
    cy.fixture(`data/${data_path}/order/reject/data`).then(function(data) {
        this.reject_data = data;
    })

}) 
describe("verify Reject ", function() {
    it(' FC-2196 verifying reject button  <smoke>', function() {
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
        cy.execute('script/order/register', this.reject_data)
        var data_path = Cypress.env(`data`)
            if(data_path=='staging'){
                cy.contains('button','Do Not Save All Items').click()
            }
            cy.wait(9000)
            cy.contains('Order was successfully created.').should('exist')
        cy.wait(3000)
        cy.get('#js-react-DocumentOrderPage  .document-order__content').first().click()
        cy.wait(5000)
        cy.contains('label','PO#:').parent().find('p')
        .invoke('text')
        .then(order_number => {
            cy.get('span[class=caret]').eq(0).click({force:true})  
            cy.contains('Logout').click({force:true})
            cy.wait(3000)
            var data_path = Cypress.env(`data`)
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.execute('script/login/login', data.supplier)
            });
            this.reject_data.order_number=order_number
            cy.contains("Documents").click()
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.get('a[href=\"/document_orders\"]').click({ force: true })
            cy.wait(5000)
            cy.get('[data-react-class="DocumentOrderFilterModal"]').find('i').click()
            cy.wait(4000)
            cy.select_by_label_with_enter('Customer PO#:',this.reject_data.order_number,2200)
            cy.get('button').contains('Search').click()
            cy.wait(3000)
            cy.get('#js-react-DocumentOrderPage  .document-order__content').first().click()
            cy.wait(3000)
            cy.contains('button','Reject').click({force:true})
            cy.wait(1000)
            cy.contains('button','Yes').click({force:true})
            cy.wait(2000)
            cy.contains('Rejected.').should('be.visible')
            cy.wait(3000)
            cy.get('span[class=caret]').eq(0).click({force:true})  
            cy.contains('Logout').click({force:true})
            cy.wait(3000)
            var data_path = Cypress.env(`data`)
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.execute('script/login/login', data.pmc)
            });
            cy.contains("Documents").click()
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.get('a[href=\"/document_orders\"]').click({ force: true })
            cy.wait(5000)
            cy.get('[data-react-class="DocumentOrderFilterModal"]').find('i').click()
            cy.wait(4000)
            cy.select_by_label_with_enter('PO#:',this.reject_data.order_number,2200)
            cy.get('button').contains('Search').click()
            cy.wait(3000)
            cy.get('#js-react-DocumentOrderPage  .document-order__content').first().click()
        }); 
    });
});
});