describe('Session Login ',()=>{
        beforeEach(()=>{
              var data_path = Cypress.env("data");
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              });
        
        })
        describe("Supplier Next Step Dashboard (Supplier Side)", function () {
        it(' To check the Lable values <smoke>', function () { 
              cy.visit('/dashboards/graph')
              cy.wait(4000)
              var supplier_next_step_check_label_value_data = {};
              cy.execute('/script/dashboard/supplier_next_step_check_label_value',supplier_next_step_check_label_value_data)        
  
        });
        });
  });