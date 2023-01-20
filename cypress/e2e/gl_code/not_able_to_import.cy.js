describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/gl_code/not_able_to_import/data`).then(function (data) {
           this.data = data;
        })
     })
    describe("To verify that PMC can not able to Import existing Data in the file.", function () {
      it('FC-2218 not able to import gl code with existing file <smoke>', function () { 
           cy.visit("/dashboards/graph")
           cy.wait(5000)
           cy.contains("Setup").click({force: true})
           cy.wait(5000)
           cy.contains('a','Chart of Accounts').click({ force: true })
           cy.wait(5000)
           cy.contains('a','GL Codes').click({ force: true })
           cy.wait(5000)
           cy.get('a[data-target=\"#modalImportGlCodes\"]').click({ force: true })
           cy.wait(5000)
           cy.execute('/script/gl_code/not_able_to_import',this.data) 
       });
     });
   });
     