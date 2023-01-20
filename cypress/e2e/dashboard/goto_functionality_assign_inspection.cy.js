describe('Session Login ',()=>{
      beforeEach(()=>{
            var data_path = Cypress.env("data");
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.pmc.username,data.pmc.password);
            });
            cy.fixture(`data/${data_path}/dashboard/goto_functionality_assign_inspection/data`).then(function (data) {
                  this.goto_functionality_data = data;
            });
      })
      describe("assign inspection go to functionality", function () {
      it('assign inspection go to functionality <smoke>', function () { 
            cy.visit('/dashboards/graph')
            cy.wait(4000)
            cy.execute('/script/dashboard/goto_functionality_assign_inspection',this.goto_functionality_data)        

      });
      });
});