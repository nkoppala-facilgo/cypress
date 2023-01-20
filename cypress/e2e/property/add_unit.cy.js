describe('Session Login ',()=>{
   beforeEach(() => {
      var data_path = Cypress.env(`data`)
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/property/add_unit/data`).then(function (data) {
           this.data = data;
        });
   });
   describe("To verify that user is able to add unit into the property", function () {
      it('FC-2232 Add unit in property <smoke>', function () { 
         cy.visit("/dashboards/graph");
         cy.wait(3000);
         cy.contains("Setup").click({force: true});
         cy.get('a[data-original-title=\"Asset Group / Properties\"]').click({force: true});
         cy.get('a[data-title=\"Properties\"]').click({force: true});
         cy.wait(5000);
         cy.contains('New Property').click({force: true});
         cy.wait(5000);
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
         cy.log(ans);
         cy.wait(1000);
         cy.get('.property_property_name input[name=\"property[property_name]\"]').type(ans);
         cy.wait(1000);
         cy.get('.property_property_code input[name=\"property[property_code]\"]').type(ans);
         cy.execute('/script/property/create',this.data);
         cy.wait(5000);
         this.data.ans = ans;
         cy.execute('/script/property/filter_property', this.data);
         cy.contains(ans).parent().parent().find('.text-center').find('.dropdown').find('.dropdown-toggle').click({force: true});
         cy.contains(ans).parent().find('a').invoke('attr', 'href')
         .then(href => {
            cy.visit(href);
         });
         cy.execute('/script/property/add_unit', this.data);
      });
   });
});
     