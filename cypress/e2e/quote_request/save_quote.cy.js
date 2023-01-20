describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username, data.pmc.password);
      });
    cy.fixture(`data/${data_path}/quote_request/save_quote/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("create a quote request with Registered Supplier and give quote back to PMC", function () {
    it("create a quote request with Registered Supplier <smoke>", function () {
      cy.visit("/quote_requests/new");
      cy.wait(3000);
      cy.execute("/script/quote_request/create", this.data);
      for (let i = 0; i < this.data["lineitems"].length; i++) {
        cy.get("td > a.btn.btn-success").eq(i).click({ multiple: true, force: true });
      }
      cy.get("td > a.btn.btn-danger.remove-item").last().click({
        multiple: true,
        force: true,
      });
      cy.get("button[title=Send]").click({ force: true });
      cy.contains("Quote Request was successfully created.").should("exist");
      cy.get("span[class=caret]").eq(0).click({ force: true });
      var data_path = Cypress.env("data");
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.supplier.username, data.supplier.password);
      });
      cy.visit("/quote_requests");
      cy.get('div[id="scroll-search"]').find("li").first().find("a").first().click({ force: true });
      cy.wait(4000);
      cy.contains("button", "Create Quote").click({ force: true });
      cy.select_by_calendar_using_label("QUOTE EXPIRES:",this.data["quote_expires"]);
      cy.get('tr[class="quote-item"]').contains("button", "Save").click({ force: true });
      cy.get('button[title="Save and not Send Quote"]').click({ force: true });
      cy.contains("Quote created.").should("be.visible");
      var data_path = Cypress.env("data");
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username, data.pmc.password);
      });
      cy.visit("/quotes");
      cy.get(".fa.fa-filter").parent().click({ multiple: true });
      cy.select_by_label_with_enter("Quote Title(s):",this.data["title"],5000);
      cy.select_by_label("Quote Types#:", "Order");
      cy.contains("label", "Quote Title(s):").parent().find(`.Select-placeholder`).contains("Select...").should("be.visible");
    });
  });
});
