describe('Session Login ',()=>{
  beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
});

describe("Setup- Supplier|| Download the GL codes mapping file", function () {
  it("Fc-1348 Download GL Codes from mapping  <smoke>", function () {
    cy.visit('/property_suppliers')
    cy.contains("a", "Download GL Codes Mapping").click();
  });
});
});
