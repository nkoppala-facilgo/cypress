describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
   cy.fixture(`data/${data_path}/work_order/add_resident/data`).then(function (data) {
      this.data = data;
   })
})
describe("add resident to work order", function () {
 it('FC-1321 add resident to work ordert  <smoke>', function () { 
   cy.execute('/script/work_order/add_resident',this.data)      
  });
});
});