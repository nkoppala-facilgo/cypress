describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/scompleted_supplier_creates_invoice_from_order/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("To verify order status should be 'SCompleted' when invoice is created from order by supplier. ", function () {
    it("FC-6756 To verify order status should be 'SCompleted' when invoice is created from order by supplier.  <smoke>", function () {
      cy.execute("/script/work_order/create", this.data);
      cy.execute("/script/work_order/non_catalog", this.data);
      cy.contains('button[class="pull-right btn btn-default"]', "Close").click({force: true});
      cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
          cy.get("span[class=caret]").eq(0).click({ force: true });
          cy.contains("Logout").click({ force: true });
          var data_path = Cypress.env(`data`);
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.supplier.username,data.supplier.password);
          });
            cy.visit("/work_orders/" + wo_number);
            cy.wait(7000);
            cy.contains("button","Confirm").click();
            cy.get("#js-react-WorkOrderDocumentHierarchyView > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > a").invoke("text").then((create_invoice_link) => {
                cy.get("#js-react-WorkOrderDocumentHierarchyView > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > a").invoke("removeAttr", "target").click({ force: true });
                cy.wait(5000);
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
                const data_path = Cypress.env(`data`);
                const characters = "0123456789";
                function generateString(length) {
                  let result = "";
                  const charactersLength = characters.length;
                  for (let i = 0; i < length; i++) {
                    result += characters.charAt(
                      Math.floor(Math.random() * charactersLength)
                    );
                  }
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
              });
          });
        });
    });
  });
