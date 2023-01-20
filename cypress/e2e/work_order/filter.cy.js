describe('Session Testing',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
     cy.login_with_session(data.pmc.username,data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/filter/single_item/data`).then(function (data) {
      this.single_item_data = data;
   })
   cy.fixture(`data/${data_path}/work_order/filter/multiple_item/data`).then(function (data) {
      this.multiple_item_data = data;
   })  
  }) 

  
 describe("able to search single work order",function (){
    it("fc-946 search projects  <smoke>",function (){
       cy.visit("/dashboards/graph")
       cy.contains("Documents").click()
       cy.contains('a','Work Orders').click({ force: true })
       cy.wait(7000);
       cy.execute('script/work_order/filter',this.single_item_data)
       cy.wait(7000);
       cy.get('#document-scroll-search li').should('have.length',1)
    });
  });
 
  describe("able to search multiple work order",function (){
    it("search projects  <smoke>",function (){
       cy.visit("/dashboards/graph")
       cy.contains("Documents").click()
       cy.contains('a','Work Orders').click({ force: true })
       cy.wait(7000);
       cy.execute('script/work_order/filter',this.multiple_item_data)
       cy.wait(7000)
       cy.get('#document-scroll-search li').its('length').should('be.gt',0)
    })
 })
})