describe('Session Login ',()=>{
  beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order/service_type_qr/data`).then(function (data) {
          this.data = data;
       })
  cy.fixture(`data/${data_path}/work_order/create_qr_from_wo/contract_type_quote/data`).then(function (data) {
    this.data1 = data;
  });
});
describe("Create qr from workorder contract-type", function () {
  it('Supplier Side- Create Contract type Quote from QR <smoke>', function () { 
    cy.execute("/script/work_order/create", this.data);
      cy.execute("/script/work_order/next_step", this.data); 
      cy.wait(3000)    
  });
  it("login as supplier and create quote from same QR <smoke>", function () {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.supplier.username,data.supplier.password);
      });
      cy.visit('/quote_requests')
    cy.get('a[data-remote="true"]').first().dblclick({ force: true });
    cy.wait(10000);
    cy.contains('button','Create Quote').click()
    cy.execute("/script/work_order/product_type_qr/pricelist_and_contract/create_qr", this.data1);
    cy.execute('script/work_order/create_qr_from_wo/customer_id.json',this.data1);
    cy.get(".btn.btn-success").contains("Save").click({ force: true });
    cy.get(".btn.btn-primary").contains("Send").click({ force: true });
  });
});
});