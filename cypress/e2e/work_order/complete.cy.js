describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/complete/data`).then(function (data) {
      this.data = data;
    });
    cy.fixture(`data/${data_path}/work_order/non_catalog/data`).then(function (data) {
      this.data1 = data;
    });
  });
  describe("complete workorder", function () {
    it("FC-1122 complete workorder <smoke>", function () {
      cy.execute("/script/work_order/create", this.data);
      cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val")
      .then((wo_number) => {
          cy.execute("/script/work_order/non_catalog", this.data1);
          cy.contains("Logout").click({force: true});
          var data_path = Cypress.env(`data`);
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.supplier.username,data.supplier.password);
          });
          cy.visit("/work_orders/" + wo_number);
          cy.wait(5000);
          cy.contains("button", "Complete").click();
          cy.contains("button", "OK").click();
        });
    });
  });
});
