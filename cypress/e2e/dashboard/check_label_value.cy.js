describe('Session Login ',()=>{
        beforeEach(()=>{
              var data_path = Cypress.env(`data`);
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.pmc.username,data.pmc.password);
              });
             
          })
         describe("Check label on Summary Preventive Maintenance Inspection ", function () {
           it('Check label on Summary Preventive Maintenance Inspection <smoke>', function () { 
                cy.visit('/dashboards/graph')
                cy.wait(4000)
                cy.contains('Setup').click({force: true})
                cy.wait(4000)
                cy.contains('a','Users').click({ force: true })
                cy.wait(5000)
                cy.contains('a','User Types').click({ force: true })
                cy.wait(4000)
                cy.contains('Company Admin').parent().find('td li  .dropdown-toggle').click({ force: true }).parent().wait(1000).find('.fa-circle').click()
                cy.wait(5000)
                cy.add_new_widget('Documents');
                var check_label_value_data = {};
                cy.execute('/script/dashboard/check_label_value',check_label_value_data)        

            });
      });
});