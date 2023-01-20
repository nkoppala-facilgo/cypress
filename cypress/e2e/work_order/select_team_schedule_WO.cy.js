describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env("data");
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.pmc.username,data.pmc.password);
                });
                cy.fixture(`data/${data_path}/work_order/select_team_schedule_WO/data`).then(function (data) {
                  this.data = data;
                });
        }) 
      describe("work order ", function () {
       it('FC-4461 user is able to select Team while schedule WO from dashboard', function () { 
               cy.visit()
               cy.wait(4000)
               cy.contains('button','Schedule Work Order').click({ force: true })
               cy.wait(4000)
               cy.on('uncaught:exception', (err, runnable) => { return false })
               cy.execute('/script/work_order/select_team_schedule_WO',this.data)      
        });
      });
});