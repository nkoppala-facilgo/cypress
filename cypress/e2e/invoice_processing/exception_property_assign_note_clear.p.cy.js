describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/invoice_processing/exception_pop_up/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("To verify that Invoice is going for QC Process if Invoice Processing QC Process='Yes'.", function () {
    it("FC-7131 FC-7130 Upload Invoice image documents. <smoke>", function () {
      cy.visit();
      cy.contains("a", "Invoice Processing").click({ force: true });
      cy.contains("a", "Invoice Images").click({ force: true });
      cy.contains("button", "Upload File").click({ force: true });
      cy.get("#invoice-processing-file-dropzone").attachFile(this.data["file_path"]);
      cy.get(".pull-left > .btn-primary").contains("Upload").click({ force: true });
      cy.contains("Successfully uploaded file(s).").should("exist");
      cy.visit();
      cy.execute("/script/invoice_processing/search_assignee", this.data);
      cy.contains("Successfully updated Assignee.").should("exist");
    });
    it("FC-3893 Assignee should get cleared Invoice <smoke>", function () {
      var data_path = Cypress.env("data");
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.deuser.username, data.deuser.password);
      });
      cy.visit();
      cy.contains("a", "Invoice Processing").click({ force: true });
      cy.contains("a", "Invoice Images").click({ force: true });
      cy.get("li.list-group-item.btn-show-document-head").first().dblclick({ force: true });
      cy.contains("a.btn.btn-primary", "Create Invoice").click();
      cy.execute("/script/invoice_processing/create_invoice", this.data);
      cy.wait(3000);
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
      cy.get('input[name="invoice[invoice_number]"]').type(generateString(6));
      cy.wait(3000);
      cy.execute("/script/invoice_processing/exception_process", this.data);
      cy.contains("Invoice has been route to exception.").should("exist");
      cy.execute("/script/invoice_processing/change_assigne", this.data);
      cy.get("span[class=caret]").eq(0).click({ force: true });
      cy.contains("Logout").click({ force: true });
    });
    it("FC-3889 To verify that DE user is able to clear the Exception.<smoke>", function () {
      var data_path = Cypress.env(`data`);
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
      });
      cy.visit("/invoice_processings");
      cy.contains("span", "Document Exceptions").click({ force: true });
      cy.execute("/script/invoice_processing/document_exception", this.data);
    });
  });
});
