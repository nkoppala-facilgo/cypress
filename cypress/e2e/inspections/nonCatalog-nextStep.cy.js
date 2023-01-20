describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
        
        cy.fixture(`data/${data_path}/inspections/nonCatalog-nextStep/data`).then(function(data) {
            this.nonCatlog_nextStep_data = data;
        }) 
    }) 
    describe("Non Catalog Work Order inspections Next step", function() {
        it('FC-1273 New Non Catalog Work Order inspections Next step <smoke>', function() {
            cy.visit()
            cy.wait(3000)
            const characters ='0123456789';
        function generateString(length) {
                let result = '';
                const charactersLength = characters.length;
                for ( let i = 0; i < length; i++ ) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                const common_str = Cypress.env(`common_string`);
               return common_str + result;
        }
        this.nonCatlog_nextStep_data['list_name'] = generateString(6)
            cy.contains("Documents").click()
            cy.contains('a', 'Inspections').click({ force: true })
            cy.contains('a', 'Create Inspection').click({ force: true })
            cy.wait(3000)
            cy.execute('script/inspections/create', this.nonCatlog_nextStep_data)
            cy.wait(8000)
             cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.execute('script/inspections/nonCatalog-nextStep', this.nonCatlog_nextStep_data)
    });
});
});