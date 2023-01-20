describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
        cy.fixture(`data/${data_path}/order/approved/data`).then(function(data) {
            this.approved_data = data;
        })
    }) 
    describe("Approve Documents", function() {
        it('fc-2206 Appproving Documents  <smoke>', function() {
            cy.visit()
            cy.contains("Approve Documents").click()
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.get('.icon-menu-thumb-up').parent().parent().find('ul').find('li').eq(1).click()
            cy.wait(6000)
            cy.execute('script/order/approved', this.approved_data)
        });
    });
});