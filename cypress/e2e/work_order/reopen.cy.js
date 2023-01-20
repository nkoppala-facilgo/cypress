describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/work_order/reopen/data`).then(function (data) {
           this.data = data;
        })
      })
     describe("Reopen the work order",function (){
        it(" FC-4968 Reopen the work order  <smoke>",function (){
         var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/work_order/reopen/data`).then(workorder => {
            const status = 'status';           
            var work_order_status = workorder[status];
            cy.visit("/dashboards/graph")
            cy.contains("Documents").click()
            cy.contains('a','Work Orders').click({ force: true })
            cy.wait(5000);
            cy.execute('script/work_order/filter',this.data)
            cy.wait(4000);
            cy.get('.supplier-list li').its('length').should('be.gt',0)
            cy.get('.media a').first().click()
            cy.wait(3000)
            cy.execute('script/work_order/reopen',this.data)
         });
      });
   });
});
 
      