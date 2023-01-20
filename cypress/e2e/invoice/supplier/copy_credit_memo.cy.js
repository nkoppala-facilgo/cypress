describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.supplier.username, data.supplier.password);
    });
    cy.fixture(`data/${data_path}/invoice/supplier/copy_credit_memo/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });

  describe("To verify that Supplier is able to copy Credit memos link.", function () {
    it("FC-2262 To verify that Supplier is able to copy Credit memos link.<smoke>", function () {
      cy.visit("/invoices/new");
      cy.wait(2000);
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
      this.data.supplier_cm = generateString(7);
      cy.execute("/script/invoice/supplier/copy_credit_memo", this.data);
      cy.get('li[class="list-group-item"]').first().click({ force: true });
      cy.wait(6000);
      cy.contains("label", "FINVOICE#:")
        .parent()
        .find("p")
        .invoke("text")
        .then((finvoice) => {
          cy.visit("/credit_memos/new?ref_invoice_id=" + finvoice);
          cy.execute("script/invoice/supplier/create_memo", this.data);
          cy.get('input[value="Submit"]').click({ force: true });
          cy.wait(3000);
          cy.contains("Credit Memo was successfully created.").should(
            "be.visible"
          );
        });
      cy.wait(8000);
      cy.contains("label", "CREDIT MEMO#:")
        .parent()
        .find("p")
        .invoke("text")
        .then((text) => {
          var data_path = Cypress.env("data");
          let flag =
            `Copied https://${data_path}.facilgo.com/credit_memos/` +
            text +
            " to clipboard.";
          cy.get(".box-body-header").find("i").eq(2).click({ force: true });
          cy.waitUntil(()=>cy.contains(flag).should("be.visible"));
        });
    });
  });
});
