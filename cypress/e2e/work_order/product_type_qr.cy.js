describe('Session Login ',()=>{
  beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
  cy.fixture(`data/${data_path}/work_order/create_qr_from_wo/data`).then(function (data) {
    this.data = data;
  });
});
describe("Create product type QR from workorder", function () {
  it("FC-1178 Create product type QR from workorder  <smoke>", function () {
    cy.visit('/work_orders/new')
    cy.wait(5000);
    cy.execute("/script/work_order/product_type_qr/create_wo.json",this.data);
    cy.execute("/script/work_order/product_type_qr/create_qr.json",this.data);
  });
});
});
