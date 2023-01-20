describe('Session Login ',()=>{
  beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
  cy.fixture(`data/${data_path}/quote/search/data`).then(function (data) {
    this.data = data;
  })
})
 describe("Search a quote", function () {
  it('search a quote', function () { 
    cy.visit('/quotes')
    cy.wait(6000);   
    cy.get('.fa-filter').click({multiple:true})
    cy.wait(5000)
    cy.execute('/script/quote/search',this.data)
    cy.get('.list-group.supplier-list.quotes').its('length').should('be.gt', 0)
  });
});
});
