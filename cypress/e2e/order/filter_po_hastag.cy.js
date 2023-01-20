describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
        cy.fixture(`data/${data_path}/order/filter_po_hastag/data`).then(function(data) {
            this.filter_po_hastag_data = data;
        })
    })
    describe("Order filter functionality",function (){
        it(" FC-2203 verify Order filter functionality with cusomer PO and hastags  <smoke>",function (){
            cy.visit()
            cy.wait(3000)
            cy.contains("Documents").click()
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.get('a[href=\"/document_orders\"]').click({ force: true })
            cy.wait(5000)
            cy.get('[data-react-class="DocumentOrderFilterModal"]').find('i').click()
            cy.wait(3000)
            cy.execute("script/order/filter_po_hastag",this.filter_po_hastag_data)
       })
    })
});
    