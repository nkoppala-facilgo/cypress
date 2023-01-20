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
  describe("To verify that user is able to copy Invoice link.", function () {
    it("FC-4225 To verify that user is able to copy Invoice link. <smoke>", function () {
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
      cy.execute("/script/invoice/supplier/copy_invoice", this.data);
      cy.wait(5000);
      cy.contains("label", "FINVOICE#:").parent().find("p").invoke("text")
      .then((text) => {
        var data_path = Cypress.env(`data`);
        let flag = `Copied https://${data_path}.facilgo.com/invoices/` + text +" to clipboard.";
        cy.get(".box-body-header").find("i").eq(2).click({ force: true });
        cy.contains(flag).should("be.visible");
      });
    });
  });
});
