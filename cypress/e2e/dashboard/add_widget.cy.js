describe('Session Login ',()=>{
        beforeEach(()=>{
              var data_path = Cypress.env(`data`);
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.pmc.username,data.pmc.password);
              });
             cy.fixture(`data/${data_path}/dashboard/add_widget/data`).then(function (data) {
                this.data = data;
             })
          })
         describe("add  new widget to dashboard", function () {
           it('add  new widget to dashboard <smoke>', function () { 
                cy.execute('/script/dashboard/add_widget',this.data)
                cy.wait(3000)
                cy.add_new_widget('Inspections');
            });
          });
        });