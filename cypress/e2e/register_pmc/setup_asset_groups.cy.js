describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env("data");
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.newpmc.username,data.newpmc.password);
                });
                cy.fixture(`data/${data_path}/register_pmc/setup_asset_groups/data`).then(function (data) {
                        this.data = data;
                });
              
        }) 
      describe("new pmc ", function () {
       it('fc-5179 In admin console, Configure PMC WO Workflow Enablement', function () { 
               cy.visit()
               cy.visit('/asset_groups')
               cy.wait(4000)
               cy.contains('a','New Asset Groups').click({force: true})
               cy.execute('script/register_pmc/setup_asset_groups', this.data)
               cy.get('.modal-content > form > .modal-footer > .btn-primary').click({force: true})
               cy.wait(2000)
               cy.contains('Asset group has been created.').should('exist')
              
        });
      });

});