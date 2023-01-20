describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env("data");
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.newpmc.username,data.newpmc.password);              
                });
                cy.fixture(`data/${data_path}/register_pmc/configure_company_settings/data`).then(function (data) {
                        this.data = data;
                      });         
        }) 
      describe("new pmc ", function () {
       it('fc-5175 configure the company settings.', function () { 
               cy.visit()
               cy.wait(4000)
               cy.get('span[class=caret]').eq(0).click({force:true})  
                cy.contains('Account Settings').click({force:true})
                cy.wait(4000)
                cy.get('a[class=\"list-group-item \"]').contains('Company Settings').click()
                cy.wait(4000)
                cy.execute('/script/register_pmc/configure_company_settings',this.data)                    
        });
      });
});
