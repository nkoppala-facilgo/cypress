describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/property/create_with_unit/data`).then(function (data) {
           this.data = data;
        })
     })
    describe("To verify that user can add unit only with Multi family Property.", function () {
      it('FC-2230 To verify that user can add unit only with Multi family Property.  <smoke>', function () { 
         cy.visit('/properties');
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
           cy.get('.property_property_name input[name=\"property[property_name]\"]').type(generateString(5));
           const ans = generateString(2);
cy.get('.property_property_code input[name=\"property[property_code]\"]').type(ans);
           cy.execute('/script/property/create_with_unit',this.data)
       });
     });
   });
     