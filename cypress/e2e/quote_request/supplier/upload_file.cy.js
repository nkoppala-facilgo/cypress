describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/quote_request/create/data`).then(function (
      data
    ) {
      this.data = data;
    });
    cy.fixture(
      `data/${data_path}/quote_request/supplier/upload_file/data`
    ).then(function (data) {
      this.data1 = data;
    });
  });
  describe('To verify that Supplier is able to upload Files/Images using "Upload additional Terms and condition" link.', function () {
    it("create a quote request with one/multiple supplier on pmc side <smoke>", function () {
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
      cy.get("button[title=Send]").click({ force: true });
      cy.contains("Quote Request was successfully created.").should("exist");
      cy.wait(3000);   
      cy.get('span[class=caret]').eq(0).click({force:true}); 
      cy.contains('Logout').click({force:true});
      cy.wait(5000);
    });
    it('Supplier is able to upload Files/Images using "Upload additional Terms and condition" link. <smoke>', function () {
      var data_path = Cypress.env(`data`);
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.supplier.username, data.supplier.password);
      });
      cy.visit("/quote_requests");
      cy.get('a[data-remote="true"]').first().dblclick({ force: true });
      cy.wait(10000);
      cy.contains("button", "Create Quote").click();
      cy.execute("script/quote_request/create_quote", this.data);
      cy.execute("script/quote_request/supplier/upload_file", this.data1);
      cy.wait(5000);
      cy.contains("button.btn.btn-success", "Save").click();
      cy.contains(".btn.btn-primary", "Send").click();
      cy.contains("Quote created.").should("exist");
    });
  });
});
