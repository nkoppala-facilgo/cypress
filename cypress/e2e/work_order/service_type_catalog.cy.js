describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
   cy.fixture(`data/${data_path}/work_order/service_type_catalog/data`).then(function (data) {
      this.data = data;
   })
})
describe("Create Service Type non catalog", function () {
 it(' FC-1142 Create Service Type non catalog  <smoke>', function () { 
      cy.wait(5000)
      cy.execute('/script/work_order/create',this.data) 
      cy.wait(5000)
      cy.execute('/script/work_order/service_type_catalog',this.data)      
  });
});
});
