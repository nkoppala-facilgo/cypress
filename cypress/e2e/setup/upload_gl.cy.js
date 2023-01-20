describe('Session Login ',()=>{
  beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
  cy.fixture(`data/${data_path}/setup/files/gl_codes/data`).then(function (data) {
    this.data = data;
  });
});

describe("Setup -Suppliers || Upload GL codes mapping.", function () {
  it("FC-5619 Upload GL codes mapping  <smoke>", function () {
    cy.visit('/property_suppliers');
    cy.contains("a", "Upload GL Codes Mapping").click();
    cy.execute('script/setup/upload', this.data);
    cy.get('input[value="Process"]').click();
    cy.contains("Supplier GL codes mapping updated.").should("exist");
  });
});
});
