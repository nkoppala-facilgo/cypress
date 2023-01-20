describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/quote_request/cancel_contract/create/data`).then(function (data) {
      this.data = data;
    });
    cy.fixture(`data/${data_path}/quote_request/cancel_contract/create_contract_quote/data`).then(function (data) {
      this.data1 = data;
    });
  });
  describe("To verify status is changed", function () {
    it("fc-2859 Create a quote request <smoke> ", function () {
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
    it("Login with supplier and give quote back to pmc(Contract) <smoke> ", function () {
      cy.wait(4000);
      var data_path = Cypress.env(`data`)
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.supplier.username, data.supplier.password);
      });
      cy.visit("/quote_requests");
      cy.get('a[data-remote="true"]').first().dblclick({ force: true });
      cy.wait(5000);
      cy.contains(".btn.btn-primary", "Create Quote").click();
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
      cy.get('tr[class="quote-item"]').contains("button", "Save").click({ force: true });
      cy.get('button[title="Save and Send Quote"]').click({ force: true });
      cy.wait(4000);
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username, data.pmc.password);
      });
      cy.visit("/quotes");
      cy.get('a[data-remote="true"]').first().dblclick({ force: true });
      cy.wait(10000);
      cy.contains("button", "Accept").click();
      cy.get('i[class="fa fa-keyboard-o"]').click();
      cy.get('input[placeholder="type your signature in here"]').type("Hello");
      cy.contains("button", "Sign & Send Quote").click();
      cy.select_by_label("WORKFLOW:", this.data['workflow']);
      cy.select_by_placeholder('Fiscal Period',this.data['fiscal_period']);
      cy.contains("button", "Send").click();
      cy.get('textarea[placeholder="Scope Description..."]').type("Thank you");
      cy.get("button.btn.btn-sm.btn-primary").contains("Save").click({ force: true });
      cy.contains("button", "Send").click();
      cy.wait(10000);
      cy.get("div.media").first().dblclick({ force: true });
      cy.wait(5000);
      cy.get('span[aria-hidden="true"]').contains("×").click({ force: true });
      cy.contains("button", "Request Cancellation").click();
      cy.get("div.sweet-alert.visible.showSweetAlert").find("div.sa-confirm-button-container > button.confirm").click({ force: true });
      cy.wait(4000);
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.supplier.username, data.supplier.password);
      });
      cy.visit("/contracts");
      cy.get(".fa.fa-filter").parent().click({ multiple: true });
      cy.select_by_label("Supplier Contract(s)# :",customer_id);
      cy.contains("button", "Search").click();
      cy.get("li.list-group-item").its("length").should("be.eq", 1);
      cy.get("div.media").first().dblclick({ force: true });
      cy.wait(5000);
      cy.contains("button.btn.btn-default", "Close").click({ force: true });
      cy.contains("button", "Approve Cancellation").click();
      cy.get("div.sweet-alert.visible.showSweetAlert").find("div.sa-confirm-button-container > button.confirm").click({ force: true });
      cy.contains("button", "OK").click();
    });
  });
	beforeEach(() => {
		var data_path = Cypress.env(`data`);
		cy.fixture(`data/${data_path}/login/data`).then(function (data) {
		    cy.login_with_session(data.pmc.username, data.pmc.password);
		});
		cy.fixture(`data/${data_path}/quote_request/cancel_contract/create/data`).then(function (data) {
		    this.data = data;
		});
		cy.fixture(`data/${data_path}/quote_request/cancel_contract/create_contract_quote/data`).then(function (data) {
		    this.data1 = data;
		});
	});
	describe("To verify status is changed", function () {
		it("Create a quote request <smoke> ", function () {
			cy.visit("/quote_requests/new");
			cy.wait(3000);
			cy.execute("script/quote_request/create", this.data);
			for (let i = 0; i < this.data["lineitems"].length; i++) {
				cy.get("td > a.btn.btn-success").eq(i).click({force: true});
			}
			cy.get("td > a.btn.btn-danger.remove-item").last().click({force: true});
			cy.get("button[title=Send]").click({force: true});
			cy.contains("Quote Request was successfully created.").should("exist");
		});
		it("Login with supplier and give quote back to pmc(Contract) <smoke> ", function () {
			cy.wait(4000);
			var data_path = Cypress.env(`data`);
			cy.fixture(`data/${data_path}/login/data`).then(function (data) {
				cy.login_with_session(data.supplier.username, data.supplier.password);
			});
			cy.visit("/quote_requests");
			cy.get('a[data-remote="true"]').first().dblclick({force: true});
			cy.wait(5000);
			cy.contains(".btn.btn-primary", "Create Quote").click({force: true});
			cy.execute("/script/quote_request/supplier/create_contract_quote", this.data1);
			cy.wait(3000);
			const characters ="0123456789";
			function generateString(length) {
				let result = "";
				const charactersLength = characters.length;
				for (let i = 0; i < length; i++) {
				    result += characters.charAt(Math.floor(Math.random() * charactersLength));
				}
				const common_str = Cypress.env(`common_string`);
				return common_str + result;
			}
			const customer_id = generateString(7);
			cy.get('#supplier-contract-number').type(customer_id);
			cy.get('tr[class="quote-item"]').contains("button", "Save").click({force: true});
			cy.get('button[title="Save and Send Quote"]').click({force: true});
			cy.wait(4000);
			cy.fixture(`data/${data_path}/login/data`).then(function (data) {
				cy.login_with_session(data.pmc.username, data.pmc.password);
			});
			cy.visit("/quotes");
			cy.get('a[data-remote="true"]').first().dblclick({force: true});
			cy.wait(10000);
			cy.contains("button", "Accept").click({force: true});
			cy.get('i[class="fa fa-keyboard-o"]').click({force: true});
			cy.get('input[placeholder="type your signature in here"]').type("Hello");
			cy.contains("button", "Sign & Send Quote").click({force: true});
			cy.select_by_label("WORKFLOW:", this.data['workflow']);
			cy.select_by_placeholder('Fiscal Period',this.data['fiscal_period']);
			cy.contains("button", "Send").click({force: true});
			cy.get('textarea[placeholder="Scope Description..."]').type("Thank you");
			cy.get("button.btn.btn-sm.btn-primary").contains("Save").click({force: true});
			cy.contains("button", "Send").click({force: true});
			cy.wait(1000);
			if(data_path == 'staging')
			{
				cy.contains("button", "Do Not Save All Items").click({force: true});
			}
            cy.wait(20000);
			cy.get("div.media").first().dblclick({force: true});
			cy.wait(5000);
			cy.get('span[aria-hidden="true"]').contains("×").click({force: true});
			cy.contains("button", "Request Cancellation").click({force: true});
			cy.get("div.sweet-alert.visible.showSweetAlert").find("div.sa-confirm-button-container > button.confirm").click({force: true});
			cy.wait(4000);
			cy.fixture(`data/${data_path}/login/data`).then(function (data) {
				cy.login_with_session(data.supplier.username, data.supplier.password);
			});
			cy.visit("/contracts");
			cy.get(".fa.fa-filter").parent().click({multiple: true});
			cy.select_by_label("Supplier Contract(s)# :", customer_id);
			cy.contains("button", "Search").click({force: true});
			cy.get("li.list-group-item").its("length").should("be.eq", 1);
			cy.get("div.media").first().dblclick({force: true});
			cy.wait(5000);
			cy.contains("button.btn.btn-default", "Close").click({force: true});
			cy.contains("button", "Approve Cancellation").click({force: true});
			cy.get("div.sweet-alert.visible.showSweetAlert").find("div.sa-confirm-button-container > button.confirm").click({force: true});
			cy.contains("button", "OK").click({force: true});
		});
	});
});
