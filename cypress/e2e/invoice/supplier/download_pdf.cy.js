describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.supplier.username, data.supplier.password);
    });
    cy.fixture(`data/${data_path}/invoice/supplier/copy_credit_memo/data.json`).then(function (data) {
      this.data = data;
    });
  });
  describe("To verify Supplier is able to download PDF file for created Credit memos.", function () {
    it("FC-2263 To verify Supplier is able to download PDF file for created Credit memos. <smoke>", function () {
      cy.visit("/invoices/new");
      cy.wait(2000);
      const characters ="0123456789";
      function generateString(length) {
        let result = "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        const common_str = Cypress.env(`common_string`);
        return common_str + result;
      }
      this.data.supplier_invoice = generateString(7);
      this.data.supplier_cm = generateString(7);
      cy.execute("/script/invoice/supplier/copy_credit_memo", this.data);
      cy.get('li[class="list-group-item"]').first().click({force: true});
      cy.wait(6000);
      cy.contains("label", "FINVOICE#:").parent().find("p").invoke("text")
      .then((finvoice) => {
        cy.visit("/credit_memos/new?ref_invoice_id=" + finvoice);
        cy.execute("script/invoice/supplier/create_memo", this.data);
        cy.get('input[value="Submit"]').click({force: true});
        cy.contains("Credit Memo was successfully created.").should("be.visible");
      });
      cy.wait(8000);
      cy.get('i[class="fa fa-print"]').parent('a[target="_blank"]').click({force: true});
    });
  });
});
