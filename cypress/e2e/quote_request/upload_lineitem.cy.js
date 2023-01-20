describe('Session Login ',()=>{
  beforeEach(() => {
    var data_path = Cypress.env(`data`);   
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username,data.pmc.password);
    });
    cy.fixture(`data/${data_path}/quote_request/create/upload_lineitem/data`).then(function (data) {
      this.data = data;
    });
 });
describe("To verify that PMC is able to Upload line item", function () {
  it("fc-1421 Upload a lineitem <smoke>", function () {
    cy.visit("/quote_requests/new");
    cy.wait(3000);
    cy.execute("script/quote_request/create_qr_lineitem", this.data);
    for (let i = 0; i < this.data["lineitems"].length; i++) {
      cy.get("td > a.btn.btn-success")
        .eq(i)
        .click({force: true });
    }
    cy.get("td > a.btn.btn-danger.remove-item").last().click({force: true});
    
    cy.get("button[title=Send]").click({ force: true });
    cy.contains("Quote Request was successfully created.").should("exist");
  describe("To verify that PMC is able to Upload line item", function () {
    it("Upload a lineitem <smoke>", function () {
      cy.visit("/quote_requests/new");
      cy.wait(3000);
      cy.execute("script/quote_request/create_qr_lineitem", this.data);
      for (let i = 0; i < this.data["lineitems"].length; i++) {
        cy.get("td > a.btn.btn-success").eq(i).click({force: true});
      }
      cy.get("td > a.btn.btn-danger.remove-item").last().click({force: true});
      cy.get("button[title=Send]").click({force: true});
      cy.contains("Quote Request was successfully created.").should("exist");
    });
  });
});
});
});
