describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.technician1.username,data.technician1.password);
    });
    cy.fixture(`data/${data_path}/invoice_processing/edit_property_supplier_invoice_screen/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("To verify User is able to edit Property field and Supplier on Create Invoice screen.", function () {
    it("Fc-7129 Edit Property field and Supplier on Create Invoice screen <smoke>", function () {
      cy.visit();
      cy.waitUntil(()=>cy.contains("a", "Invoice Processing").click({ force: true }));
      cy.contains("a", "Invoice Images").click({ force: true });
      cy.contains("button", "Upload File").click({ force: true });
      cy.get("#invoice-processing-file-dropzone").attachFile(this.data["file_path"]);
      cy.get(".pull-left > .btn-primary").contains("Upload").click({ force: true });
      cy.contains("Successfully uploaded file(s).").should("exist");
      cy.visit();
      cy.execute("/script/invoice_processing/search_assignee", this.data);
      cy.contains("Successfully updated Assignee.").should("exist");
      cy.get("li.list-group-item.btn-show-document-head").first().dblclick({ force: true });
      cy.contains("a.btn.btn-primary", "Create Invoice").click();
      cy.execute("/script/invoice_processing/reference_po_contract_create",this.data);
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
      const invoice_no = generateString(6);
        cy.get('input[name="invoice[invoice_number]"]').type(invoice_no);
    });
  });
});
