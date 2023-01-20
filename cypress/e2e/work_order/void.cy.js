describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
    cy.fixture(`data/${data_path}/work_order/void/data`).then(function (data) {
       this.data = data;
    })     
})
describe("void work order", function () {
 it('FC-1177 void work order  <smoke>', function () { 
      cy.visit("/dashboards/graph")
      cy.contains("Documents").click()
      cy.contains('a','Work Orders').click({ force: true })
      cy.wait(6000);
      cy.execute('script/work_order/filter',this.data)
      cy.wait(3000)
      cy.get('.supplier-list li').its('length').should('be.gt',0) 
      cy.execute('script/work_order/void',this.data)
  });
});
});