
describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.supplier.username,data.supplier.password);
          });
          cy.fixture(`data/${data_path}/order/edit/data`).then(function(data) {
            this.edit_data = data;
        })
    }) 
    describe("edit Order ", function() {
        it('fc-2209 editing new Orders <smoke> ', function() {
            cy.visit()
            cy.wait(3000)
            cy.contains("Documents").click()
            cy.wait(3000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.get('a[href=\"/document_orders\"]').click({ force: true })
            cy.wait(3000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.get('[data-react-class="DocumentOrderFilterModal"]').find('i').click()  
            cy.wait(5000)
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
           // cy.contains('a', 'Create Order').click({ force: true })
            cy.wait(3000)
          //  cy.execute('script/order/register', this.edit_data)
            cy.wait(2000)
        //     var data_path = Cypress.env(`data`)
          
        //       cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        //         cy.login_with_session(data.pmc.username,data.pmc.password);
        //   });
            // cy.visit('/document_orders')
            cy.wait(3000)
            cy.get('.document-order__content').first().click({force:true})
            cy.wait(3000)
            cy.execute('script/order/edit', this.edit_data)
        });
    });
});