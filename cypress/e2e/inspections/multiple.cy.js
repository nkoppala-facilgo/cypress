describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
        cy.fixture(`data/${data_path}/inspections/multiple/data`).then(function(data) {
            this.multiple_data = data;
        }) 
    })
    describe("Create Multiple Inspection form Dashboard", function() {
        it('Fc-1174 creating  the multiple inspection <smoke>', function() {
            cy.visit()
            cy.wait(3000)
            cy.contains('Create Multiple Inspections').click({ force: true })
            cy.wait(3000)
            cy.execute('script/inspections/multiple', this.multiple_data)  
        }); 
    });
});





