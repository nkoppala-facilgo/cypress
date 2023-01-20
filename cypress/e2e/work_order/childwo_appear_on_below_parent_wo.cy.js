describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/next_step/data`).then(function (data) {
      this.data = data;
    });
    cy.fixture(`data/${data_path}/work_order/nextstep_noncatalog/data`).then(function (data) {
        this.data1 = data;
    });
  });
  describe("To verify child WOs should appear on below Parent WO and its docs ", function () {
    it("FC-7127 To verify child WOs should appear on below Parent WO and its docs <smoke>", function () {
      cy.execute("/script/work_order/create", this.data);
      cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val")
      .then((wo_number) => {
          cy.get("span[class=caret]").eq(0).click({ force: true });
          cy.execute("/script/work_order/next_step", this.data);
          cy.visit("/work_orders/" + wo_number);
          cy.get("#js-react-WorkOrderDocumentHierarchyView > div > table > tbody > tr > td:nth-child(3) > a").invoke("text")
          .then((Quote_number) => {
              cy.get("span[class=caret]").eq(0).click({ force: true });
              cy.contains("Logout").click({ force: true });
              var data_path = Cypress.env(`data`);
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.execute("script/login/login", data.supplier);
              });
              cy.visit("/quote_requests/" + Quote_number);
              cy.get('a[data-remote="true"]').first().dblclick({ force: true });
              cy.contains(".btn.btn-primary", "Create Quote").click();
              cy.execute("/script/work_order/not_quoteclosed_for_openorders",this.data);
              cy.contains("Logout").click({ force: true });
              var data_path = Cypress.env(`data`);
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.execute("script/login/login", data.pmc);
              });
            });
          cy.visit("/work_orders/" + wo_number);
          cy.execute("/script/work_order/non_catalog", this.data1);
          cy.contains("button", "Close").click();
        });
    });
  });
});
