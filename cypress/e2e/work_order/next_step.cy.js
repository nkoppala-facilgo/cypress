describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
    cy.fixture(`data/${data_path}/work_order/next_step/data`).then(function (data) {
       this.data = data;
    })
 })
 
 describe("next step work order ", function () {
   it('FC-1224 next step workorder  <smoke>', function () { 
        cy.execute('/script/work_order/create',this.data)
        cy.execute('/script/work_order/next_step',this.data)      
    });
  });
});