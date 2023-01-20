describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
   cy.fixture(`data/${data_path}/project/search/single_item/data`).then(function (data) {
      this.single_item_data = data;
   })
   cy.fixture(`data/${data_path}/project/search/multiple_item/data`).then(function (data) {
      this.multiple_item_data = data;
   })
 })

describe("able to search single projects",function (){
   it("search projects  <smoke>",function (){
      cy.visit('/projects')
      cy.wait(5000)
      cy.get('[data-react-class="ProjectFilterModalToggle"]').find('i').click()
      cy.wait(5000)
      cy.execute("script/project/search",this.single_item_data)
      cy.wait(2000);
      cy.get('tbody').should('have.length',1)
   })
})

describe("able to search multiple projects",function (){
   it("search projects  <smoke>",function (){
      cy.visit('/projects')
      cy.wait(5000)
      cy.get('[data-react-class="ProjectFilterModalToggle"]').find('i').click()
      cy.wait(5000)
      cy.execute("script/project/search",this.multiple_item_data)
      cy.wait(2000)
      cy.get('tbody').its('length').should('be.gt',0)
   })
})
});
