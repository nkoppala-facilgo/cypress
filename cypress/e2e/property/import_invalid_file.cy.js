describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/property/import_invalid_file/data`).then(function (data) {
           this.data = data;
        })
     })
    describe("To verify that PMC is can not add invalid file in Import Property field", function () {
      it('FC-2236 verify that PMC is can not add invalid file into the Import Property field   ', function () { 
           cy.visit("/dashboards/graph")
           cy.wait(3000);
           cy.contains("Setup").click({force: true})
           cy.get('a[data-original-title=\"Asset Group / Properties\"]').click({force: true});
           cy.get('a[data-title=\"Properties\"]').click({force: true});
           cy.wait(5000)
           cy.get('.btn-toolbar > button').eq(1).click({ force: true })
           cy.wait(5000);
           cy.execute('/script/property/import_invalid_file',this.data)
       });
     });
   });
     