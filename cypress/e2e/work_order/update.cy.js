describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
    cy.fixture(`data/${data_path}/work_order/update/data`).then(function (data) {
       this.data = data;
    })     
})
describe("update order", function () {
 it('fc-1081 update workorder <smoke>', function () { 
      cy.visit("/dashboards/graph")
      cy.wait(3000);
      cy.contains("Documents").click()
      cy.contains('a','Work Orders').click({ force: true })
      cy.wait(5000);
      cy.execute('script/work_order/filter',this.data)
      cy.wait(2000)
      cy.get('.supplier-list li').its('length').should('be.gt',0)
      cy.execute('script/work_order/update',this.data)
  });
});
});