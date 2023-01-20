describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env("data");
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.administrator1.username,data.administrator1.password);
                });
                cy.fixture(`data/${data_path}/register_pmc/configure_custom_email/data`).then(function (data) {
                        this.data = data;
                      });
              
        }) 
        
      describe("new pmc ", function () {
       it('fc-5177 Configure Custom Email Templates through the admin console', function () { 
               cy.visit()
               cy.wait(4000)
               cy.get('.fa-cogs').click()
               cy.contains('a','Work Orders').click()
               cy.contains('a','Custom Email Messages').click()
               cy.contains('a','Create New Custom Email').click()
               cy.wait(3000)
               cy.execute('/script/register_pmc/configure_custom_email',this.data) 
               

        });
});
});

