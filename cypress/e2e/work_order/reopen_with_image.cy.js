describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/work_order/reopen_with_image/data`).then(function (data) {
           this.data = data;
        })
     })
     describe("reopen work order with attach image", function () {
      it(' FC-1319 reopen work order with attach image  <smoke>', function () { 
           cy.execute('/script/work_order/create',this.data)
           cy.execute('/script/work_order/reopen_with_image',this.data)
       });
     });
   });