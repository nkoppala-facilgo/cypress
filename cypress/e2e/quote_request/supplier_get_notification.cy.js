describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/quote_request/supplier/supplier_get_notification/data`).then(function (data) {
      this.data = data;
    });
    cy.fixture(`data/${data_path}/quote_request/supplier/create_contract_quote/data`).then(function (data) {
        this.data1 = data;
      });
  });
  describe("To verify the supplier should get email notification", function () {
    it("fc-2856 Create a quote request <smoke>", function () {
      cy.visit("/quote_requests/new");
      cy.wait(3000);
      cy.execute("script/quote_request/create", this.data);
      for (let i = 0; i < this.data["lineitems"].length; i++) {
        cy.get("td > a.btn.btn-success").eq(i).click({ force: true });
      }
      cy.get("td > a.btn.btn-danger.remove-item").last().click({ force: true });

      cy.get("button[title=Send]").click({ force: true });
      cy.contains("Quote Request was successfully created.").should("exist");
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
      cy.execute("/script/quote_request/supplier/create_contract_quote", this.data1);
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
      const supplier_id = generateString(6);
      cy.get("#supplier-contract-number").type(supplier_id);


      cy.get('tr[class="quote-item"]').contains('button','Save').click({force:true})
      cy.get('button[title="Save and Send Quote"]').click({force:true})
   
      var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
          });
          cy.visit('/quotes');
        cy.get('a[data-remote="true"]').first().dblclick({ force: true });
        cy.wait(12000)
    cy.contains('button','Accept').click()
    cy.get('i[class="fa fa-keyboard-o"]').click()
    cy.get('input[placeholder="type your signature in here"]').type('Hello')
    cy.contains('button','Sign & Send Quote').click()
    cy.select_by_label('WORKFLOW:','Maintenance')
    cy.select_by_placeholder('Fiscal Period','02');
     
    cy.contains('button','Send').click()
    cy.get('textarea[placeholder="Scope Description..."]').type('Thank you')
    cy.get('button.btn.btn-sm.btn-primary').contains('Save').click({force:true})
    cy.contains('button','Send').click();
    cy.wait(10000);
    var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.supplier.username, data.supplier.password);
        });
        cy.visit('/contracts');
        cy.get('.fa-filter').click({multiple:true})
        cy.wait(3000)
        cy.select_by_label('Supplier Contract(s)# :',supplier_id,0);
        cy.contains('button', 'Search').click()
        cy.get('li.list-group-item').its('length').should('be.eq', 1)
      });
  });
});
