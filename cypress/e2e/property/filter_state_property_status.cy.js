describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/property/filter_state_property_status/data`).then(function (data) {
           this.data = data;
        })
     })
    describe("To verify Property filter functionality with Property Status and State fields", function () {
      it('FC-2238 To verify Property filter functionality with Property Status and State fields  ', function () { 
           cy.visit("/dashboards/graph")
           cy.wait(3000);
           cy.contains("Setup").click({force: true})
           cy.get('a[data-original-title=\"Asset Group / Properties\"]').click({force: true});
           cy.get('a[data-title=\"Properties\"]').click({force: true});
           cy.wait(5000)
           cy.execute('/script/property/filter_state_property_status',this.data)
           cy.wait(2000);
           cy.get('.horizontal-scroll > table  tbody > tr ').its('length').should('be.gt',0)
       });
});
});     