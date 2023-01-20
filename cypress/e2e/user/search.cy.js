describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });

   cy.fixture(`data/${data_path}/user/search/data`).then(function (data) {
      this.data = data;
   })

})

describe("able to search user", function () {
 it('search user', function () { 
   cy.visit('/user_management')
   cy.wait(8000)
   cy.get(".fa-filter").parent().click()
   cy.execute('script/user/search',this.data)
   cy.get('li[class = "text-center dropdown"]').its('length').should('be.gt', 0)
  });
});
});