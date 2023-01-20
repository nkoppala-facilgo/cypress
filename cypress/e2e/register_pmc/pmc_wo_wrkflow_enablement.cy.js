describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env("data");
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.administrator.username,data.administrator.password);

                });
                cy.fixture(`data/${data_path}/register_pmc/pmc_wo_wrkflow_enablement/data`).then(function (data) {
                        this.data = data;
                });
              
        }) 
      describe("new pmc ", function () {
       it('fc-5176 In admin console, Configure PMC WO Workflow Enablement', function () { 
               cy.visit()
               cy.contains('a','Setup').click()
               cy.contains('a','Work Orders').click()
               cy.contains('a','PMC WO Workflow Enablement').click()
               cy.wait(4000)
               cy.select_by_label_with_enter('PMC:',this.data.pmc)
               cy.wait(3000)
               cy.contains('button','Enable the Feature').click()
               cy.contains('Work Order Workflow Feature has been enabled for SRF FKH STAGING PMC').should('exist')
               cy.wait(2000)
               cy.contains('a','ok').click()
        });
      });

});