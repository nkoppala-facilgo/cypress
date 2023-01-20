describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/work_order/prod_type_non_catalog/data`).then(function (data) {
           this.data = data;
        })
    })
    describe("Create Product Type non catalog", function () {
      it('FC-1179 Create Product Type non catalog  <smoke>', function () { 
           cy.execute('/script/work_order/create',this.data)
           cy.execute('/script/work_order/prod_type_non_catalog',this.data)      
       });
     });
   });