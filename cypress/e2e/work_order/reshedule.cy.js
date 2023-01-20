describe('Session Login ',()=>{
        beforeEach(() => {
              var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.fa.username,data.fa.password);
              });
             cy.fixture(`data/${data_path}/work_order/reshedule/data`).then(function (data) {
               this.data = data;
             })
          })
         describe("reschedule work order", function () {
           it(' FC-3878 Reschedule WO - Request Reassignment Different Tech needed', function () { 
               cy.execute('/script/work_order/show_recently_created',this.data) 
               cy.execute('/script/work_order/reshedule',this.data)
               
              })
         });
});     