describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
    cy.fixture(`data/${data_path}/work_order/non_catalog/data`).then(function (data) {
       this.data = data;
    })
})
describe("Create non catalog", function () {
   it('FC-4538 create non catalog order  <smoke>', function () { 
       cy.execute('/script/work_order/create',this.data) 
       cy.wait(5000)
       cy.execute('/script/work_order/non_catalog',this.data)      
    });
  });
});