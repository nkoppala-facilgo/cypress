describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.supplier.username,data.supplier.password);
         });
     cy.fixture(`data/${data_path}/work_order/supplier/update/data`).then(function (data) {
        this.data = data;
     })     
 })
describe("edit work order", function () {
  it('edit work order  <smoke>', function () { 
       cy.visit("/dashboards/graph")
       cy.contains("Documents").click()
       cy.contains('a','Work Orders').click({ force: true })
       cy.wait(5000);
       cy.execute('script/work_order/supplier/filter',this.data)
       cy.wait(2000)
       cy.get('.supplier-list li').its('length').should('be.gt',0)
       cy.execute('script/work_order/supplier/update',this.data)
   });
});
});
