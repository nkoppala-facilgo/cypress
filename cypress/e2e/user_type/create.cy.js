describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
   cy.fixture(`data/${data_path}/user_type/create/data`).then(function (data) {
      this.data = data;
   })
})
describe("able to open and create user-types", function () {
  it('open user type page and create user', function () { 
     cy.visit('/user_management')
      cy.execute('script/user_types/open',this.data)
      cy.get('tbody>tr').its('length').should('be.gt', 0)
      cy.execute('script/user_types/create',this.data)
   })
});
});
