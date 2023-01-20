describe('Session Login ',()=>{
   beforeEach(() => {
      var data_path = Cypress.env(`data`)
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
      });
      cy.fixture(`data/${data_path}/inspection/search/single_item/data`).then(function (data) {
         this.single_item_data = data;
      });
      cy.fixture(`data/${data_path}/inspection/search/multiple_item/data`).then(function (data) {
         this.multiple_item_data = data;
      });
   })

   describe("able to search single inspections",function (){
      it("search inspection",function (){
         cy.visit();
         cy.wait(7000)
         cy.contains("Documents").click()
         cy.contains('a', 'Inspections').click({ force: true });
         cy.on('uncaught:exception', (err, runnable) => {return false})
         cy.wait(3000)
         cy.get('.invoiceHeader').find('i').click({force: true})
         cy.wait(3000)
         cy.execute("script/inspection/search",this.single_item_data)
         cy.get('li[class="list-group-item btn-show-inspection-head"]').should('have.length',1)
      })
   })
   describe("able to search multiple inspections",function (){
      it("search inspection",function (){
         cy.visit();
         cy.wait(7000)
         cy.contains("Documents").click()
         cy.contains('a', 'Inspections').click({ force: true });
         cy.on('uncaught:exception', (err, runnable) => {return false})
         cy.wait(3000)
         cy.get('.invoiceHeader').find('i').click({force: true})
         cy.wait(3000)
         cy.execute("script/inspection/search",this.multiple_item_data)
         cy.get('li[class="list-group-item btn-show-inspection-head"]').its('length').should('be.gt',0)
      })
   })
});
