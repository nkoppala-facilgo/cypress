describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
     cy.fixture(`data/${data_path}/work_order/schedule/data`).then(function (data) {
        this.data = data;
     })     
 })
 describe("schedule work order", function () {
  it('fc-1077 schedule a work order  <smoke>', function () { 
       cy.visit("/dashboards/graph")
       cy.execute('script/work_order/schedule',this.data)
   });
 });
}); 