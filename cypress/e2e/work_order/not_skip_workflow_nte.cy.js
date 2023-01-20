describe('Session Login ',()=>{
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.technician.username,data.technician.password);
              });
          cy.fixture(`data/${data_path}/work_order/not_skip_workflow_nte/data`).then(function (data) {
             this.not_skip_workflow_nte_data = data;
          })     
      })
      describe(" not skip workflow", function () {
       it('FC-3225 NTE amount $0 on work Order should not skip workflow.  <smoke>', function () { 
            cy.visit("/dashboards/graph")
            const characters ='0123456789';
            function generateString(length) {
                    let result = '';
                    const charactersLength = characters.length;
                    for ( let i = 0; i < length; i++ ) {
                            result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    const common_str = Cypress.env(`common_string`);
               return common_str + result;
            }
            this.not_skip_workflow_nte_data['wo_title'] = generateString(7);
           cy.execute('script/work_order/schedule_nte',this.not_skip_workflow_nte_data)
           cy.wait(5000)
            cy.visit('/work_orders')
            cy.wait(6000)
            cy.execute('script/work_order/not_skip_workflow_nte',this.not_skip_workflow_nte_data)
        });
      });
     }); 