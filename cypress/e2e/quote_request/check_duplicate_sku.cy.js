describe('Session Login ',()=>{
  beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
  cy.fixture(`data/${data_path}/quote_request/check_duplicate_sku/data`).then(function (
    data
  ) {
    this.data = data;
  });
});
describe("Check Duplicate SKU", function () {
  it("fc-1418 Restrict the duplicate SKU <smoke>", function () {
    cy.visit("/quote_requests/new");
    cy.wait(3000);
    cy.execute("/script/quote_request/check_duplicatesku", this.data);
    cy.contains("Items SKU can't be duplicate").should("exist");
  });
});
});
