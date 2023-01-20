describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });

   cy.fixture(`data/${data_path}/project/create/data`).then(function (create_data) {
      this.create_data = create_data;
   })

   cy.fixture(`data/${data_path}/project/edit/data`).then(function (edit_data) {
      this.edit_data = edit_data;
   })
})

describe("To verify that user is able to Edit Project after creating Project successfully.", function () {
   it('FC-1457 new project create and edit  <smoke>', function () { 
      cy.visit('/projects')
      cy.wait(5000)
      cy.contains("Create Project").click({force: true})
      cy.execute("script/project/create",this.create_data)

      cy.get('strong').first().parent().parent().find('a[data-toggle=dropdown]').click();
      cy.get('span').contains('Edit').parent().click();
      cy.wait(3000);
      cy.execute('script/project/edit',this.edit_data);
   });
});
});
