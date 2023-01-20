describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/property/import_invalid_property/data`).then(function (data) {
           this.data = data;
        })
     })
    describe("pmc is not able to import property with invalid format", function () {
      it('FC-2236 pmc is not able to import property with invalid format  ', function () { 
           cy.visit("/dashboards/graph")
           cy.contains("Setup").click({force: true})
           cy.get('a[data-original-title=\"Asset Group / Properties\"]').click({force: true});
           cy.get('a[data-title=\"Properties\"]').click({force: true});
           cy.wait(5000)
           cy.get('.btn-toolbar > button').first().click({ force: true })
           cy.wait(5000);
           cy.execute('/script/property/import_invalid_property',this.data)
       });
     });
   });
     