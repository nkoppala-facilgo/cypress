describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });

   cy.fixture(`data/${data_path}/project/create/data`).then(function (data) {
      this.data = data;
   })
})

describe("To verify that PMC is able to create Project", function () {
   it('FC-1455 To verify that PMC is able to create Project  <smoke>', function () { 
      cy.visit('/projects')
      cy.wait(5000)
      cy.contains("Create Project").click({force: true})
      cy.execute("script/project/create",this.data)
   });
});
});
