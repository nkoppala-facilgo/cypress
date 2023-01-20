describe('Session Login ',()=>{
  beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
  cy.fixture(`data/${data_path}/quote_request/create/data`).then(function (data) {
    this.data = data;
  });
  cy.fixture(`data/${data_path}/quote_request/edit/data`).then(function (data) {
    this.data1 = data;
  });
});
describe("To verify that Supplier get reflected data after PMC edit the Quote Request.", function () {
  it("fc-1426 create a quote request with one/multiple supplier on pmc side and edit it <smoke>", function () {
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
    cy.contains("button", "Edit").click();
    cy.wait(6000);
    cy.execute("script/quote_request/edit", this.data1);
    cy.contains("button", "Send").click();
    cy.wait(3000);
    cy.contains("Quote Request Has Been Sent").should("exist");
    cy.wait(3000);   
    cy.get('span[class=caret]').eq(0).click({force:true}); 
    cy.contains('Logout').click({force:true});
    cy.wait(5000);
  });
  it("Observe the edited quote-request in supplierside <smoke>", function () {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username,data.pmc.password);
    });
    cy.fixture(`data/${data_path}/quote_request/create/data`).then(function (data) {
      this.data = data;
    });
    cy.fixture(`data/${data_path}/quote_request/edit/data`).then(function (data) {
      this.data1 = data;
    });
  });
  describe("To verify that Supplier get reflected data after PMC edit the Quote Request.", function () {
    it("create a quote request with one/multiple supplier on pmc side and edit it <smoke>", function () {
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
      cy.wait(6000);
      cy.execute("script/quote_request/edit", this.data1);
      cy.contains("button", "Send").click({force: true});
      cy.wait(5000);
      cy.contains("Quote Request Has Been Sent").should("exist");
      cy.wait(3000);   
      cy.get('span[class=caret]').eq(0).click({force:true}); 
      cy.contains('Logout').click({force:true});
      cy.wait(5000);
    });
    it("Observe the edited quote-request in supplierside <smoke>", function () {
      var data_path = Cypress.env(`data`)
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.supplier.username,data.supplier.password);
      });
      cy.visit("/quote_requests");
      cy.wait(7000);
      cy.get('a[data-remote="true"]').first().dblclick({ force: true });
      cy.wait(5000);
    });
  });
});
});

