describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/quote_request/pricelist_type_contract/create/data`).then(function (data) {
      this.data = data;
    });
    cy.fixture(`data/${data_path}/quote_request/pricelist_type_contract/create_contract_quote/data`).then(function (data) {
      this.data1 = data;
    });
  });
  describe("To verify Contract should be appear in PriceList document", function () {
    it("fc-2865 Create a quote request(Pricelist=yes) and then Login with supplier and give quote back to pmc(Contract) <smoke>", function () {
      cy.visit("/quote_requests/new");
      cy.wait(3000);
      cy.get("#is-price-list").select("Yes");
      cy.execute("script/quote_request/pricelist/create", this.data);
      for (let i = 0; i < this.data["lineitems"].length; i++) {
        cy.get("td > a.btn.btn-success").eq(i).click({ force: true });
      }
      cy.get("td > a.btn.btn-danger.remove-item").last().click({ force: true });
      cy.get("button[title=Send]").click({ force: true });
      cy.contains("Quote Request was successfully created.").should("exist");
      cy.wait(3000);   
    });


    it("Login with supplier and give quote back to pmc(Contract) <smoke>", function () {
      var data_path = Cypress.env(`data`)
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.supplier.username, data.supplier.password);
      });
      cy.visit("/quote_requests");
      cy.get('a[data-remote="true"]').first().dblclick({ force: true });
      cy.wait(5000);
      cy.contains("button", "Create Quote").click();
      cy.contains('button', 'Continue').click()
      cy.contains("button", "Create Quote").click();
      cy.contains('button', 'Continue').click();
      cy.wait(3000);
      cy.execute("/script/quote_request/supplier/create_contract_quote",this.data1);
      cy.wait(3000);
      const characters ="0123456789";
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
      const customer_id = generateString(7)
      cy.get('#supplier-contract-number').type(customer_id);
      cy.select_by_placeholder_using_selector("Property",this.data["property"],0);
      cy.get('tr[class="quote-item"]').contains("button", "Save").click({ force: true });
      cy.get('button[title="Save and Send Quote"]').click({ force: true });
      cy.wait(3000);  
    });
    it("Login to pmc again and Sign the contract <smoke>", function () {
      var data_path = Cypress.env(`data`)
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username, data.pmc.password);
      });
      cy.visit("/quotes");
      cy.wait(10000);
      cy.get('a[data-remote="true"]').first().dblclick({ force: true });
      cy.wait(10000);
      cy.contains("button", "Accept").click();
      cy.get('i[class="fa fa-keyboard-o"]').click();
      cy.get('input[placeholder="type your signature in here"]').type("Hello");
      cy.contains("button", "Sign & Send Quote").click();
      cy.select_by_label("WORKFLOW:", "Maintenance");
      cy.select_by_placeholder('Fiscal Period','08 (2022)')
      cy.contains("button", "Send").click();
      cy.get('textarea[placeholder="Scope Description..."]').type("Thank you");
      cy.get("button.btn.btn-sm.btn-primary").contains("Save").click({ force: true });
      cy.contains("button", "Send").click();
    });
  });
});
