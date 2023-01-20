describe('Session Login ',()=>{
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.supplier.username, data.supplier.password);
    });
    cy.fixture(`data/${data_path}/order/edit_scheduled_start_date_on_order_summary_page/data`).then(function (data) {
      this.data = data;
    });
  }) 
  describe("To verify SCHED START DATE date is saved when supplier enter/edit scheduled start date on order summary page", function() {
    it('FC-9911 Supplier enter/edit scheduled start date on order summary page <regression>', function() {
      cy.visit();
      cy.contains("Documents").click();
      cy.wait(5000);
      cy.get('a[href=\"/document_orders\"]').click({force: true});
      cy.wait(5000);
      cy.get('div[class=\"media-body document-order__content\"]').last().click();
      cy.wait(7000);
      cy.select_by_calendar_using_label('SCHED START DATE:', this.data['sched_start']);
      cy.wait(5000);
      cy.reload();
    });
  });
});
