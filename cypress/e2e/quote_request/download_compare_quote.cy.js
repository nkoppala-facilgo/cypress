describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)  
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/quote_request/download_compare_quote/data`).then(function (data) {
          this.data = data;
        });
      });
      describe("quote request", function () {
        it("fc-2610 create a quote request with multiple supplier on pmc side <smoke>", function () {
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
    });
    describe("quote request", function () {
        it("create a quote request with multiple supplier on pmc side <smoke>", function () {
            cy.visit("/quote_requests/new");
            cy.wait(3000);
            cy.execute("/script/quote_request/create", this.data);
            for (let i = 0; i < this.data["lineitems"].length; i++) {
                cy.get("td > a.btn.btn-success").eq(i).click({multiple: true, force: true});
            }
            cy.get("td > a.btn.btn-danger.remove-item").click({multiple: true, force: true});
            cy.get("button[title=Send]").click({ force: true });
            cy.contains("Quote Request was successfully created.").should("exist");
            cy.wait(3000);   
        });
        it("Check the created quote-request in supplierside and create quote from it <smoke>", function () {
            var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.supplier.username,data.supplier.password);
            });
            cy.visit("/quote_requests");
            cy.get('a[data-remote="true"]').first().dblclick({force: true});
            cy.wait(5000);
            cy.contains("button", "Create Quote").click({force: true});
            cy.execute("script/quote_request/create_quote", this.data);
            cy.contains("button.btn.btn-success", "Save").click({force: true});
            cy.contains(".btn.btn-primary", "Send").click({force: true});
        });
        it("Login to pmc again and compare the created quote and download data <smoke>", function () {
            var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.pmc.username,data.pmc.password);
            });
            cy.visit('/quotes');
            cy.wait(7000);
            cy.get('a[data-remote="true"]').first().dblclick({force: true});
            cy.wait(20000);
            cy.on('uncaught:exception', (err, runnable) => { return false });
            cy.contains("button", "Compare").click({force: true});
            cy.wait(3000);
            cy.on('uncaught:exception', (err, runnable) => { return false });
            cy.contains('a','Download Data').click({force: true});
        });
    });
});
});


      