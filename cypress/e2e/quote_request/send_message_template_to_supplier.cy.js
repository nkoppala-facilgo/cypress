describe('Session Login ',()=>{
  beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
  cy.fixture(`data/${data_path}/quote_request/create/data`).then(function (data) {
    this.data = data;
  });
});
describe("Create a quote request and send message template", function () {
  it("fc-2586 create a quote request on pmc side and send it to supplier <smoke>", function () {
    cy.visit("/quote_requests/new");
    cy.wait(3000);
    cy.execute("/script/quote_request/create", this.data);
    for (let i = 0; i < this.data["lineitems"].length; i++) {
      cy.get("td > a.btn.btn-success")
        .eq(i)
        .click({ multiple: true, force: true });
    }
    cy.get("td > a.btn.btn-danger.remove-item").click({
      multiple: true,
      force: true,
    });
  describe("Create a quote request and send message template", function () {
    it("create a quote request on pmc side and send it to supplier <smoke>", function () {
      cy.visit("/quote_requests/new");
      cy.wait(3000);
      cy.execute("/script/quote_request/create", this.data);
      for (let i = 0; i < this.data["lineitems"].length; i++) {
        cy.get("td > a.btn.btn-success").eq(i).click({multiple: true, force: true});
      }
      cy.get("td > a.btn.btn-danger.remove-item").click({multiple: true, force: true});
      cy.get("button[title=Send]").click({force: true});
      cy.contains("Quote Request was successfully created.").should("exist");
      cy.get(".fa.fa-filter").parent().click({multiple: true});
      const characters ='0123456789';
      function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        const common_str = Cypress.env(`common_string`);
        return common_str + result;
      }
      this.data['template_name'] = generateString(7);
      cy.execute("script/quote_request/send_message_template_to_supplier",this.data);
      cy.wait(2000);
      cy.contains("Template was created").should("exist");
    });
  });
});
});
});
