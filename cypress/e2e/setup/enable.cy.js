describe('Session Login ',()=>{
  beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
  cy.fixture(`data/${data_path}/setup/search/data`).then(function (data) {
    this.data = data;
  });
});

describe("Setup - Suppliers || User is able to Enable/Disable supplier", function () {
  it("Fc-3041 User is able to Enable/Disable supplier <smoke> ", function () {
    cy.visit('/property_suppliers');
    cy.get(".fa-filter").parent().click();
    cy.wait(8000)
    cy.execute("script/setup/search", this.data);
    cy.contains("button", "Search").click();
    cy.get('ul>li').its('length').should('be.gt', 0)
    cy.contains("label", "Enabled").click();
    cy.wait(5000)
    cy.contains("label", "Disabled").click();
    cy.contains("label", "Enabled").click();
    cy.contains("label", "Disabled").click();
  });
});
});
