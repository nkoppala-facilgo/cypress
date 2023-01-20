describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.technician1.username,data.technician1.password);
          });
        cy.fixture(`data/${data_path}/order/approval_sentToSupplier/data`).then(function(data) {
            this.data = data;
        })
    }) 
    describe("Approve Documents", function() {
        it('FC-2207 Appproved  Documents sent to supplier  <smoke>', function() {
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
            cy.execute('script/order/register', this.data)
            cy.wait(5000)
            cy.get('span[class=caret]').eq(0).click({force:true})   
            cy.contains('Logout').click({force:true})
            var data_path = Cypress.env(`data`)
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.fa.username,data.fa.password);
            });
            cy.visit()
            cy.wait(3000)
            cy.contains("Approve Documents").click()
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.get('.icon-menu-thumb-up').parent().parent().find('ul').find('li').eq(1).click()
            cy.wait(6000)
            cy.execute('script/order/approval_sentToSupplier', this.data)
           
        });
    });
});