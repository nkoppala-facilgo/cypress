describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env("data");
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.newpmc.username,data.newpmc.password);
                });
                cy.fixture(`data/${data_path}/register_pmc/setup_nte_amounts/data`).then(function (data) {
                        this.data = data;
                });
              
        }) 
      describe("new pmc WO Categories", function () {
       it('fc-5181 Setup NTE Amounts for the WO Types', function () { 
               cy.visit()
               cy.visit('/nte_amount_setup')
               cy.wait(4000)
               cy.contains('button',' New Setup NTE Limit').click({force: true})
               cy.wait(4000)
               cy.get('.Select-placeholder').contains('Work Order Category').type(this.data.wo_category)
               cy.wait(2000)
               cy.get('input[aria-expanded=\"true\"]').type('{enter}',' { force: true }')
               cy.wait(2000)
               cy.get('#nte-limit').type(this.data.nte_limit)
               cy.wait(2000)
               cy.contains('button','Create').click({force: true})
               cy.wait(2000)
               cy.contains('NTE Limit Setting is successfully added').should('exist')
               cy.contains('button','OK').click({force: true})
              
        });
      });

});