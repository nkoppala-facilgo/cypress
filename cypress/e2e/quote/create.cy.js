describe('Session Login ',()=>{
  beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
  cy.fixture(`data/${data_path}/quote/create/data`).then(function (data) {
    this.data = data;
  });
});
describe("Create a Quote ", function () {
  it('create a quote', function () { 
    cy.visit('/quotes')
    cy.wait(6000); 
    cy.get('.btn-primary').contains('Create Quote').click()
    cy.execute('/script/quote/create',this.data)
    cy.contains('button.btn.btn-danger','Remove').click()
    cy.contains('button','Save').click({force: true});
    cy.wait(2000);
    cy.contains('Quote created.').should('exist')
  });
});
});
