describe('Session Login ',()=>{
        beforeEach(() => {
                var data_path = Cypress.env(`data`)
                
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.newpmc.username,data.newpmc.password);
              });
              cy.fixture(`data/${data_path}/register_pmc/setup_workflow/data`).then(function (data) {
                this.data = data;
              })
           })
          describe("new pmc", function () {
            it('fc-5182 new workflow setup', function () { 
              cy.visit()
              cy.wait(4000)
              cy.get('.icon-menu-settings').click()
              cy.contains('a','Workflow').click()
              cy.wait(3000)
              cy.contains('button','New Workflow').click()
              cy.wait(3000)
              const characters ='0123456789';
              function generateString(length) {
                  let result = ' ';
                  const charactersLength = characters.length;
                  for ( let i = 0; i < length; i++ ) {
                   result += characters.charAt(Math.floor(Math.random() * charactersLength));
                  }
                  const common_str = Cypress.env(`common_string`);
                  return common_str + result;
              }
              this.data['workflow_name'] = generateString(7);
              this.data['workflow_weight']= Math.floor((Math.random() * 510000) + 10);
             cy.get('input[name=\"workflow[workflow_name]\"]').type(this.data.workflow_name);
             cy.get('input[name=\"workflow[weight]\"]').type(this.data.workflow_weight);
              cy.wait(2000)
             cy.get('input[Value = \"Save\"]').click()    
             });
          });
        

          describe("new pmc", function () {
                it('new workflow setup', function () { 
                cy.visit()
                cy.wait(4000)
                const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                function generateString(length) {
                    let result = ' ';
                    const charactersLength = characters.length;
                    for ( let i = 0; i < length; i++ ) {
                      result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    return result;
                }
                cy.get('.icon-menu-settings').click()
                cy.contains('a','Workflow').click()
                cy.wait(3000)
                cy.visit('/work_order_workflows')
                cy.contains('button','New Workflow').click()
                cy.wait(3000)
              
                this.data['workflow_name'] = generateString(7);
                this.data['workflow_weight']= Math.floor((Math.random() * 5000) + 10);
                cy.execute('script/register_pmc/setup_workflow', this.data)
              });
        });
});