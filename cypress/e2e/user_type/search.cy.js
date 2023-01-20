describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
   cy.fixture(`data/${data_path}/user_type/search/data`).then(function (data) {
      this.data = data;
   }) 
})
describe("able to see user-types", function () {
  it('open user type page', function () { 
   cy.visit('/user_management')
   cy.execute('script/user_types/open',this.data)
   cy.get(".fa-filter").parent().click()
   cy.get('tbody>tr').its('length').should('be.gt', 0)
   cy.execute('script/user_types/search',this.data)
   cy.wait(5000)
   cy.get('tbody>tr').its('length').should('be.gt', 0)
   })
});
});