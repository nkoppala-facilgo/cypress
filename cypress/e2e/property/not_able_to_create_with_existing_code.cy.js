describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/property/not_able_to_create_with_existing_code/data`).then(function (data) {
           this.data = data;
        })
     })
    describe("To verify that PMC is not able to create Property with existing Property code name.", function () {
      it('FC-2233 Not able to create property with existing code   ', function () { 
           cy.visit("/dashboards/graph")
           cy.contains("Setup").click({force: true})
           cy.get('a[data-original-title=\"Asset Group / Properties\"]').click({force: true});
           cy.get('a[data-title=\"Properties\"]').click({force: true});
           cy.wait(5000)
           cy.contains('New Property').click({ force: true })
           cy.wait(5000)
           const characters ='0123456789';
           function generateString(length) {
               let result = ' ';
               const charactersLength = characters.length;
               for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
               }
               const common_str = Cypress.env(`common_string`);
               return common_str + result;
           }
           cy.get('.property_property_name input[name=\"property[property_name]\"]').type(generateString(7));
           cy.execute('/script/property/not_able_to_create_with_existing_code',this.data)
       });
     });
   });
     