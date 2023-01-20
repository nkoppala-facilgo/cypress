
describe("Session Login ", () => {
    beforeEach(() => {
      var data_path = Cypress.env("data");
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username, data.pmc.password);
      });
  
      cy.fixture(`data/${data_path}/invoice_processing/create_invoice/data`).then(
        function (data) {
          this.data = data;
        }
      );
    });
    describe("To verify that Invoice is going for QC Process if Invoice Processing QC Process='Yes'.", function () {
      it("FC-3885 Upload Invoice image documents. <smoke>", function () {
        cy.visit();
        cy.contains("a", "Invoice Processing").click({ force: true });
        cy.contains("a", "Invoice Images").click({ force: true });
        cy.contains("button", "Upload File").click({ force: true });
        cy.get("#invoice-processing-file-dropzone").attachFile(
          this.data["file_path"]
        );
        cy.get(".pull-left > .btn-primary")
          .contains("Upload")
          .click({ force: true });
        cy.contains("Successfully uploaded file(s).").should("exist");
      });
      it("FC-2015 Search for uploaded file and assign <smoke>", function () {
        cy.visit();
        cy.execute("/script/invoice_processing/search_assignee", this.data);
        cy.contains("Successfully updated Assignee.").should("exist");
      });
      it("FC-3891 To verify that DE user is able to 'Reject' Invoice.<smoke>", function () {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.deuser.username, data.deuser.password);
        });
        cy.visit();
        cy.contains("a", "Invoice Processing").click({ force: true });
        cy.contains("a", "Invoice Images").click({ force: true });
        cy.get("li.list-group-item.btn-show-document-head")
          .first()
          .dblclick({ force: true });
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
        const invoice_no = generateString(6);
        cy.get('input[name="invoice[invoice_number]"]').type(invoice_no);
        cy.wait(3000);
        cy.get('input[value=Process]').click();
        cy.contains('Invoice was successfully created.').should('exist');
        cy.contains("a", "Invoice Processing").click({ force: true });
        cy.contains("a", "Quality Control").click({ force: true });
        cy.get('.fa-filter').click({multiple:true});
        cy.select_by_label_new('Invoice#:',invoice_no);
        cy.get('input[value=Search]').click();
        cy.get('li.list-group-item').its('length').should('be.gt', 0)
        cy.get('#invoice-link').dblclick({force: true});
        cy.wait(5000);
        cy.contains('a.btn.btn-danger','Reject').click();
        cy.get('div.sa-button-container').parent('div.sweet-alert.visible.showSweetAlert').find('button.confirm').click({force:true});
        cy.wait(4000);
        cy.contains('Invoice has been rejected.').should('exist');
      });
    });
  });
  
