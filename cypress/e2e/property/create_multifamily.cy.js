describe('Session Login ',()=>{
   beforeEach(() => {
         var data_path = Cypress.env(`data`)
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/property/create_multifamily/data`).then(function (data) {
           this.data = data;
        })
     })
    describe("To verify that user is able to Setup Property with Multi family", function () {
      it('Fc-2229 To verify that user is able to Setup Property with Multi family  <smoke>', function () { 
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
         const ans = generateString(2);
         cy.get('.property_property_name input[name=\"property[property_name]\"]').type(ans);
         cy.get('.property_property_code input[name=\"property[property_code]\"]').type(ans);
         cy.execute('/script/property/create_multifamily',this.data)
       });
     });
   });
     