describe('Session Login ',()=>{
	beforeEach(() => {
		var data_path = Cypress.env(`data`); 
		cy.fixture(`data/${data_path}/login/data`).then(function (data) {
		    cy.login_with_session(data.pmc.username,data.pmc.password);
		});
		cy.fixture(`data/${data_path}/quote_request/create/data`).then(function (data) {
		    this.data = data;
		});
	});
	describe("Create a quote request and edit supplier", function () {
		it("create a quote request and edit it with one/multiple supplier on pmc side <smoke>", function () {
			cy.visit("/quote_requests/new");
			cy.wait(3000);
			cy.execute("/script/quote_request/create", this.data);
			for (let i = 0; i < this.data["lineitems"].length; i++) {
				cy.get("td > a.btn.btn-success").eq(i).click({multiple: true, force: true});
			}
			cy.get("td > a.btn.btn-danger.remove-item").click({multiple: true, force: true});
			cy.get("button[title=Send]").click({force: true});
			cy.contains("Quote Request was successfully created.").should("exist");
			cy.contains("button", "Edit").click({force: true});
			var data_path = Cypress.env(`data`);
			cy.fixture(`data/${data_path}/quote_request/create/data`).then(function (data) {
				cy.execute("script/quote_request/supplier", data.supplier1);
			});
		});
		it("Observe the created QR in supplier side <smoke>", function () {
			var data_path = Cypress.env(`data`);
			cy.fixture(`data/${data_path}/login/data`).then(function (data) {
				cy.login_with_session(data.supplier.username,data.supplier.password);
			});
			cy.visit("/quote_requests");
			cy.get('a[data-remote="true"]').first().dblclick({force: true});
			cy.wait(5000);
		});
	});
});
