describe('Session Login ',()=>{
  beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
   cy.fixture(`data/${data_path}/work_order/create/data`).then(function (data) {
     this.data = data;
   })
})
describe("Create work order ", function () {
 it('FC-1274 new workorder create  <smoke>', function () { 
     cy.execute('/script/work_order/create',this.data)      
  });
});
});