describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/order/supplier/reject_from_hierarchy_table/data`).then(function (data) {
      this.data = data;
    });
    cy.fixture(`data/${data_path}/order/void/data`).then(function(data) {
      this.void_data = data;
  })
  });
  describe("Accept Cancellation order from Supplier side at Work Order hierarchy table", function () {
    it('fc-4394 verifying void button  <smoke>', function() {
      cy.visit()
      cy.wait(3000)
      cy.contains("Documents").click()
      cy.wait(5000)
      cy.on('uncaught:exception', (err, runnable) => { return false })
      cy.get('a[href=\"/document_orders\"]').click({ force: true })
      cy.wait(5000)
      cy.on('uncaught:exception', (err, runnable) => { return false })
      cy.contains('a', 'Create Order').click({ force: true })
      cy.wait(3000)
      cy.execute('script/order/register', this.void_data)
      cy.wait(5000)
      cy.get('#js-react-DocumentOrderPage  .document-order__content').first().click()
      cy.wait(5000)
      cy.contains('button','Void').click({force:true})
      cy.wait(1000)
      cy.get('.confirm').contains('button','Yes').click({force:true})
      cy.wait(5000)
      cy.contains('Your Order is PendCancellation and will be cancelled once the supplier accepts the cancellation request.').should('be.visible')
   });
    it("accept_from_hirarchy_table <smoke>", function () {
      var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.supplier.username, data.supplier.password);
    });
      cy.execute("script/order/supplier/path_to_order", this.data);
      cy.get('[data-react-class="DocumentOrderFilterModal"]').find("i").click();
      cy.execute("script/order/supplier/search", this.data);
      cy.execute("script/order/supplier/accept_from_hierarchy_table",this.data);
    });
  });
});
