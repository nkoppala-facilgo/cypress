describe('Session Login ',()=>{
  beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
  cy.fixture(`data/${data_path}/quote_request/create/data`).then(function (data) {
    this.data = data;
  });
});
describe("To verify that PMC get reflected data after Supplier edit the Quote", function () {
  it("fc-2606 create a quote request with one/multiple supplier on pmc side <smoke>", function () {
    cy.visit("/quote_requests/new");
    cy.wait(3000);
    cy.execute("/script/quote_request/create", this.data);
    for (let i = 0; i < this.data["lineitems"].length; i++) {
      cy.get("td > a.btn.btn-success")
        .eq(i)
        .click({ multiple: true, force: true });
    }
    cy.get("td > a.btn.btn-danger.remove-item").click({
      multiple: true,
      force: true,
    });
    cy.get("button[title=Send]").click({ force: true });
    cy.contains("Quote Request was successfully created.").should("exist");
  });
  it("Open the created quote-request in supplierside and create quote from it and edit it <smoke>", function () {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.supplier.username,data.supplier.password);
      });
      cy.visit("/quote_requests");
      cy.wait(5000);
    cy.get('a[data-remote="true"]').first().dblclick({ force: true });
    cy.wait(5000);
    cy.contains("button", "Create Quote").click();
    cy.execute("script/quote_request/create_quote", this.data);
    cy.contains("button.btn.btn-success", "Save").click();
    cy.contains(".btn.btn-primary", "Send").click();
    cy.contains("button", "Edit").click();
    cy.wait(10000);
    cy.execute("script/quote_request/create_quote", this.data);
    cy.contains(".btn.btn-primary", "Send").click();
  });
  it("Login to pmc again and observe the created quote <smoke>", function () {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username,data.pmc.password);
      });
      cy.visit('/quotes')
    cy.get('a[data-remote="true"]').first().dblclick({ force: true });
    cy.wait(5000);
  });
});
});
