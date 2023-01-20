describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
   cy.fixture(`data/${data_path}/work_order/open_reference_link/data`).then(function (data) {
      this.data = data;
   })
})
describe("Open reference link on work order after creation ", function () {
 it('FC-1279 Open reference link on work order after creation  <smoke>', function () { 
      cy.execute('/script/work_order/create',this.data)
      cy.execute('/script/work_order/non_catalog',this.data) 
      cy.execute('/script/work_order/open_reference_link',this.data) 
  });
});
});