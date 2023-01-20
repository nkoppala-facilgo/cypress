describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
    cy.fixture(`data/${data_path}/work_order/edit/data`).then(function (data) {
       this.data = data;
    })     
})
describe("edit order", function () {
 it('fc-1103 edit workorder  <smoke>', function () { 
      var data_path = Cypress.env(`data`)
      cy.fixture(`data/${data_path}/work_order/edit/data`).then(workorder => {
           const title = 'wo_title'
           var work_order_title = workorder[title];
           cy.execute('script/work_order/create',this.data)
           cy.visit("/dashboards/graph")
           cy.contains("Documents").click()
           cy.contains('a','Work Orders').click({ force: true })
           cy.wait(2500)
           cy.get('.fa-filter').click()
           cy.wait(5000)
           cy.log("work order title ",work_order_title)
           cy.get('input[placeholder=\"WO Title / Item Name\"]').type(work_order_title)
           cy.contains('button','Search').click()
           cy.wait(2500)
           cy.get('.media > a').first().click()
           cy.wait(2000)
           cy.get('#js-react-WorkOrderSummaryList  li').its('length').should('be.gt',0)
           cy.execute('script/work_order/edit',this.data)
         })
      });
   });
});
