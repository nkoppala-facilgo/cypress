describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/property/import/data`).then(function (data) {
           this.data = data;
        })
     })
    describe("To verify that PMC is able to Import property successfully", function () {
      it('FC-2234 pmc is able to import property  ', function () { 
           cy.visit("/dashboards/graph")
           cy.contains("Setup").click({force: true})
           cy.get('a[data-original-title=\"Asset Group / Properties\"]').click({force: true});
           cy.get('a[data-title=\"Properties\"]').click({force: true});
           cy.wait(5000)
           cy.get('.btn-toolbar > button').first().click({ force: true })
           cy.wait(5000);
           cy.execute('/script/property/import',this.data)
       });
     });
   });
     