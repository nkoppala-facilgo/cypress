describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.supplier.username, data.supplier.password);
    });
    cy.fixture(`data/${data_path}/invoice/supplier/create_invoice_and_create_pdf/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("To verify user is able to download PDF file for created Credit memos.. ", function () {
    it("FC-4254 To verify user is able to download PDF file for created Credit memos..<smoke>", function () {
      cy.visit("/invoices/new");
      cy.wait(2000);
      const characters = "0123456789";
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
      cy.execute("/script/invoice/supplier/create_invoice", this.data);
      cy.get('i[class="fa fa-print"]').parent('a[target="_blank"]').click({ force: true });
    });
  });
});
