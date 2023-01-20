describe('Session Login ',()=>{
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.technician.username,data.technician.password);
              });
          cy.fixture(`data/${data_path}/work_order/schedule_nte/data`).then(function (data) {
             this.schedule_nte_data = data;
          })     
      })
      describe("schedule work order", function () {
       it('fc-3209 schedule a work order  <smoke>', function () { 
            cy.visit("/dashboards/graph")
            cy.execute('script/work_order/schedule_nte',this.schedule_nte_data)
        });
      });
     }); 