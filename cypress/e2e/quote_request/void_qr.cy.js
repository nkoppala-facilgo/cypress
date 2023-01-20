describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/quote_request/create/data`).then(function (
      data) {
      cy.log(data);
      this.data = data;
    });
  });
  describe("Void a quote request in pmc side", function () {
    it("fc-2598 create a quote request with one/multiple supplier on pmc side and void it <smoke> ", function () {
      cy.visit("/quote_requests/new");
      cy.wait(3000);
      cy.log(this.data);
      cy.execute("/script/quote_request/create", this.data);
      for (let i = 0; i < this.data["lineitems"].length; i++) {
        cy.get("td > a.btn.btn-success").eq(i).click({ force: true });
      }
      cy.get("td > a.btn.btn-danger.remove-item").click({multiple: true,force: true,});
      cy.get("button[title=Send]").click({ force: true });
      cy.contains("Quote Request was successfully created.").should("exist");
      cy.get("button.btn.btn-danger").contains("Void").click({ force: true });
      cy.wait(3000);
      cy.get('button[class="confirm"]').contains("Yes").click({ force: true });
      cy.get('button[class="confirm"]').contains("OK").click({ force: true });
    });
  });
});
