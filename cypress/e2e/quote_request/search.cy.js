describe('Session Login ',()=>{
  beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
  cy.fixture(`data/${data_path}/quote_request/search/data`).then(function (data) {
    this.data = data;
  })
})
describe("Search a Quote Request", function () {
  it('search a quote request <smoke>', function () { 
    cy.visit("/quote_requests");
    cy.wait(6000);   
    cy.get('.fa-filter').click({multiple:true})
    cy.execute('/script/quote_request/search',this.data) 
    cy.get('li.list-group-item').its('length').should('be.gt', 0)
  });
});
});
