describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/next_step/data`).then(function (
      data
    ) {
      this.data = data;
    });
  });
  describe("cancle order on supplier side", function () {
    it("cancle order on supplier side  <smoke> ", function () {
      var data_path = Cypress.env(`data`);
      cy.visit("/dashboards/graph");
      cy.contains("Documents").click();
      cy.contains("a", "Work Orders").click({ force: true });
      cy.contains("a", "Create Work Order").click({ force: true });
      cy.execute("/script/work_order/create", this.data);
      cy.wait(5000);
      cy.execute("/script/work_order/next_step", this.data);
      cy.wait(3000);
      cy.contains('button[class="pull-right btn btn-default"]', "Close").click({
        force: true,
      });
      cy.contains("label", "WO#:")
        .parent()
        .find("input[type=text]")
        .invoke("val")
        .then((wo_number) => {
          cy.get("span[class=caret]").eq(0).click({ force: true });
          cy.contains("Logout").click({ force: true });
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.execute("script/login/login", data.supplier2);
          });
          cy.visit("/quote_requests");
          cy.wait(3000);
        });
      cy.contains("Documents").click();
      cy.contains("a", "Quotes / Contracts").click();
      cy.contains("span", "Quote Requests").click();
      cy.get('div[id="scroll-search"]').find("li").first().click();
      cy.get(".document-action-buttons > .btn-danger").click();
      cy.contains("button", "Void").click({force:true});
      cy.get("body > div.sweet-alert.showSweetAlert.visible > div.sa-button-container > div > button").click();
      cy.wait(5000);
      cy.get(".sa-confirm-button-container")
        .contains("button", "OK")
        .click({ force: true });
      cy.wait(3000);
      cy.get("span[class=caret]").eq(0).click({ force: true });
      cy.contains("Logout").click();
      cy.wait(5000);
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.execute("script/login/login", data.pmc2);
      });
      cy.visit("/work_orders/${wo_number}");
      cy.visit("/work_orders/${wo_number}");
      cy.wait(7000);
      cy.get('#document-scroll-search').find('div').find('li').first()
        .contains("SDeclined")
        .should("be.visible");
    });
  });
});
