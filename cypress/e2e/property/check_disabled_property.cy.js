describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
    cy.fixture(`data/${data_path}/property/data`).then(function (data) {
       this.data = data;
    })
})
describe("To verify that user not able to select the disabled Property in the \"REG/PROP COVERAGE\" field", function(){
    it("FC-1458 not able to select disable property  <smoke>",function() {
        cy.visit('/properties');
        cy.wait(3000);
        cy.execute("script/property/filter",this.data);
        cy.get('a[class="linkable-text"]').first().invoke('text').then((value) => {
            cy.log(value);
            cy.visit('/projects');
            cy.get('strong').first().parent().parent().find('a[data-toggle=dropdown]').click();
            cy.get('span').contains('Edit').parent().click();
            cy.get('label').contains('REG / PROP COVERAGE :').parent().find(`.Select-input input`)
                .click({ force: true })
                .type(value, { force: true });
            cy.contains('No results found')
                .should('be.visible')
                .click();
        })
    })
})
});
