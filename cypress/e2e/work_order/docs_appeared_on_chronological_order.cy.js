describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/non_catalog/data`).then(function (data) {
      this.data = data;
    });
    cy.fixture(`data/${data_path}/work_order/docs_appeared_on_chronological_order/data`).then(function (data) {
      this.data1 = data;
    });
  });
  describe("To verify documents are appeared on chronological order from top to bottom on 'Next step table'. ", function () {
    it("FC-7459  documents are appeared on chronological order on 'Next step table' <smoke>", function () {
      cy.execute("/script/work_order/create", this.data);
      cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val")
      .then((wo_number) => {
        cy.execute("/script/work_order/non_catalog", this.data);
        cy.contains('span', "×").click();
        cy.execute("/script/work_order/catalog", this.data1);
        cy.contains('span', "×").click();
        cy.execute("/script/work_order/catalog", this.data1);
        cy.contains('span', "×").click();
        cy.visit("/work_orders/" + wo_number)
     });
    });
  });
});
