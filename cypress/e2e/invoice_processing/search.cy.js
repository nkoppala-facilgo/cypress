describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/invoice_processing/search/data`).then(function (data) {
        this.data = data;
      });
  });
  describe("Verify that Filter Invoice image documents.", function () {
    it("FC-3887 Verify that Filter Invoice image documents. <smoke>", function () {
      cy.visit();
      cy.contains("a", "Invoice Processing").click({ force: true });
      cy.contains("a", "Invoice Images").click({ force: true });
      cy.execute("/script/invoice_processing/search", this.data);
      cy.get("li.list-group-item").its("length").should("be.gt", 0);
      cy.get("#data-documents").dblclick();
    });
  });
});
