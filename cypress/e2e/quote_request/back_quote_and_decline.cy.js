describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/quote_request/create/registered/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });
  describe("create a quote request with Registered Supplier and give quote back to PMC and then decline the quote", function () {
    it("fc-2608 create a quote request with Registered Supplier and give quote back to PMC and then decline the quote <smoke>", function () {
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
      cy.get("span[class=caret]").eq(0).click({ force: true });
      var data_path = Cypress.env(`data`);
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.supplier.username, data.supplier.password);
      });
      cy.visit();
      cy.contains("a", "Documents").click({ force: true });
      cy.contains("a", "Quotes / Contracts").click({ force: true });
      cy.contains("a", "Quote Requests").click({ force: true });
      cy.get('div[id="scroll-search"]')
        .find("li")
        .first()
        .find("a")
        .first()
        .click({ force: true });
      cy.wait(4000);
      cy.contains("button", "Create Quote").click({ force: true });
      cy.select_by_calendar_using_label(
        "QUOTE EXPIRES:",
        this.data["quote_expires"]
      );
      cy.get('tr[class="quote-item"]')
        .contains("button", "Save")
        .click({ force: true });
      cy.get('button[title="Save and Send Quote"]').click({ force: true });
      cy.get("span[class=caret]").eq(0).click({ force: true });
      cy.wait(5000);
      var data_path = Cypress.env(`data`);
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username, data.pmc.password);
      });
      cy.visit("/quotes");
      cy.get('div[id="scroll-search"]')
        .find("li")
        .first()
        .find("a")
        .first()
        .click({ force: true });
      cy.wait(10000);
      cy.contains("button", "Decline").click({ force: true });
      cy.wait(2000);
      cy.contains("button", "Yes").click({ force: true });
      cy.wait(3000);
      cy.contains("Quote was Declined.").should("be.visible");
    });
  });
});
