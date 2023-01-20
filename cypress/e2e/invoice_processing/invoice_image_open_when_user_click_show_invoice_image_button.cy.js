describe("Session Login ", () => {
    beforeEach(() => {
      var data_path = Cypress.env("data");
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username, data.pmc.password);
      });
      cy.fixture(`data/${data_path}/invoice_processing/invoice_image_open_when_user_click_show_invoice_image_button/data`).then(function (data) {
        this.data = data;
      });
    });
    describe("To verify Invoice Image should be open when user click on Show invoice image Button", function () {
      it("FC-9034 Invoice Image should be open when user click on Show invoice image Button <smoke>", function () {
        cy.visit();
        cy.waitUntil(()=>cy.contains("a", "Invoice Processing").click({force: true}));
        cy.contains("a", "Invoice Images").click({force: true});
        cy.contains("button", "Upload File").click({force: true});
        cy.get("#invoice-processing-file-dropzone").attachFile(this.data["file_path"]);
        cy.get(".pull-left > .btn-primary").contains("Upload").click({ force: true });
        cy.contains("Successfully uploaded file(s).").should("exist");
        cy.execute("/script/invoice_processing/search_assignee", this.data);
        cy.contains("Successfully updated Assignee.").should("exist");
        cy.contains("a.btn.btn-primary", "Create Invoice").click();
        cy.execute("/script/invoice_processing/create_invoice", this.data);
        cy.wait(3000);
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
        const invoice_no = generateString(6);
        cy.waitUntil(()=>cy.get('input[name="invoice[invoice_number]"]').type(invoice_no));
        cy.contains('span', 'Submit').parent().parent().find(`.Select-input input`).click({force: true}).clear({forec: true}).wait(5000).type('Submit', {force: true}).wait(5000).type('{enter}' ,{force: true});
        cy.get('input[value="Process"]').click();
        cy.contains("a", "Invoice Processing").click({force: true});
        cy.contains("a", "Quality Control").click({force: true});
        cy.get('.fa-filter').click({multiple:true});
        cy.waitUntil(()=>cy.select_by_label_new('Invoice#:',invoice_no));
        cy.get('input[value=Search]').click();
        cy.get('li.list-group-item').its('length').should('be.gt', 0)
        cy.get('#invoice-link').dblclick({force: true});
        cy.waitUntil(()=>cy.contains('a', 'Show Invoice Image').click({force: true}));
    });
  });
});
