describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/approve_dispute_displayed_on_wohierarchy/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("To verify Approve and Dispute buttons displayed on invoice document on WO hierarchy table. ", function () {
    it("FC-6758  Approve and Dispute buttons displayed on WO hierarchy table.  <smoke>", function () {
      cy.execute("/script/work_order/create", this.data);
      cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
          cy.get("span[class=caret]").eq(0).click({ force: true });
          cy.execute("/script/work_order/non_catalog", this.data);
          cy.contains("Logout").click({ force: true });
          var data_path = Cypress.env(`data`);
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.supplier.username,data.supplier.password);
          });
          cy.visit("/work_orders/" + wo_number);
          cy.get("div[id='js-react-WorkOrderDocumentHierarchyView']").find("tbody").find("td").eq(2).find("a").invoke("text").then((create_invoice_link) => {
              cy.get("div[id='js-react-WorkOrderDocumentHierarchyView']").find("tbody").find("td").eq(2).find("a").invoke("removeAttr", "target").click({ force: true });
              cy.waitUntil(() => true);
              let str = create_invoice_link.length;
              let str1 = "";
              for (let i = 0; i < str; i++) {
                if (create_invoice_link[i] == " ") {
                  break;
                } else {
                  str1 = str1 + create_invoice_link[i];
                }
              }
              cy.log(str1);
              cy.visit("/orders/" + str1 + "/invoices/new");
              const characters = "0123456789";
              function generateString(length) {
                let result = "";
                const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
                  );}
                const common_str = Cypress.env(`common_string`);
                return common_str + result;
              }
              this.data.supplier_invoice = generateString(7);
              var today = new Date();
              var dd = String(today.getDate()).padStart(2, "0");
              var mm = String(today.getMonth() + 1).padStart(2, "0");
              var yyyy = today.getFullYear();
              today = mm + "/" + dd + "/" + yyyy;
              cy.select_by_calendar_using_label("INVOICE DATE:", today);
              cy.contains("label", "SUPPLIER INVOICE#").parent().find("input[type=text]").type(generateString(7));
              cy.contains("button", "Submit").click();
              cy.contains("Logout").click({ force: true });
              var data_path = Cypress.env(`data`);
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.execute("script/login/login", data.pmc);
              });
            });
          cy.visit("/dashboards/graph");
          cy.contains("Documents").click();
          cy.contains("a", "Work Orders").click({ force: true });
          cy.get(".fa-filter").click();
          cy.select_by_label_with_enter("WO#(s):", wo_number);
          cy.contains("button", "Search").click({ force: true });
          cy.get('div[id="document-scroll-search"]').find("li").first().click({ force: true });
        });
    });
  });
});
