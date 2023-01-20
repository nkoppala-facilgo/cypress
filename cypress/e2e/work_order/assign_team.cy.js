describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env("data");
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.pmc.username,data.pmc.password);
                });
                cy.fixture(`data/${data_path}/work_order/assign_team/data`).then(function (data) {
                  this.data = data;
                });
        }) 
      describe("work order assign teams", function () {
       it('FC-4462 Work Order|| Verify user is able to select Team while schedule WO from dashboard <smoke>', function () { 
               cy.visit()
               cy.wait(4000)
               cy.get('.icon-menu-work-order').click()
               cy.on('uncaught:exception', (err, runnable) => { return false })
               cy.contains("Create Work Orders").click()
               cy.wait(4000)
               cy.execute('/script/work_order/assign_team',this.data) 
                  
        });
      });
});