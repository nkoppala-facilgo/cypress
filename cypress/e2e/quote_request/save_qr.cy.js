describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/quote_request/save_qr/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("To verify the login on the Quote Request", function () {
    it("create a quote request on pmc side <smoke>", function () {
      cy.visit("/quote_requests/new");
      cy.wait(3000);
      cy.execute("/script/quote_request/create_qr_lineitem", this.data);
      for (let i = 0; i < this.data["lineitems"].length; i++) {
        cy.get("td > a.btn.btn-success")
          .eq(i)
          .click({ multiple: true, force: true });
      }
      cy.get("td > a.btn.btn-danger.remove-item").last().click({force: true});
      cy.contains("button", "Save for later").click({ force: true });
      cy.contains("Quote Request was successfully created.").should("exist");
      cy.wait(3000);   
      cy.get('span[class=caret]').eq(0).click({force:true}); 
      cy.contains('Logout').click({force:true});
      cy.wait(5000);
    });
    it("Check the created quote-request in supplierside that the quote-request should not exist there <smoke>", function () {
      var data_path = Cypress.env(`data`)
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.supplier.username, data.supplier.password);
      });
      cy.visit("/quote_requests");
      cy.get(".fa.fa-filter").parent().click({ multiple: true });
      cy.execute("script/quote_request/supplier/search", this.data);
      cy.get("form > div.modal-body").should("exist");
    });
  });
});
