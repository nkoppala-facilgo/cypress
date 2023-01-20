describe('Session Login ',()=>{
  beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.supplier.username,data.supplier.password);
        });
  cy.fixture(`data/${data_path}/work_order/order_type/data`).then(function (
    data
  ) {
    this.data = data;
  });
});
describe("Create Order from quote", function () {
  it("Create and send Quote from supplier side  <smoke>", function () {
    cy.visit('/quotes/new')
    cy.execute("script/work_order/create_order_from_quote/create_quote", this.data);
    cy.execute("script/work_order/create_order_from_quote/property",this.data)
    cy.select_by_label("QUOTE TYPE:", "Order");
    cy.contains(".btn-success", "Save").click();
    cy.contains(".btn-primary", "Send").click();
    cy.wait(10000);
  });
  it("Create Order from quote  <smoke>", function () {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username,data.pmc.password);
      });
      cy.visit('/quotes')
    cy.get(".fa-filter").parent().click();
    cy.wait(5000);
    cy.execute("script/work_order/create_order_from_quote/search_quote", this.data);
    cy.get('#quotes_search_button').click()
    cy.get('a[data-remote="true"]').first().dblclick({ force: true });
    cy.wait(10000);
    cy.contains("span", "Create Order").click();
    cy.wait(10000)
    cy.select_by_label_with_enter('Workflow',this.data['workflow'],3000);
    cy.wait(2000)
    cy.contains("button", "Checkout").click();
  });
});
});