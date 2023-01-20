describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.supplier.username,data.supplier.password);
         });
        cy.fixture(`data/${data_path}/work_order/supplier/create/data`).then(function (data) {
           this.data = data;
        })
     })
    describe("Create work order from supplier side", function () {
      it('Create work order from supplier side  <smoke>', function () { 
           cy.visit("/dashboards/graph")
           cy.contains("Documents").click()
           cy.contains('a','Work Orders').click({ force: true })
           cy.contains('a','Create Work Order').click({ force: true })
           cy.wait(5000)
           cy.execute('/script/work_order/supplier/create',this.data)      
       });
     });
   });