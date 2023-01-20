describe('Session Login ',()=>{
   beforeEach(() => {
         var data_path = Cypress.env(`data`)
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/work_order/filter_assignie_status/data`).then(function (data) {
           this.data = data;
        })
      })
     describe("Search work order by assignie and status",function (){
        it("FC-3129 Search work order by assignie and status  <smoke>",function (){
         var data_path = Cypress.env(`data`)
         cy.fixture(`data/${data_path}/work_order/filter_assignie_status/data`).then(workorder => {
            const assignie = 'assignie';
            const status = 'status';
            var work_order_assignie = workorder[assignie];
            var work_order_status = workorder[status];
            cy.visit("/dashboards/graph")
            cy.contains("Documents").click()
            cy.contains('a','Work Orders').click({ force: true })
            cy.wait(7000);
            cy.execute('script/work_order/filter_assignie_status',this.data)
            cy.wait(7000);
            cy.get('.supplier-list li').its('length').should('be.gt',0)
            cy.get('.supplier-list li')
           .then(listing => {
               const listingCount = Cypress.$(listing).length;
               let i ;
               for(i = 0 ; i < listingCount ;i++){
                  cy.get('.js-document-status-name').eq(i).contains(work_order_status).should('exist')
                  cy.get('.js-assignee').eq(i).contains(work_order_assignie).should('exist')
               }              
            });
         });
      });
   });
});