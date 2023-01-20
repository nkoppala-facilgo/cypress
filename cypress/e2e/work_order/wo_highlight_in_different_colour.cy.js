describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/next_step/data`).then(function (data) {
      this.data = data;
    });
    cy.fixture(`data/${data_path}/work_order/wo_highlight_in_different_colour/data`).then(function (data) {
      this.data1 = data;
    });
  });
  describe("To verify currently selected Work order should be highlight in different colour", function () {
    it("FC-7460 Child Work order should be highlighted in different colour.  <smoke>", function () {
      cy.execute("/script/work_order/create", this.data);
      cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val")
        .then((wo_number) => {
          cy.execute("/script/work_order/next_step", this.data);
          cy.visit("/work_orders/" + wo_number);
          cy.waitUntil(() => true);
          cy.get("#js-react-WorkOrderDocumentHierarchyView").find("tbody").find("td").eq(2).find("a").invoke("text")
            .then((Quote_number) => {
              cy.get("span[class=caret]").eq(0).click({force: true});
              cy.contains("Logout").click({force: true});
              var data_path = Cypress.env(`data`);
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.supplier.username,data.supplier.password);
              });
              cy.visit("/quote_requests/" + Quote_number);
              cy.waitUntil(() => true);
              cy.get('a[data-remote="true"]').first().dblclick({force: true});
              cy.contains(".btn.btn-primary", "Create Quote").click();
              cy.execute("/script/work_order/not_quoteclosed_for_openorders",this.data);
              cy.get("span[class=caret]").eq(0).click({force: true});
              cy.contains("Logout").click({force: true});
              var data_path = Cypress.env(`data`);
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.execute("script/login/login", data.pmc);
              });
            });
          cy.visit("/work_orders/" + wo_number);
          cy.waitUntil(() => true);
          cy.execute("/script/work_order/non_catalog", this.data1);
          cy.contains('button', "Close").click({force: true});
          cy.visit("/work_orders/" + wo_number);
          cy.waitUntil(() => true);
          cy.get("#js-react-WorkOrderDocumentHierarchyView").find("tbody").find(".gray-row").find("td").eq(1).find("a").invoke("text")
            .then((work_order_link) => {
              cy.get("#js-react-WorkOrderDocumentHierarchyView").find("tbody").find(".gray-row").find("td").eq(1).find("a").invoke("removeAttr", "target").click({force: true});
              let str = work_order_link.length;
              let str1 = "";
              for (let i = 0; i < str; i++) {
                if (work_order_link[i] == " ") {
                  break;
                } else {
                  str1 = str1 + work_order_link[i];
                }
            }
            });
        });
    });
  });
});
